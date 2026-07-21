using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenMetaverse;
using OpenMetaverse.Assets;
using IGrid.Server.Services;

namespace IGrid.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TexturesController : ControllerBase
{
    private readonly GridConnectionService _grid;

    public TexturesController(GridConnectionService grid)
    {
        _grid = grid;
    }

    /// <summary>
    /// Proxy a texture asset from the grid.
    /// Returns the decoded image bytes (JPEG/PNG).
    /// Callback signature: TextureDownloadCallback(TextureRequestState, AssetTexture)
    /// AssetTexture.AssetData is byte[].
    /// </summary>
    [HttpGet("{textureId}")]
    public async Task<IActionResult> GetTexture(string textureId)
    {
        if (!UUID.TryParse(textureId, out var uuid))
            return BadRequest("Invalid texture UUID");

        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        var session = _grid.GetUserSessions(userId).FirstOrDefault();
        if (session == null)
            return Unauthorized("No active grid session");

        try
        {
            var imageData = await RequestTextureAsync(session.Client, uuid);
            if (imageData == null || imageData.Length == 0)
                return NotFound("Texture not found on grid");

            string contentType = DetectImageContentType(imageData);
            Response.Headers.Append("Cache-Control", "public, max-age=3600");

            return File(imageData, contentType);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to fetch texture: {ex.Message}");
        }
    }

    /// <summary>
    /// Wrap the callback-based RequestImage in a Task.
    /// </summary>
    private Task<byte[]> RequestTextureAsync(GridClient client, UUID textureId)
    {
        var tcs = new TaskCompletionSource<byte[]>();

        client.Assets.RequestImage(textureId, ImageType.Normal,
            (TextureRequestState state, AssetTexture assetTexture) =>
            {
                if (state == TextureRequestState.Finished &&
                    assetTexture?.AssetData != null &&
                    assetTexture.AssetData.Length > 0)
                {
                    tcs.TrySetResult(assetTexture.AssetData);
                }
                else
                {
                    tcs.TrySetResult(Array.Empty<byte>());
                }
            });

        return tcs.Task;
    }

    private static string DetectImageContentType(byte[] data)
    {
        if (data.Length >= 4 && data[0] == 0x89 && data[1] == 0x50 && data[2] == 0x4E && data[3] == 0x47)
            return "image/png";
        if (data.Length >= 3 && data[0] == 0xFF && data[1] == 0xD8 && data[2] == 0xFF)
            return "image/jpeg";
        if (data.Length >= 4 && data[0] == 0x52 && data[1] == 0x49 && data[2] == 0x46 && data[3] == 0x46)
            return "image/webp";
        return "application/octet-stream";
    }
}
