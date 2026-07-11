-- Warden Audit extension schema (separate from AnythingLLM Prisma tables)

CREATE TABLE IF NOT EXISTS warden_audit_instance_config (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  organization_id UUID,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS warden_audit_organizations (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT,
  country TEXT DEFAULT 'AU',
  source TEXT CHECK (source IN ('inbound', 'outbound', 'referral', 'unknown')) DEFAULT 'unknown',
  contacts JSONB NOT NULL DEFAULT '{}',
  platform_config JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS warden_audit_engagements (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES warden_audit_organizations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('baseline', 'followup')) DEFAULT 'baseline',
  status TEXT NOT NULL CHECK (status IN ('draft', 'awaiting_client_input', 'in_review', 'final')) DEFAULT 'draft',
  baseline_engagement_id UUID REFERENCES warden_audit_engagements(id) ON DELETE SET NULL,
  audit_date DATE,
  consultant_user_id INTEGER,
  interview_notes TEXT,
  overall_score NUMERIC(4, 2),
  metrics_targets JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS warden_audit_pillar_responses (
  id UUID PRIMARY KEY,
  engagement_id UUID NOT NULL REFERENCES warden_audit_engagements(id) ON DELETE CASCADE,
  pillar_id TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  completion_pct INTEGER NOT NULL DEFAULT 0,
  updated_by_role TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (engagement_id, pillar_id)
);

CREATE TABLE IF NOT EXISTS warden_audit_metrics_snapshots (
  id UUID PRIMARY KEY,
  engagement_id UUID NOT NULL REFERENCES warden_audit_engagements(id) ON DELETE CASCADE,
  source TEXT NOT NULL CHECK (source IN ('litellm', 'anythingllm', 'manual', 'combined')),
  metrics JSONB NOT NULL DEFAULT '{}',
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS warden_audit_deliverables (
  id UUID PRIMARY KEY,
  engagement_id UUID NOT NULL REFERENCES warden_audit_engagements(id) ON DELETE CASCADE,
  deliverable_type TEXT NOT NULL,
  content_md TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (engagement_id, deliverable_type, version)
);

CREATE INDEX IF NOT EXISTS idx_warden_audit_engagements_org ON warden_audit_engagements(organization_id);
CREATE INDEX IF NOT EXISTS idx_warden_audit_pillar_engagement ON warden_audit_pillar_responses(engagement_id);
CREATE INDEX IF NOT EXISTS idx_warden_audit_metrics_engagement ON warden_audit_metrics_snapshots(engagement_id);
