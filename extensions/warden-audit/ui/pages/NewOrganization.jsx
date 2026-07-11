import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuditAPI } from "../api/client";
import { AuditHeader } from "../components";
import { AuditPage, useAuditHost } from "../context/AuditHostContext";

export default function NewOrganization() {
  const navigate = useNavigate();
  const { user, paths, toast } = useAuditHost();
  const [form, setForm] = useState({
    name: "",
    industry: "",
    country: "AU",
    source: "outbound",
  });
  const [saving, setSaving] = useState(false);

  if (user?.role !== "admin") {
    return (
      <AuditPage>
        <p className="text-theme-text-secondary">Admin access required.</p>
      </AuditPage>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { organization } = await AuditAPI.createOrganization(form);
      await AuditAPI.bindInstance(organization.id);
      toast("Organization created and bound", "success");
      navigate(paths.home());
    } catch (err) {
      toast(err.message, "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AuditPage className="max-w-xl">
      <AuditHeader title="New client organization" role={user?.role} />
      <form onSubmit={submit} className="space-y-4">
        {["name", "industry", "country"].map((field) => (
          <div key={field}>
            <label className="block text-sm text-theme-text-secondary mb-1 capitalize">{field}</label>
            <input
              required={field === "name"}
              className="w-full bg-theme-settings-input-bg border border-theme-sidebar-border rounded-lg px-3 py-2 text-white"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          </div>
        ))}
        <div>
          <label className="block text-sm text-theme-text-secondary mb-1">Source</label>
          <select
            className="w-full bg-theme-settings-input-bg border border-theme-sidebar-border rounded-lg px-3 py-2 text-white"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          >
            {["inbound", "outbound", "referral", "unknown"].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-primary-button text-white text-sm disabled:opacity-50"
        >
          {saving ? "Saving..." : "Create & bind"}
        </button>
      </form>
    </AuditPage>
  );
}
