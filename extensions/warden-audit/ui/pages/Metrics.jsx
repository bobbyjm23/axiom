import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { AuditAPI } from "../api/client";
import { AuditHeader } from "../components";
import { AuditPage, useAuditHost } from "../context/AuditHostContext";

export default function MetricsPage() {
  const { id } = useParams();
  const { user, paths, toast } = useAuditHost();
  const [snapshots, setSnapshots] = useState([]);
  const [importing, setImporting] = useState(false);
  const isAdmin = user?.role === "admin";

  const load = useCallback(async () => {
    try {
      const data = await AuditAPI.getEngagement(id);
      setSnapshots(data.metrics_snapshots || []);
    } catch (e) {
      toast(e.message, "error");
    }
  }, [id, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const importMetrics = async () => {
    setImporting(true);
    try {
      await AuditAPI.importMetrics(id);
      toast("Metrics imported", "success");
      load();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setImporting(false);
    }
  };

  const latest = snapshots[0]?.metrics;

  return (
    <AuditPage>
      <Link to={paths.engagement(id)} className="text-sm text-primary-button hover:underline">
        ← Back to engagement
      </Link>
      <AuditHeader title="Platform metrics" role={user?.role} />
      {isAdmin && (
        <button
          type="button"
          onClick={importMetrics}
          disabled={importing}
          className="mb-6 px-4 py-2 rounded-lg bg-primary-button text-white text-sm disabled:opacity-50"
        >
          {importing ? "Importing..." : "Import from LiteLLM & platform"}
        </button>
      )}
      {latest ? (
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 rounded-lg border border-theme-sidebar-border bg-theme-settings-input-bg">
            <h3 className="text-white font-medium mb-2">LiteLLM</h3>
            <ul className="text-theme-text-secondary space-y-1">
              <li>Requests: {latest.litellm?.total_requests ?? "—"}</li>
              <li>Tokens: {latest.litellm?.total_tokens ?? "—"}</li>
              <li>Active users: {latest.litellm?.unique_end_users ?? "—"}</li>
              <li>Est. cost: ${latest.litellm?.estimated_cost_usd?.toFixed?.(2) ?? "—"}</li>
            </ul>
          </div>
          <div className="p-4 rounded-lg border border-theme-sidebar-border bg-theme-settings-input-bg">
            <h3 className="text-white font-medium mb-2">AnythingLLM</h3>
            <ul className="text-theme-text-secondary space-y-1">
              <li>Workspaces: {latest.anythingllm?.workspace_count ?? "—"}</li>
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-theme-text-secondary text-sm">No metrics imported yet.</p>
      )}
    </AuditPage>
  );
}
