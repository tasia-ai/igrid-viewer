using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenMetaverse;
using OpenMetaverse.Assets;
using OpenMetaverse.Imaging;
using IGrid.Server.Services;

namespace IGrid.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TexturesController : ControllerBase
{
    private readonly GridConnectionService _grid;

    public TexturesController(GridConnectionService grid)
    {
        _grid = grid;
    }

    /// <summary>
    /// Proxy a texture asset from the grid.
    /// No [Authorize] on class — THREE.TextureLoader can't send headers.
    /// Auth is checked manually via query string token.
    /// Returns decoded PNG (J2K → PNG conversion).
    /// </summary>
    [HttpGet("{textureId}")]
    [Authorize]
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

            // Check if this is JPEG2000 and decode to PNG
            if (IsJ2K(imageData))
            {
                var pngData = DecodeJ2KToPNG(imageData);
                if (pngData != null)
                {
                    Response.Headers.Append("Cache-Control", "public, max-age=3600");
                    return File(pngData, "image/png");
                }
            }

            string contentType = DetectImageContentType(imageData);
            Response.Headers.Append("Cache-Control", "public, max-age=3600");
            return File(imageData, contentType);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Textures] Error fetching {textureId}: {ex.Message}");
            return StatusCode(500, $"Failed to fetch texture: {ex.Message}");
        }
    }

    private Task<byte[]> RequestTextureAsync(GridClient client, UUID textureId)
    {
        var tcs = new TaskCompletionSource<byte[]>();

        client.Assets.RequestImage(textureId, ImageType.Normal,
            (TextureRequestState state, AssetTexture assetTexture) =>
            {
                if (state == TextureRequestState.Finished &&
                    assetTexture?.AssetData != null && assetTexture.AssetData.Length > 0)
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

    private static bool IsJ2K(byte[] data)
    {
        // JPEG2000 magic: 0x00 0x00 0x00 0x0C 0x6A 0x50 0x20 0x20  ("jP  ")
        // Or JP2: 0x00 0x00 0x00 0x0C 0x6A 0x50 0x20 0x0D 0x0A 0x87 0x0A
        if (data.Length < 12) return false;
        return data[0] == 0x00 && data[1] == 0x00 && data[2] == 0x00 &&
               data[4] == 0x6A && data[5] == 0x50 && data[6] == 0x20;
    }

    private static byte[]? DecodeJ2KToPNG(byte[] j2kData)
    {
        try
        {
            // Decode J2K using AssetTexture
            var asset = new AssetTexture(UUID.Zero, j2kData);
            if (!asset.Decode())
                return null;

            var managedImage = asset.Image;
            if (managedImage == null)
                return null;

            // Convert to SKBitmap then encode as PNG
            using var skBitmap = managedImage.ExportBitmap();
            using var data = skBitmap.Encode(SkiaSharp.SKEncodedImageFormat.Png, 100);
            return data.ToArray();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Textures] J2K decode failed: {ex.Message}");
            return null;
        }
    }

    private static string DetectImageContentType(byte[] data)
    {
        if (data.Length >= 4 && data[0] == 0x89 && data[1] == 0x50 && data[2] == 0x4E && data[3] == 0x47)
            return "image/png";
        if (data.Length >= 3 && data[0] == 0xFF && data[1] == 0xD8 && data[2] == 0xFF)
            return "image/jpeg";
        if (data.Length >= 4 && data[0] == 0x52 && data[1] == 0x49 && data[2] == 0x46 && data[3] == 0x46)
            return "image/webp";
        if (IsJ2K(data))
            return "image/jp2";
        return "application/octet-stream";
    }
}
