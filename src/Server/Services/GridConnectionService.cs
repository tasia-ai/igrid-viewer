using System.Collections.Concurrent;
using Microsoft.EntityFrameworkCore;
using OpenMetaverse;
using IGrid.Server.Data;
using IGrid.Server.Models;

namespace IGrid.Server.Services;

/// <summary>
/// Manages LibreMetaverse connections to the OpenSim grid.
/// Each avatar gets its own GridClient instance.
/// </summary>
public class GridConnectionService
{
    private readonly AppDbContext _db;
    private readonly ConcurrentDictionary<int, GridSession> _sessions = new();

    private const string DefaultGridLoginUri = "https://i.let-us.cyou:8002/";
    private const string ClientName = "I-Grid Web Viewer";
    private const string ClientVersion = "0.1.0";

    public GridConnectionService(AppDbContext db)
    {
        _db = db;
    }

    /// <summary>
    /// Connect an avatar to the grid. Verifies user ownership.
    /// Uses synchronous Login() + LoginProgress event for result.
    /// </summary>
    public Task<GridSession?> ConnectAvatarAsync(int userId, int avatarId, string? gridUrl = null)
    {
        var loginUri = string.IsNullOrWhiteSpace(gridUrl) ? DefaultGridLoginUri : gridUrl.TrimEnd('/') + "/";
        Console.WriteLine($"[Grid] ConnectAvatar called: userId={userId}, avatarId={avatarId}, grid={loginUri}");

        var avatar = _db.Avatars
            .FirstOrDefault(a => a.Id == avatarId && a.UserId == userId && a.IsActive);

        if (avatar == null)
        {
            Console.WriteLine($"[Grid] Avatar not found: avatarId={avatarId}, userId={userId}");
            return Task.FromResult<GridSession?>(null);
        }

        Console.WriteLine($"[Grid] Avatar found: {avatar.FirstName} {avatar.LastName}, password length={avatar.Password?.Length ?? 0}");

        var client = new GridClient();
        var tcs = new TaskCompletionSource<GridSession?>();

        // Subscribe to login progress for the result
        void OnLoginProgress(object? sender, LoginProgressEventArgs e)
        {
            Console.WriteLine($"[Grid] LoginProgress: Status={e.Status}, Message={e.Message}");

            if (e.Status == LoginStatus.Success)
            {
                Console.WriteLine($"[Grid] Login SUCCESS: {client.Self.Name}");
                client.Network.LoginProgress -= OnLoginProgress;
                var session = new GridSession
                {
                    AvatarId = avatarId,
                    UserId = userId,
                    Client = client,
                    IsConnected = true,
                    ConnectedAt = DateTime.UtcNow
                };
                _sessions[avatarId] = session;
                tcs.TrySetResult(session);
            }
            else if (e.Status == LoginStatus.Failed)
            {
                Console.WriteLine($"[Grid] Login FAILED: {e.Status} - {e.Message}");
                client.Network.LoginProgress -= OnLoginProgress;
                tcs.TrySetResult(null);
            }
            // else: intermediate status (ConnectingToSim, ReadingResponse, etc.) — keep waiting
        }

        client.Network.LoginProgress += OnLoginProgress;

        // Build login parameters
        var loginParams = client.Network.DefaultLoginParams(
            avatar.FirstName,
            avatar.LastName,
            avatar.Password,
            ClientName,
            ClientVersion);

        loginParams.URI = loginUri;

        Console.WriteLine($"[Grid] Starting login: {avatar.FirstName} {avatar.LastName} @ {loginUri}");

        // Begin async login (non-blocking, fires LoginProgress when done)
        client.Network.BeginLogin(loginParams);

        // Add timeout — if grid doesn't respond in 10s, fail gracefully
        var timeoutTask = Task.Delay(TimeSpan.FromSeconds(10)).ContinueWith(_ =>
        {
            if (!tcs.Task.IsCompleted)
            {
                Console.WriteLine($"[Grid] Login TIMEOUT for {avatar.FirstName} {avatar.LastName}");
                client.Network.LoginProgress -= OnLoginProgress;
                tcs.TrySetResult(null);
            }
        });

        return tcs.Task;
    }

    /// <summary>
    /// Get active session for an avatar. Returns null if disconnected.
    /// </summary>
    public GridSession? GetSession(int avatarId)
    {
        _sessions.TryGetValue(avatarId, out var session);
        return session?.IsConnected == true ? session : null;
    }

    /// <summary>
    /// Disconnect an avatar from the grid.
    /// </summary>
    public async Task DisconnectAvatarAsync(int avatarId)
    {
        if (_sessions.TryRemove(avatarId, out var session))
        {
            try
            {
                session.Client.Network.Logout();
            }
            catch
            {
                // Connection may already be dead
            }

            session.IsConnected = false;
        }

        await Task.CompletedTask;
    }

    /// <summary>
    /// Get all active sessions for a specific user.
    /// </summary>
    public IEnumerable<GridSession> GetUserSessions(int userId)
    {
        return _sessions.Values
            .Where(s => s.UserId == userId && s.IsConnected);
    }
}
