# Hardware Sizing Guide

GPU and server recommendations for on-prem Sovereign AI Platform deployments.

## Workload Tiers

| Tier | Team size | Concurrent chat users | Recommended GPUs | Approx. CapEx |
|------|-----------|----------------------|----------------|---------------|
| POC / Pilot | 5–15 | 3–8 | 1× RTX 4090 or L40S (24–48 GB) | $3k–$8k |
| Department | 20–50 | 10–25 | 2× L40S or 1× A100 80GB | $15k–$40k |
| Enterprise | 100+ | 50–100+ | 4–8× H100 80GB | $150k–$400k+ |

## Model Sizing

| Model | VRAM (full) | VRAM (4-bit quant) | Use case |
|-------|-------------|-------------------|----------|
| Llama 3.2 3B | 6 GB | 3 GB | Fast fallback, dev |
| Llama 3.3 70B | 140 GB | 40 GB | Primary enterprise chat |
| Qwen 2.5 72B | 145 GB | 42 GB | Multilingual |
| Mistral Large | 90 GB | 28 GB | EU data residency narrative |
| nomic-embed-text | 1 GB | — | Embeddings (Ollama) |

## Server Configuration

### POC / Small Team (1× GPU server)

```
CPU:     AMD EPYC / Intel Xeon, 16+ cores
RAM:     64 GB DDR5
GPU:     1× NVIDIA RTX 4090 (24 GB) or L40S (48 GB)
Storage: 1 TB NVMe (OS + models) + 2 TB SSD (documents)
Network: 10 GbE
```

Services: Ollama (7B–13B or quantized 70B), local Qdrant, MinIO, AnythingLLM stack.

### Department (2× GPU or 1× A100)

```
CPU:     32+ cores
RAM:     128 GB
GPU:     2× L40S (48 GB) or 1× A100 80GB
Storage: 2 TB NVMe + 4 TB document store
Network: 25 GbE
```

Services: vLLM (70B quantized), Ollama (embeddings), Qdrant, full compose stack.

### Enterprise Rack

```
2× App servers (no GPU):  64 GB RAM, 16 cores — AnythingLLM, LiteLLM, PostgreSQL, Redis, Nginx
2× GPU servers:           4× H100 80GB each — vLLM inference pool
1× Data server:           128 GB RAM, 20 TB storage — Qdrant, MinIO, backups
Network:                  100 GbE GPU fabric, dedicated VLANs (see docs/architecture.md)
```

## Concurrent User Estimates

Assumptions: 70B quantized model, ~4k context, vLLM continuous batching.

| GPU | Model | Approx. concurrent streams |
|-----|-------|---------------------------|
| RTX 4090 24 GB | Llama 3.2 3B | 10–15 |
| L40S 48 GB | Llama 3.3 70B (4-bit) | 8–12 |
| A100 80 GB | Llama 3.3 70B (4-bit) | 15–25 |
| 4× H100 80 GB | Llama 3.3 70B (FP16) | 80–120 |

## Rack Layout (Enterprise)

```
┌─────────────────────────────────────────────┐
│  U1-U2:   Network switch (100GbE)           │
│  U3-U6:   App servers (2×)                  │
│  U7-U14:  GPU servers (2×, 4 GPU each)    │
│  U15-U18: Storage server (Qdrant, MinIO)    │
│  U19-U20: UPS / PDU                         │
└─────────────────────────────────────────────┘
```

Power: Budget ~3.5 kW per H100 server; plan 20+ kW rack capacity with cooling.

## Migration from POC

No hardware required to validate the on-prem profile:

```bash
cp .env.onprem.example .env.onprem
./scripts/migrate-to-onprem.sh
```

Runs Ollama + local Qdrant + MinIO on existing hardware. Add `--profile gpu` when rack GPUs are installed.
