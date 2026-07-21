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

        // Object updates — send correct PrimType + texture faces
        client.Objects.ObjectUpdate += async (_, e) =>
        {
            try
            {
                var prim = e.Prim;

                // Extract all 6 face textures
                var faceTextures = new object[6];
                for (int i = 0; i < 6; i++)
                {
                    var face = prim.Textures?.GetFace((uint)i);
                    if (face != null && face.Valid && face.TextureID != UUID.Zero)
                    {
                        faceTextures[i] = new
                        {
                            TextureId = face.TextureID.ToString(),
                            RepeatU = face.RepeatU,
                            RepeatV = face.RepeatV,
                            OffsetU = face.OffsetU,
                            OffsetV = face.OffsetV,
                            Rotation = face.Rotation,
                        };
                    }
                    else
                    {
                        faceTextures[i] = null;
                    }
                }

                // Default texture (face 0)
                string? defaultTextureId = null;
                if (prim.Textures?.DefaultTexture?.TextureID != null &&
                    prim.Textures.DefaultTexture.TextureID != UUID.Zero)
                    defaultTextureId = prim.Textures.DefaultTexture.TextureID.ToString();

                await caller.SendAsync("ObjectUpdate", new
                {
                    Id = prim.ID.ToString(),
                    Name = prim.Properties?.Name ?? "",
                    Position = new { X = prim.Position.X, Y = prim.Position.Y, Z = prim.Position.Z },
                    Rotation = new { X = prim.Rotation.X, Y = prim.Rotation.Y, Z = prim.Rotation.Z, W = prim.Rotation.W },
                    Scale = new { X = prim.Scale.X, Y = prim.Scale.Y, Z = prim.Scale.Z },
                    // Correct: PrimType (Box=1, Cylinder=2, Prism=3, Sphere=4, Torus=5, Tube=6, Ring=7, Sculpt=8, Mesh=9)
                    PrimType = (int)prim.Type,
                    TextureId = defaultTextureId,
                    Faces = faceTextures,
                    // Profile/Path data for advanced shape reconstruction
                    ProfileCurve = (int)prim.PrimData.ProfileCurve,
                    PathCurve = (int)prim.PrimData.PathCurve,
                    ProfileBegin = prim.PrimData.ProfileBegin,
                    ProfileEnd = prim.PrimData.ProfileEnd,
                    ProfileHollow = prim.PrimData.ProfileHollow,
                    PathBegin = prim.PrimData.PathBegin,
                    PathEnd = prim.PrimData.PathEnd,
                    PathScaleX = prim.PrimData.PathScaleX,
                    PathScaleY = prim.PrimData.PathScaleY,
                    PathShearX = prim.PrimData.PathShearX,
                    PathShearY = prim.PrimData.PathShearY,
                    PathTaperX = prim.PrimData.PathTaperX,
                    PathTaperY = prim.PrimData.PathTaperY,
                    PathTwist = prim.PrimData.PathTwist,
                    PathTwistBegin = prim.PrimData.PathTwistBegin,
                    PathRevolutions = prim.PrimData.PathRevolutions,
                });

                // Fetch mesh data for mesh prims (PrimType 9 = Mesh)
                if (prim.Type == PrimType.Mesh && prim.Sculpt?.SculptTexture != UUID.Zero)
                {
                    try
                    {
                        var meshData = await RequestMeshAsync(client, prim.Sculpt.SculptTexture);
                        if (meshData != null && meshData.Length > 0)
                        {
                            await caller.SendAsync("MeshData", new
                            {
                                Id = prim.ID.ToString(),
                                Data = Convert.ToBase64String(meshData)
                            });
                        }
                    }
                    catch { }
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

        // IM receive
        client.Self.IM += async (_, e) =>
        {
            try
            {
                var im = e.IM;
                // Skip outgoing IMs (from self)
                if (im.FromAgentID == client.Self.AgentID) return;
                // Skip group IMs
                if (im.GroupIM) return;
                // Skip system/dialog IMs
                if (im.Dialog != InstantMessageDialog.MessageFromAgent) return;

                await caller.SendAsync("InstantMessage", new
                {
                    From = im.FromAgentName ?? "Unknown",
                    FromId = im.FromAgentID.ToString(),
                    Message = im.Message
                });
            }
            catch { }
        };

        // Friends online/offline
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

        // Send connected event
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

        // Send friends list
        try
        {
            var friendListField = client.Friends.GetType().GetField("FriendList",
                BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance);
            if (friendListField != null)
            {
                var friendList = friendListField.GetValue(client.Friends) as System.Collections.IEnumerable;
                if (friendList != null)
                {
                    int count = 0;
                    foreach (var item in friendList)
                    {
                        var uuidProp = item.GetType().GetProperty("UUID");
                        var nameProp = item.GetType().GetProperty("Name");
                        var onlineProp = item.GetType().GetProperty("IsOnline");
                        if (uuidProp != null && nameProp != null)
                        {
                            var id = uuidProp.GetValue(item)?.ToString() ?? "";
                            var name = nameProp.GetValue(item)?.ToString() ?? "Unknown";
                            var online = onlineProp?.GetValue(item) as bool? ?? false;
                            await caller.SendAsync("FriendUpdate", new { Id = id, Name = name, Online = online });
                            count++;
                        }
                    }
                    Console.WriteLine($"[ViewerHub] Sent {count} friends");
                }
            }
        }
        catch (Exception ex) { Console.WriteLine($"[ViewerHub] Friends list error: {ex.Message}"); }

        Console.WriteLine($"[ViewerHub] Connected as {client.Self.Name}");
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
        try
        {
            if (Guid.TryParse(targetId, out var guid))
                session.Client.Self.InstantMessage(new UUID(guid), message);
        }
        catch (Exception ex) { await Clients.Caller.SendAsync("Error", $"IM failed: {ex.Message}"); }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var sessions = _grid.GetUserSessions(UserId).ToList();
        foreach (var session in sessions)
            await _grid.DisconnectAvatarAsync(session.AvatarId);
        await base.OnDisconnectedAsync(exception);
    }

    private Task<byte[]?> RequestMeshAsync(GridClient client, UUID meshId)
    {
        var tcs = new TaskCompletionSource<byte[]?>();

        // Try RequestMesh first (uses GetMesh HTTP cap if available)
        client.Assets.RequestMesh(meshId,
            (bool success, AssetMesh assetMesh) =>
            {
                if (success && assetMesh?.AssetData != null && assetMesh.AssetData.Length > 0)
                    tcs.TrySetResult(assetMesh.AssetData);
                else
                {
                    // Fallback: try RequestAsset with AssetType.Mesh (UDP fetch)
                    client.Assets.RequestAsset(meshId, AssetType.Mesh, false,
                        (AssetDownload transfer, Asset asset) =>
                        {
                            if (asset != null && asset.AssetData != null && asset.AssetData.Length > 0)
                                tcs.TrySetResult(asset.AssetData);
                            else
                                tcs.TrySetResult(null);
                        });
                }
            });

        // Timeout after 10 seconds
        _ = Task.Delay(10000).ContinueWith(_ => tcs.TrySetResult(null));

        return tcs.Task;
    }
}
