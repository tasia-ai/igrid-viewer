using System.ComponentModel.DataAnnotations;

namespace IGrid.Server.Models;

public class IMMessage
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string OtherId { get; set; } = string.Empty;
    public string OtherName { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public bool FromMe { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    public User User { get; set; } = null!;
}
