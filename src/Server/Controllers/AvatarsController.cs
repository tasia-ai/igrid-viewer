using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IGrid.Server.Data;
using IGrid.Server.Models;

namespace IGrid.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AvatarsController : ControllerBase
{
    private readonly AppDbContext _db;

    public AvatarsController(AppDbContext db)
    {
        _db = db;
    }

    private int UserId => int.Parse(
        User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");

    /// <summary>
    /// List all avatars belonging to the authenticated user.
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetMyAvatars()
    {
        var avatars = await _db.Avatars
            .Where(a => a.UserId == UserId && a.IsActive)
            .Select(a => new AvatarDto(a.Id, a.FirstName, a.LastName, a.HomeUri))
            .ToListAsync();

        return Ok(avatars);
    }

    /// <summary>
    /// Create a new avatar linked to the authenticated user.
    /// SL password is stored encrypted (BCrypt).
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> CreateAvatar([FromBody] CreateAvatarRequest request)
    {
        // Check for duplicate avatar name across all users
        var exists = await _db.Avatars.AnyAsync(a =>
            a.FirstName == request.FirstName &&
            a.LastName == request.LastName &&
            a.IsActive);

        if (exists)
            return Conflict(new { error = "Avatar name already taken" });

        var avatar = new Avatar
        {
            UserId = UserId,
            FirstName = request.FirstName,
            LastName = request.LastName,
            Password = request.SLPassword ?? string.Empty,
            HomeUri = request.HomeUri
        };

        _db.Avatars.Add(avatar);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMyAvatars), null,
            new AvatarDto(avatar.Id, avatar.FirstName, avatar.LastName, avatar.HomeUri));
    }

    /// <summary>
    /// Soft-delete an avatar (deactivate). User must own it.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAvatar(int id)
    {
        var avatar = await _db.Avatars
            .FirstOrDefaultAsync(a => a.Id == id && a.UserId == UserId);

        if (avatar == null) return NotFound();

        avatar.IsActive = false;
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
