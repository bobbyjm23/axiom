const { query } = require("../db");

async function importFromPostgres(periodStart, periodEnd) {
  const params = [periodStart, periodEnd];
  const countResult = await query(
    `SELECT COUNT(*)::int AS total_requests,
            COALESCE(SUM(spend), 0)::float AS total_spend,
            COALESCE(SUM(total_tokens), 0)::bigint AS total_tokens,
            COUNT(DISTINCT "end_user")::int AS unique_end_users
     FROM "LiteLLM_SpendLogs"
     WHERE "startTime" >= $1::timestamptz AND "startTime" <= $2::timestamptz`,
    params
  );

  const modelsResult = await query(
    `SELECT model, COUNT(*)::int AS requests
     FROM "LiteLLM_SpendLogs"
     WHERE "startTime" >= $1::timestamptz AND "startTime" <= $2::timestamptz
     GROUP BY model
     ORDER BY requests DESC
     LIMIT 20`,
    params
  );

  const latencyResult = await query(
    `SELECT COALESCE(AVG(request_duration_ms), 0)::float AS avg_latency_ms,
            COALESCE(
              SUM(CASE WHEN status = 'failure' OR status = 'error' THEN 1 ELSE 0 END)::float
              / NULLIF(COUNT(*)::float, 0),
              0
            ) AS error_rate
     FROM "LiteLLM_SpendLogs"
     WHERE "startTime" >= $1::timestamptz AND "startTime" <= $2::timestamptz`,
    params
  );

  const row = countResult.rows[0] || {};
  const latency = latencyResult.rows[0] || {};

  return {
    total_requests: row.total_requests || 0,
    total_tokens: Number(row.total_tokens || 0),
    unique_end_users: row.unique_end_users || 0,
    estimated_cost_usd: Number(row.total_spend || 0),
    models_used: modelsResult.rows.map((r) => r.model),
    model_breakdown: modelsResult.rows,
    avg_latency_ms: Number(latency.avg_latency_ms || 0),
    error_rate: Number(latency.error_rate || 0),
    period_start: periodStart,
    period_end: periodEnd,
  };
}

async function importFromApi(periodStart, periodEnd) {
  const baseUrl = process.env.LITELLM_BASE_URL || "http://litellm:4000";
  const masterKey = process.env.LITELLM_MASTER_KEY;
  if (!masterKey) throw new Error("LITELLM_MASTER_KEY not configured");

  const url = new URL(`${baseUrl}/spend/logs/v2`);
  url.searchParams.set("start_date", periodStart);
  url.searchParams.set("end_date", periodEnd);
  url.searchParams.set("page", "1");
  url.searchParams.set("page_size", "1000");

  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${masterKey}` },
  });
  if (!response.ok) {
    throw new Error(`LiteLLM API error: ${response.status}`);
  }
  const body = await response.json();
  const rows = body.data || [];

  const total_requests = rows.length;
  const total_tokens = rows.reduce((s, r) => s + (r.total_tokens || 0), 0);
  const unique_end_users = new Set(rows.map((r) => r.end_user).filter(Boolean)).size;
  const estimated_cost_usd = rows.reduce((s, r) => s + (r.spend || 0), 0);
  const models_used = [...new Set(rows.map((r) => r.model).filter(Boolean))];

  return {
    total_requests,
    total_tokens,
    unique_end_users,
    estimated_cost_usd,
    models_used,
    avg_latency_ms: 0,
    error_rate: 0,
    period_start: periodStart,
    period_end: periodEnd,
    source_detail: "litellm_api",
  };
}

async function importLiteLLMMetrics({ periodStart, periodEnd }) {
  try {
    return {
      ...(await importFromPostgres(periodStart, periodEnd)),
      source_detail: "postgres",
    };
  } catch (err) {
    console.warn("[warden-audit] LiteLLM postgres import failed, trying API:", err.message);
    return importFromApi(periodStart, periodEnd);
  }
}

module.exports = { importLiteLLMMetrics };
