import * as THREE from 'three';

/**
 * SL Mesh Asset Decoder
 *
 * Decodes the SL binary mesh format into Three.js BufferGeometry.
 *
 * Format:
 *   1. Magic prefix: "<? LLSD/Binary ?>\n" (18 bytes)
 *   2. LLSD Binary header map (big-endian): version, high_lod, medium_lod, etc.
 *   3. GZIP-compressed data blocks referenced by offset/size from header
 *
 * Each LOD block decompresses to an LLSD Array of submesh maps.
 * Each submesh contains Position, Normal, TexCoord0, TriangleList as binary blobs.
 * Binary blob data uses LITTLE-ENDIAN uint16 values (contrary to LLSD container which is big-endian).
 *
 * Key references:
 * - https://wiki.secondlife.com/wiki/Mesh_Loader
 * - LibreMetaverse AssetMesh.cs, MeshFoundry.cs
 */

// LLSD Binary tag bytes (big-endian container format)
const LLSD_UNDEF = 0x21;    // '!'
const LLSD_FALSE = 0x30;    // '0'
const LLSD_TRUE = 0x31;     // '1'
const LLSD_INT = 0x69;      // 'i' — 4-byte big-endian int32
const LLSD_REAL = 0x72;     // 'r' — 8-byte big-endian float64
const LLSD_UUID = 0x75;     // 'u' — 16 bytes raw
const LLSD_STRING = 0x73;   // 's' — 4-byte BE length + UTF-8
const LLSD_BINARY = 0x62;   // 'b' — 4-byte BE length + raw bytes
const LLSD_DATE = 0x64;     // 'd' — 8-byte BE float64
const LLSD_URI = 0x6C;      // 'l' — 4-byte BE length + UTF-8
const LLSD_MAP = 0x7B;      // '{' — 4-byte BE count, then keys+values, then '}'
const LLSD_ARRAY = 0x5B;    // '[' — 4-byte BE count, then values, then ']'
const LLSD_KEY = 0x6B;      // 'k' — 4-byte BE length + UTF-8 key

// Magic prefix
const MAGIC_PREFIX = '<? LLSD/Binary ?>\n';
const MAGIC_BYTES = new TextEncoder().encode(MAGIC_PREFIX);

/**
 * Generic LLSD value container.
 */
interface LLSDValue {
  type: string;
  value: any;
}

type LLSDMap = { [key: string]: LLSDValue };

/**
 * Decoded submesh with typed arrays ready for Three.js.
 */
interface DecodedSubmesh {
  positions: Float32Array;
  normals: Float32Array | null;
  uvs: Float32Array | null;
  indices: Uint32Array;
  noGeometry: boolean;
}

/**
 * Main decoder class.
 */
export class SLMeshDecoder {
  private data!: DataView;
  private bytes!: Uint8Array;
  private offset = 0;

  /**
   * Decode a binary SL mesh asset into Three.js BufferGeometry.
   * Handles the full pipeline:
   *   1. Parse LLSD header
   *   2. Extract GZIP-compressed data blocks
   *   3. Decompress via DecompressionStream API
   *   4. Parse submesh data
   */
  async decode(meshData: ArrayBuffer | Uint8Array): Promise<THREE.BufferGeometry> {
    const buffer = meshData instanceof ArrayBuffer ? meshData : meshData.buffer;
    this.bytes = new Uint8Array(buffer);
    this.data = new DataView(buffer);
    this.offset = 0;

    // Step 1: Check for GZIP-wrapped asset (some OpenSim variants)
    if (this.bytes[0] === 0x1F && this.bytes[1] === 0x8B) {
      const decompressed = await this.gzipDecompress(this.bytes);
      this.bytes = decompressed;
      this.data = new DataView(decompressed.buffer);
      this.offset = 0;
    }

    // Step 2: Verify magic prefix
    if (!this.checkMagicPrefix()) {
      // Try parsing as raw LLSD (fallback for some OpenSim variants)
      this.offset = 0;
    }

    // Step 3: Parse LLSD header map
    const header = this.parseLLSDValue();
    if (!header || header.type !== 'map') {
      console.warn('[SLMesh] Failed to parse LLSD header');
      return new THREE.BufferGeometry();
    }

    const headerMap = header.value as LLSDMap;

    // Step 4: Find highest available LOD
    const lodOrder = ['high_lod', 'medium_lod', 'low_lod', 'lowest_lod'];
    let lodKey = '';
    let lodEntry: LLSDMap | null = null;

    for (const key of lodOrder) {
      const entry = headerMap[key];
      if (entry && entry.type === 'map') {
        lodEntry = entry.value as LLSDMap;
        lodKey = key;
        break;
      }
    }

    if (!lodEntry) {
      console.warn('[SLMesh] No LOD data found in mesh asset');
      return new THREE.BufferGeometry();
    }

    // Step 5: Extract the LOD data block
    const blockOffset = this.getInt(lodEntry, 'offset');
    const blockSize = this.getInt(lodEntry, 'size');

    if (blockOffset < 0 || blockSize <= 0) {
      console.warn(`[SLMesh] Invalid LOD block: offset=${blockOffset}, size=${blockSize}`);
      return new THREE.BufferGeometry();
    }

    // The header ends where the offset starts counting from
    // We need to find the end of the header map
    const headerEnd = this.offset;

    // Extract compressed block
    const compressedBytes = this.bytes.slice(headerEnd + blockOffset, headerEnd + blockOffset + blockSize);

    // Step 6: Decompress the block
    const decompressedBlock = await this.decompressBlock(compressedBytes);

    // Step 7: Parse the decompressed LLSD (should be an Array of submesh maps)
    const savedBytes = this.bytes;
    const savedData = this.data;
    const savedOffset = this.offset;

    try {
      this.bytes = decompressedBlock;
      this.data = new DataView(decompressedBlock.buffer);
      this.offset = 0;

      // Check for nested magic prefix
      if (this.checkMagicPrefix()) {
        // Skip the magic prefix, parse the LLSD value
      } else {
        this.offset = 0;
      }

      const llsdValue = this.parseLLSDValue();
      if (!llsdValue) {
        console.warn('[SLMesh] Failed to parse decompressed LOD data');
        return new THREE.BufferGeometry();
      }

      // Should be an Array of submesh maps
      if (llsdValue.type !== 'array') {
        console.warn(`[SLMesh] Expected array, got ${llsdValue.type}`);
        return new THREE.BufferGeometry();
      }

      const submeshes = llsdValue.value as LLSDValue[];
      const geometries: THREE.BufferGeometry[] = [];

      for (const submesh of submeshes) {
        if (submesh.type !== 'map') continue;
        const decoded = this.decodeSubmesh(submesh.value as LLSDMap);
        if (decoded && !decoded.noGeometry) {
          geometries.push(this.buildGeometry(decoded));
        }
      }

      if (geometries.length === 0) {
        return new THREE.BufferGeometry();
      }

      if (geometries.length === 1) {
        return geometries[0];
      }

      return this.mergeGeometries(geometries);
    } finally {
      this.bytes = savedBytes;
      this.data = savedData;
      this.offset = savedOffset;
    }
  }

  private checkMagicPrefix(): boolean {
    for (let i = 0; i < MAGIC_BYTES.length; i++) {
      if (this.bytes[this.offset + i] !== MAGIC_BYTES[i]) {
        return false;
      }
    }
    this.offset += MAGIC_BYTES.length;
    return true;
  }

  // --- LLSD Binary Parsing (big-endian) ---

  private readBEU32(): number {
    const v = this.data.getUint32(this.offset, false); // big-endian
    this.offset += 4;
    return v;
  }

  private readBEI32(): number {
    const v = this.data.getInt32(this.offset, false); // big-endian
    this.offset += 4;
    return v;
  }

  private readBEF64(): number {
    const v = this.data.getFloat64(this.offset, false); // big-endian
    this.offset += 8;
    return v;
  }

  private readBytes(count: number): Uint8Array {
    const slice = this.bytes.slice(this.offset, this.offset + count);
    this.offset += count;
    return slice;
  }

  private parseLLSDValue(): LLSDValue | null {
    if (this.offset >= this.bytes.length) return null;

    const tag = this.bytes[this.offset];
    this.offset++;

    switch (tag) {
      case LLSD_UNDEF:
        return { type: 'undef', value: undefined };

      case LLSD_FALSE:
        return { type: 'boolean', value: false };

      case LLSD_TRUE:
        return { type: 'boolean', value: true };

      case LLSD_INT: {
        const val = this.readBEI32();
        return { type: 'integer', value: val };
      }

      case LLSD_REAL: {
        const val = this.readBEF64();
        return { type: 'real', value: val };
      }

      case LLSD_UUID: {
        const bytes = this.readBytes(16);
        const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
        return { type: 'uuid', value: uuid };
      }

      case LLSD_STRING: {
        const len = this.readBEU32();
        const bytes = this.readBytes(len);
        return { type: 'string', value: new TextDecoder().decode(bytes) };
      }

      case LLSD_BINARY: {
        const len = this.readBEU32();
        const bytes = this.readBytes(len);
        return { type: 'binary', value: bytes };
      }

      case LLSD_DATE: {
        const val = this.readBEF64();
        return { type: 'date', value: val };
      }

      case LLSD_URI: {
        const len = this.readBEU32();
        const bytes = this.readBytes(len);
        return { type: 'uri', value: new TextDecoder().decode(bytes) };
      }

      case LLSD_MAP: {
        const count = this.readBEU32();
        const map: LLSDMap = {};
        for (let i = 0; i < count; i++) {
          // Read key
          const keyTag = this.bytes[this.offset];
          this.offset++;
          if (keyTag !== LLSD_KEY) {
            console.warn(`[SLMesh] Expected key tag 'k', got 0x${keyTag.toString(16)}`);
            continue;
          }
          const keyLen = this.readBEU32();
          const keyBytes = this.readBytes(keyLen);
          const key = new TextDecoder().decode(keyBytes);
          // Read value
          const val = this.parseLLSDValue();
          if (val) map[key] = val;
        }
        // Read closing '}'
        this.offset++;
        return { type: 'map', value: map };
      }

      case LLSD_ARRAY: {
        const count = this.readBEU32();
        const arr: LLSDValue[] = [];
        for (let i = 0; i < count; i++) {
          const val = this.parseLLSDValue();
          if (val) arr.push(val);
        }
        // Read closing ']'
        this.offset++;
        return { type: 'array', value: arr };
      }

      default:
        console.warn(`[SLMesh] Unknown LLSD tag: 0x${tag.toString(16)} at offset ${this.offset - 1}`);
        return null;
    }
  }

  // --- Submesh Decoding ---

  private decodeSubmesh(map: LLSDMap): DecodedSubmesh | null {
    // Check NoGeometry flag
    const noGeo = map['NoGeometry'];
    if (noGeo && noGeo.type === 'boolean' && noGeo.value === true) {
      return { positions: new Float32Array(0), normals: null, uvs: null, indices: new Uint32Array(0), noGeometry: true };
    }

    // Read Position binary blob
    const posBlob = map['Position'];
    if (!posBlob || posBlob.type !== 'binary') {
      return null;
    }
    const posData = posBlob.value as Uint8Array;

    // Position domain
    const posDomain = this.extractVector3Domain(map, 'PositionDomain', -0.5, 0.5);

    // Decode positions: sequential uint16[3] triplets, little-endian
    const vertexCount = posData.length / 6;
    const positions = new Float32Array(vertexCount * 3);
    for (let i = 0; i < vertexCount; i++) {
      const base = i * 6;
      const x = this.readUInt16LE(posData, base);
      const y = this.readUInt16LE(posData, base + 2);
      const z = this.readUInt16LE(posData, base + 4);
      // Dequantize and apply coordinate transform: SL(Y=forward, Z=up) → Three.js(Z=forward, Y=up)
      positions[i * 3] = this.dequantize(x, posDomain.min.x, posDomain.max.x);
      positions[i * 3 + 1] = this.dequantize(z, posDomain.min.z, posDomain.max.z);
      positions[i * 3 + 2] = this.dequantize(y, posDomain.min.y, posDomain.max.y);
    }

    // Read Normal binary blob (if present)
    let normals: Float32Array | null = null;
    const normBlob = map['Normal'];
    if (normBlob && normBlob.type === 'binary') {
      const normData = normBlob.value as Uint8Array;
      const normCount = normData.length / 6;
      normals = new Float32Array(normCount * 3);
      // Normal domain is ALWAYS [-1, 1]
      for (let i = 0; i < normCount; i++) {
        const base = i * 6;
        const x = this.readUInt16LE(normData, base);
        const y = this.readUInt16LE(normData, base + 2);
        const z = this.readUInt16LE(normData, base + 4);
        const nx = this.dequantize(x, -1, 1);
        const ny = this.dequantize(y, -1, 1);
        const nz = this.dequantize(z, -1, 1);
        const len = Math.sqrt(nx * nx + ny * ny + nz * nz) || 1;
        normals[i * 3] = nx / len;
        normals[i * 3 + 1] = nz / len;
        normals[i * 3 + 2] = ny / len;
      }
    }

    // Read TexCoord0 binary blob (if present)
    let uvs: Float32Array | null = null;
    const uvBlob = map['TexCoord0'];
    if (uvBlob && uvBlob.type === 'binary') {
      const uvData = uvBlob.value as Uint8Array;
      const uvCount = uvData.length / 4;
      uvs = new Float32Array(uvCount * 2);
      const uvDomain = this.extractVector2Domain(map, 'TexCoord0Domain', -1, 1);
      for (let i = 0; i < uvCount; i++) {
        const base = i * 4;
        const u = this.readUInt16LE(uvData, base);
        const v = this.readUInt16LE(uvData, base + 2);
        uvs[i * 2] = this.dequantize(u, uvDomain.min.x, uvDomain.max.x);
        uvs[i * 2 + 1] = this.dequantize(v, uvDomain.min.y, uvDomain.max.y);
      }
    }

    // Read TriangleList binary blob
    const triBlob = map['TriangleList'];
    if (!triBlob || triBlob.type !== 'binary') {
      return null;
    }
    const triData = triBlob.value as Uint8Array;
    const triCount = triData.length / 6;
    const indices = new Uint32Array(triCount * 3);
    for (let i = 0; i < triCount; i++) {
      const base = i * 6;
      indices[i * 3] = this.readUInt16LE(triData, base);
      indices[i * 3 + 1] = this.readUInt16LE(triData, base + 2);
      indices[i * 3 + 2] = this.readUInt16LE(triData, base + 4);
    }

    return { positions, normals, uvs, indices, noGeometry: false };
  }

  private buildGeometry(submesh: DecodedSubmesh): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(submesh.positions, 3));
    if (submesh.normals) {
      geometry.setAttribute('normal', new THREE.BufferAttribute(submesh.normals, 3));
    }
    if (submesh.uvs) {
      geometry.setAttribute('uv', new THREE.BufferAttribute(submesh.uvs, 2));
    }
    geometry.setIndex(new THREE.BufferAttribute(submesh.indices, 1));
    if (!submesh.normals) {
      geometry.computeVertexNormals();
    }
    return geometry;
  }

  private mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
    if (geometries.length === 0) return new THREE.BufferGeometry();
    if (geometries.length === 1) return geometries[0];

    let totalVerts = 0;
    let totalIdx = 0;
    for (const g of geometries) {
      totalVerts += g.attributes.position.count;
      totalIdx += g.index ? g.index.count : g.attributes.position.count;
    }

    const positions = new Float32Array(totalVerts * 3);
    const normals = new Float32Array(totalVerts * 3);
    const uvs = new Float32Array(totalVerts * 2);
    const indices = new Uint32Array(totalIdx);

    let vOff = 0;
    let iOff = 0;
    for (const g of geometries) {
      const pos = g.attributes.position as THREE.BufferAttribute;
      const norm = g.attributes.normal as THREE.BufferAttribute | undefined;
      const uv = g.attributes.uv as THREE.BufferAttribute | undefined;
      const idx = g.index as THREE.BufferAttribute | null;

      for (let i = 0; i < pos.count; i++) {
        positions[(vOff + i) * 3] = pos.getX(i);
        positions[(vOff + i) * 3 + 1] = pos.getY(i);
        positions[(vOff + i) * 3 + 2] = pos.getZ(i);
        if (norm) {
          normals[(vOff + i) * 3] = norm.getX(i);
          normals[(vOff + i) * 3 + 1] = norm.getY(i);
          normals[(vOff + i) * 3 + 2] = norm.getZ(i);
        }
        if (uv) {
          uvs[(vOff + i) * 2] = uv.getX(i);
          uvs[(vOff + i) * 2 + 1] = uv.getY(i);
        }
      }

      if (idx) {
        for (let i = 0; i < idx.count; i++) {
          indices[iOff + i] = idx.getX(i) + vOff;
        }
        iOff += idx.count;
      } else {
        for (let i = 0; i < pos.count; i++) {
          indices[iOff + i] = i + vOff;
        }
        iOff += pos.count;
      }

      vOff += pos.count;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    return geometry;
  }

  // --- Utilities ---

  private readUInt16LE(data: Uint8Array, offset: number): number {
    return data[offset] | (data[offset + 1] << 8);
  }

  private dequantize(value: number, min: number, max: number): number {
    return min + (value / 65535.0) * (max - min);
  }

  private getInt(map: LLSDMap, key: string): number {
    const entry = map[key];
    if (!entry) return 0;
    if (entry.type === 'integer') return entry.value;
    if (entry.type === 'real') return Math.floor(entry.value);
    return 0;
  }

  private extractVector3Domain(
    map: LLSDMap, key: string, defaultMin: number, defaultMax: number
  ): { min: THREE.Vector3; max: THREE.Vector3 } {
    const entry = map[key];
    if (!entry || entry.type !== 'map') {
      return {
        min: new THREE.Vector3(defaultMin, defaultMin, defaultMin),
        max: new THREE.Vector3(defaultMax, defaultMax, defaultMax),
      };
    }
    const domain = entry.value as LLSDMap;
    return {
      min: this.extractVec3(domain, 'Min', defaultMin),
      max: this.extractVec3(domain, 'Max', defaultMax),
    };
  }

  private extractVector2Domain(
    map: LLSDMap, key: string, defaultMin: number, defaultMax: number
  ): { min: THREE.Vector2; max: THREE.Vector2 } {
    const entry = map[key];
    if (!entry || entry.type !== 'map') {
      return { min: new THREE.Vector2(defaultMin, defaultMin), max: new THREE.Vector2(defaultMax, defaultMax) };
    }
    const domain = entry.value as LLSDMap;
    return {
      min: this.extractVec2(domain, 'Min', defaultMin),
      max: this.extractVec2(domain, 'Max', defaultMax),
    };
  }

  private extractVec3(map: LLSDMap, key: string, def: number): THREE.Vector3 {
    const e = map[key];
    if (e && e.type === 'array') {
      const arr = e.value as LLSDValue[];
      return new THREE.Vector3(arr[0]?.value ?? def, arr[1]?.value ?? def, arr[2]?.value ?? def);
    }
    return new THREE.Vector3(def, def, def);
  }

  private extractVec2(map: LLSDMap, key: string, def: number): THREE.Vector2 {
    const e = map[key];
    if (e && e.type === 'array') {
      const arr = e.value as LLSDValue[];
      return new THREE.Vector2(arr[0]?.value ?? def, arr[1]?.value ?? def);
    }
    return new THREE.Vector2(def, def);
  }

  // --- Decompression ---

  private async decompressBlock(compressed: Uint8Array): Promise<Uint8Array> {
    // Check for GZIP header (0x1F 0x8B)
    if (compressed[0] === 0x1F && compressed[1] === 0x8B) {
      return this.gzipDecompress(compressed);
    }

    // Check for zlib header (0x78)
    if (compressed[0] === 0x78) {
      return this.zlibDecompress(compressed);
    }

    // Try raw inflate as fallback
    try {
      return await this.inflateRaw(compressed);
    } catch {
      // If all else fails, return the data as-is (may be uncompressed)
      return compressed;
    }
  }

  private async gzipDecompress(data: Uint8Array): Promise<Uint8Array> {
    const ds = new DecompressionStream('gzip');
    const writer = ds.writable.getWriter();
    writer.write(data.buffer as ArrayBuffer);
    writer.close();

    const reader = ds.readable.getReader();
    const chunks: Uint8Array[] = [];
    let totalLen = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      totalLen += value.length;
    }

    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  }

  private async zlibDecompress(data: Uint8Array): Promise<Uint8Array> {
    const ds = new DecompressionStream('deflate');
    const writer = ds.writable.getWriter();
    writer.write(data.buffer as ArrayBuffer);
    writer.close();

    const reader = ds.readable.getReader();
    const chunks: Uint8Array[] = [];
    let totalLen = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      totalLen += value.length;
    }

    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  }

  private async inflateRaw(data: Uint8Array): Promise<Uint8Array> {
    const ds = new DecompressionStream('deflate-raw');
    const writer = ds.writable.getWriter();
    writer.write(data.buffer as ArrayBuffer);
    writer.close();

    const reader = ds.readable.getReader();
    const chunks: Uint8Array[] = [];
    let totalLen = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      totalLen += value.length;
    }

    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) {
      result.set(chunk, offset);
      offset += chunk.length;
    }

    return result;
  }
}
