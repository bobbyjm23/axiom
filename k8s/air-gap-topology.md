# Air-Gap Network Topology

Production network segmentation for full data sovereignty.

## VLAN Layout

```
┌─────────────────────────────────────────────────────────────┐
│  DMZ (VLAN 10) — 10.0.10.0/24                              │
│  Nginx ingress, oauth2-proxy, TLS termination               │
│  Only inbound 443 from corporate network / VPN              │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│  Application (VLAN 20) — 10.0.20.0/24                       │
│  AnythingLLM, LiteLLM, PostgreSQL, Redis                    │
│  NO outbound internet (egress denied at firewall)           │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┐
          │                │                │
┌─────────▼──────┐ ┌───────▼───────┐ ┌──────▼────────┐
│ GPU (VLAN 30)  │ │ Data (VLAN 40)│ │ Mgmt (VLAN 99)│
│ 10.0.30.0/24   │ │ 10.0.40.0/24  │ │ 10.0.99.0/24  │
│ vLLM, Ollama   │ │ Qdrant, MinIO │ │ Admin, backup │
│ LiteLLM only   │ │ App tier only │ │ No user access│
└────────────────┘ └───────────────┘ └───────────────┘
```

## Firewall Rules

| Source | Destination | Port | Action |
|--------|-------------|------|--------|
| Corporate VPN | DMZ | 443 | ALLOW |
| DMZ | App VLAN | 3001, 4000 | ALLOW |
| App VLAN | GPU VLAN | 8000, 11434 | ALLOW |
| App VLAN | Data VLAN | 6333, 9000 | ALLOW |
| App VLAN | Internet | * | DENY |
| GPU VLAN | Internet | * | DENY |
| Data VLAN | Internet | * | DENY |
| Mgmt VLAN | All internal | 22, 6443 | ALLOW (admin only) |

## Model Weight Distribution (Air-Gap)

1. Download model weights on internet-connected staging machine
2. Verify checksums (SHA256 manifest)
3. Transfer to Data VLAN via sneakernet or one-way diode
4. Load into vLLM from MinIO mirror on Data VLAN
5. Revoke staging machine access

## Kubernetes Alignment

NetworkPolicies in `k8s/edge/network-policies.yaml` enforce the same segmentation at the pod level. Combine with VLAN-level firewall rules for defense in depth.

## DNS

Internal DNS only. No external DNS resolution from App, GPU, or Data VLANs. Run internal DNS resolver on Mgmt VLAN.
