import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { AuditAPI } from "../api/client";
import { AuditHeader, ScoreInput, RepeatableRowTable } from "../components";
import { AuditPage, useAuditHost } from "../context/AuditHostContext";

export default function PillarForm() {
  const { id, pillarId } = useParams();
  const { user, paths, toast } = useAuditHost();
  const [template, setTemplate] = useState(null);
  const [data, setData] = useState({});
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef(null);

  const editable =
    template?.editable_roles?.includes(user?.role) &&
    !(user?.role === "manager" && ["in_review", "final"].includes(template?.engagementStatus));

  const load = useCallback(async () => {
    try {
      const [templates, engagement] = await Promise.all([
        AuditAPI.templates(),
        AuditAPI.getEngagement(id),
      ]);
      setTemplate({
        ...templates.pillars[pillarId],
        engagementStatus: engagement.engagement.status,
      });
      const existing = engagement.pillars.find((p) => p.pillar_id === pillarId);
      setData(existing?.data || {});
    } catch (e) {
      toast(e.message, "error");
    }
  }, [id, pillarId, toast]);

  useEffect(() => {
    load();
  }, [load]);

  const scheduleSave = (nextData) => {
    setData(nextData);
    if (!editable) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSaving(true);
      try {
        await AuditAPI.savePillar(id, pillarId, nextData);
      } catch (e) {
        toast(e.message, "error");
      } finally {
        setSaving(false);
      }
    }, 800);
  };

  const renderPillar = () => {
    if (!template) return null;

    if (pillarId === "ai_maturity") {
      return (
        <div className="space-y-6">
          {(template.areas || []).map((area) => (
            <div key={area.id}>
              <p className="text-sm text-theme-text-secondary mb-2">{area.label}</p>
              <ScoreInput
                value={data.scores?.[area.id]}
                onChange={(v) =>
                  scheduleSave({ ...data, scores: { ...data.scores, [area.id]: v } })
                }
                disabled={!editable}
              />
            </div>
          ))}
          {(template.questions || []).map((q) => (
            <div key={q.id}>
              <p className="text-sm text-white mb-1">{q.label}</p>
              {q.type === "boolean" ? (
                <select
                  disabled={!editable}
                  className="bg-theme-settings-input-bg border border-theme-sidebar-border rounded px-2 py-1 text-sm text-white"
                  value={data.answers?.[q.id] ?? ""}
                  onChange={(e) =>
                    scheduleSave({
                      ...data,
                      answers: { ...data.answers, [q.id]: e.target.value === "true" },
                    })
                  }
                >
                  <option value="">—</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                <input
                  disabled={!editable}
                  className="w-full bg-theme-settings-input-bg border border-theme-sidebar-border rounded px-2 py-1 text-sm text-white"
                  value={data.answers?.[q.id] ?? ""}
                  onChange={(e) =>
                    scheduleSave({
                      ...data,
                      answers: { ...data.answers, [q.id]: e.target.value },
                    })
                  }
                />
              )}
            </div>
          ))}
        </div>
      );
    }

    if (pillarId === "data_sovereignty") {
      const rows = data.assets || [];
      return (
        <RepeatableRowTable
          readOnly={!editable}
          columns={[
            { key: "data_type", label: "Data type" },
            { key: "risk", label: "Risk" },
            { key: "can_leave_au", label: "Can leave AU?" },
            { key: "workload_category", label: "Workload category" },
          ]}
          rows={rows}
          onChange={(next) => scheduleSave({ ...data, assets: next })}
          onAdd={() =>
            scheduleSave({
              ...data,
              assets: [...rows, { data_type: "", risk: "Medium", workload_category: "" }],
            })
          }
          onRemove={(idx) => scheduleSave({ ...data, assets: rows.filter((_, i) => i !== idx) })}
        />
      );
    }

    if (pillarId === "business_processes") {
      const rows = data.processes || [];
      return (
        <RepeatableRowTable
          readOnly={!editable}
          columns={[
            { key: "department", label: "Department" },
            { key: "process", label: "Process" },
            { key: "hours_per_month", label: "Hours/mo" },
            { key: "automation_potential", label: "Automation" },
            { key: "roi", label: "ROI" },
          ]}
          rows={rows}
          onChange={(next) => scheduleSave({ ...data, processes: next })}
          onAdd={() =>
            scheduleSave({
              ...data,
              processes: [...rows, { department: "", process: "", hours_per_month: "" }],
            })
          }
          onRemove={(idx) =>
            scheduleSave({ ...data, processes: rows.filter((_, i) => i !== idx) })
          }
        />
      );
    }

    if (pillarId === "opportunities") {
      const rows = data.opportunities || [];
      return (
        <RepeatableRowTable
          readOnly={!editable}
          columns={[
            { key: "name", label: "Opportunity" },
            { key: "hours_saved", label: "Hours saved" },
            { key: "complexity", label: "Complexity" },
            { key: "roi", label: "ROI" },
          ]}
          rows={rows}
          onChange={(next) => scheduleSave({ ...data, opportunities: next })}
          onAdd={() =>
            scheduleSave({
              ...data,
              opportunities: [...rows, { name: "", hours_saved: "", complexity: "Low" }],
            })
          }
          onRemove={(idx) =>
            scheduleSave({ ...data, opportunities: rows.filter((_, i) => i !== idx) })
          }
        />
      );
    }

    if (pillarId === "infrastructure") {
      return (
        <div className="space-y-4">
          <div>
            <label className="text-sm text-theme-text-secondary">Primary file storage</label>
            <input
              disabled={!editable}
              className="w-full mt-1 bg-theme-settings-input-bg border border-theme-sidebar-border rounded px-2 py-1 text-white"
              value={data.storage || ""}
              onChange={(e) => scheduleSave({ ...data, storage: e.target.value })}
            />
          </div>
          {(template.checklist || []).map((item) => (
            <label key={item} className="flex items-center gap-2 text-sm text-white">
              <input
                type="checkbox"
                disabled={!editable}
                checked={!!data.checklist?.[item]}
                onChange={(e) =>
                  scheduleSave({
                    ...data,
                    checklist: { ...data.checklist, [item]: e.target.checked },
                  })
                }
              />
              {item}
            </label>
          ))}
        </div>
      );
    }

    if (pillarId === "governance") {
      return (
        <div className="space-y-3">
          {(template.items || []).map((item) => (
            <div key={item} className="flex items-center justify-between gap-4">
              <span className="text-sm text-white">{item}</span>
              <select
                disabled={!editable}
                className="bg-theme-settings-input-bg border border-theme-sidebar-border rounded px-2 py-1 text-sm text-white"
                value={data.items?.[item] || "absent"}
                onChange={(e) =>
                  scheduleSave({ ...data, items: { ...data.items, [item]: e.target.value } })
                }
              >
                {(template.status_options || ["absent", "partial", "present"]).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      );
    }

    return <p className="text-theme-text-secondary">Unknown pillar</p>;
  };

  return (
    <AuditPage>
      <Link to={paths.engagement(id)} className="text-sm text-primary-button hover:underline">
        ← Back to engagement
      </Link>
      <AuditHeader
        title={template?.label || pillarId}
        role={user?.role}
        subtitle={editable ? (saving ? "Saving..." : "Autosave on") : "Read-only"}
      />
      {!editable && user?.role === "manager" && (
        <p className="text-xs text-theme-text-secondary mb-4">Completed by consultant — view only</p>
      )}
      {renderPillar()}
    </AuditPage>
  );
}
