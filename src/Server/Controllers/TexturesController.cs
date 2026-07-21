using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenMetaverse;
using OpenMetaverse.Assets;
using SkiaSharp;

namespace IGrid.Server.Controllers;

[ApiController]
[AllowAnonymous]
[Route("api/[controller]")]
public class TexturesController : ControllerBase
{
    private static readonly HttpClient _httpClient = new();

    // Grid asset server — direct HTTP, no auth
    private const string AssetServerUrl = "http://i.let-us.cyou:8003/assets";

    [HttpGet("{textureId}")]
    public async Task<IActionResult> GetTexture(string textureId)
    {
        if (!Guid.TryParse(textureId, out var uuid))
            return BadRequest("Invalid texture UUID");

        // Browser cache via ETag (texture UUID = ETag)
        var etag = $"\"{textureId}\"";
        if (Request.Headers.IfNoneMatch.ToString() == etag)
            return StatusCode(304); // Not Modified — browser uses cache

        try
        {
            var url = $"{AssetServerUrl}/{textureId}";
            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode, "Asset not found");

            var rawBytes = await response.Content.ReadAsByteArrayAsync();
            byte[] imageData = rawBytes;

            // Check if XML — parse and decode
            var text = System.Text.Encoding.UTF8.GetString(rawBytes).TrimStart('\0', '\xFE', '\xFF');
            if (text.StartsWith("<?xml") || text.StartsWith("<"))
            {
                var base64Data = ExtractBase64FromXml(text);
                if (base64Data != null)
                {
                    imageData = Convert.FromBase64String(base64Data);
                }
            }

            // Try J2K→PNG conversion
            if (IsJ2K(imageData))
            {
                var png = ConvertJ2KToPNG(imageData);
                if (png != null) imageData = png;
            }

            // HTTP cache headers — let browser cache for 24h
            Response.Headers.Append("Cache-Control", "public, max-age=86400, immutable");
            Response.Headers.Append("ETag", etag);

            var contentType = DetectContentType(imageData);
            return File(imageData, contentType);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Textures] Error: {ex.Message}");
            return StatusCode(500, "Failed to fetch texture");
        }
    }

    private static string? ExtractBase64FromXml(string xml)
    {
        var match = Regex.Match(xml, @"<Data>([\s\S]*?)</Data>", RegexOptions.IgnoreCase);
        if (!match.Success) return null;
        return Regex.Replace(match.Groups[1].Value.Trim(), @"\s+", "");
    }

    private static bool IsJ2K(byte[] data)
    {
        if (data.Length < 12) return false;
        return data[0] == 0x00 && data[1] == 0x00 && data[2] == 0x00 &&
               data[4] == 0x6A && data[5] == 0x50 && data[6] == 0x20;
    }

    private static byte[]? ConvertJ2KToPNG(byte[] j2kData)
    {
        try
        {
            var asset = new AssetTexture(UUID.Zero, j2kData);
            if (asset.Decode())
            {
                var managedImage = asset.Image;
                if (managedImage != null)
                {
                    using var skBitmap = managedImage.ExportBitmap();
                    using var encoded = skBitmap.Encode(SKEncodedImageFormat.Png, 90);
                    return encoded.ToArray();
                }
            }
            return null;
        }
        catch { return null; }
    }

    private static string DetectContentType(byte[] data)
    {
        if (data.Length >= 4 && data[0] == 0x89 && data[1] == 0x50) return "image/png";
        if (data.Length >= 3 && data[0] == 0xFF && data[1] == 0xD8) return "image/jpeg";
        if (data.Length >= 4 && data[0] == 0x52 && data[1] == 0x49) return "image/webp";
        if (data.Length >= 12 && data[0] == 0x00 && data[4] == 0x6A) return "image/jp2";
        return "application/octet-stream";
    }
}
