using System.Security.Claims;
using System.Reflection;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using OpenMetaverse;
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

        // IMPORTANT: Capture caller proxy BEFORE returning.
        // ViewerHub is scoped — it gets disposed after ConnectAvatar returns,
        // but LibreMetaverse events fire long after that.
        var caller = Clients.Caller;
        var client = session.Client;

        // Object updates
        client.Objects.ObjectUpdate += async (_, e) =>
        {
            try
            {
                var prim = e.Prim;
                string? textureId = null;
                if (prim.Textures?.DefaultTexture?.TextureID != null &&
                    prim.Textures.DefaultTexture.TextureID != UUID.Zero)
                    textureId = prim.Textures.DefaultTexture.TextureID.ToString();

                await caller.SendAsync("ObjectUpdate", new
                {
                    Id = prim.ID.ToString(),
                    Name = prim.Properties?.Name ?? "",
                    Position = new { X = prim.Position.X, Y = prim.Position.Y, Z = prim.Position.Z },
                    Rotation = new { X = prim.Rotation.X, Y = prim.Rotation.Y, Z = prim.Rotation.Z, W = prim.Rotation.W },
                    Scale = new { X = prim.Scale.X, Y = prim.Scale.Y, Z = prim.Scale.Z },
                    PCode = (int)prim.PrimData.ProfileCurve,
                    TextureId = textureId
                });
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
        await caller.SendAsync("AvatarConnected", new
        {
            AvatarId = avatarId,
            FirstName = client.Self.Name ?? "Unknown",
            Position = new { X = client.Self.SimPosition.X, Y = client.Self.SimPosition.Y, Z = client.Self.SimPosition.Z }
        });

        // Send initial friends list
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
}
