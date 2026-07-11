import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { AuditAPI } from "../api/client";
import { AuditHeader, PillarProgress } from "../components";
import { AuditPage, useAuditHost } from "../context/AuditHostContext";

const PILLAR_LINKS = [
  { id: "ai_maturity", label: "AI Maturity" },
  { id: "data_sovereignty", label: "Data Sovereignty" },
  { id: "business_processes", label: "Process Mapping" },
  { id: "opportunities", label: "Opportunities" },
  { id: "infrastructure", label: "Infrastructure" },
  { id: "governance", label: "Governance" },
];

export default function EngagementHub() {
  const { id } = useParams();
  const { user, paths, toast } = useAuditHost();
  const [data, setData] = useState(null);
  const isAdmin = user?.role === "admin";

  const load = useCallback(async () => {
    try {
      setData(await AuditAPI.getEngagement(id));
    } catch (e) {
      toast(e.message, "error");
    }
  }, [id, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (status) => {
    try {
      await AuditAPI.updateStatus(id, status);
      toast(`Status: ${status}`, "success");
      load();
    } catch (e) {
      toast(e.message, "error");
    }
  };

  const engagement = data?.engagement;

  return (
    <AuditPage>
      <AuditHeader
        title="Audit engagement"
        subtitle={engagement ? `${engagement.type} · ${engagement.status}` : ""}
        role={user?.role}
        status={engagement?.status}
      />
      {data && <PillarProgress progress={data.progress} />}

      {engagement?.status === "awaiting_client_input" && user?.role === "manager" && (
        <div className="my-4 p-3 rounded border border-yellow-500/40 text-sm text-yellow-200">
          Please complete your assigned sections below.
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3 mt-6">
        {PILLAR_LINKS.map((p) => (
          <Link
            key={p.id}
            to={paths.pillar(id, p.id)}
            className="p-4 rounded-lg border border-theme-sidebar-border hover:border-primary-button bg-theme-settings-input-bg"
          >
            <span className="text-white">{p.label}</span>
            <span className="block text-xs text-theme-text-secondary mt-1">
              {data?.progress?.pillars?.[p.id] ?? 0}% complete
            </span>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mt-8">
        <Link to={paths.metrics(id)} className="text-sm text-primary-button hover:underline">
          Platform metrics →
        </Link>
        <Link to={paths.deliverables(id)} className="text-sm text-primary-button hover:underline">
          Deliverables →
        </Link>
      </div>

      {isAdmin && engagement && (
        <div className="mt-8 flex flex-wrap gap-2">
          {["draft", "awaiting_client_input", "in_review", "final"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`px-3 py-1 text-xs rounded border ${
                engagement.status === s
                  ? "border-primary-button text-primary-button"
                  : "border-theme-sidebar-border text-theme-text-secondary"
              }`}
            >
              {s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      )}
    </AuditPage>
  );
}
