# SSO Integration (Phase 2)

oauth2-proxy sits in front of AnythingLLM and authenticates users via Entra ID (or any OIDC provider). AnythingLLM Simple SSO passthrough auto-provisions users without storing passwords.

## Architecture

```
Employee → Electron App → oauth2-proxy (:4180) → Entra ID OIDC
                        → AnythingLLM Simple SSO token → authenticated session
```

## Enable SSO

1. Register an app in Entra ID (Azure Portal → App registrations):
   - Redirect URI: `https://ai.yourcompany.internal/oauth2/callback`
   - Grant: `openid`, `profile`, `email`

2. Set variables in `.env.onprem`:
   ```bash
   OAUTH2_PROXY_ENABLED=true
   OAUTH2_PROXY_CLIENT_ID=your-client-id
   OAUTH2_PROXY_CLIENT_SECRET=your-client-secret
   OAUTH2_PROXY_COOKIE_SECRET=$(openssl rand -base64 32)
   OAUTH2_PROXY_ISSUER_URL=https://login.microsoftonline.com/YOUR-TENANT-ID/v2.0
   ```

3. Enable AnythingLLM Simple SSO in `platform/anythingllm/.env`:
   ```bash
   SIMPLE_SSO_ENABLED=1
   SIMPLE_SSO_NO_LOGIN=1
   ```

4. Start with SSO profile:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.onprem.yml \
     --env-file .env.onprem --profile sso up -d
   ```

5. Point Nginx upstream to `oauth2-proxy:4180` instead of `anythingllm:3001` when SSO is active.

## Electron Client

Update `desktop/config.json`:
```json
{
  "serverUrl": "https://ai.yourcompany.internal",
  "apiBase": "https://ai.yourcompany.internal/api"
}
```

The Electron app opens the SSO-protected URL; users authenticate via Entra ID in the system browser or embedded window.

## Testing Without Entra ID

Use Keycloak as a local OIDC provider for development:

```bash
docker run -p 8080:8080 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest start-dev
```

Set `OAUTH2_PROXY_ISSUER_URL=http://localhost:8080/realms/sovereign-warden`
