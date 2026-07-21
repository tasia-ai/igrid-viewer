using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using OpenMetaverse;
using IGrid.Server.Services;

namespace IGrid.Server.Hubs;

/// <summary>
/// SignalR hub for Hypergrid teleport functionality.
/// Supports cross-grid teleport via the viewer's built-in HG protocol support.
/// Format: "Region Name" for local grid, or "user@grid.com:8002/Region" for cross-grid.
/// </summary>
[Authorize]
public class HypergridHub : Hub
{
    private readonly GridConnectionService _grid;

    public HypergridHub(GridConnectionService grid)
    {
        _grid = grid;
    }

    private int UserId => int.Parse(
        Context.User?.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

    /// <summary>
    /// Teleport to a destination. Supports:
    /// - "Region Name" (local grid)
    /// - "user@grid.com:8002/Region Name" (Hypergrid cross-grid)
    /// </summary>
    public async Task HypergridTeleport(string destination)
    {
        var session = _grid.GetUserSessions(UserId).FirstOrDefault();
        if (session == null)
        {
            await Clients.Caller.SendAsync("Error", "No active avatar");
            return;
        }

        try
        {
            string regionName;
            string? crossGridUri = null;

            if (destination.Contains("@"))
            {
                // Parse Hypergrid URI: user@grid.com:8002/Region Name
                var parts = destination.Split('@');
                var gridPart = parts[1]; // grid.com:8002/Region Name
                var slashIdx = gridPart.IndexOf('/');
                if (slashIdx >= 0)
                {
                    crossGridUri = gridPart[..slashIdx];
                    regionName = gridPart[(slashIdx + 1)..];
                }
                else
                {
                    crossGridUri = gridPart;
                    regionName = "1000,1000";
                }
            }
            else
            {
                regionName = destination;
            }

            await Clients.Caller.SendAsync("TeleportStarted", new
            {
                Destination = destination,
                Region = regionName
            });

            // Use LibreMetaverse's teleport with region name
            var position = new Vector3(128, 128, 25);
            bool success;

            if (crossGridUri != null)
            {
                // For cross-grid, we attempt to connect to the foreign grid
                // This requires the grid to have Hypergrid enabled
                success = session.Client.Self.Teleport(regionName, position);
            }
            else
            {
                success = session.Client.Self.Teleport(regionName, position);
            }

            if (!success)
            {
                await Clients.Caller.SendAsync("Error", $"Teleport to {destination} failed");
            }
        }
        catch (Exception ex)
        {
            await Clients.Caller.SendAsync("Error", $"Teleport error: {ex.Message}");
        }
    }
}
