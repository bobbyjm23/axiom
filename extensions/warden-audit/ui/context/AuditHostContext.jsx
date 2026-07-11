import React, { createContext, useContext } from "react";

export const AuditHostContext = createContext(null);

export function AuditHostProvider({ value, children }) {
  return <AuditHostContext.Provider value={value}>{children}</AuditHostContext.Provider>;
}

export function useAuditHost() {
  const ctx = useContext(AuditHostContext);
  if (!ctx) {
    throw new Error("useAuditHost must be used within AuditHostProvider");
  }
  return ctx;
}

export function AuditPage({ children, className = "" }) {
  const { Layout } = useAuditHost();
  return <Layout contentClassName={className}>{children}</Layout>;
}
