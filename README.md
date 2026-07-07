# Sovereign Warden Platform

On-premises AI platform giving employees a ChatGPT/Claude experience with full data sovereignty. Uses AnythingLLM (Docker backend), LiteLLM gateway, and a forked AnythingLLM Desktop Electron client (Option B).

## Architecture

```
Employees → Forked AnythingLLM Desktop (Electron)
         → Nginx (TLS, WebSocket)
         → AnythingLLM Docker (RAG, agents, RBAC)
         → LiteLLM Gateway
         → Gemini (POC) / vLLM+Ollama (on-prem)
```

## Quick Start (POC)

1. Copy environment file and fill in secrets:

```bash
cp .env.poc.example .env
# Edit .env: GEMINI_API_KEY, QDRANT_ENDPOINT, QDRANT_API_KEY, etc.
```

2. Bootstrap the stack:

```bash
./scripts/bootstrap-poc.sh
```

3. Open AnythingLLM at `http://localhost:3000` (via Nginx) or `http://localhost:3001` (direct).

4. Enable multi-user mode in Admin → System Settings, create demo users, configure branding.

5. Build the desktop client:

```bash
./desktop/setup-fork.sh
./desktop/build-desktop.sh
```

## Profiles

| Profile | Command | LLM | Vector DB |
|---------|---------|-----|-----------|
| POC (cloud) | `docker compose --env-file .env up -d` | Gemini via LiteLLM | Qdrant Cloud |
| On-prem | `docker compose -f docker-compose.yml -f docker-compose.onprem.yml --env-file .env.onprem up -d` | vLLM / Ollama | Local Qdrant + MinIO |

## Repository Layout

```
platform/     # LiteLLM, Nginx, AnythingLLM config
desktop/      # Forked AnythingLLM Desktop (Option B)
ingest/       # SharePoint, Confluence connectors (Phase 2)
k8s/          # Kubernetes manifests (Phase 3)
docs/         # Architecture, demo script, hardware sizing
scripts/      # Bootstrap and migration helpers
demo/         # Sample documents and workspace setup
```

## Documentation

- [Architecture](docs/architecture.md)
- [POC Demo Script](docs/poc-demo-script.md)
- [Hardware Sizing](docs/hardware-sizing.md)
- [Desktop Fork Guide](desktop/UPSTREAM.md)
- [Business Plan](docs/business/README.md)

## License

Platform configuration and scripts: MIT. AnythingLLM and LiteLLM retain their upstream licenses.
