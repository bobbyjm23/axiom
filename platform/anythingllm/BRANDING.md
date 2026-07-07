# AnythingLLM Branding Guide (POC)

Configure via Admin UI after first boot:

1. **Admin → Appearance → Branding**
   - App name: `Sovereign Warden`
   - Upload logo: use `demo/assets/logo-placeholder.svg` or your company logo
   - Primary color: match corporate brand
   - Footer text: `Powered by Sovereign Warden Platform — data stays in-house`

2. **Admin → System Settings → Multi-User**
   - Enable multi-user mode
   - Set password minimum length (default: 8)

3. **Admin → System Settings → Default LLM**
   - Provider: Generic OpenAI (routed via LiteLLM)
   - Model: `gemini-pro`

## Electron Layer Branding

Separate from in-app branding — configured in `desktop/config.json`:

```json
{
  "appName": "Sovereign Warden"
}
```

And in electron-builder config after fork (appId, productName, icon paths).
