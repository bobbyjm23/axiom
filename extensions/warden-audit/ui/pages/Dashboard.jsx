import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuditAPI } from "../api/client";
import { AuditHeader } from "../components";
import { AuditPage, useAuditHost } from "../context/AuditHostContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, paths, toast } = useAuditHost();
  const [loading, setLoading] = useState(true);
  const [instance, setInstance] = useState(null);

  const load = useCallback(async () => {
    try {
      setInstance(await AuditAPI.instance());
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const createEngagement = async () => {
    try {
      const { engagement } = await AuditAPI.createEngagement({ type: "baseline" });
      toast("Baseline audit created", "success");
      navigate(paths.engagement(engagement.id));
    } catch (e) {
      toast(e.message, "error");
    }
  };

  const isAdmin = user?.role === "admin";

  if (user?.role === "default") {
    return (
      <AuditPage>
        <p className="text-sm text-theme-text-secondary">
          AI Readiness Audit requires admin or manager role.
        </p>
      </AuditPage>
    );
  }

  return (
    <AuditPage>
      <AuditHeader
        title="AI Readiness Audit"
        subtitle="Assess AI maturity, sovereignty risk, and opportunities"
        role={user?.role}
      />

      {loading ? (
        <p className="text-theme-text-secondary">Loading...</p>
      ) : (
        <>
          {!instance?.organization && isAdmin && (
            <div className="mb-6 p-4 rounded-lg border border-theme-sidebar-border bg-theme-settings-input-bg">
              <p className="text-sm text-theme-text-secondary mb-3">
                No organization bound to this instance. Create one to begin.
              </p>
              <Link to={paths.newOrg()} className="text-primary-button text-sm hover:underline">
                Create organization →
              </Link>
            </div>
          )}

          {instance?.organization && (
            <div className="mb-6">
              <h2 className="text-lg text-white font-medium">{instance.organization.name}</h2>
              <p className="text-sm text-theme-text-secondary">
                {instance.organization.industry || "Industry not set"} · {instance.organization.country}
              </p>
            </div>
          )}

          {instance?.engagements?.length > 0 ? (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-theme-text-secondary uppercase">Engagements</h3>
              {instance.engagements.map((e) => (
                <Link
                  key={e.id}
                  to={paths.engagement(e.id)}
                  className="block p-4 rounded-lg border border-theme-sidebar-border hover:border-primary-button bg-theme-settings-input-bg"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white capitalize">{e.type} audit</span>
                    <span className="text-xs text-primary-button">{e.status}</span>
                  </div>
                  {e.overall_score != null && (
                    <p className="text-sm text-theme-text-secondary mt-1">Score: {e.overall_score}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            instance?.organization &&
            isAdmin && (
              <button
                type="button"
                onClick={createEngagement}
                className="px-4 py-2 rounded-lg bg-primary-button text-white text-sm"
              >
                Start baseline audit
              </button>
            )
          )}

          {instance?.engagements?.[0]?.status === "awaiting_client_input" && user?.role === "manager" && (
            <div className="mt-6 p-4 rounded-lg border border-yellow-500/40 bg-yellow-500/10 text-sm">
              Your input is requested on collaborative sections (process mapping, infrastructure,
              governance).
            </div>
          )}
        </>
      )}
    </AuditPage>
  );
}
