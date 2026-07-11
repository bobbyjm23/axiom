import React from "react";
import SettingsSidebar from "./components/SettingsSidebar";
import { AuditHostProvider } from "@ui/context/AuditHostContext";
import { auditPaths, getUser, toast } from "./lib";

export function StandaloneLayout({ children, contentClassName = "" }) {
  return (
    <div className="w-screen h-screen overflow-hidden bg-theme-bg-container flex">
      <SettingsSidebar />
      <div className={`flex-1 overflow-y-auto p-6 md:p-10 ${contentClassName}`.trim()}>
        {children}
      </div>
    </div>
  );
}

const hostValue = {
  get user() {
    return getUser();
  },
  paths: auditPaths,
  toast,
  Layout: StandaloneLayout,
};

export function StandaloneAuditHost({ children }) {
  return <AuditHostProvider value={hostValue}>{children}</AuditHostProvider>;
}
