using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using OpenMetaverse;
using IGrid.Server.Services;

namespace IGrid.Server.Hubs;

/// <summary>
/// SignalR hub that bridges LibreMetaverse grid events to the browser.
/// Each connected client receives events for their own avatars only.
/// </summary>
[Authorize]
public class ViewerHub : Hub
{
    private readonly GridConnectionService _grid;

    public ViewerHub(GridConnectionService grid)
    {
        _grid = grid;
    }

    private int UserId => int.Parse(
        Context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

    /// <summary>
    /// Connect an avatar to the grid and start receiving world events.
    /// </summary>
    public async Task ConnectAvatar(int avatarId)
    {
        var session = await _grid.ConnectAvatarAsync(UserId, avatarId);
        if (session == null)
        {
            await Clients.Caller.SendAsync("Error", "Failed to connect avatar");
            return;
        }

        var client = session.Client;

        // Object updates — prims, mesh objects
        client.Objects.ObjectUpdate += async (_, e) =>
        {
            var prim = e.Prim;
            var primData = prim.PrimData;
            await Clients.Caller.SendAsync("ObjectUpdate", new
            {
                Id = prim.ID.ToString(),
                Name = prim.Properties?.Name ?? "",
                Position = new { X = prim.Position.X, Y = prim.Position.Y, Z = prim.Position.Z },
                Rotation = new { X = prim.Rotation.X, Y = prim.Rotation.Y, Z = prim.Rotation.Z, W = prim.Rotation.W },
                Scale = new { X = prim.Scale.X, Y = prim.Scale.Y, Z = prim.Scale.Z },
                PCode = (int)primData.ProfileCurve,
                TextureEntry = prim.Textures?.GetBytes()
            });
        };

        // Avatar position updates
        client.Objects.AvatarUpdate += async (_, e) =>
        {
            if (e.Avatar == null) return;

            await Clients.Caller.SendAsync("AvatarUpdate", new
            {
                Id = e.Avatar.ID.ToString(),
                Name = e.Avatar.Name ?? "Unknown",
                Position = new { X = e.Avatar.Position.X, Y = e.Avatar.Position.Y, Z = e.Avatar.Position.Z },
                Rotation = new { X = e.Avatar.Rotation.X, Y = e.Avatar.Rotation.Y, Z = e.Avatar.Rotation.Z, W = e.Avatar.Rotation.W }
            });
        };

        // Terrain patches
        client.Terrain.LandPatchReceived += async (_, e) =>
        {
            await Clients.Caller.SendAsync("TerrainPatch", new
            {
                X = e.X,
                Y = e.Y,
                PatchSize = e.PatchSize,
                Heights = e.HeightMap
            });
        };

        // Chat messages
        client.Self.ChatFromSimulator += async (_, e) =>
        {
            await Clients.Caller.SendAsync("ChatMessage", new
            {
                From = e.FromName ?? "Unknown",
                Message = e.Message,
                Type = (int)e.Type
            });
        };

        await Clients.Caller.SendAsync("AvatarConnected", new
        {
            AvatarId = avatarId,
            FirstName = client.Self.Name ?? "Unknown",
            Position = new
            {
                X = client.Self.SimPosition.X,
                Y = client.Self.SimPosition.Y,
                Z = client.Self.SimPosition.Z
            }
        });
    }

    /// <summary>
    /// Send a chat message to the current region.
    /// </summary>
    public async Task SendChat(string message, int channel = 0)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null)
        {
            await Clients.Caller.SendAsync("Error", "No active avatar");
            return;
        }

        session.Client.Self.Chat(message, channel, ChatType.Normal, false);
    }

    /// <summary>
    /// Teleport the current avatar to a named region on the grid.
    /// </summary>
    public async Task Teleport(string regionName)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null)
        {
            await Clients.Caller.SendAsync("Error", "No active avatar");
            return;
        }

        var success = session.Client.Self.Teleport(regionName, new Vector3(128, 128, 25));
        if (!success)
        {
            await Clients.Caller.SendAsync("Error", "Teleport failed");
        }
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        var sessions = _grid.GetUserSessions(UserId).ToList();
        foreach (var session in sessions)
        {
            await _grid.DisconnectAvatarAsync(session.AvatarId);
        }

        await base.OnDisconnectedAsync(exception);
    }
}
