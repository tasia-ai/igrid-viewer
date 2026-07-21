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
public class AssetsController : ControllerBase
{
    private readonly GridConnectionService _grid;

    public AssetsController(GridConnectionService grid)
    {
        _grid = grid;
    }

    /// <summary>
    /// Proxy a mesh asset from the grid by UUID.
    /// Callback signature: MeshDownloadCallback(bool success, AssetMesh assetMesh)
    /// AssetMesh.AssetData is byte[], AssetMesh.MeshData is OSDMap.
    /// </summary>
    [HttpGet("mesh/{assetId}")]
    public async Task<IActionResult> GetMesh(string assetId)
    {
        if (!UUID.TryParse(assetId, out var uuid))
            return BadRequest("Invalid asset UUID");

        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        var session = _grid.GetUserSessions(userId).FirstOrDefault();
        if (session == null)
            return Unauthorized("No active grid session");

        try
        {
            var meshData = await RequestMeshAsync(session.Client, uuid);
            if (meshData == null || meshData.Length == 0)
                return NotFound("Mesh not found on grid");

            Response.Headers.Append("Cache-Control", "public, max-age=86400");
            return File(meshData, "application/octet-stream");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to fetch mesh: {ex.Message}");
        }
    }

    /// <summary>
    /// Proxy a generic asset from the grid by UUID.
    /// Callback signature: AssetReceivedCallback(AssetDownload transfer, Asset asset)
    /// Asset.AssetData is byte[].
    /// </summary>
    [HttpGet("{assetId}")]
    public async Task<IActionResult> GetAsset(string assetId)
    {
        if (!UUID.TryParse(assetId, out var uuid))
            return BadRequest("Invalid asset UUID");

        var userId = int.Parse(
            User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        var session = _grid.GetUserSessions(userId).FirstOrDefault();
        if (session == null)
            return Unauthorized("No active grid session");

        try
        {
            var assetData = await RequestAssetAsync(session.Client, uuid, AssetType.Mesh);
            if (assetData == null || assetData.Length == 0)
                return NotFound("Asset not found on grid");

            Response.Headers.Append("Cache-Control", "public, max-age=86400");
            return File(assetData, "application/octet-stream");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to fetch asset: {ex.Message}");
        }
    }

    /// <summary>
    /// RequestMesh callback: (bool success, AssetMesh assetMesh) => void
    /// </summary>
    private Task<byte[]> RequestMeshAsync(GridClient client, UUID meshId)
    {
        var tcs = new TaskCompletionSource<byte[]>();

        client.Assets.RequestMesh(meshId,
            (bool success, AssetMesh assetMesh) =>
            {
                if (success && assetMesh?.AssetData != null && assetMesh.AssetData.Length > 0)
                    tcs.TrySetResult(assetMesh.AssetData);
                else
                    tcs.TrySetResult(Array.Empty<byte>());
            });

        return tcs.Task;
    }

    /// <summary>
    /// RequestAsset callback: (AssetDownload transfer, Asset asset) => void
    /// </summary>
    private Task<byte[]> RequestAssetAsync(GridClient client, UUID assetId, AssetType type)
    {
        var tcs = new TaskCompletionSource<byte[]>();

        client.Assets.RequestAsset(assetId, type, true,
            (AssetDownload transfer, Asset asset) =>
            {
                if (asset?.AssetData != null && asset.AssetData.Length > 0)
                    tcs.TrySetResult(asset.AssetData);
                else
                    tcs.TrySetResult(Array.Empty<byte>());
            });

        return tcs.Task;
    }
}
