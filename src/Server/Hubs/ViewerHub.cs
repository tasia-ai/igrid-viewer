using System.Collections.Concurrent;
using System.Net.Http;
using System.Security.Claims;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using OpenMetaverse;
using OpenMetaverse.Assets;
using IGrid.Server.Services;

namespace IGrid.Server.Hubs;

[Authorize]
public class ViewerHub : Hub
{
    private readonly GridConnectionService _grid;
    private static readonly HttpClient _httpClient = new();
    private static readonly ConcurrentDictionary<UUID, byte[]> _meshCache = new();

    public ViewerHub(GridConnectionService grid) { _grid = grid; }

    private int UserId => int.Parse(
        Context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

    public async Task ConnectAvatar(int avatarId)
    {
        Console.WriteLine($"[ViewerHub] ConnectAvatar: avatarId={avatarId}");
        var session = await _grid.ConnectAvatarAsync(UserId, avatarId);
        if (session == null)
        {
            await Clients.Caller.SendAsync("Error", "Failed to connect avatar");
            return;
        }

        var caller = Clients.Caller;
        var client = session.Client;

        // Track which mesh IDs have already been sent to this client
        var sentMeshes = new System.Collections.Concurrent.ConcurrentDictionary<string, bool>();

        // Object updates
        client.Objects.ObjectUpdate += async (_, e) =>
        {
            try
            {
                var prim = e.Prim;

                string? defaultTextureId = null;
                if (prim.Textures?.DefaultTexture?.TextureID != null &&
                    prim.Textures.DefaultTexture.TextureID != UUID.Zero)
                    defaultTextureId = prim.Textures.DefaultTexture.TextureID.ToString();

                var faceTextures = new object[6];
                for (int i = 0; i < 6; i++)
                {
                    var face = prim.Textures?.GetFace((uint)i);
                    if (face != null && face.Valid && face.TextureID != UUID.Zero)
                        faceTextures[i] = new { TextureId = face.TextureID.ToString(), RepeatU = face.RepeatU, RepeatV = face.RepeatV, OffsetU = face.OffsetU, OffsetV = face.OffsetV, Rotation = face.Rotation };
                    else
                        faceTextures[i] = null;
                }

                await caller.SendAsync("ObjectUpdate", new
                {
                    Id = prim.ID.ToString(),
                    Name = prim.Properties?.Name ?? "",
                    Position = new { X = prim.Position.X, Y = prim.Position.Y, Z = prim.Position.Z },
                    Rotation = new { X = prim.Rotation.X, Y = prim.Rotation.Y, Z = prim.Rotation.Z, W = prim.Rotation.W },
                    Scale = new { X = prim.Scale.X, Y = prim.Scale.Y, Z = prim.Scale.Z },
                    PrimType = (int)prim.Type,
                    TextureId = defaultTextureId,
                    Faces = faceTextures,
                    ProfileCurve = (int)prim.PrimData.ProfileCurve,
                    PathCurve = (int)prim.PrimData.PathCurve,
                    ProfileBegin = prim.PrimData.ProfileBegin,
                    ProfileEnd = prim.PrimData.ProfileEnd,
                    ProfileHollow = prim.PrimData.ProfileHollow,
                    PathBegin = prim.PrimData.PathBegin,
                    PathEnd = prim.PrimData.PathEnd,
                    PathScaleX = prim.PrimData.PathScaleX,
                    PathScaleY = prim.PrimData.PathScaleY,
                    PathTaperX = prim.PrimData.PathTaperX,
                    PathTaperY = prim.PrimData.PathTaperY,
                    PathTwist = prim.PrimData.PathTwist,
                    PathTwistBegin = prim.PrimData.PathTwistBegin,
                    PathRevolutions = prim.PrimData.PathRevolutions,
                });

                // Fetch mesh ONLY if not already sent to this client
                if (prim.Type == PrimType.Mesh && prim.Sculpt?.SculptTexture != UUID.Zero)
                {
                    var meshId = prim.Sculpt.SculptTexture;
                    var meshKey = meshId.ToString();

                    if (sentMeshes.TryAdd(meshKey, true))
                        try
                        {
                            var meshData = await RequestMeshAsync(client, meshId);
                            if (meshData != null && meshData.Length > 0)
                            {
                                await caller.SendAsync("MeshData", new
                                {
                                    Id = prim.ID.ToString(),
                                    Data = Convert.ToBase64String(meshData)
                                });
                                Console.WriteLine($"[ViewerHub] Sent mesh {meshKey}: {meshData.Length} bytes");
                            }
                        }
                        catch (Exception ex) { Console.WriteLine($"[ViewerHub] Mesh error: {ex.Message}"); }
                }
            }
            catch (Exception ex) { Console.WriteLine($"[ViewerHub] ObjectUpdate error: {ex.Message}"); }
        };

        // Avatar updates
        client.Objects.AvatarUpdate += async (_, e) =>
        {
            if (e.Avatar == null) return;
            try
            {
                await caller.SendAsync("AvatarUpdate", new
                {
                    Id = e.Avatar.ID.ToString(),
                    Name = e.Avatar.Name ?? "Unknown",
                    Position = new { X = e.Avatar.Position.X, Y = e.Avatar.Position.Y, Z = e.Avatar.Position.Z },
                    Rotation = new { X = e.Avatar.Rotation.X, Y = e.Avatar.Rotation.Y, Z = e.Avatar.Rotation.Z, W = e.Avatar.Rotation.W }
                });
            }
            catch { }
        };

        // Terrain
        client.Terrain.LandPatchReceived += async (_, e) =>
        {
            try { await caller.SendAsync("TerrainPatch", new { X = e.X, Y = e.Y, PatchSize = e.PatchSize, Heights = e.HeightMap }); }
            catch { }
        };

        // Chat
        client.Self.ChatFromSimulator += async (_, e) =>
        {
            try { await caller.SendAsync("ChatMessage", new { From = e.FromName ?? "Unknown", Message = e.Message, Type = (int)e.Type }); }
            catch { }
        };

        // Parcel info updates
        client.Parcels.ParcelProperties += async (_, e) =>
        {
            try
            {
                var parcel = client.Parcels.CurrentParcel;
                if (parcel != null)
                {
                    await caller.SendAsync("ParcelInfo", new
                    {
                        Name = parcel.Name ?? "Unnamed",
                        Owner = parcel.OwnerID.ToString(),
                        Area = parcel.Area,
                        Auction = parcel.AuctionID,
                        SalePrice = parcel.SalePrice,
                    });
                }
            }
            catch { }
        };

        // Balance updates
        client.Self.MoneyBalance += async (_, e) =>
        {
            try { await caller.SendAsync("BalanceUpdate", new { Balance = e.Balance }); }
            catch { }
        };

        // IM
        client.Self.IM += async (_, e) =>
        {
            try
            {
                var im = e.IM;
                if (im.FromAgentID == client.Self.AgentID) return;
                if (im.GroupIM) return;
                if (im.Dialog != InstantMessageDialog.MessageFromAgent) return;
                await caller.SendAsync("InstantMessage", new { From = im.FromAgentName ?? "Unknown", FromId = im.FromAgentID.ToString(), Message = im.Message });
            }
            catch { }
        };

        // Friends
        client.Friends.FriendOnline += async (_, e) =>
        {
            try { await caller.SendAsync("FriendUpdate", new { Id = e.Friend.UUID.ToString(), Name = e.Friend.Name ?? "Unknown", Online = true }); }
            catch { }
        };
        client.Friends.FriendOffline += async (_, e) =>
        {
            try { await caller.SendAsync("FriendUpdate", new { Id = e.Friend.UUID.ToString(), Name = e.Friend.Name ?? "Unknown", Online = false }); }
            catch { }
        };

        // Connected
        var regionName = client.Network.CurrentSim?.Name ?? "Unknown Region";
        var regionHandle = client.Network.CurrentSim?.Handle ?? 0;
        var regionX = (int)((regionHandle >> 32) & 0xFFFFFFFF);
        var regionY = (int)(regionHandle & 0xFFFFFFFF);
        await caller.SendAsync("AvatarConnected", new
        {
            AvatarId = avatarId,
            FirstName = client.Self.Name ?? "Unknown",
            RegionName = regionName,
            RegionX = regionX,
            RegionY = regionY,
            Position = new { X = client.Self.SimPosition.X, Y = client.Self.SimPosition.Y, Z = client.Self.SimPosition.Z }
        });

        // Friends list
        try
        {
            var friendListField = client.Friends.GetType().GetField("FriendList", BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
            if (friendListField != null)
            {
                var friendList = friendListField.GetValue(client.Friends) as System.Collections.IEnumerable;
                if (friendList != null)
                {
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
        }
        catch (Exception ex) { Console.WriteLine($"[ViewerHub] Friends error: {ex.Message}"); }

        Console.WriteLine($"[ViewerHub] Connected as {client.Self.Name} in {regionName}");
    }

    private async Task<byte[]?> RequestMeshAsync(GridClient client, UUID meshId)
    {
        // Check global cache first
        if (_meshCache.TryGetValue(meshId, out var cached))
        {
            Console.WriteLine($"[ViewerHub] Mesh cache hit: {meshId}");
            return cached;
        }

        try
        {
            // Try HTTP capability first (like Firestorm)
            var sim = client.Network.CurrentSim;
            if (sim?.Caps != null)
            {
                var meshCapUri = sim.Caps.GetMeshCapURI();
                if (meshCapUri != null)
                {
                    var url = $"{meshCapUri}?mesh_id={meshId}";
                    using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(30));
                    var response = await _httpClient.GetAsync(url, cts.Token);
                    if (response.IsSuccessStatusCode)
                    {
                        var data = await response.Content.ReadAsByteArrayAsync(cts.Token);
                        _meshCache[meshId] = data;
                        Console.WriteLine($"[ViewerHub] Mesh via cap: {data.Length} bytes");
                        return data;
                    }
                    Console.WriteLine($"[ViewerHub] GetMesh cap: {(int)response.StatusCode}");
                }
            }

            // Fallback: RequestMesh (UDP)
            var tcs = new TaskCompletionSource<byte[]?>();
            client.Assets.RequestMesh(meshId, (bool success, AssetMesh assetMesh) =>
            {
                if (success && assetMesh?.AssetData != null && assetMesh.AssetData.Length > 0)
                    tcs.TrySetResult(assetMesh.AssetData);
                else
                {
                    client.Assets.RequestAsset(meshId, AssetType.Mesh, false,
                        (AssetDownload transfer, Asset asset) =>
                        {
                            tcs.TrySetResult(asset?.AssetData?.Length > 0 ? asset.AssetData : null);
                        });
                }
            });

            using var cts2 = new CancellationTokenSource(TimeSpan.FromSeconds(30));
            cts2.Token.Register(() => tcs.TrySetResult(null));
            var result = await tcs.Task;
            if (result != null && result.Length > 0)
                _meshCache[meshId] = result;
            return result;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ViewerHub] RequestMesh error: {ex.Message}");
            return null;
        }
    }

    public async Task SendChat(string message, int channel = 0)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null) { await Clients.Caller.SendAsync("Error", "No active avatar"); return; }
        session.Client.Self.Chat(message, channel, ChatType.Normal, false);
    }

    public async Task Teleport(string regionName)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null) { await Clients.Caller.SendAsync("Error", "No active avatar"); return; }
        var success = session.Client.Self.Teleport(regionName, new Vector3(128, 128, 25));
        if (!success) await Clients.Caller.SendAsync("Error", "Teleport failed");
    }

    public async Task SendIM(string targetId, string message)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null) { await Clients.Caller.SendAsync("Error", "No active avatar"); return; }
        try { if (Guid.TryParse(targetId, out var guid)) session.Client.Self.InstantMessage(new UUID(guid), message); }
        catch (Exception ex) { await Clients.Caller.SendAsync("Error", $"IM failed: {ex.Message}"); }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var sessions = _grid.GetUserSessions(UserId).ToList();
        foreach (var session in sessions)
            await _grid.DisconnectAvatarAsync(session.AvatarId);
        await base.OnDisconnectedAsync(exception);
    }
}
