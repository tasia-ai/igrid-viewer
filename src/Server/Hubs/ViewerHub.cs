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

    private int UserId => int.Parse(
        Context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

    /// <summary>
    /// Get user's password for IM encryption (from JWT claim or DB).
    /// </summary>
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

        // Object updates
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
                    ProfileCurve = (int)prim.PrimData.ProfileCurve, PathCurve = (int)prim.PrimData.PathCurve,
                    ProfileBegin = prim.PrimData.ProfileBegin, ProfileEnd = prim.PrimData.ProfileEnd,
                    ProfileHollow = prim.PrimData.ProfileHollow,
                    PathBegin = prim.PrimData.PathBegin, PathEnd = prim.PrimData.PathEnd,
                    PathScaleX = prim.PrimData.PathScaleX, PathScaleY = prim.PrimData.PathScaleY,
                    PathTaperX = prim.PrimData.PathTaperX, PathTaperY = prim.PrimData.PathTaperY,
                    PathTwist = prim.PrimData.PathTwist, PathTwistBegin = prim.PrimData.PathTwistBegin,
                    PathRevolutions = prim.PrimData.PathRevolutions,
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
            }
            catch { }
        };

        client.Objects.AvatarUpdate += async (_, e) =>
        {
            if (e.Avatar == null) return;
            try { await caller.SendAsync("AvatarUpdate", new { Id = e.Avatar.ID.ToString(), Name = e.Avatar.Name ?? "Unknown", Position = new { X = e.Avatar.Position.X, Y = e.Avatar.Position.Y, Z = e.Avatar.Position.Z }, Rotation = new { X = e.Avatar.Rotation.X, Y = e.Avatar.Rotation.Y, Z = e.Avatar.Rotation.Z, W = e.Avatar.Rotation.W } }); } catch { }
        };

        client.Terrain.LandPatchReceived += async (_, e) =>
        { try { await caller.SendAsync("TerrainPatch", new { X = e.X, Y = e.Y, PatchSize = e.PatchSize, Heights = e.HeightMap }); } catch { } };

        client.Self.ChatFromSimulator += async (_, e) =>
        { try { await caller.SendAsync("ChatMessage", new { From = e.FromName ?? "Unknown", Message = e.Message, Type = (int)e.Type }); } catch { } };

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

        client.Self.MoneyBalance += async (_, e) =>
        { try { await caller.SendAsync("BalanceUpdate", new { Balance = e.Balance }); } catch { } };

        // IM receive — ENCRYPT + SAVE
        client.Self.IM += async (_, e) =>
        {
            try
            {
                var im = e.IM;
                if (im.FromAgentID == client.Self.AgentID) return;
                if (im.GroupIM) return;
                if (im.Dialog != InstantMessageDialog.MessageFromAgent) return;

                var fromName = im.FromAgentName ?? "Unknown";
                var fromId = im.FromAgentID.ToString();
                var msg = im.Message ?? "";

                // Encrypt message
                var encryptedMsg = IMEncryption.Encrypt(msg, userPassword, UserId);

                try
                {
                    _db.IMMessages.Add(new IMMessage
                    {
                        UserId = UserId, OtherId = fromId, OtherName = fromName,
                        Message = encryptedMsg, FromMe = false, Timestamp = DateTime.UtcNow
                    });
                    await _db.SaveChangesAsync();
                }
                catch (Exception ex) { Console.WriteLine($"[ViewerHub] IM save error: {ex.Message}"); }

                await caller.SendAsync("InstantMessage", new { From = fromName, FromId = fromId, Message = msg });
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

        // Load IM history — DECRYPT
        try
        {
            var history = await _db.IMMessages
                .Where(m => m.UserId == UserId)
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            Console.WriteLine($"[ViewerHub] Loading {history.Count} encrypted IM messages");

            var grouped = history.GroupBy(m => m.OtherId);
            foreach (var group in grouped)
            {
                var otherId = group.Key;
                var otherName = group.First().OtherName;
                var msgs = group.Select(m =>
                {
                    try { return new { From = m.FromMe ? "You" : otherName, Text = IMEncryption.Decrypt(m.Message, userPassword, UserId), Time = m.Timestamp.ToString("HH:mm") }; }
                    catch { return new { From = m.FromMe ? "You" : otherName, Text = "[decryption error]", Time = m.Timestamp.ToString("HH:mm") }; }
                }).ToList();

                await caller.SendAsync("IMHistory", new { OtherId = otherId, OtherName = otherName, Messages = msgs });
            }
        }
        catch (Exception ex) { Console.WriteLine($"[ViewerHub] IM history error: {ex.Message}"); }

        // Friends
        try
        {
            var friendListField = client.Friends.GetType().GetField("FriendList", BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
            if (friendListField != null)
            {
                var friendList = friendListField.GetValue(client.Friends) as System.Collections.IEnumerable;
                if (friendList != null)
                    foreach (var item in friendList)
                    {
                        var uuidProp = item.GetType().GetProperty("UUID");
                        var nameProp = item.GetType().GetProperty("Name");
                        var onlineProp = item.GetType().GetProperty("IsOnline");
                        if (uuidProp != null && nameProp != null)
                            await caller.SendAsync("FriendUpdate", new { Id = uuidProp.GetValue(item)?.ToString() ?? "", Name = nameProp.GetValue(item)?.ToString() ?? "Unknown", Online = onlineProp?.GetValue(item) as bool? ?? false });
                    }
            }
        }
        catch { }

        Console.WriteLine($"[ViewerHub] Connected as {client.Self.Name} in {regionName}");
    }

    public async Task SendChat(string message, int channel = 0)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null) { await Clients.Caller.SendAsync("Error", "No active avatar"); return; }
        session.Client.Self.Chat(message, channel, ChatType.Normal, false);
    }

    public async Task SendIM(string targetId, string message)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null) { await Clients.Caller.SendAsync("Error", "No active avatar"); return; }

        var userPassword = await GetUserPasswordAsync();

        try
        {
            if (Guid.TryParse(targetId, out var guid))
            {
                session.Client.Self.InstantMessage(new UUID(guid), message);

                // Encrypt and save
                var encryptedMsg = IMEncryption.Encrypt(message, userPassword, UserId);
                try
                {
                    _db.IMMessages.Add(new IMMessage
                    {
                        UserId = UserId, OtherId = targetId, OtherName = "",
                        Message = encryptedMsg, FromMe = true, Timestamp = DateTime.UtcNow
                    });
                    await _db.SaveChangesAsync();
                }
                catch (Exception ex) { Console.WriteLine($"[ViewerHub] IM save error: {ex.Message}"); }
            }
        }
        catch (Exception ex) { await Clients.Caller.SendAsync("Error", $"IM failed: {ex.Message}"); }
    }

    /// <summary>
    /// Clear IM history for a specific conversation or all.
    /// </summary>
    public async Task ClearIMHistory(string? otherId = null)
    {
        try
        {
            if (otherId != null)
            {
                // Clear specific conversation
                var messages = await _db.IMMessages
                    .Where(m => m.UserId == UserId && m.OtherId == otherId)
                    .ToListAsync();
                _db.IMMessages.RemoveRange(messages);
            }
            else
            {
                // Clear all IM history
                var messages = await _db.IMMessages
                    .Where(m => m.UserId == UserId)
                    .ToListAsync();
                _db.IMMessages.RemoveRange(messages);
            }
            await _db.SaveChangesAsync();
            Console.WriteLine($"[ViewerHub] Cleared IM history for user {UserId}" + (otherId != null ? $" with {otherId}" : ""));
        }
        catch (Exception ex) { Console.WriteLine($"[ViewerHub] Clear IM error: {ex.Message}"); }
    }

    public async Task Teleport(string regionName)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null) { await Clients.Caller.SendAsync("Error", "No active avatar"); return; }
        var success = session.Client.Self.Teleport(regionName, new Vector3(128, 128, 25));
        if (!success) await Clients.Caller.SendAsync("Error", "Teleport failed");
    }

    private async Task<byte[]?> RequestMeshAsync(GridClient client, UUID meshId)
    {
        if (_meshCache.TryGetValue(meshId, out var cached)) return cached;
        try
        {
            var sim = client.Network.CurrentSim;
            if (sim?.Caps != null)
            {
                var meshCapUri = sim.Caps.GetMeshCapURI();
                if (meshCapUri != null)
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
            }
            var tcs = new TaskCompletionSource<byte[]?>();
            client.Assets.RequestMesh(meshId, (bool s, AssetMesh am) =>
            {
                if (s && am?.AssetData?.Length > 0) tcs.TrySetResult(am.AssetData);
                else client.Assets.RequestAsset(meshId, AssetType.Mesh, false, (AssetDownload tr, Asset a) => tcs.TrySetResult(a?.AssetData?.Length > 0 ? a.AssetData : null));
            });
            using var cts2 = new CancellationTokenSource(TimeSpan.FromSeconds(30));
            cts2.Token.Register(() => tcs.TrySetResult(null));
            var result = await tcs.Task;
            if (result != null && result.Length > 0) _meshCache[meshId] = result;
            return result;
        }
        catch { return null; }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var sessions = _grid.GetUserSessions(UserId).ToList();
        foreach (var session in sessions)
            await _grid.DisconnectAvatarAsync(session.AvatarId);
        await base.OnDisconnectedAsync(exception);
    }
}
