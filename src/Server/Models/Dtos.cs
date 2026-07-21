namespace IGrid.Server.Models;

// Authentication DTOs
public record RegisterRequest(string Username, string Password, string? Email = null);
public record LoginRequest(string Username, string Password);
public record AuthResponse(string Token, DateTime Expires, UserDto User);
public record UserDto(int Id, string Username, string Email);

// Avatar DTOs
public record AvatarDto(int Id, string FirstName, string LastName, string? HomeUri);
public record CreateAvatarRequest(string FirstName, string LastName, string SLPassword, string? HomeUri);
