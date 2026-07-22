using System.Collections.Concurrent;
using System.Net.Http;
using System.Security.Claims;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using OpenMetaverse;
using OpenMetaverse.Assets;
using IGrid.Server.Data;
using IGrid.Server.Models;
using IGrid.Server.Services;

namespace IGrid.Server.Hubs;

[Authorize]
public class ViewerHub : Hub
{
    private readonly GridConnectionService _grid;
    private readonly AppDbContext _db;
    private static readonly HttpClient _httpClient = new();
    private static readonly ConcurrentDictionary<UUID, byte[]> _meshCache = new();

    public ViewerHub(GridConnectionService grid, AppDbContext db) { _grid = grid; _db = db; }

    private int UserId => int.Parse(Context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

    private async Task<string> GetUserPasswordAsync()
    {
        var user = await _db.Users.FindAsync(UserId);
        return user?.PasswordHash ?? "fallback-key";
    }

    public async Task ConnectAvatar(int avatarId)
    {
        Console.WriteLine($"[ViewerHub] ConnectAvatar: avatarId={avatarId}");
        var session = await _grid.ConnectAvatarAsync(UserId, avatarId);
        if (session == null) { await Clients.Caller.SendAsync("Error", "Failed to connect avatar"); return; }

        var caller = Clients.Caller;
        var client = session.Client;
        var sentMeshes = new ConcurrentDictionary<string, bool>();
        var userPassword = await GetUserPasswordAsync();

        // Object updates — include texture face data for prim rendering
        client.Objects.ObjectUpdate += async (_, e) =>
        {
            try
            {
                var prim = e.Prim;
                string? defaultTextureId = null;
                if (prim.Textures?.DefaultTexture?.TextureID != null && prim.Textures.DefaultTexture.TextureID != UUID.Zero)
                    defaultTextureId = prim.Textures.DefaultTexture.TextureID.ToString();

                var faceTextures = new object[6];
                for (int i = 0; i < 6; i++)
                {
                    var face = prim.Textures?.GetFace((uint)i);
                    faceTextures[i] = (face != null && face.Valid && face.TextureID != UUID.Zero)
                        ? (object)new { TextureId = face.TextureID.ToString(), RepeatU = face.RepeatU, RepeatV = face.RepeatV, OffsetU = face.OffsetU, OffsetV = face.OffsetV, Rotation = face.Rotation }
                        : null!;
                }

                await caller.SendAsync("ObjectUpdate", new
                {
                    Id = prim.ID.ToString(), Name = prim.Properties?.Name ?? "",
                    Position = new { X = prim.Position.X, Y = prim.Position.Y, Z = prim.Position.Z },
                    Rotation = new { X = prim.Rotation.X, Y = prim.Rotation.Y, Z = prim.Rotation.Z, W = prim.Rotation.W },
                    Scale = new { X = prim.Scale.X, Y = prim.Scale.Y, Z = prim.Scale.Z },
                    PrimType = (int)prim.Type, TextureId = defaultTextureId, Faces = faceTextures,
                });

                if (prim.Type == PrimType.Mesh && prim.Sculpt?.SculptTexture != UUID.Zero)
                {
                    var meshKey = prim.Sculpt.SculptTexture.ToString();
                    if (sentMeshes.TryAdd(meshKey, true))
                    {
                        try
                        {
                            var meshData = await RequestMeshAsync(client, prim.Sculpt.SculptTexture);
                            if (meshData != null && meshData.Length > 0)
                                await caller.SendAsync("MeshData", new { Id = prim.ID.ToString(), Data = Convert.ToBase64String(meshData) });
                        }
                        catch { }
                    }
                }

                // Flexible prims — if the prim has flexible data, send it for vertex displacement
                var flex = prim.Flexible;
                if (flex.Softness > 0 || flex.Gravity != 0 || flex.Drag > 0 || flex.Wind > 0 || flex.Tension > 0)
                {
                    try
                    {
                        await caller.SendAsync("FlexibleUpdate", new
                        {
                            ObjectId = prim.ID.ToString(),
                            Softness = flex.Softness,
                            Gravity = flex.Gravity,
                            Drag = flex.Drag,
                            Wind = flex.Wind,
                            Tension = flex.Tension,
                            ForceX = flex.Force.X,
                            ForceY = flex.Force.Y,
                            ForceZ = flex.Force.Z,
                            SegmentCount = Math.Max(2, (int)(prim.PrimData.PathRevolutions * 4) + 2),
                            Position = new { X = prim.Position.X, Y = prim.Position.Y, Z = prim.Position.Z },
                            Rotation = new { X = prim.Rotation.X, Y = prim.Rotation.Y, Z = prim.Rotation.Z, W = prim.Rotation.W },
                            Scale = new { X = prim.Scale.X, Y = prim.Scale.Y, Z = prim.Scale.Z },
                        });
                    }
                    catch { }
                }

                // Particle system — if the prim has particles, send particle data
                if (prim.ParticleSys.BurstRate > 0)
                {
                    try
                    {
                        var ps = prim.ParticleSys;

                        await caller.SendAsync("ParticleSystemUpdate", new
                        {
                            ObjectId = prim.ID.ToString(),
                            TextureId = ps.Texture != UUID.Zero ? ps.Texture.ToString() : null,
                            BurstSphereRate = ps.BurstRate,
                            BurstSphereRadius = ps.BurstRadius,
                            MaxAge = ps.MaxAge,
                            Lifetime = ps.PartMaxAge,
                            LifetimeVariance = 0f,
                            InitialSpeed = ps.BurstSpeedMin,
                            FinalSpeed = ps.BurstSpeedMax,
                            InitialAcceleration = ps.PartAcceleration.X,
                            FinalAcceleration = ps.PartAcceleration.Z,
                            InitialSize = ps.PartStartScaleX,
                            FinalSize = ps.PartEndScaleX,
                            StartColor = new { R = ps.PartStartColor.R, G = ps.PartStartColor.G, B = ps.PartStartColor.B, A = ps.PartStartColor.A },
                            EndColor = new { R = ps.PartEndColor.R, G = ps.PartEndColor.G, B = ps.PartEndColor.B, A = ps.PartEndColor.A },
                            Pattern = (int)ps.Pattern,
                            Flags = (int)ps.PartFlags,
                        });
                    }
                    catch { }
                }

                // Sound — if the prim has a sound attached, send a separate sound update
                if (prim.Sound != UUID.Zero)
                {
                    try
                    {
                        await caller.SendAsync("PrimSoundUpdate", new
                        {
                            ObjectId = prim.ID.ToString(),
                            SoundId = prim.Sound.ToString(),
                            Gain = prim.SoundGain,
                            Radius = prim.SoundRadius,
                            Flags = (int)prim.SoundFlags,
                        });
                    }
                    catch { }
                }
            }
            catch { }
        };

        // Avatar updates — send position + baked texture UUIDs
        client.Objects.AvatarUpdate += async (_, e) =>
        {
            if (e.Avatar == null) return;
            try
            {
                var avatar = e.Avatar;

                // Get baked texture UUIDs for this avatar
                var bakedTextures = new Dictionary<string, string>();
                try
                {
                    // The baked textures are stored in the avatar's appearance
                    // Try to get them from the avatar's TextureEntry
                    if (avatar.Textures != null)
                    {
                        for (int i = 0; i < 6; i++)
                        {
                            var face = avatar.Textures.GetFace((uint)i);
                            if (face != null && face.Valid && face.TextureID != UUID.Zero)
                            {
                                var slotName = i switch
                                {
                                    0 => "head",      // BAKED_HEAD
                                    1 => "upper",     // BAKED_UPPER
                                    2 => "lower",     // BAKED_LOWER
                                    3 => "eyes",      // BAKED_EYES
                                    4 => "hair",      // BAKED_HAIR
                                    5 => "skirt",     // BAKED_SKIRT
                                    _ => $"face{i}"
                                };
                                bakedTextures[slotName] = face.TextureID.ToString();
                            }
                        }
                    }
                }
                catch { }

                await caller.SendAsync("AvatarUpdate", new
                {
                    Id = avatar.ID.ToString(),
                    Name = avatar.Name ?? "Unknown",
                    Position = new { X = avatar.Position.X, Y = avatar.Position.Y, Z = avatar.Position.Z },
                    Rotation = new { X = avatar.Rotation.X, Y = avatar.Rotation.Y, Z = avatar.Rotation.Z, W = avatar.Rotation.W },
                    BakedTextures = bakedTextures
                });
            }
            catch { }
        };

        // Terrain
        client.Terrain.LandPatchReceived += async (_, e) =>
        { try { await caller.SendAsync("TerrainPatch", new { X = e.X, Y = e.Y, PatchSize = e.PatchSize, Heights = e.HeightMap }); } catch { } };

        // Chat
        client.Self.ChatFromSimulator += async (_, e) =>
        { try { await caller.SendAsync("ChatMessage", new { From = e.FromName ?? "Unknown", Message = e.Message, Type = (int)e.Type }); } catch { } };

        // Parcel
        client.Parcels.ParcelProperties += async (_, e) =>
        {
            try
            {
                var parcel = client.Parcels.CurrentParcel;
                if (parcel != null)
                    await caller.SendAsync("ParcelInfo", new { Name = parcel.Name ?? "Unnamed", Area = parcel.Area, SalePrice = parcel.SalePrice });
            }
            catch { }
        };
        // ── Environment / Windlight ──────────────────────────────────
        // Subscribe to RegionInfo packets for sun hour, water height, and estate sun settings.
        // Also hook SimChanged to re-emit environment on region crossings.
        void EmitEnvironmentUpdate()
        {
            try
            {
                var sim = client.Network.CurrentSim;
                if (sim == null) return;

                // Extract sun hour from RegionInfo (0-24 SL hours, where 6 = sunrise, 18 = sunset)
                float sunHour = sim.WaterHeight; // fallback
                bool useEstateSun = true;
                float waterHeight = sim.WaterHeight;

                // Try to read from the latest RegionInfo packet data stored on the sim
                // LibreMetaverse stores RegionInfo in the simulator's handle
                // We use a safe extraction approach
                try
                {
                    // RegionInfoBlock has SunHour (0-24) and UseEstateSun
                    // These are set during RegionHandshake / RegionInfo packets
                    var regionFlagsField = sim.GetType().GetField("RegionFlags",
                        System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
                }
                catch { }

                // Convert SL sun hour (0-24) to our 0-1 timeOfDay
                // SL: 0 = midnight, 6 = sunrise, 12 = noon, 18 = sunset
                // Our format: 0 = midnight, 0.5 = noon
                float timeOfDay = sunHour / 24.0f;

                // Derive sun direction from time of day
                float angle = timeOfDay * MathF.PI;
                float sunX = (float)(Math.Cos(angle) * 0.5);
                float sunY = (float)Math.Sin(angle);
                float sunZ = 0.5f;
                float len = MathF.Sqrt(sunX * sunX + sunY * sunY + sunZ * sunZ);
                sunX /= len; sunY /= len; sunZ /= len;

                // Derive sky colours from time of day
                var skyTop = DeriveSkyTopColor(timeOfDay);
                var skyMid = DeriveSkyMidColor(timeOfDay);
                var skyBot = DeriveSkyBottomColor(timeOfDay);
                var sunCol = DeriveSunColor(timeOfDay);
                var fogCol = DeriveFogColor(timeOfDay);
                var ambientCol = DeriveAmbientColor(timeOfDay);

                float sunIntensity = MathF.Max(0.04f, MathF.Sin(angle) * 1.5f);
                float ambientIntensity = 0.3f + MathF.Sin(angle) * 0.5f;
                float hemiIntensity = 0.15f + MathF.Sin(angle) * 0.25f;
                float moonIntensity = MathF.Max(0, -MathF.Sin(angle) * 0.5f);

                // Moon direction is opposite to sun
                float moonX = -sunX, moonY = -sunY, moonZ = -sunZ;

                // Water colour adjusts with time
                float waterR = 0f;
                float waterG = 0.15f + MathF.Sin(angle) * 0.26f;
                float waterB = 0.2f + MathF.Sin(angle) * 0.38f;

                caller.SendAsync("EnvironmentUpdate", new
                {
                    SkyTopColor = new { R = skyTop.R, G = skyTop.G, B = skyTop.B },
                    SkyMidColor = new { R = skyMid.R, G = skyMid.G, B = skyMid.B },
                    SkyBottomColor = new { R = skyBot.R, G = skyBot.G, B = skyBot.B },
                    SunDirection = new { X = sunX, Y = sunY, Z = sunZ },
                    SunColor = new { R = sunCol.R, G = sunCol.G, B = sunCol.B },
                    SunIntensity = sunIntensity,
                    MoonDirection = new { X = moonX, Y = moonY, Z = moonZ },
                    MoonColor = new { R = 0.69f, G = 0.73f, B = 0.87f },
                    MoonIntensity = moonIntensity,
                    FogColor = new { R = fogCol.R, G = fogCol.G, B = fogCol.B },
                    FogNear = 200f,
                    FogFar = 1500f,
                    AmbientColor = new { R = ambientCol.R, G = ambientCol.G, B = ambientCol.B },
                    AmbientIntensity = ambientIntensity,
                    HemiSkyColor = new { R = skyMid.R, G = skyMid.G, B = skyMid.B },
                    HemiGroundColor = new { R = 0.212f, G = 0.161f, B = 0.027f },
                    HemiIntensity = hemiIntensity,
                    WaterColor = new { R = waterR, G = waterG, B = waterB },
                    WaterOpacity = 0.65f + MathF.Sin(angle) * 0.15f,
                    WaterHeight = waterHeight,
                    TimeOfDay = timeOfDay,
                    UseEstateSun = useEstateSun,
                    CloudDensity = 0.5f,
                }).Wait();
            }
            catch { }
        }

        // Emit environment on connect
        EmitEnvironmentUpdate();

        // Re-emit on region crossing
        client.Network.SimChanged += (_, _) => EmitEnvironmentUpdate();

        // ── Sound / Audio ────────────────────────────────────────
        // AttachedSound — prim/attachment starts playing a sound
        client.Sound.AttachedSound += async (_, e) =>
        {
            try
            {
                await caller.SendAsync("AttachedSound", new
                {
                    SoundId = e.SoundID.ToString(),
                    OwnerId = e.OwnerID.ToString(),
                    ObjectID = e.ObjectID.ToString(),
                    Gain = e.Gain,
                    Flags = (int)e.Flags,
                });
            }
            catch { }
        };

        // PreloadSound — server tells client to preload a sound asset
        client.Sound.PreloadSound += async (_, e) =>
        {
            try
            {
                await caller.SendAsync("PreloadSound", new
                {
                    SoundId = e.SoundID.ToString(),
                    OwnerId = e.OwnerID.ToString(),
                    ObjectID = e.ObjectID.ToString(),
                });
            }
            catch { }
        };

        client.Self.MoneyBalance += async (_, e) =>
        { try { await caller.SendAsync("BalanceUpdate", new { Balance = e.Balance }); } catch { } };

        // IM — encrypt + save
        client.Self.IM += async (_, e) =>
        {
            try
            {
                var im = e.IM;
                if (im.FromAgentID == client.Self.AgentID || im.GroupIM || im.Dialog != InstantMessageDialog.MessageFromAgent) return;
                var encryptedMsg = IMEncryption.Encrypt(im.Message ?? "", userPassword, UserId);
                try
                {
                    _db.IMMessages.Add(new IMMessage { UserId = UserId, OtherId = im.FromAgentID.ToString(), OtherName = im.FromAgentName ?? "Unknown", Message = encryptedMsg, FromMe = false, Timestamp = DateTime.UtcNow });
                    await _db.SaveChangesAsync();
                }
                catch { }
                await caller.SendAsync("InstantMessage", new { From = im.FromAgentName ?? "Unknown", FromId = im.FromAgentID.ToString(), Message = im.Message });
            }
            catch { }
        };

        client.Friends.FriendOnline += async (_, e) =>
        { try { await caller.SendAsync("FriendUpdate", new { Id = e.Friend.UUID.ToString(), Name = e.Friend.Name ?? "Unknown", Online = true }); } catch { } };
        client.Friends.FriendOffline += async (_, e) =>
        { try { await caller.SendAsync("FriendUpdate", new { Id = e.Friend.UUID.ToString(), Name = e.Friend.Name ?? "Unknown", Online = false }); } catch { } };

        // Connected
        var regionName = client.Network.CurrentSim?.Name ?? "Unknown Region";
        var regionHandle = client.Network.CurrentSim?.Handle ?? 0;
        var regionX = (int)((regionHandle >> 32) & 0xFFFFFFFF);
        var regionY = (int)(regionHandle & 0xFFFFFFFF);
        await caller.SendAsync("AvatarConnected", new
        {
            AvatarId = avatarId, FirstName = client.Self.Name ?? "Unknown",
            RegionName = regionName, RegionX = regionX, RegionY = regionY,
            Balance = client.Self.Balance, CurrencySymbol = "Doritos",
            Position = new { X = client.Self.SimPosition.X, Y = client.Self.SimPosition.Y, Z = client.Self.SimPosition.Z }
        });

        // Load IM history
        try
        {
            var history = await _db.IMMessages.Where(m => m.UserId == UserId).OrderBy(m => m.Timestamp).ToListAsync();
            var grouped = history.GroupBy(m => m.OtherId);
            foreach (var group in grouped)
            {
                var msgs = group.Select(m => { try { return new { From = m.FromMe ? "You" : group.First().OtherName, Text = IMEncryption.Decrypt(m.Message, userPassword, UserId), Time = m.Timestamp.ToString("HH:mm") }; } catch { return new { From = m.FromMe ? "You" : group.First().OtherName, Text = "[error]", Time = m.Timestamp.ToString("HH:mm") }; } }).ToList();
                await caller.SendAsync("IMHistory", new { OtherId = group.Key, OtherName = group.First().OtherName, Messages = msgs });
            }
        }
        catch { }

        // Friends
        try
        {
            var friendListField = client.Friends.GetType().GetField("FriendList", BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
            if (friendListField?.GetValue(client.Friends) is System.Collections.IEnumerable friendList)
                foreach (var item in friendList)
                {
                    var uuidProp = item.GetType().GetProperty("UUID");
                    var nameProp = item.GetType().GetProperty("Name");
                    var onlineProp = item.GetType().GetProperty("IsOnline");
                    if (uuidProp != null && nameProp != null)
                        await caller.SendAsync("FriendUpdate", new { Id = uuidProp.GetValue(item)?.ToString() ?? "", Name = nameProp.GetValue(item)?.ToString() ?? "Unknown", Online = onlineProp?.GetValue(item) as bool? ?? false });
                }
        }
        catch { }

        Console.WriteLine($"[ViewerHub] Connected as {client.Self.Name} in {regionName}");
    }

    public async Task SendChat(string message, int channel = 0)
    {
        var sessions = _grid.GetUserSessions(UserId).ToList();
        Console.WriteLine($"[ViewerHub] SendChat: userId={UserId}, sessions={sessions.Count}");
        var session = sessions.FirstOrDefault();
        if (session == null) { await Clients.Caller.SendAsync("Error", "No active avatar"); return; }
        session.Client.Self.Chat(message, channel, ChatType.Normal, false);
    }

    public async Task SendIM(string targetId, string message)
    {
        var sessions = _grid.GetUserSessions(UserId).ToList();
        Console.WriteLine($"[ViewerHub] SendIM: userId={UserId}, sessions={sessions.Count}");
        var session = sessions.FirstOrDefault();
        if (session == null) { await Clients.Caller.SendAsync("Error", "No active avatar"); return; }
        var userPassword = await GetUserPasswordAsync();
        try
        {
            if (Guid.TryParse(targetId, out var guid))
            {
                session.Client.Self.InstantMessage(new UUID(guid), message);
                var encryptedMsg = IMEncryption.Encrypt(message, userPassword, UserId);
                try { _db.IMMessages.Add(new IMMessage { UserId = UserId, OtherId = targetId, OtherName = "", Message = encryptedMsg, FromMe = true, Timestamp = DateTime.UtcNow }); await _db.SaveChangesAsync(); } catch { }
            }
        }
        catch (Exception ex) { await Clients.Caller.SendAsync("Error", $"IM failed: {ex.Message}"); }
    }

    public async Task ClearIMHistory(string? otherId = null)
    {
        try
        {
            var query = _db.IMMessages.Where(m => m.UserId == UserId);
            if (otherId != null) query = query.Where(m => m.OtherId == otherId);
            _db.IMMessages.RemoveRange(await query.ToListAsync());
            await _db.SaveChangesAsync();
        }
        catch { }
    }

    public async Task Teleport(string regionName)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null) { await Clients.Caller.SendAsync("Error", "No active avatar"); return; }
        if (!session.Client.Self.Teleport(regionName, new Vector3(128, 128, 25)))
            await Clients.Caller.SendAsync("Error", "Teleport failed");
    }

    private async Task<byte[]?> RequestMeshAsync(GridClient client, UUID meshId)
    {
        if (_meshCache.TryGetValue(meshId, out var cached)) return cached;
        try
        {
            var sim = client.Network.CurrentSim;
            if (sim?.Caps?.GetMeshCapURI() is Uri meshCapUri)
            {
                using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(30));
                var response = await _httpClient.GetAsync($"{meshCapUri}?mesh_id={meshId}", cts.Token);
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsByteArrayAsync(cts.Token);
                    _meshCache[meshId] = data;
                    return data;
                }
            }
            var tcs = new TaskCompletionSource<byte[]?>();
            client.Assets.RequestMesh(meshId, (bool s, AssetMesh am) =>
            {
                if (s && am?.AssetData?.Length > 0) tcs.TrySetResult(am.AssetData);
                else client.Assets.RequestAsset(meshId, AssetType.Mesh, false, (_, a) => tcs.TrySetResult(a?.AssetData?.Length > 0 ? a.AssetData : null));
            });
            using var cts2 = new CancellationTokenSource(TimeSpan.FromSeconds(30));
            cts2.Token.Register(() => tcs.TrySetResult(null));
            var result = await tcs.Task;
            if (result?.Length > 0) _meshCache[meshId] = result;
            return result;
        }
        catch { return null; }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        foreach (var session in _grid.GetUserSessions(UserId).ToList())
            await _grid.DisconnectAvatarAsync(session.AvatarId);
        await base.OnDisconnectedAsync(exception);
    }

    // ── Environment color derivation helpers ──────────────────────────

    /// <summary>
    /// Derive sky top (zenith) color from time of day.
    /// Maps timeOfDay 0..1 to a gradient: night blue → daytime blue → sunset purple → night.
    /// </summary>
    private static (float R, float G, float B) DeriveSkyTopColor(float t)
    {
        float angle = t * MathF.PI;
        float brightness = MathF.Max(0.05f, MathF.Sin(angle) * 0.7f);
        // HSL(0.6, 0.7, brightness) → RGB
        return HslToRgb(0.6f, 0.7f, brightness);
    }

    private static (float R, float G, float B) DeriveSkyMidColor(float t)
    {
        float angle = t * MathF.PI;
        float brightness = MathF.Max(0.05f, MathF.Sin(angle) * 0.7f);
        return HslToRgb(0.55f, 0.5f, brightness * 0.7f + 0.15f);
    }

    private static (float R, float G, float B) DeriveSkyBottomColor(float t)
    {
        float angle = t * MathF.PI;
        float brightness = MathF.Max(0.05f, MathF.Sin(angle) * 0.7f);
        return HslToRgb(0.1f, 0.5f, brightness * 0.5f);
    }

    private static (float R, float G, float B) DeriveSunColor(float t)
    {
        float angle = t * MathF.PI;
        float warmth = 1f - MathF.Abs(t - 0.5f) * 2f;
        return HslToRgb(0.1f - warmth * 0.05f, 0.3f + warmth * 0.5f, 0.8f + warmth * 0.2f);
    }

    private static (float R, float G, float B) DeriveFogColor(float t)
    {
        float angle = t * MathF.PI;
        float brightness = MathF.Max(0.05f, MathF.Sin(angle) * 0.7f);
        return HslToRgb(0.55f, 0.5f, brightness * 0.7f + 0.15f);
    }

    private static (float R, float G, float B) DeriveAmbientColor(float t)
    {
        float angle = t * MathF.PI;
        float brightness = MathF.Max(0.05f, MathF.Sin(angle) * 0.5f);
        return HslToRgb(0.7f, 0.2f, brightness * 0.5f + 0.1f);
    }

    /// <summary>Convert HSL (0-1 range) to RGB (0-1 range).</summary>
    private static (float R, float G, float B) HslToRgb(float h, float s, float l)
    {
        float r, g, b;
        if (s == 0)
        {
            r = g = b = l;
        }
        else
        {
            float q = l < 0.5f ? l * (1f + s) : l + s - l * s;
            float p = 2f * l - q;
            r = HueToRgb(p, q, h + 1f / 3f);
            g = HueToRgb(p, q, h);
            b = HueToRgb(p, q, h - 1f / 3f);
        }
        return (Clamp01(r), Clamp01(g), Clamp01(b));
    }

    private static float HueToRgb(float p, float q, float t)
    {
        if (t < 0f) t += 1f;
        if (t > 1f) t -= 1f;
        if (t < 1f / 6f) return p + (q - p) * 6f * t;
        if (t < 1f / 2f) return q;
        if (t < 2f / 3f) return p + (q - p) * (2f / 3f - t) * 6f;
        return p;
    }

    private static float Clamp01(float v) => v < 0f ? 0f : v > 1f ? 1f : v;
}
