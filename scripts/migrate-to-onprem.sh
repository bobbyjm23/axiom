#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "==> Sovereign Warden Platform — On-Prem Migration Helper"

ENV_FILE="${1:-.env.onprem}"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "ERROR: $ENV_FILE not found. Copy .env.onprem.example to $ENV_FILE first."
  exit 1
fi

# shellcheck disable=SC1091
source "$(dirname "${BASH_SOURCE[0]}")/lib/load-env.sh"
load_env_file "$ENV_FILE"

echo "==> Pre-migration checklist"
echo "  [ ] Embedding model pinned in both profiles (dimension mismatch breaks vectors)"
echo "  [ ] Qdrant collections exported from cloud (if migrating data)"
echo "  [ ] Gemini API key removed from on-prem .env"
echo "  [ ] LiteLLM config switched to config.onprem.yaml"
echo ""

read -r -p "Continue with on-prem stack startup? [y/N] " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

echo "==> Starting on-prem overlay..."
docker compose \
  -f docker-compose.yml \
  -f docker-compose.onprem.yml \
  --env-file "$ENV_FILE" \
  up -d postgres redis qdrant minio ollama

echo "==> Waiting for Qdrant..."
for i in $(seq 1 20); do
  if curl -sf "http://localhost:6333/healthz" >/dev/null 2>&1; then
    echo "Qdrant is healthy."
    break
  fi
  sleep 2
done

echo "==> Pulling Ollama embedding model..."
docker compose \
  -f docker-compose.yml \
  -f docker-compose.onprem.yml \
  --env-file "$ENV_FILE" \
  exec -T ollama ollama pull nomic-embed-text || echo "WARNING: ollama pull failed — run manually"

echo "==> Starting LiteLLM + AnythingLLM with on-prem config..."
docker compose \
  -f docker-compose.yml \
  -f docker-compose.onprem.yml \
  --env-file "$ENV_FILE" \
  up -d litellm anythingllm nginx

echo ""
echo "==> On-prem stack started (without GPU vLLM)."
echo "To enable vLLM (requires NVIDIA GPU):"
echo "  docker compose -f docker-compose.yml -f docker-compose.onprem.yml --env-file $ENV_FILE --profile gpu up -d vllm"
echo ""
echo "Verify profile swap:"
echo "  curl http://localhost:4000/health/liveliness"
echo "  curl -H \"Authorization: Bearer \$LITELLM_MASTER_KEY\" http://localhost:4000/v1/models"
