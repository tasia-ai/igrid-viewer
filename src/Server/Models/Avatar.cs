using System.ComponentModel.DataAnnotations;

namespace IGrid.Server.Models;

public class Avatar
{
    public int Id { get; set; }

    public int UserId { get; set; }

    [Required, MaxLength(32)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MaxLength(32)]
    public string LastName { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;

    [MaxLength(512)]
    public string? HomeUri { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User User { get; set; } = null!;
}
