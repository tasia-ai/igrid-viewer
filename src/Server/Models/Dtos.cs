namespace IGrid.Server.Models;

// Authentication DTOs
public record RegisterRequest(string Username, string Password, string? Email = null);
public record LoginRequest(string Username, string Password);
public record AuthResponse(string Token, DateTime Expires, UserDto User);
public record UserDto(int Id, string Username, string Email);

// Avatar DTOs
public record AvatarDto(int Id, string FirstName, string LastName, string? HomeUri);
public record CreateAvatarRequest(string FirstName, string LastName, string SLPassword, string? HomeUri);

// ── Environment / Windlight DTOs ─────────────────────────────────────

public record Color3(float R, float G, float B);
public record Vec3(float X, float Y, float Z);

/**
 * WindlightSettings DTO matching the OpenMetaverse format.
 * Sent to the client via SignalR EnvironmentUpdate event.
 */
public record WindlightSettingsDto
{
    // Sky colours
    public Color3 SkyTopColor { get; init; } = new(0f, 0.467f, 1f);
    public Color3 SkyMidColor { get; init; } = new(0.529f, 0.808f, 0.922f);
    public Color3 SkyBottomColor { get; init; } = new(1f, 1f, 1f);

    // Sun / Moon
    public Vec3 SunDirection { get; init; } = new(0.5f, 0.9f, 0.5f);
    public Color3 SunColor { get; init; } = new(1f, 0.957f, 0.878f);
    public float SunIntensity { get; init; } = 1.5f;
    public Vec3 MoonDirection { get; init; } = new(-0.3f, 0.8f, -0.5f);
    public Color3 MoonColor { get; init; } = new(0.69f, 0.73f, 0.87f);
    public float MoonIntensity { get; init; } = 0.04f;

    // Fog
    public Color3 FogColor { get; init; } = new(0.529f, 0.808f, 0.922f);
    public float FogNear { get; init; } = 200f;
    public float FogFar { get; init; } = 1500f;

    // Lighting
    public Color3 AmbientColor { get; init; } = new(0.376f, 0.376f, 0.502f);
    public float AmbientIntensity { get; init; } = 0.8f;
    public Color3 HemiSkyColor { get; init; } = new(0.529f, 0.808f, 0.922f);
    public Color3 HemiGroundColor { get; init; } = new(0.212f, 0.161f, 0.027f);
    public float HemiIntensity { get; init; } = 0.4f;

    // Water
    public Color3 WaterColor { get; init; } = new(0f, 0.412f, 0.58f);
    public float WaterOpacity { get; init; } = 0.65f;
    public float WaterHeight { get; init; } = 20f;

    // Time
    public float TimeOfDay { get; init; } = 0.5f;
    public bool UseEstateSun { get; init; } = true;
    public float CloudDensity { get; init; } = 0.5f;
}
