# AWS EKS Adaptation Notes

**Purpose:** Checklist for running Sovereign Warden on **Amazon EKS** (Sydney `ap-southeast-2`) for **Option B — Hosted AU wedge pilots only**.

**Not for:** Open-source LLM production or steady-state hosting — customers should use **on-prem turnkey** (customer-owned GPU). See [../docs/business/finance/hosted-vs-onprem-cogs.md](../docs/business/finance/hosted-vs-onprem-cogs.md).

**Status:** Planning doc — not applied to manifests yet.  
**Related:** [README.md](README.md) · [air-gap-topology.md](air-gap-topology.md) · [../docs/architecture.md](../docs/architecture.md)

---

## When to use EKS vs on-prem K8s

| Profile | Target | Use EKS? |
|---------|--------|----------|
| **Option B — Hosted AU** | Fast pilot; you operate a private tenant | **Yes** — natural fit |
| **Option A — On-prem** | Customer-owned hardware; full sovereignty | **No** — customer rack / private cloud |
| **Air-gap** | No outbound internet from app/gpu/data | **No** — see [air-gap-topology.md](air-gap-topology.md) |

This guide assumes **hosted pilots** where you control the cluster and data stays in **ap-southeast-2**.

---

## Recommended EKS profiles

### Profile A — Hosted POC (start here)

**Skip the GPU namespace.** LiteLLM calls **Gemini** (or another cloud API) for chat; embeddings via a managed API or a small CPU workload.

```
Internet → ALB → anythingllm (app) → litellm → Gemini API
                              ↓
                         postgres, qdrant (data)
```

| Namespace | Deploy? |
|-----------|---------|
| `sovereign-warden-edge` | Yes (ALB + TLS) |
| `sovereign-warden-app` | Yes |
| `sovereign-warden-data` | Yes (Qdrant; MinIO optional) |
| `sovereign-warden-gpu` | **No** (defer) |

**Rough cost:** $500–2,000 AUD/mo for 1–2 pilot tenants on modest node groups.

### Profile B — Hosted with self-hosted inference (avoid)

Add GPU node group + `sovereign-warden-gpu`. Current vLLM manifest requests **4× GPU** for Llama 3.3 70B — expensive on AWS.

**Rough cost:** $15,000–30,000+ AUD/mo depending on instance type and reservation.

**Do not pursue as business model.** Customer on-prem CapEx (~$25k) breaks even in ~2 months vs this COGS. Use Profile B only as a **short bridge** (3–6 months) while customer hardware is procured. See [hosted-vs-onprem-cogs.md](../docs/business/finance/hosted-vs-onprem-cogs.md).

---

## Prerequisites

- [ ] AWS account with billing alerts
- [ ] `kubectl`, `aws` CLI, `eksctl` or Terraform
- [ ] Domain + ACM certificate in `ap-southeast-2` (e.g. `pilot.customer.sovereignwarden.ai`)
- [ ] ECR repos for images you don't want to pull from Docker Hub on every scale event
- [ ] Decide: **Profile A (POC)** or **Profile B (GPU)**

---

## EKS cluster checklist

### 1. Create cluster (Sydney)

- [ ] EKS 1.28+ in **ap-southeast-2**
- [ ] At least 2 AZs for the app node group
- [ ] Managed node group: **2× `m6i.xlarge`** (or `t3.xlarge` for dev) for app + data
- [ ] Enable cluster logging (api, audit) → CloudWatch
- [ ] Tag resources: `project=sovereign-warden`, `environment=pilot`

```bash
# Example with eksctl — adjust names/sizing
eksctl create cluster \
  --name sovereign-warden-pilot \
  --region ap-southeast-2 \
  --version 1.29 \
  --nodegroup-name app-nodes \
  --node-type m6i.xlarge \
  --nodes 2 \
  --nodes-min 2 \
  --nodes-max 4
```

### 2. Storage (EBS)

Current PVCs have **no `storageClassName`** — EKS default (`gp2`/`gp3`) will bind, but set explicitly for production.

- [ ] Create / confirm StorageClass `gp3` (default on modern EKS)
- [ ] Add to every PVC in `k8s/app/`, `k8s/data/`, `k8s/gpu/`:

```yaml
spec:
  storageClassName: gp3
  accessModes: [ReadWriteOnce]
  resources:
    requests:
      storage: 50Gi   # right-size per workload
```

| PVC | Current size | Notes |
|-----|--------------|-------|
| `postgres-pvc` | 50Gi | Fine for pilots |
| Qdrant (StatefulSet) | 200Gi | Consider 50–100Gi for POC |
| `vllm-cache-pvc` | 200Gi | Profile B only |
| `anythingllm-pvc` | check manifest | User uploads |

- [ ] Enable EBS volume encryption (KMS) at cluster or StorageClass level
- [ ] Snapshot policy (AWS Backup) for Postgres + Qdrant volumes

### 3. Ingress (ALB)

Repo has **nginx ConfigMap** (`k8s/config/configmaps.yaml`) but **no edge Deployment yet**. On EKS, prefer AWS Load Balancer Controller over self-managed nginx.

- [ ] Install [AWS Load Balancer Controller](https://kubernetes-sigs.github.io/aws-load-balancer-controller/)
- [ ] Create Ingress → ALB with ACM TLS cert
- [ ] WebSocket support for AnythingLLM agent routes (same paths as nginx config: `/api/agent-invocation/*`)
- [ ] `client_max_body_size` equivalent: ALB idle timeout ≥ 600s; target group stickiness if needed

Example annotation pattern (sketch — verify against current controller version):

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: sovereign-warden
  namespace: sovereign-warden-edge
  annotations:
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
    alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:ap-southeast-2:...
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]'
spec:
  ingressClassName: alb
  rules:
    - host: pilot.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: anythingllm
                port:
                  number: 3001
```

- [ ] Restrict ALB security group to customer IP allowlist or VPN where possible

### 4. Secrets

- [ ] Create `sovereign-secrets` in `sovereign-warden-app` (see [README.md](README.md))
- [ ] For Profile A, include `GEMINI_API_KEY` in secrets / LiteLLM env
- [ ] **Production:** [External Secrets Operator](https://external-secrets.io/) → AWS Secrets Manager
- [ ] Rotate `LITELLM_MASTER_KEY`, `JWT_SECRET`, `POSTGRES_PASSWORD` before first customer

### 5. Container images (ECR)

- [ ] Mirror to ECR: `anythingllm`, `litellm`, `postgres`, `qdrant`, `redis` (if added), `vllm` (Profile B)
- [ ] Update `image:` fields in manifests or use `imagePullSecrets`
- [ ] Pin tags — avoid `:latest` in production

### 6. LiteLLM config — Profile A change

Current ConfigMap routes chat to **vLLM on GPU**:

```yaml
# k8s/config/configmaps.yaml (today)
api_base: http://vllm.sovereign-warden-gpu.svc.cluster.local:8000/v1
```

For hosted POC, create an overlay (don't edit base manifests in place until tested):

- [ ] Point `llama3-enterprise` model to Gemini via LiteLLM provider config, **or**
- [ ] Use `openai/` compatible proxy with `GEMINI_API_KEY`
- [ ] Point embeddings to a cloud embedding API or run `nomic-embed-text` on CPU (slow but OK for pilot)

- [ ] Update AnythingLLM env in `k8s/app/anythingllm.yaml` if embedding path changes

### 7. Network policies — relax for hosted

`k8s/edge/network-policies.yaml` **denies internet egress** from app namespace (on-prem air-gap design). On EKS hosted POC, LiteLLM **must** reach Gemini.

- [ ] **Do not apply** `deny-egress-app` as-is for Profile A, **or**
- [ ] Add egress rule to `0.0.0.0/0:443` for pods labeled `app=litellm` only
- [ ] Use [VPC endpoints](https://docs.aws.amazon.com/vpc/latest/privatelink/) for ECR/S3 if nodes are private
- [ ] Document data flow: prompts go to Gemini region — disclose in customer DPA

### 8. GPU node group (Profile B only)

- [ ] Install [NVIDIA device plugin](https://github.com/NVIDIA/k8s-device-plugin)
- [ ] Node group: e.g. `g5.12xlarge` (4× A10G) — match `nvidia.com/gpu: "4"` in `k8s/gpu/vllm-ollama.yaml` or **reduce** GPU request for smaller models
- [ ] Label nodes: `sovereign-warden.ai/role=gpu`
- [ ] Model weights: S3 bucket + init container, or EFS mount at `/root/.cache/huggingface`
- [ ] Consider smaller model (8B) for pilot GPU economics

### 9. Deploy order (unchanged)

```bash
kubectl apply -f k8s/namespaces.yaml

# Secrets first (manual)
kubectl create secret generic sovereign-secrets -n sovereign-warden-app \
  --from-literal=POSTGRES_PASSWORD=... \
  --from-literal=JWT_SECRET=... \
  --from-literal=LITELLM_MASTER_KEY=... \
  --from-literal=GEMINI_API_KEY=...

kubectl apply -f k8s/data/ -n sovereign-warden-data
kubectl apply -f k8s/config/ -n sovereign-warden-app
kubectl apply -f k8s/app/ -n sovereign-warden-app
# Profile B only:
# kubectl apply -f k8s/gpu/ -n sovereign-warden-gpu
kubectl apply -f k8s/edge/ -n sovereign-warden-edge   # after adapting policies
kubectl apply -f k8s/cronjob-ingest.yaml -n sovereign-warden-app
```

### 10. Observability

- [ ] LiteLLM Prometheus metrics (`:4000/metrics`) — see [README.md](README.md)
- [ ] Amazon Managed Prometheus or self-hosted Prometheus + Grafana
- [ ] CloudWatch Container Insights for node/pod metrics
- [ ] Alert on: pod restarts, PVC usage >80%, ALB 5xx rate

### 11. Multi-tenant (later)

Current manifests are **single-tenant**. For multiple hosted pilots on one EKS cluster:

- [ ] Namespace per customer **or** logical isolation via AnythingLLM workspaces only (weaker)
- [ ] Separate secrets, PVCs, and ingress host per tenant
- [ ] Consider **one EKS cluster per enterprise customer** for stronger isolation

---

## Manifest gaps to close (repo work)

These are not in `k8s/` yet — needed before EKS is production-ready:

| Gap | Priority |
|-----|----------|
| Edge Deployment (nginx or ALB Ingress manifest) | High |
| Redis Deployment (referenced by Docker stack, missing in k8s) | High |
| LiteLLM Deployment manifest | High — only ConfigMap exists today |
| `storageClassName: gp3` on PVCs | Medium |
| Kustomize overlay: `eks-hosted/` vs `onprem-airgap/` | Medium |
| External Secrets Operator manifests | Medium |
| Profile A LiteLLM ConfigMap (Gemini) | High for POC |

---

## Cost ballpark (ap-southeast-2, Profile A)

| Component | Estimate (AUD/mo) |
|-----------|-------------------|
| EKS control plane | ~$110 |
| 2× m6i.xlarge nodes | ~$400–500 |
| EBS (100–300Gi gp3) | ~$30–80 |
| ALB | ~$30–50 |
| Data transfer + Gemini API | Variable |
| **Total infra (ex-Gemini)** | **~$600–800/mo** |

Add customer-specific Gemini usage separately. Profile B GPU dominates cost.

---

## Suggested pick-up order (this week)

1. **Spin up dev EKS cluster** with eksctl (Profile A, single AZ OK for dev)
2. **Apply namespaces + data + app** — fix whatever breaks (PVC binding, missing Redis/LiteLLM)
3. **Create LiteLLM + Redis manifests** if not present (copy from `docker-compose.yml`)
4. **Gemini LiteLLM overlay** — prove chat works without GPU namespace
5. **ALB Ingress** — HTTPS access to AnythingLLM
6. **Skip** network policies until core path works; then add relaxed egress policy
7. **Document** actual monthly cost from AWS Cost Explorer after 48h run

---

## Sovereignty disclosure (hosted AU)

Even on EKS Sydney:

- **Infrastructure** is in AU (good for Privacy Act narrative)
- **Inference** on Profile A goes to **Gemini** (Google API — confirm data processing region in DPA)
- **Profile B** keeps inference on your EKS GPU (higher cost, stronger story)

Match deployment profile to what you sell: hosted pilot vs full sovereignty.

---

## Quick reference — files to touch

| File | EKS change |
|------|------------|
| `k8s/config/configmaps.yaml` | LiteLLM → Gemini (Profile A overlay) |
| `k8s/app/anythingllm.yaml` | Embedding engine env if not using Ollama |
| `k8s/app/postgres.yaml` | `storageClassName: gp3` |
| `k8s/data/qdrant-minio.yaml` | `storageClassName: gp3`; resize storage |
| `k8s/gpu/vllm-ollama.yaml` | Profile B only; reduce GPU count for cost |
| `k8s/edge/network-policies.yaml` | Relax egress for hosted; keep for on-prem overlay |
| `k8s/edge/` (new) | ALB Ingress manifest |

---

*Last updated: July 2026. Revisit after first EKS deploy — move validated overlays into `k8s/overlays/eks-hosted/`.*
