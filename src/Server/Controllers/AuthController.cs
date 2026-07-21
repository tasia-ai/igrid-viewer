using Microsoft.AspNetCore.Mvc;
using IGrid.Server.Models;
using IGrid.Server.Services;

namespace IGrid.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _auth;

    public AuthController(AuthService auth)
    {
        _auth = auth;
    }

    /// <summary>
    /// Register a new user account.
    /// </summary>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var result = await _auth.RegisterAsync(request);
        if (result == null)
            return Conflict(new { error = "Username already exists" });

        return Ok(result);
    }

    /// <summary>
    /// Login with username and password. Returns JWT token.
    /// </summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _auth.LoginAsync(request);
        if (result == null)
            return Unauthorized(new { error = "Invalid credentials" });

        return Ok(result);
    }
}
