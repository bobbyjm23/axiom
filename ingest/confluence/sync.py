"""Confluence ingestion via Atlassian REST API."""

import argparse
import os
import tempfile
from pathlib import Path

from atlassian import Confluence
from dotenv import load_dotenv

from common.anythingllm_client import AnythingLLMClient

load_dotenv()


def sync(workspace: str, space_key: str):
    confluence = Confluence(
        url=os.environ["CONFLUENCE_BASE_URL"],
        username=os.environ["CONFLUENCE_EMAIL"],
        password=os.environ["CONFLUENCE_API_TOKEN"],
        cloud=True,
    )
    client = AnythingLLMClient()

    pages = confluence.get_all_pages_from_space(space_key, start=0, limit=100)
    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)
        for page in pages:
            page_id = page["id"]
            title = page["title"]
            content = confluence.get_page_by_id(page_id, expand="body.storage")
            body = content["body"]["storage"]["value"]
            # Save as markdown-ish text for AnythingLLM ingestion
            safe_title = "".join(c if c.isalnum() or c in "-_" else "_" for c in title)
            out = tmp_path / f"{safe_title}.md"
            out.write_text(f"# {title}\n\n{body}", encoding="utf-8")
            print(f"Uploading {out.name} → workspace '{workspace}'")
            client.upload_document(workspace, out)

    print(f"Confluence sync complete: {len(pages)} pages from space '{space_key}'")


def main():
    parser = argparse.ArgumentParser(description="Sync Confluence pages to AnythingLLM")
    parser.add_argument("--workspace", default=os.environ.get("INGEST_WORKSPACE_SLUG", "company-knowledge"))
    parser.add_argument("--space", required=True, help="Confluence space key")
    args = parser.parse_args()
    sync(args.workspace, args.space)


if __name__ == "__main__":
    main()
