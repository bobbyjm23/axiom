import React, { lazy } from "react";
import { Route } from "react-router-dom";
import { AdminRoute, ManagerRoute } from "@/components/PrivateRoute";
import { IntegratedAuditHost } from "./provider";

const AuditDashboard = lazy(() => import("@ui/pages/Dashboard"));
const NewOrganization = lazy(() => import("@ui/pages/NewOrganization"));
const EngagementHub = lazy(() => import("@ui/pages/EngagementHub"));
const PillarForm = lazy(() => import("@ui/pages/PillarForm"));
const MetricsPage = lazy(() => import("@ui/pages/Metrics"));
const DeliverablesPage = lazy(() => import("@ui/pages/Deliverables"));

function withHost(Component) {
  return function Hosted(props) {
    return (
      <IntegratedAuditHost>
        <Component {...props} />
      </IntegratedAuditHost>
    );
  };
}

export function AuditRoutes() {
  if (import.meta.env.VITE_WARDEN_AUDIT_ENABLED === "false") {
    return null;
  }

  return (
    <>
      <Route path="/settings/audit" element={<ManagerRoute Component={withHost(AuditDashboard)} />} />
      <Route
        path="/settings/audit/clients/new"
        element={<AdminRoute Component={withHost(NewOrganization)} />}
      />
      <Route
        path="/settings/audit/engagements/:id"
        element={<ManagerRoute Component={withHost(EngagementHub)} />}
      />
      <Route
        path="/settings/audit/engagements/:id/pillars/:pillarId"
        element={<ManagerRoute Component={withHost(PillarForm)} />}
      />
      <Route
        path="/settings/audit/engagements/:id/metrics"
        element={<ManagerRoute Component={withHost(MetricsPage)} />}
      />
      <Route
        path="/settings/audit/engagements/:id/deliverables"
        element={<ManagerRoute Component={withHost(DeliverablesPage)} />}
      />
    </>
  );
}

export default AuditRoutes;
