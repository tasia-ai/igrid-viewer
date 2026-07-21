using OpenMetaverse;

namespace IGrid.Server.Models;

/// <summary>
/// In-memory representation of an active grid connection.
/// One per avatar.
/// </summary>
public class GridSession
{
    public int AvatarId { get; set; }
    public int UserId { get; set; }
    public GridClient Client { get; set; } = null!;
    public bool IsConnected { get; set; }
    public DateTime ConnectedAt { get; set; }
}
