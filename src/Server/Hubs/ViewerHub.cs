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

    public async Task ConnectAvatar(int avatarId, string? gridUrl = null, string? startLocation = null, string? startRegion = null)
    {
        Console.WriteLine($"[ViewerHub] ConnectAvatar: avatarId={avatarId}, grid={gridUrl ?? "default"}, location={startLocation ?? "home"}");

        // Disconnect old session first to avoid "already logged in" error
        var oldSession = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (oldSession != null)
        {
            Console.WriteLine($"[ViewerHub] Disconnecting old session for avatar {oldSession.AvatarId}");
            await _grid.DisconnectAvatarAsync(oldSession.AvatarId);
            await Task.Delay(2000); // Give grid time to process disconnect
        }

        var session = await _grid.ConnectAvatarAsync(UserId, avatarId, gridUrl);
        if (session == null) { await Clients.Caller.SendAsync("Error", "Failed to connect avatar"); return; }

        var caller = Clients.Caller;
        var client = session.Client;
        var sentMeshes = new ConcurrentDictionary<string, bool>();
        var avatarAttachments = new Dictionary<uint, List<OpenMetaverse.Avatar.Attachment>>();
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
                    IsAttachment = prim.IsAttachment,
                    AttachmentPoint = prim.IsAttachment ? (byte)0 : (byte)0, // Will be set below
                    ParentId = prim.ParentID,
                });

                // If it's an attachment, send separate attachment update
                if (prim.IsAttachment && prim.ParentID != 0)
                {
                    try
                    {
                        // Find the attachment point from our tracked avatar attachments
                        byte attachPoint = 0;
                        if (avatarAttachments.TryGetValue(prim.ParentID, out var attList))
                        {
                            foreach (var att in attList)
                            {
                                if (att.AttachmentID == prim.ID)
                                {
                                    attachPoint = att.AttachmentPoint;
                                    break;
                                }
                            }
                        }

                        await caller.SendAsync("AttachmentUpdate", new
                        {
                            AvatarId = prim.ParentID.ToString(),
                            AttachmentPoint = (int)attachPoint,
                            ObjectId = prim.ID.ToString(),
                            ObjectName = prim.Properties?.Name ?? "",
                            Position = new { X = prim.Position.X, Y = prim.Position.Y, Z = prim.Position.Z },
                            Rotation = new { X = prim.Rotation.X, Y = prim.Rotation.Y, Z = prim.Rotation.Z, W = prim.Rotation.W },
                            Scale = new { X = prim.Scale.X, Y = prim.Scale.Y, Z = prim.Scale.Z },
                        });
                    }
                    catch { }
                }

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

        // ── Avatar Animations ──────────────────────────────────

        client.Objects.AvatarUpdate += async (_, e) =>
        {
            if (e.Avatar?.Attachments != null)
                avatarAttachments[e.Avatar.LocalID] = new List<OpenMetaverse.Avatar.Attachment>(e.Avatar.Attachments);
        };

        client.Objects.ObjectAnimation += async (_, e) =>
        {
            try
            {
                var animIds = e.Animations.Select(a => a.AnimationID.ToString()).ToList();
                await caller.SendAsync("ObjectAnimation", new
                {
                    ObjectId = e.ObjectID.ToString(),
                    Animations = animIds,
                });
            }
            catch { }
        };

        client.Self.AnimationsChanged += async (_, e) =>
        {
            try
            {
                var animIds = e.Animations.Keys.Select(id => id.ToString()).ToList();
                await caller.SendAsync("SelfAnimation", new
                {
                    Animations = animIds,
                });
            }
            catch { }
        };

        // ── Groups ──────────────────────────────────────────
        client.Groups.CurrentGroups += async (_, e) =>
        {
            try
            {
                var groups = e.Groups.Select(g => new
                {
                    Id = g.Value.ID.ToString(),
                    Name = g.Value.Name,
                    Title = g.Value.MemberTitle,
                    MemberCount = g.Value.GroupMembershipCount,
                    Motto = g.Value.Charter,
                    Insignia = g.Value.InsigniaID != UUID.Zero ? g.Value.InsigniaID.ToString() : null,
                }).ToList();
                await caller.SendAsync("GroupList", new { Groups = groups });
            }
            catch { }
        };

        client.Self.ChatFromSimulator += async (_, e) =>
        {
            try
            {
                // Only forward group chat (ChatType 1 = whisper, 2 = say, 3 = shout, but group chat is ChatType 4)
                // Actually group chat comes with SourceType == ChatSourceType.Object or through session
                // For now, forward all chat and let the client filter
                if (e.SourceType == ChatSourceType.Agent || e.SourceType == ChatSourceType.Object)
                {
                    await caller.SendAsync("ChatMessage", new
                    {
                        SenderName = e.FromName ?? "Unknown",
                        Message = e.Message,
                        SourceType = (int)e.SourceType,
                        ChatType = (int)e.Type,
                        Position = new { X = e.Position.X, Y = e.Position.Y, Z = e.Position.Z },
                    });
                }
            }
            catch { }
        };

        client.Groups.GroupNoticesListReply += async (_, e) =>
        {
            try
            {
                var notices = e.Notices.Select(n => new
                {
                    Id = n.NoticeID.ToString(),
                    GroupId = e.GroupID.ToString(),
                    Subject = n.Subject,
                    SenderName = n.FromName,
                    Timestamp = n.Timestamp.ToString(),
                    HasAttachment = n.HasAttachment,
                }).ToList();
                await caller.SendAsync("GroupNotices", new { GroupId = e.GroupID.ToString(), Notices = notices });
            }
            catch { }
        };

        // Connected
        var regionName = client.Network.CurrentSim?.Name ?? "Unknown Region";
        var regionHandle = client.Network.CurrentSim?.Handle ?? 0;

        // Send initial inventory root
        try
        {
            var rootFolder = client.Inventory.Store.RootFolder;
            var rootData = SerializeFolder(client, rootFolder);
            await caller.SendAsync("InventoryRoot", rootData);
        }
        catch { }

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
            UUID targetUUID;
            if (Guid.TryParse(targetId, out var guid))
            {
                targetUUID = new UUID(guid);
            }
            else
            {
                // Try to find user by name search
                var search = new DirectoryManager.DirPeopleQuery
                {
                    Query = targetId,
                    QueryFlags = DirectoryManager.DirFlags.People,
                    Page = 0,
                    PageSize = 5
                };
                var results = await Task.Run(() => {
                    var found = new System.Collections.Generic.List<DirectoryManager.AgentSearchResult>();
                    session.Client.Directory.StartPeopleSearch(search, (replyData) =>
                    {
                        found.AddRange(replyData);
                    });
                    Thread.Sleep(2000);
                    return found;
                });
                if (results.Count == 0)
                {
                    await Clients.Caller.SendAsync("Error", $"User '{targetId}' not found");
                    return;
                }
                targetUUID = results[0].AgentID;
                Console.WriteLine($"[ViewerHub] Found user '{targetId}' -> {targetUUID}");
            }
            session.Client.Self.InstantMessage(targetUUID, message);
            var encryptedMsg = IMEncryption.Encrypt(message, userPassword, UserId);
            try { _db.IMMessages.Add(new IMMessage { UserId = UserId, OtherId = targetId, OtherName = "", Message = encryptedMsg, FromMe = true, Timestamp = DateTime.UtcNow }); await _db.SaveChangesAsync(); } catch { }
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

    // ── Object Interaction Hub Methods ────────────────────────

    /// <summary>
    /// Request to sit on an object. Client sends objectId, server calls RequestSit.
    /// </summary>
    public async Task RequestSit(string avatarIdStr, string objectIdStr)
    {
        try
        {
            if (!Guid.TryParse(objectIdStr, out var objGuid)) return;
            var objectId = new UUID(objGuid);

            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;

            session.Client.Self.RequestSit(objectId, Vector3.Zero);
        }
        catch { }
    }

    /// <summary>
    /// Stand up from current sit target.
    /// </summary>
    public async Task StandUp()
    {
        try
        {
            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;

            session.Client.Self.Sit();
        }
        catch { }
    }

    /// <summary>
    /// Touch (click) an object.
    /// </summary>
    public async Task TouchObject(string objectIdStr)
    {
        try
        {
            if (!uint.TryParse(objectIdStr, out var objectId)) return;

            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;

            session.Client.Self.Touch(objectId);
        }
        catch { }
    }

    /// <summary>
    /// Fetch avatar profile data and send it back to the caller.
    /// Called by the client via connection.invoke('RequestProfile', avatarId).
    /// </summary>
    public async Task RequestProfile(string avatarIdStr)
    {
        var caller = Clients.Caller;
        try
        {
            if (!Guid.TryParse(avatarIdStr, out var guid)) return;
            var avatarId = new UUID(guid);

            // Get the session for this user
            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            // Request properties (callback-based, use ManualResetEvent)
            var received = new ManualResetEventSlim(false);
            OpenMetaverse.Avatar.AvatarProperties? props = null;

            void OnProperties(object? s, AvatarPropertiesReplyEventArgs e)
            {
                if (e.AvatarID == avatarId)
                {
                    props = e.Properties;
                    received.Set();
                }
            }

            client.Avatars.AvatarPropertiesReply += OnProperties;
            client.Avatars.RequestAvatarProperties(avatarId);

            // Wait up to 5 seconds
            received.Wait(5000);
            client.Avatars.AvatarPropertiesReply -= OnProperties;

            if (props.HasValue)
            {
                var p = props.Value;
                var profileImage = p.ProfileImage != UUID.Zero ? p.ProfileImage.ToString() : null;
                await caller.SendAsync("ProfileData", new
                {
                    AvatarId = avatarId.ToString(),
                    ProfileImage = profileImage,
                    About = p.AboutText,
                    BornOn = p.BornOn,
                    MemberSince = p.BornOn,
                });
            }
        }
        catch { }
    }

    /// <summary>
    /// Update a visual param on the server.
    /// Note: LibreMetaverse doesn't expose SetVisualParam directly,
    /// so we trigger a full appearance update after param changes.
    /// </summary>
    public async Task SetVisualParam(int paramId, float value)
    {
        // Visual params require low-level packet handling.
        // For now, the client tracks params locally and sends them on bake.
    }

    /// <summary>
    /// Bake avatar appearance and send updated textures.
    /// </summary>
    public async Task BakeAppearance()
    {
        try
        {
            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            client.Appearance.RequestSetAppearance(true);
        }
        catch { }
    }

    // ── Script Hub Methods ──────────────────────────────────

    /// <summary>
    /// Update/upload a script.
    /// </summary>
    public async Task UpdateScript(string itemID, string scriptBody, bool mono)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null) return;
        try
        {
            var id = OpenMetaverse.UUID.Parse(itemID);
            var data = System.Text.Encoding.UTF8.GetBytes(scriptBody);
            var caller = Clients.Caller;
            session.Client.Inventory.RequestUpdateScriptAgentInventory(data, id, mono,
                (uploadSuccess, status, compileSuccess, messages, itemID2, assetID) =>
                {
                    var compileMessages = new List<string>();
                    if (messages != null) compileMessages.AddRange(messages);
                    caller.SendAsync("ScriptCompileResult", new
                    {
                        UploadSuccess = uploadSuccess,
                        Status = status,
                        CompileSuccess = compileSuccess,
                        Messages = compileMessages,
                        ItemID = itemID2.ToString(),
                        AssetID = assetID.ToString(),
                    }).Wait();
                });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"UpdateScript error: {ex.Message}");
        }
    }

    /// <summary>
    /// Set script running state.
    /// </summary>
    public void SetScriptRunning(string objectID, string scriptID, bool running)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null) return;
        try
        {
            session.Client.Inventory.RequestSetScriptRunning(
                OpenMetaverse.UUID.Parse(objectID),
                OpenMetaverse.UUID.Parse(scriptID),
                running);
        }
        catch { }
    }

    // ── Search Hub Methods ────────────────────────────────────

    /// <summary>
    /// Search for people by name.
    /// </summary>
    public async Task SearchPeople(string query)
    {
        var caller = Clients.Caller;
        try
        {
            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            var results = new List<object>();
            var received = new ManualResetEventSlim(false);

            void OnPeopleReply(object? s, DirPeopleReplyEventArgs e)
            {
                try
                {
                    foreach (var person in e.MatchedPeople)
                    {
                        results.Add(new
                        {
                            Id = person.AgentID.ToString(),
                            Name = $"{person.FirstName} {person.LastName}",
                            Online = person.Online,
                            Category = "people",
                        });
                    }
                }
                catch { }
                received.Set();
            }

            client.Directory.DirPeopleReply += OnPeopleReply;
            client.Directory.StartPeopleSearch(query, 0);
            received.Wait(5000);
            client.Directory.DirPeopleReply -= OnPeopleReply;

            await caller.SendAsync("SearchResults", new { Category = "people", Results = results });
        }
        catch { }
    }

    /// <summary>
    /// Search for places.
    /// </summary>
    public async Task SearchPlaces(string query)
    {
        var caller = Clients.Caller;
        try
        {
            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            var results = new List<object>();
            var received = new ManualResetEventSlim(false);

            void OnPlacesReply(object? s, DirPlacesReplyEventArgs e)
            {
                try
                {
                    foreach (var place in e.MatchedParcels)
                    {
                        results.Add(new
                        {
                            Id = place.ID.ToString(),
                            Name = place.Name,
                            Price = place.SalePrice,
                            Category = "places",
                        });
                    }
                }
                catch { }
                received.Set();
            }

            client.Directory.DirPlacesReply += OnPlacesReply;
            client.Directory.StartDirPlacesSearch(query, 0);
            received.Wait(5000);
            client.Directory.DirPlacesReply -= OnPlacesReply;

            await caller.SendAsync("SearchResults", new { Category = "places", Results = results });
        }
        catch { }
    }

    /// <summary>
    /// Search for events.
    /// </summary>
    public async Task SearchEvents(string query)
    {
        var caller = Clients.Caller;
        try
        {
            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            var results = new List<object>();
            var received = new ManualResetEventSlim(false);

            void OnEventsReply(object? s, DirEventsReplyEventArgs e)
            {
                try
                {
                    foreach (var evt in e.MatchedEvents)
                    {
                        results.Add(new
                        {
                            Id = evt.ID.ToString(),
                            Name = evt.Name,
                            Date = evt.Date,
                            Category = "events",
                        });
                    }
                }
                catch { }
                received.Set();
            }

            client.Directory.DirEventsReply += OnEventsReply;
            client.Directory.StartEventsSearch(query, 0);
            received.Wait(5000);
            client.Directory.DirEventsReply -= OnEventsReply;

            await caller.SendAsync("SearchResults", new { Category = "events", Results = results });
        }
        catch { }
    }

    /// <summary>
    /// Search for groups.
    /// </summary>
    public async Task SearchGroups(string query)
    {
        var caller = Clients.Caller;
        try
        {
            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            var results = new List<object>();
            var received = new ManualResetEventSlim(false);

            void OnGroupsReply(object? s, DirGroupsReplyEventArgs e)
            {
                try
                {
                    foreach (var group in e.MatchedGroups)
                    {
                        results.Add(new
                        {
                            Id = group.GroupID.ToString(),
                            Name = group.GroupName,
                            Description = $"{group.Members} members",
                            Category = "groups",
                        });
                    }
                }
                catch { }
                received.Set();
            }

            client.Directory.DirGroupsReply += OnGroupsReply;
            client.Directory.StartGroupSearch(query, 0);
            received.Wait(5000);
            client.Directory.DirGroupsReply -= OnGroupsReply;

            await caller.SendAsync("SearchResults", new { Category = "groups", Results = results });
        }
        catch { }
    }

    /// <summary>
    /// Search for classifieds.
    /// </summary>
    public async Task SearchClassifieds(string query)
    {
        var caller = Clients.Caller;
        try
        {
            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            var results = new List<object>();
            var received = new ManualResetEventSlim(false);

            void OnClassifiedsReply(object? s, DirClassifiedsReplyEventArgs e)
            {
                try
                {
                    foreach (var classified in e.Classifieds)
                    {
                        results.Add(new
                        {
                            Id = classified.ID.ToString(),
                            Name = classified.Name,
                            Price = classified.Price,
                            Category = "classifieds",
                        });
                    }
                }
                catch { }
                received.Set();
            }

            client.Directory.DirClassifiedsReply += OnClassifiedsReply;
            client.Directory.StartClassifiedSearch(query);
            received.Wait(5000);
            client.Directory.DirClassifiedsReply -= OnClassifiedsReply;

            await caller.SendAsync("SearchResults", new { Category = "classifieds", Results = results });
        }
        catch { }
    }

    // ── Inventory Hub Methods ────────────────────────────────

    /// <summary>
    /// Expand a folder and return its children + items.
    /// </summary>
    public async Task ExpandFolder(string folderIdStr)
    {
        var caller = Clients.Caller;
        try
        {
            if (!Guid.TryParse(folderIdStr, out var folderGuid)) return;
            var folderId = new UUID(folderGuid);

            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            var contents = client.Inventory.Store.GetContents(folderId);
            var folders = new List<object>();
            var items = new List<object>();

            foreach (var child in contents)
            {
                if (child is OpenMetaverse.InventoryFolder folder)
                {
                    folders.Add(new
                    {
                        Id = folder.UUID.ToString(),
                        ParentId = folder.ParentUUID.ToString(),
                        Name = folder.Name,
                        Type = folder.PreferredType.ToString(),
                        ChildCount = folder.DescendentCount,
                    });
                }
                else if (child is OpenMetaverse.InventoryItem item)
                {
                    items.Add(new
                    {
                        Id = item.UUID.ToString(),
                        ParentId = item.ParentUUID.ToString(),
                        Name = item.Name,
                        Description = item.Description,
                        AssetType = item.AssetType.ToString(),
                        InventoryType = item.InventoryType.ToString(),
                    });
                }
            }

            await caller.SendAsync("FolderExpanded", new
            {
                FolderId = folderIdStr,
                Folders = folders,
                Items = items,
            });
        }
        catch { }
    }

    /// <summary>
    /// Rez an inventory object into the world.
    /// </summary>
    public async Task RezObject(string itemIdStr)
    {
        try
        {
            if (!Guid.TryParse(itemIdStr, out var itemGuid)) return;
            var itemId = new UUID(itemGuid);

            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            var item = client.Inventory.Store[itemId] as OpenMetaverse.InventoryItem;
            if (item == null) return;

            var sim = client.Network.CurrentSim;
            if (sim == null) return;

            var pos = client.Self.SimPosition + new Vector3(1, 0, 0);
            client.Inventory.RequestRezFromInventory(sim, Quaternion.Identity, pos, item);
        }
        catch { }
    }

    /// <summary>
    /// DeRez (take back) an object to inventory.
    /// </summary>
    public async Task TakeObject(uint objectLocalId)
    {
        try
        {
            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            client.Inventory.RequestDeRezToInventory(objectLocalId);
        }
        catch { }
    }

    /// <summary>
    /// Wear a clothing/body item.
    /// </summary>
    public async Task WearItem(string itemIdStr)
    {
        try
        {
            if (!Guid.TryParse(itemIdStr, out var itemGuid)) return;
            var itemId = new UUID(itemGuid);

            var sessions = _grid.GetUserSessions(UserId);
            var session = sessions.FirstOrDefault();
            if (session?.Client == null) return;
            var client = session.Client;

            var item = client.Inventory.Store[itemId] as OpenMetaverse.InventoryItem;
            if (item == null) return;

            var items = new List<OpenMetaverse.InventoryBase> { item };
            client.Appearance.WearOutfit(items, true);
        }
        catch { }
    }

    private static object SerializeFolder(OpenMetaverse.GridClient client, OpenMetaverse.InventoryFolder folder)
    {
        var childFolders = new List<object>();
        var childItems = new List<object>();

        var contents = client.Inventory.Store.GetContents(folder.UUID);
        foreach (var child in contents)
        {
            if (child is OpenMetaverse.InventoryFolder subFolder)
            {
                childFolders.Add(new
                {
                    Id = subFolder.UUID.ToString(),
                    ParentId = subFolder.ParentUUID.ToString(),
                    Name = subFolder.Name,
                    Type = subFolder.PreferredType.ToString(),
                    ChildCount = subFolder.DescendentCount,
                });
            }
            else if (child is OpenMetaverse.InventoryItem item)
            {
                childItems.Add(new
                {
                    Id = item.UUID.ToString(),
                    ParentId = item.ParentUUID.ToString(),
                    Name = item.Name,
                    Description = item.Description,
                    AssetType = item.AssetType.ToString(),
                    InventoryType = item.InventoryType.ToString(),
                });
            }
        }

        return new
        {
            Id = folder.UUID.ToString(),
            ParentId = folder.ParentUUID.ToString(),
            Name = folder.Name,
            Type = folder.PreferredType.ToString(),
            ChildCount = folder.DescendentCount,
            Children = childFolders,
            Items = childItems,
        };
    }
}
