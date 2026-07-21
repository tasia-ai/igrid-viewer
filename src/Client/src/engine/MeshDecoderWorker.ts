/**
 * SL Mesh Decoder Web Worker
 *
 * Runs SL mesh decoding in a separate thread to avoid blocking the main render loop.
 * Receives mesh asset data, decodes it, and returns geometry data as typed arrays.
 */

import { SLMeshDecoder } from './SLMeshDecoder';

interface DecodeResult {
  id: string;
  success: boolean;
  positions?: Float32Array;
  normals?: Float32Array;
  uvs?: Float32Array;
  indices?: Uint32Array;
  error?: string;
}

const ctx = self as unknown as Worker;

ctx.onmessage = async (e: MessageEvent<{ id: string; data: ArrayBuffer }>) => {
  const { id, data } = e.data;

  try {
    const decoder = new SLMeshDecoder();
    const geometry = await decoder.decode(data);

    const positionAttr = geometry.attributes.position;
    const normalAttr = geometry.attributes.normal;
    const uvAttr = geometry.attributes.uv;
    const indexAttr = geometry.index;

    const result: DecodeResult = { id, success: true };

    if (positionAttr) {
      result.positions = Float32Array.from((positionAttr as any).array);
    }
    if (normalAttr) {
      result.normals = Float32Array.from((normalAttr as any).array);
    }
    if (uvAttr) {
      result.uvs = Float32Array.from((uvAttr as any).array);
    }
    if (indexAttr) {
      result.indices = Uint32Array.from((indexAttr as any).array);
    }

    const transferables: any[] = [];
    if (result.positions) transferables.push(result.positions.buffer);
    if (result.normals) transferables.push(result.normals.buffer);
    if (result.uvs) transferables.push(result.uvs.buffer);
    if (result.indices) transferables.push(result.indices.buffer);

    ctx.postMessage(result, transferables);
  } catch (err: any) {
    ctx.postMessage({
      id,
      success: false,
      error: err.message || 'Unknown error',
    } as DecodeResult);
  }
};

export {};
