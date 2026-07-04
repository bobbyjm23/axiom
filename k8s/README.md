# Kubernetes Deployment (Phase 3)

Production manifests for on-prem rack deployment with GPU node pools and air-gap network topology.

## Prerequisites

- Kubernetes 1.28+
- NVIDIA GPU Operator / device plugin installed on GPU nodes
- Internal container registry (air-gap) or internet access for image pull
- StorageClass for PVCs (local-path, Longhorn, or SAN)

## Network Topology

```
DMZ namespace (sovereign-edge)     → nginx-ingress, oauth2-proxy
App namespace (sovereign-app)        → anythingllm, litellm, postgres, redis
GPU namespace (sovereign-gpu)        → vllm (GPU node pool)
Data namespace (sovereign-data)      → qdrant, minio
```

Apply namespaces first:

```bash
kubectl apply -f k8s/namespaces.yaml
```

## Deploy Order

```bash
# 1. Data layer
kubectl apply -f k8s/data/ -n sovereign-data

# 2. App layer
kubectl apply -f k8s/config/ -n sovereign-app
kubectl apply -f k8s/app/ -n sovereign-app

# 3. GPU inference (requires GPU nodes)
kubectl apply -f k8s/gpu/ -n sovereign-gpu

# 4. Edge / ingress
kubectl apply -f k8s/edge/ -n sovereign-edge

# 5. Scheduled ingestion
kubectl apply -f k8s/cronjob-ingest.yaml -n sovereign-app
```

## Secrets

Create secrets before deploying (do not commit real values):

```bash
kubectl create secret generic sovereign-secrets -n sovereign-app \
  --from-literal=POSTGRES_PASSWORD=... \
  --from-literal=JWT_SECRET=... \
  --from-literal=LITELLM_MASTER_KEY=... \
  --from-literal=GEMINI_API_KEY=...

kubectl create secret generic sovereign-qdrant -n sovereign-data \
  --from-literal=QDRANT_API_KEY=...
```

## GPU Node Pool

Label GPU nodes:

```bash
kubectl label nodes gpu-node-1 nvidia.com/gpu.present=true
kubectl label nodes gpu-node-1 sovereign.ai/role=gpu
```

vLLM deployment uses `nodeSelector` and `nvidia.com/gpu` resource limits.

## Air-Gap

1. Mirror images to internal registry: `registry.internal.company/sovereign/`
2. Update image references in manifests
3. Block egress from `sovereign-app` and `sovereign-gpu` namespaces via NetworkPolicy
4. Load model weights via init container from internal MinIO mirror

## Monitoring

LiteLLM exposes Prometheus metrics at `:4000/metrics`. Scrape via ServiceMonitor or PodMonitor if using Prometheus Operator.
