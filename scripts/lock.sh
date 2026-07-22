#!/bin/bash
LOCK="/tmp/igrid-viewer.lock"
if [ -f "$LOCK" ]; then
  PID=$(cat "$LOCK")
  if kill -0 "$PID" 2>/dev/null; then
    echo "LOCKED: Tasia już pracuje (PID $PID)"
    exit 1
  fi
  rm -f "$LOCK"
fi
echo $$ > "$LOCK"
echo "Lock acquired (PID $$)"
