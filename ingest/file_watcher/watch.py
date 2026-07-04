"""Watch a local directory and upload new/changed files to AnythingLLM."""

import argparse
import os
import time
from pathlib import Path

from dotenv import load_dotenv
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

from common.anythingllm_client import AnythingLLMClient

load_dotenv()

ALLOWED_SUFFIXES = {".pdf", ".docx", ".txt", ".md", ".doc"}


class DocumentHandler(FileSystemEventHandler):
    def __init__(self, client: AnythingLLMClient, workspace: str):
        self.client = client
        self.workspace = workspace

    def on_created(self, event):
        if event.is_directory:
            return
        path = Path(event.src_path)
        if path.suffix.lower() in ALLOWED_SUFFIXES:
            print(f"New file detected: {path.name}")
            self.client.upload_document(self.workspace, path)


def watch(watch_path: str, workspace: str):
    client = AnythingLLMClient()
    handler = DocumentHandler(client, workspace)
    observer = Observer()
    observer.schedule(handler, watch_path, recursive=True)
    observer.start()
    print(f"Watching {watch_path} → workspace '{workspace}' (Ctrl+C to stop)")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


def main():
    parser = argparse.ArgumentParser(description="Watch directory and ingest to AnythingLLM")
    parser.add_argument("--path", required=True, help="Directory to watch")
    parser.add_argument("--workspace", default=os.environ.get("INGEST_WORKSPACE_SLUG", "company-knowledge"))
    args = parser.parse_args()
    watch(args.path, args.workspace)


if __name__ == "__main__":
    main()
