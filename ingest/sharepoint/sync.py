"""SharePoint / OneDrive ingestion via Microsoft Graph API."""

import argparse
import os
import tempfile
from pathlib import Path

import msal
import requests
from dotenv import load_dotenv

from common.anythingllm_client import AnythingLLMClient

load_dotenv()


def get_graph_token() -> str:
    app = msal.ConfidentialClientApplication(
        os.environ["SHAREPOINT_CLIENT_ID"],
        authority=f"https://login.microsoftonline.com/{os.environ['SHAREPOINT_TENANT_ID']}",
        client_credential=os.environ["SHAREPOINT_CLIENT_SECRET"],
    )
    result = app.acquire_token_for_client(
        scopes=["https://graph.microsoft.com/.default"]
    )
    if "access_token" not in result:
        raise RuntimeError(f"Token acquisition failed: {result.get('error_description')}")
    return result["access_token"]


def list_drive_items(token: str, site_id: str) -> list:
    headers = {"Authorization": f"Bearer {token}"}
    url = f"https://graph.microsoft.com/v1.0/sites/{site_id}/drive/root/children"
    items = []
    while url:
        response = requests.get(url, headers=headers, timeout=60)
        response.raise_for_status()
        data = response.json()
        items.extend(data.get("value", []))
        url = data.get("@odata.nextLink")
    return items


def download_item(token: str, item: dict, dest: Path) -> Path:
    if "file" not in item:
        return None
    headers = {"Authorization": f"Bearer {token}"}
    url = f"https://graph.microsoft.com/v1.0/drives/{item['parentReference']['driveId']}/items/{item['id']}/content"
    response = requests.get(url, headers=headers, timeout=120)
    response.raise_for_status()
    out = dest / item["name"]
    out.write_bytes(response.content)
    return out


def sync(workspace: str, site_id: str | None = None):
    site_id = site_id or os.environ["SHAREPOINT_SITE_ID"]
    token = get_graph_token()
    client = AnythingLLMClient()
    items = list_drive_items(token, site_id)

    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        for item in items:
            local = download_item(token, item, tmp_path)
            if local and local.suffix.lower() in {".pdf", ".docx", ".txt", ".md"}:
                print(f"Uploading {local.name} → workspace '{workspace}'")
                client.upload_document(workspace, local)

    print(f"SharePoint sync complete: {len(items)} items processed")


def main():
    parser = argparse.ArgumentParser(description="Sync SharePoint documents to AnythingLLM")
    parser.add_argument("--workspace", default=os.environ.get("INGEST_WORKSPACE_SLUG", "company-knowledge"))
    parser.add_argument("--site-id", default=None)
    args = parser.parse_args()
    sync(args.workspace, args.site_id)


if __name__ == "__main__":
    main()
