#!/usr/bin/env bash
set -euo pipefail

SPEC="venice.openapi.v3.yaml"

echo "[1/2] Spectral lint..."
npx spectral lint "$SPEC" --verbose

echo "[2/2] Redocly lint..."
npx @redocly/cli lint "$SPEC"

echo "✅ Linting complete."