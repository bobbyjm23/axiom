# Document Ingestion Pipelines (Phase 2)

Connectors that push normalized documents into AnythingLLM workspaces via the [Developer API](https://docs.anythingllm.com/features/api).

## Connectors

| Connector | Directory | Status |
|-----------|-----------|--------|
| SharePoint / OneDrive | `sharepoint/` | Scaffold ready |
| Confluence | `confluence/` | Scaffold ready |
| Generic file watcher | `file-watcher/` | Scaffold ready |

## Environment Variables

```bash
# AnythingLLM API
ANYTHINGLLM_URL=http://localhost:3001
ANYTHINGLLM_API_KEY=your-api-key-from-admin-ui

# SharePoint (Microsoft Graph)
SHAREPOINT_TENANT_ID=
SHAREPOINT_CLIENT_ID=
SHAREPOINT_CLIENT_SECRET=
SHAREPOINT_SITE_ID=

# Confluence
CONFLUENCE_BASE_URL=https://your-org.atlassian.net
CONFLUENCE_EMAIL=
CONFLUENCE_API_TOKEN=
CONFLUENCE_SPACE_KEY=

# Target workspace
INGEST_WORKSPACE_SLUG=company-knowledge
```

## Usage

```bash
# Install dependencies
cd ingest && pip install -r requirements.txt

# SharePoint sync
python -m sharepoint.sync --workspace company-knowledge

# Confluence sync
python -m confluence.sync --workspace company-knowledge --space HR

# Local directory watch
python -m file_watcher.watch --path /mnt/docs --workspace company-knowledge
```

## OCR Pipeline

| Phase | Engine | Notes |
|-------|--------|-------|
| POC | Tesseract | `apt install tesseract-ocr` |
| On-prem | PaddleOCR | Self-hosted, no cloud dependency |

OCR runs before document upload when PDF text extraction yields empty content.

## Scheduling

Run connectors via cron or Kubernetes CronJob (see `k8s/cronjob-ingest.yaml`):

```cron
0 2 * * * cd /opt/sovereign-ai/ingest && python -m sharepoint.sync
0 3 * * * cd /opt/sovereign-ai/ingest && python -m confluence.sync
```
