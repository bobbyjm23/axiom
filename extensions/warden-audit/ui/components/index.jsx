import React from "react";

export function ScoreInput({ value, onChange, min = 0, max = 5, disabled }) {
  const levels = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  return (
    <div className="flex flex-wrap gap-2">
      {levels.map((n) => (
        <button
          key={n}
          type="button"
          disabled={disabled}
          onClick={() => onChange(n)}
          className={`px-3 py-1 rounded-lg text-sm border ${
            value === n
              ? "bg-primary-button text-white border-primary-button"
              : "bg-theme-settings-input-bg text-theme-text-primary border-theme-sidebar-border"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary-button"}`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

export function RiskBadge({ risk }) {
  const colors = {
    Low: "text-green-500",
    Medium: "text-yellow-500",
    High: "text-orange-500",
    Critical: "text-red-500",
  };
  return <span className={`text-xs font-semibold ${colors[risk] || ""}`}>{risk}</span>;
}

export function PillarProgress({ progress }) {
  if (!progress) return null;
  return (
    <div className="text-sm text-theme-text-secondary mb-4">
      Overall completion: <strong className="text-white">{progress.overall_pct}%</strong>
    </div>
  );
}

export function AuditHeader({ title, subtitle, role, status }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
          {subtitle && <p className="text-theme-text-secondary text-sm mt-1">{subtitle}</p>}
        </div>
        <div className="flex gap-2 text-xs">
          {role && (
            <span className="px-2 py-1 rounded bg-theme-settings-input-bg text-theme-text-secondary">
              {role === "admin" ? "Consultant view" : "Management view"}
            </span>
          )}
          {status && (
            <span className="px-2 py-1 rounded bg-primary-button/20 text-primary-button">
              {status.replace(/_/g, " ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function RepeatableRowTable({ columns, rows, onChange, onAdd, onRemove, readOnly }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-theme-text-primary">
        <thead>
          <tr className="text-theme-text-secondary border-b border-theme-sidebar-border">
            {columns.map((c) => (
              <th key={c.key} className="py-2 pr-3 font-medium">
                {c.label}
              </th>
            ))}
            {!readOnly && <th className="py-2" />}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-theme-sidebar-border/50">
              {columns.map((c) => (
                <td key={c.key} className="py-2 pr-3">
                  {readOnly ? (
                    row[c.key]
                  ) : (
                    <input
                      className="w-full bg-theme-settings-input-bg border border-theme-sidebar-border rounded px-2 py-1 text-sm"
                      value={row[c.key] ?? ""}
                      onChange={(e) => {
                        const next = [...rows];
                        next[idx] = { ...next[idx], [c.key]: e.target.value };
                        onChange(next);
                      }}
                    />
                  )}
                </td>
              ))}
              {!readOnly && (
                <td className="py-2">
                  <button
                    type="button"
                    className="text-red-400 text-xs"
                    onClick={() => onRemove(idx)}
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!readOnly && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-3 text-sm text-primary-button hover:underline"
        >
          + Add row
        </button>
      )}
    </div>
  );
}
