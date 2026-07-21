#!/bin/bash
# I-Grid Viewer - Build and Deploy Script
# Usage: ./deploy.sh [dev|prod]

set -e

MODE=${1:-dev}
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== I-Grid Viewer - Build & Deploy ==="
echo "Mode: $MODE"
echo ""

# Step 1: Build frontend
echo "Building frontend..."
cd "$PROJECT_DIR/src/Client"
npm install
npm run build
echo "Frontend built successfully."
echo ""

# Step 2: Build backend
echo "Building backend..."
cd "$PROJECT_DIR/src/Server"
dotnet publish -c Release -o "$PROJECT_DIR/publish"
echo "Backend built successfully."
echo ""

if [ "$MODE" = "prod" ]; then
  # Step 3: Docker build
  echo "Building Docker image..."
  cd "$PROJECT_DIR"
  docker build -t igrid-viewer:latest .
  echo "Docker image built successfully."
  echo ""

  # Step 4: Run container
  echo "Starting container..."
  docker-compose up -d
  echo "Container started. Access at http://localhost:5000"
else
  # Development mode
  echo "Starting development server..."
  cd "$PROJECT_DIR/src/Server"
  dotnet run --urls="http://localhost:5000" &
  SERVER_PID=$!

  cd "$PROJECT_DIR/src/Client"
  npm run dev &
  CLIENT_PID=$!

  echo ""
  echo "Development servers started:"
  echo "  Frontend: http://localhost:3001"
  echo "  Backend:  http://localhost:5000"
  echo "  Swagger:  http://localhost:5000/swagger"
  echo ""
  echo "Press Ctrl+C to stop"

  trap "kill $SERVER_PID $CLIENT_PID 2>/dev/null; exit" INT TERM
  wait
fi
