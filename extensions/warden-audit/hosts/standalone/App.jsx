import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeSync } from "@ui/theme/ThemeSync";
import { StandaloneAuditHost } from "./provider";
import Dashboard from "@ui/pages/Dashboard";
import NewOrganization from "@ui/pages/NewOrganization";
import EngagementHub from "@ui/pages/EngagementHub";
import PillarForm from "@ui/pages/PillarForm";
import MetricsPage from "@ui/pages/Metrics";
import DeliverablesPage from "@ui/pages/Deliverables";

export default function App() {
  return (
    <ThemeSync>
      <StandaloneAuditHost>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/clients/new" element={<NewOrganization />} />
          <Route path="/engagements/:id" element={<EngagementHub />} />
          <Route path="/engagements/:id/pillars/:pillarId" element={<PillarForm />} />
          <Route path="/engagements/:id/metrics" element={<MetricsPage />} />
          <Route path="/engagements/:id/deliverables" element={<DeliverablesPage />} />
        </Routes>
      </StandaloneAuditHost>
    </ThemeSync>
  );
}
