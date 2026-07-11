import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { AuditAPI } from "../api/client";
import { AuditHeader } from "../components";
import { AuditPage, useAuditHost } from "../context/AuditHostContext";
import { getAnythingLLMTheme } from "../theme/anythingllmTheme";

export default function DeliverablesPage() {
  const { id } = useParams();
  const { user, paths, toast } = useAuditHost();
  const [deliverables, setDeliverables] = useState([]);
  const [selected, setSelected] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [theme, setTheme] = useState(getAnythingLLMTheme);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    const sync = () => setTheme(getAnythingLLMTheme());
    window.addEventListener("storage", sync);
    window.addEventListener("focus", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", sync);
    };
  }, []);

  const load = useCallback(async () => {
    try {
      const { deliverables: list } = await AuditAPI.listDeliverables(id);
      setDeliverables(list);
      if (list.length && !selected) setSelected(list[0]);
    } catch (e) {
      toast(e.message, "error");
    }
  }, [id, selected, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const generate = async () => {
    setGenerating(true);
    try {
      await AuditAPI.generateDeliverables(id);
      toast("Deliverables generated", "success");
      setSelected(null);
      load();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setGenerating(false);
    }
  };

  const download = async (type) => {
    try {
      const res = await AuditAPI.exportDeliverable(id, type, "md");
      const text = await res.text();
      const blob = new Blob([text], { type: "text/markdown" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${type}.md`;
      a.click();
    } catch (e) {
      toast(e.message, "error");
    }
  };

  return (
    <AuditPage className="flex flex-col md:flex-row gap-6">
      <div className="md:w-64 shrink-0">
        <Link to={paths.engagement(id)} className="text-sm text-primary-button hover:underline">
          ← Back to engagement
        </Link>
        <AuditHeader title="Deliverables" role={user?.role} />
        {isAdmin && (
          <button
            type="button"
            onClick={generate}
            disabled={generating}
            className="mb-4 w-full px-3 py-2 rounded-lg bg-primary-button text-white text-sm disabled:opacity-50"
          >
            {generating ? "Generating..." : "Generate reports"}
          </button>
        )}
        <ul className="space-y-1">
          {deliverables.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => setSelected(d)}
                className={`text-left w-full text-sm px-2 py-1 rounded ${
                  selected?.id === d.id
                    ? "bg-primary-button/20 text-primary-button"
                    : "text-theme-text-secondary hover:text-white"
                }`}
              >
                {d.deliverable_type.replace(/_/g, " ")}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 min-w-0">
        {selected ? (
          <>
            <button
              type="button"
              onClick={() => download(selected.deliverable_type)}
              className="mb-4 text-sm text-primary-button hover:underline"
            >
              Download Markdown
            </button>
            <article
              className={`prose max-w-none text-sm text-theme-text-primary ${
                theme === "light" ? "" : "prose-invert"
              }`}
            >
              <ReactMarkdown>{selected.content_md}</ReactMarkdown>
            </article>
          </>
        ) : (
          <p className="text-theme-text-secondary text-sm">
            {deliverables.length
              ? "Select a deliverable"
              : "No deliverables yet. Generate reports when the audit is ready."}
          </p>
        )}
      </div>
    </AuditPage>
  );
}
