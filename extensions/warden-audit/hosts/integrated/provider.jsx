import React from "react";
import Sidebar from "@/components/SettingsSidebar";
import { isMobile } from "react-device-detect";
import useUser from "@/hooks/useUser";
import showToast from "@/utils/toast";
import upstreamPaths from "@/utils/paths";
import { AuditHostProvider } from "@ui/context/AuditHostContext";

export function IntegratedLayout({ children, contentClassName = "" }) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-theme-bg-container flex">
      {!isMobile && <Sidebar />}
      <div className={`flex-1 overflow-y-auto p-6 md:p-10 ${contentClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}

export function useIntegratedAuditHost() {
  const { user } = useUser();
  const audit = upstreamPaths.audit;

  return {
    user,
    paths: {
      home: () => audit.home(),
      newOrg: () => audit.newOrg(),
      engagement: (id) => audit.engagement(id),
      pillar: (id, pillarId) => audit.pillar(id, pillarId),
      metrics: (id) => audit.metrics(id),
      deliverables: (id) => audit.deliverables(id),
    },
    toast: (message, type = "info") => showToast(message, type),
    Layout: IntegratedLayout,
  };
}

export function IntegratedAuditHost({ children }) {
  const host = useIntegratedAuditHost();
  return <AuditHostProvider value={host}>{children}</AuditHostProvider>;
}
