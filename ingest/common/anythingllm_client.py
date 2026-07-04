"""Shared AnythingLLM API client for ingestion pipelines."""

import os
import requests
from pathlib import Path


class AnythingLLMClient:
    def __init__(
        self,
        base_url: str | None = None,
        api_key: str | None = None,
    ):
        self.base_url = (base_url or os.environ["ANYTHINGLLM_URL"]).rstrip("/")
        self.api_key = api_key or os.environ["ANYTHINGLLM_API_KEY"]
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/json",
        })

    def upload_document(self, workspace_slug: str, file_path: Path) -> dict:
        """Upload a document to a workspace via the Developer API."""
        url = f"{self.base_url}/api/v1/document/upload"
        with open(file_path, "rb") as f:
            response = self.session.post(
                url,
                files={"file": (file_path.name, f)},
                data={"addToWorkspaces": workspace_slug},
                timeout=120,
            )
        response.raise_for_status()
        return response.json()

    def list_workspaces(self) -> list:
        url = f"{self.base_url}/api/v1/workspaces"
        response = self.session.get(url, timeout=30)
        response.raise_for_status()
        return response.json().get("workspaces", [])

    def health(self) -> bool:
        try:
            response = self.session.get(f"{self.base_url}/api/ping", timeout=5)
            return response.status_code == 200
        except requests.RequestException:
            return False
