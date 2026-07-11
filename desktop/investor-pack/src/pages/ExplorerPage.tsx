import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocTree } from "../components/DocTree";
import { MarkdownView } from "../components/MarkdownView";
import { useAuth } from "../context/AuthContext";
import type { DocManifest } from "../types";

export function ExplorerPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [manifest, setManifest] = useState<DocManifest | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDocument = useCallback(
    async (docPath: string) => {
      if (!token) return;
      setLoading(true);
      setError("");
      const res = await window.investorPack.readDocument(token, docPath);
      if (res.ok && res.content) {
        setContent(res.content);
        setSelectedPath(docPath);
      } else {
        setError(res.error || "Failed to load document");
        setContent("");
      }
      setLoading(false);
    },
    [token]
  );

  useEffect(() => {
    if (!token) return;
    window.investorPack.getManifest(token).then((res) => {
      if (res.ok && res.manifest) {
        setManifest(res.manifest);
        if (res.manifest.defaultDoc) {
          loadDocument(res.manifest.defaultDoc);
        }
      } else {
        setError(res.error || "Failed to load manifest");
        setLoading(false);
      }
    });
  }, [token, loadDocument]);

  return (
    <>
      <button
        type="button"
        className="pill pill--ghost logout-fixed"
        onClick={() => navigate("/")}
      >
        ← Back to home
      </button>
      <div className="explorer">
        <aside className="explorer__sidebar">
          <div className="explorer__sidebar-title">Documents</div>
          {manifest && (
            <DocTree
              tree={manifest.tree}
              selectedPath={selectedPath}
              onSelect={loadDocument}
            />
          )}
        </aside>
        <main className="explorer__content">
          {loading && <p className="markdown-body__loading">Loading…</p>}
          {error && !loading && (
            <p className="markdown-body__error">{error}</p>
          )}
          {!loading && !error && content && selectedPath && (
            <MarkdownView
              content={content}
              currentPath={selectedPath}
              onNavigate={loadDocument}
            />
          )}
        </main>
      </div>
    </>
  );
}
