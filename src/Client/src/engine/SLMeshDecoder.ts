/**
 * Second Life Mesh Decoder
 *
 * Decodes SL binary mesh format into Three.js BufferGeometry.
 * Format: Version byte (0x01) + LOD + LLSD-encoded sub-meshes.
 *
 * Each sub-mesh contains:
 * - PositionDomain (min/max Vector3)
 * - NormalDomain (min/max Vector3)
 * - TexCoordDomain (min/max Vector2)
 * - Position (quantized vertices)
 * - Normal (quantized normals)
 * - TexCoord (quantized UVs)
 * - TriangleList (indices)
 * - MaterialID (face index)
 * - PositionDomain offset (local space offset)
 */

import * as THREE from 'three';

// LLSD binary types
const LLSD_TYPE_BINARY = 0x62; // 'b'
const LLSD_TYPE_MAP = 0x6D;    // 'm'
const LLSD_TYPE_ARRAY = 0x6C;  // 'l'
const LLSD_TYPE_INTEGER = 0x69; // 'i'
const LLSD_TYPE_REAL = 0x72;   // 'r'
const LLSD_TYPE_STRING = 0x73; // 's'
const LLSD_TYPE_UUID = 0x75;   // 'u'
const LLSD_TYPE_BOOLEAN = 0x74; // 't'
const LLSD_TYPE_UNDEFINED = 0x6E; // 'n'

interface LLSDValue {
  type: string;
  value: any;
}

interface LLSDMap {
  [key: string]: LLSDValue;
}

/**
 * Decoded mesh sub-object with geometry data.
 */
interface SubMeshData {
  positions: Float32Array;
  normals: Float32Array;
  uvs: Float32Array;
  indices: Uint32Array;
  materialIndex: number;
  minPos: THREE.Vector3;
  maxPos: THREE.Vector3;
  minUV: THREE.Vector2;
  maxUV: THREE.Vector2;
}

/**
 * SL mesh decoder that converts binary mesh assets to Three.js geometry.
 */
export class SLMeshDecoder {
  private data!: DataView;
  private offset = 0;

  /**
   * Decode a binary SL mesh asset into Three.js BufferGeometry.
   */
  decode(meshData: ArrayBuffer | Uint8Array): THREE.BufferGeometry {
    const buffer = meshData instanceof ArrayBuffer ? meshData : meshData.buffer;
    this.data = new DataView(buffer);
    this.offset = 0;

    // Read header
    const version = this.readU8();
    if (version !== 0x01) {
      console.warn(`[SLMesh] Unknown mesh version: ${version}, attempting decode anyway`);
    }

    const lod = this.readU8(); // LOD level (0=highest)
    const numSubMeshes = this.readU16();

    const geometries: THREE.BufferGeometry[] = [];

    for (let i = 0; i < numSubMeshes; i++) {
      try {
        const subMesh = this.readSubMesh();
        if (subMesh) {
          geometries.push(this.buildGeometry(subMesh));
        }
      } catch (err) {
        console.warn(`[SLMesh] Failed to decode sub-mesh ${i}:`, err);
      }
    }

    if (geometries.length === 0) {
      return new THREE.BufferGeometry(); // Empty geometry
    }

    if (geometries.length === 1) {
      return geometries[0];
    }

    // Merge multiple sub-meshes
    return this.mergeGeometries(geometries);
  }

  private readSubMesh(): SubMeshData | null {
    // Read LLSD-encoded sub-mesh map
    const subMeshData = this.readLLSDMap();
    if (!subMeshData) return null;

    // Extract position domain (min/max for quantization)
    const positionDomain = this.extractVectorDomain(subMeshData, 'PositionDomain');
    const normalDomain = this.extractVectorDomain(subMeshData, 'NormalDomain');
    const texCoordDomain = this.extractVector2Domain(subMeshData, 'TexCoordDomain');

    // Read quantized vertices
    const numVertices = this.extractInt(subMeshData, 'NumVertices') || 0;
    const positions = this.readQuantizedPositions(
      numVertices,
      positionDomain.min,
      positionDomain.max
    );

    // Read quantized normals
    const numNormals = this.extractInt(subMeshData, 'NumNormals') || 0;
    const normals = this.readQuantizedNormals(
      numNormals,
      normalDomain.min,
      normalDomain.max
    );

    // Read quantized UVs
    const numTexCoords = this.extractInt(subMeshData, 'NumTexCoords') || 0;
    const uvs = this.readQuantizedTexCoords(
      numTexCoords,
      texCoordDomain.min,
      texCoordDomain.max
    );

    // Read triangle indices
    const numTriangles = this.extractInt(subMeshData, 'NumTriangles') || 0;
    const indices = this.readTriangleIndices(numTriangles);

    return {
      positions,
      normals,
      uvs,
      indices,
      materialIndex: 0,
      minPos: positionDomain.min,
      maxPos: positionDomain.max,
      minUV: texCoordDomain.min,
      maxUV: texCoordDomain.max,
    };
  }

  private readQuantizedPositions(
    count: number,
    min: THREE.Vector3,
    max: THREE.Vector3
  ): Float32Array {
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = this.readQuantizedFloat(min.x, max.x);
      const y = this.readQuantizedFloat(min.y, max.y);
      const z = this.readQuantizedFloat(min.z, max.z);

      // SL to Three.js coordinate transform: SL(Y=forward, Z=up) → Three.js(Z=forward, Y=up)
      positions[i * 3] = x;
      positions[i * 3 + 1] = z;
      positions[i * 3 + 2] = y;
    }

    return positions;
  }

  private readQuantizedNormals(
    count: number,
    min: THREE.Vector3,
    max: THREE.Vector3
  ): Float32Array {
    const normals = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = this.readQuantizedFloat(min.x, max.x);
      const y = this.readQuantizedFloat(min.y, max.y);
      const z = this.readQuantizedFloat(min.z, max.z);

      // Normalize
      const len = Math.sqrt(x * x + y * y + z * z) || 1;
      normals[i * 3] = x / len;
      normals[i * 3 + 1] = z / len;
      normals[i * 3 + 2] = y / len;
    }

    return normals;
  }

  private readQuantizedTexCoords(
    count: number,
    min: THREE.Vector2,
    max: THREE.Vector2
  ): Float32Array {
    const uvs = new Float32Array(count * 2);

    for (let i = 0; i < count; i++) {
      uvs[i * 2] = this.readQuantizedFloat(min.x, max.x);
      uvs[i * 2 + 1] = this.readQuantizedFloat(min.y, max.y);
    }

    return uvs;
  }

  private readQuantizedFloat(min: number, max: number): number {
    // SL uses 16-bit quantized values (0-65535 → min-max)
    const quantized = this.readU16();
    return min + (quantized / 65535.0) * (max - min);
  }

  private readTriangleIndices(count: number): Uint32Array {
    const indices = new Uint32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      indices[i] = this.readU16();
    }

    return indices;
  }

  private buildGeometry(subMesh: SubMeshData): THREE.BufferGeometry {
    const geometry = new THREE.BufferGeometry();

    geometry.setAttribute('position', new THREE.BufferAttribute(subMesh.positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(subMesh.normals, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(subMesh.uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(subMesh.indices, 1));

    return geometry;
  }

  private mergeGeometries(geometries: THREE.BufferGeometry[]): THREE.BufferGeometry {
    if (geometries.length === 0) return new THREE.BufferGeometry();

    let totalVertices = 0;
    let totalIndices = 0;

    for (const g of geometries) {
      totalVertices += g.attributes.position.count;
      totalIndices += g.index ? g.index.count : g.attributes.position.count;
    }

    const positions = new Float32Array(totalVertices * 3);
    const normals = new Float32Array(totalVertices * 3);
    const uvs = new Float32Array(totalVertices * 2);
    const indices = new Uint32Array(totalIndices);

    let vertexOffset = 0;
    let indexOffset = 0;

    for (const g of geometries) {
      const pos = g.attributes.position;
      const norm = g.attributes.normal;
      const uv = g.attributes.uv;
      const idx = g.index;

      for (let i = 0; i < pos.count; i++) {
        positions[(vertexOffset + i) * 3] = (pos as THREE.BufferAttribute).getX(i);
        positions[(vertexOffset + i) * 3 + 1] = (pos as THREE.BufferAttribute).getY(i);
        positions[(vertexOffset + i) * 3 + 2] = (pos as THREE.BufferAttribute).getZ(i);

        if (norm) {
          normals[(vertexOffset + i) * 3] = (norm as THREE.BufferAttribute).getX(i);
          normals[(vertexOffset + i) * 3 + 1] = (norm as THREE.BufferAttribute).getY(i);
          normals[(vertexOffset + i) * 3 + 2] = (norm as THREE.BufferAttribute).getZ(i);
        }

        if (uv) {
          uvs[(vertexOffset + i) * 2] = (uv as THREE.BufferAttribute).getX(i);
          uvs[(vertexOffset + i) * 2 + 1] = (uv as THREE.BufferAttribute).getY(i);
        }
      }

      if (idx) {
        for (let i = 0; i < idx.count; i++) {
          indices[indexOffset + i] = (idx as THREE.BufferAttribute).getX(i) + vertexOffset;
        }
        indexOffset += idx.count;
      } else {
        for (let i = 0; i < pos.count; i++) {
          indices[indexOffset + i] = i + vertexOffset;
        }
        indexOffset += pos.count;
      }

      vertexOffset += pos.count;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    return geometry;
  }

  // --- LLSD Binary Reading ---

  private readU8(): number {
    const value = this.data.getUint8(this.offset);
    this.offset += 1;
    return value;
  }

  private readU16(): number {
    const value = this.data.getUint16(this.offset, true); // little-endian
    this.offset += 2;
    return value;
  }

  private readU32(): number {
    const value = this.data.getUint32(this.offset, true); // little-endian
    this.offset += 4;
    return value;
  }

  private readI32(): number {
    const value = this.data.getInt32(this.offset, true); // little-endian
    this.offset += 4;
    return value;
  }

  private readF32(): number {
    const value = this.data.getFloat32(this.offset, true); // little-endian
    this.offset += 4;
    return value;
  }

  private readBinary(length: number): Uint8Array {
    const bytes = new Uint8Array(this.data.buffer, this.offset, length);
    this.offset += length;
    return bytes;
  }

  private readLLSDMap(): LLSDMap | null {
    const type = this.readU8();

    if (type === LLSD_TYPE_UNDEFINED) return null;
    if (type !== LLSD_TYPE_MAP && type !== LLSD_TYPE_BINARY) return null;

    if (type === LLSD_TYPE_BINARY) {
      // Binary LLSD with length prefix
      const length = this.readU32();
      const _binaryData = this.readBinary(length);
      // Parse the binary LLSD content
      return this.parseBinaryLLSD();
    }

    return this.parseBinaryLLSD();
  }

  private parseBinaryLLSD(): LLSDMap {
    const map: LLSDMap = {};
    const type = this.readU8();

    if (type === LLSD_TYPE_MAP) {
      const count = this.readU32();
      for (let i = 0; i < count; i++) {
        const keyLen = this.readU16();
        const keyBytes = this.readBinary(keyLen);
        const key = new TextDecoder().decode(keyBytes);
        map[key] = this.readLLSDValue();
      }
    }

    return map;
  }

  private readLLSDValue(): LLSDValue {
    const type = this.readU8();

    switch (type) {
      case LLSD_TYPE_INTEGER:
        return { type: 'integer', value: this.readI32() };

      case LLSD_TYPE_REAL:
        return { type: 'real', value: this.readF32() };

      case LLSD_TYPE_STRING: {
        const len = this.readU32();
        const bytes = this.readBinary(len);
        return { type: 'string', value: new TextDecoder().decode(bytes) };
      }

      case LLSD_TYPE_UUID: {
        const uuidBytes = this.readBinary(16);
        // Convert to UUID string
        const hex = Array.from(uuidBytes).map(b => b.toString(16).padStart(2, '0')).join('');
        const uuid = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
        return { type: 'uuid', value: uuid };
      }

      case LLSD_TYPE_BOOLEAN:
        return { type: 'boolean', value: this.readU8() !== 0 };

      case LLSD_TYPE_ARRAY: {
        const count = this.readU32();
        const arr = [];
        for (let i = 0; i < count; i++) {
          arr.push(this.readLLSDValue());
        }
        return { type: 'array', value: arr };
      }

      case LLSD_TYPE_MAP:
        return { type: 'map', value: this.parseBinaryLLSD() };

      default:
        return { type: 'undefined', value: undefined };
    }
  }

  private extractVectorDomain(
    map: LLSDMap,
    key: string
  ): { min: THREE.Vector3; max: THREE.Vector3 } {
    const defaultMin = new THREE.Vector3(-256, -256, -256);
    const defaultMax = new THREE.Vector3(256, 256, 256);

    const entry = map[key];
    if (!entry || entry.type !== 'map') {
      return { min: defaultMin, max: defaultMax };
    }

    const domainMap = entry.value as LLSDMap;
    const minVec = this.extractVector3(domainMap, 'Min');
    const maxVec = this.extractVector3(domainMap, 'Max');

    return { min: minVec, max: maxVec };
  }

  private extractVector2Domain(
    map: LLSDMap,
    key: string
  ): { min: THREE.Vector2; max: THREE.Vector2 } {
    const defaultMin = new THREE.Vector2(-1, -1);
    const defaultMax = new THREE.Vector2(1, 1);

    const entry = map[key];
    if (!entry || entry.type !== 'map') {
      return { min: defaultMin, max: defaultMax };
    }

    const domainMap = entry.value as LLSDMap;
    const minVal = domainMap['Min'];
    const maxVal = domainMap['Max'];

    let min = defaultMin;
    let max = defaultMax;

    if (minVal && minVal.type === 'array') {
      const arr = minVal.value;
      min = new THREE.Vector2(
        arr[0]?.value ?? -1,
        arr[1]?.value ?? -1
      );
    }

    if (maxVal && maxVal.type === 'array') {
      const arr = maxVal.value;
      max = new THREE.Vector2(
        arr[0]?.value ?? 1,
        arr[1]?.value ?? 1
      );
    }

    return { min, max };
  }

  private extractVector3(map: LLSDMap, key: string): THREE.Vector3 {
    const entry = map[key];
    if (!entry || entry.type !== 'array') {
      return new THREE.Vector3(0, 0, 0);
    }

    const arr = entry.value;
    return new THREE.Vector3(
      arr[0]?.value ?? 0,
      arr[1]?.value ?? 0,
      arr[2]?.value ?? 0
    );
  }

  private extractInt(map: LLSDMap, key: string): number {
    const entry = map[key];
    if (!entry) return 0;
    if (entry.type === 'integer') return entry.value;
    if (entry.type === 'real') return Math.floor(entry.value);
    return 0;
  }
}
