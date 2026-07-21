# I-Grid Viewer

Web-based 3D viewer for the I-Grid OpenSim grid. Connects to OpenSim via LibreMetaverse and renders the world in Three.js.

## Features

- **JWT Authentication** — Register/login with secure password hashing
- **Real-time 3D Rendering** — Three.js with PBR materials, shadows, and lighting
- **Terrain** — Heightmap patches with per-layer PBR textures
- **Objects** — Standard SL prims (box, sphere, cylinder, etc.) with texture proxy
- **Mesh Objects** — SL mesh format decoding via binary LLSD parser
- **Avatars** — Placeholder rendering with skeleton support for mesh avatars
- **Chat** — In-world chat with system messages
- **Teleport** — Region teleport and Hypergrid cross-grid support
- **Minimap** — Real-time terrain rendering on 2D canvas
- **PBR Materials** — Metallic-roughness workflow with texture proxy
- **Animations** — BVH animation parsing and playback on skeletons

## Tech Stack

**Backend:**
- ASP.NET Core 8.0
- LibreMetaverse 2.4.10 (OpenSim client library)
- SignalR (real-time communication)
- Entity Framework Core + SQLite
- JWT Authentication

**Frontend:**
- TypeScript
- Three.js (3D rendering)
- Vite (bundler)
- @microsoft/signalr (WebSocket client)

## Project Structure

```
igrid-viewer/
├── src/
│   ├── Server/           # ASP.NET Core backend
│   │   ├── Controllers/  # REST API endpoints
│   │   ├── Hubs/         # SignalR real-time hubs
│   │   ├── Services/     # Business logic
│   │   ├── Models/       # Data models
│   │   └── Data/         # EF Core DbContext
│   └── Client/           # Vite + Three.js frontend
│       └── src/
│           ├── engine/   # 3D rendering engines
│           └── network/  # SignalR client
├── Dockerfile
├── docker-compose.yml
└── deploy.sh
```

## Quick Start

### Development

```bash
# Install dependencies
cd src/Client && npm install

# Start backend (Terminal 1)
cd src/Server && dotnet run

# Start frontend (Terminal 2)
cd src/Client && npm run dev
```

Access:
- Frontend: http://localhost:3001
- Backend API: http://localhost:5000
- Swagger: http://localhost:5000/swagger

### Production (Docker)

```bash
# Build and run
./deploy.sh prod

# Or manually
docker-compose up -d
```

## Configuration

Environment variables:

- `Jwt__Key` — JWT signing key (default: development key)
- `ASPNETCORE_URLS` — Server bind address (default: http://+:5000)
- `ASPNETCORE_ENVIRONMENT` — Environment (Development/Production)

## API Endpoints

- `POST /api/auth/register` — Create account
- `POST /api/auth/login` — Login, returns JWT
- `GET /api/avatars` — List user avatars (requires auth)
- `POST /api/avatars` — Create avatar (requires auth)
- `GET /api/textures/{id}` — Proxy texture from grid (requires auth)
- `GET /api/assets/{id}` — Proxy asset from grid (requires auth)
- `GET /api/assets/mesh/{id}` — Proxy mesh asset (requires auth)

## SignalR Hubs

- `/hubs/viewer` — Main world events (objects, avatars, terrain, chat)
- `/hubs/hypergrid` — Cross-grid teleport

## License

Internal project for I-Grid OpenSim grid.
