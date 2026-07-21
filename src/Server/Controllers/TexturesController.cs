using System.Text.RegularExpressions;
using OpenMetaverse.Assets;
using System.Xml.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenMetaverse;
using SkiaSharp;

namespace IGrid.Server.Controllers;

[ApiController]
[AllowAnonymous]
[Route("api/[controller]")]
public class TexturesController : ControllerBase
{
    private static readonly HttpClient _httpClient = new();
    private static readonly Dictionary<string, (byte[] Data, DateTime Cached)> _cache = new();

    private const string AssetServerUrl = "http://i.let-us.cyou:8003/assets";

    [HttpGet("{textureId}")]
    public async Task<IActionResult> GetTexture(string textureId)
    {
        if (!Guid.TryParse(textureId, out _))
            return BadRequest("Invalid texture UUID");

        var cacheKey = textureId;
        if (_cache.TryGetValue(cacheKey, out var cached) && (DateTime.UtcNow - cached.Cached).TotalMinutes < 5)
        {
            return File(cached.Data, "image/png");
        }

        try
        {
            var url = $"{AssetServerUrl}/{textureId}";
            Console.WriteLine($"[Textures] Fetching: {url}");

            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode)
            {
                Console.WriteLine($"[Textures] Grid returned {(int)response.StatusCode}");
                return StatusCode((int)response.StatusCode, "Asset not found");
            }

            var rawBytes = await response.Content.ReadAsByteArrayAsync();

            // Check if XML
            var text = System.Text.Encoding.UTF8.GetString(rawBytes).TrimStart('\0', '\xFE', '\xFF');
            if (text.StartsWith("<?xml") || text.StartsWith("<"))
            {
                // Parse XML — extract base64 Data
                var base64Data = ExtractBase64FromXml(text);
                if (base64Data != null)
                {
                    var decoded = Convert.FromBase64String(base64Data);
                    Console.WriteLine($"[Textures] Decoded {decoded.Length} bytes from XML for {textureId}");

                    // Try J2K→PNG conversion
                    if (IsJ2K(decoded))
                    {
                        var png = ConvertJ2KToPNG(decoded);
                        if (png != null)
                        {
                            _cache[cacheKey] = (png, DateTime.UtcNow);
                            return File(png, "image/png");
                        }
                    }

                    // Return as-is
                    _cache[cacheKey] = (decoded, DateTime.UtcNow);
                    return File(decoded, DetectContentType(decoded));
                }
            }

            // Raw binary
            _cache[cacheKey] = (rawBytes, DateTime.UtcNow);
            return File(rawBytes, DetectContentType(rawBytes));
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Textures] Error: {ex.Message}");
            return StatusCode(500, "Failed to fetch texture");
        }
    }

    /// <summary>
    /// Extract base64 Data from XML using regex (more robust than XML parser for messy XML).
    /// Matches: &lt;Data&gt;base64content&lt;/Data&gt;
    /// </summary>
    private static string? ExtractBase64FromXml(string xml)
    {
        var match = Regex.Match(xml, @"<Data>([\s\S]*?)</Data>", RegexOptions.IgnoreCase);
        if (!match.Success) return null;
        var content = match.Groups[1].Value.Trim();
        // Remove any whitespace/newlines
        content = Regex.Replace(content, @"\s+", "");
        return content;
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
                    using var encoded = skBitmap.Encode(SKEncodedImageFormat.Png, 100);
                    return encoded.ToArray();
                }
            }
            return null;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Textures] J2K->PNG failed: {ex.Message}");
            return null;
        }
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
