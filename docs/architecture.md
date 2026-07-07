# Architecture

## Overview

Sovereign Warden Platform delivers a ChatGPT/Claude-class experience for employees while keeping company data under organizational control. The system uses a **split client/server architecture**:

- **Client:** Forked AnythingLLM Desktop (Electron) — exact upstream UI, connects to central backend
- **Platform:** Dockerized services — AnythingLLM, LiteLLM, PostgreSQL, Redis, Nginx
- **Data:** Vector DB (Qdrant), object storage (S3/MinIO), document ingestion pipelines
- **Inference:** Profile-switchable — Gemini (POC) or vLLM/Ollama (on-prem)

## Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│  Employees                                                   │
│  Forked AnythingLLM Desktop (Electron, Option B)            │
│  Bundled React UI → API calls to central backend            │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / WSS
┌──────────────────────────▼──────────────────────────────────┐
│  Edge: Nginx                                                 │
│  TLS termination, WebSocket proxy, streaming (no buffering) │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│  Application Layer                                           │
│  ┌─────────────────┐    ┌──────────────────────────────┐   │
│  │ AnythingLLM     │───▶│ LiteLLM Gateway              │   │
│  │ Chat, RAG,      │    │ Auth keys, routing, logging  │   │
│  │ Agents, RBAC    │    └──────────────┬───────────────┘   │
│  └────────┬────────┘                   │                   │
└───────────┼────────────────────────────┼───────────────────┘
            │                            │
┌───────────▼────────────┐    ┌──────────▼───────────────────┐
│  Data Layer            │    │  Inference (profile switch)  │
│  Qdrant / Milvus       │    │  POC: Google Gemini          │
│  PostgreSQL, Redis     │    │  On-prem: vLLM + Ollama      │
│  S3 / MinIO            │    └──────────────────────────────┘
└────────────────────────┘
```

## Data Sovereignty

| Data type | POC | On-prem |
|-----------|-----|---------|
| Source documents | Your storage / Qdrant tenant | Rack-local MinIO + Qdrant |
| Embeddings | Your Qdrant Cloud cluster | Local Qdrant |
| Chat history | AnythingLLM PostgreSQL/SQLite storage | Local PostgreSQL |
| LLM prompts | Sent to Google Gemini API | Never leaves rack |

## Environment Profiles

Switch between POC and on-prem by changing env files and compose overlays — no application code changes:

```bash
# POC
docker compose --env-file .env up -d

# On-prem
docker compose -f docker-compose.yml -f docker-compose.onprem.yml --env-file .env.onprem up -d
```

## Authentication Phases

| Phase | Method |
|-------|--------|
| POC | AnythingLLM native multi-user (username/password + invite) |
| Production | oauth2-proxy + Entra ID OIDC → AnythingLLM Simple SSO passthrough |

## Network Topology (On-Prem / Air-Gap)

```
DMZ VLAN          → Nginx, oauth2-proxy
App VLAN          → AnythingLLM, LiteLLM, PostgreSQL, Redis (no outbound internet)
GPU VLAN          → vLLM, Ollama (isolated, LiteLLM only)
Data VLAN         → Qdrant, MinIO, backup NAS
```

## Key Design Decisions

1. **AnythingLLM Docker for backend** — multi-user RBAC and white-labeling (not available in stock Desktop)
2. **Option B Electron fork** — exact AnythingLLM UI in native desktop installer
3. **LiteLLM as gateway** — single OpenAI-compatible API; swap providers via YAML config
4. **Profile-based infra** — same compose manifests, different `.env` values
