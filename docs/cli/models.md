---
summary: "CLI reference for `grawke models` (status/list/set/scan, aliases, fallbacks, auth)"
read_when:
  - You want to change default models or view provider auth status
  - You want to scan available models/providers and debug auth profiles
---

# `grawke models`

Model discovery, scanning, and configuration (default model, fallbacks, auth profiles).

Related:
- Providers + models: [Models](/providers/models)
- Provider auth setup: [Getting started](/start/getting-started)

## Common commands

```bash
grawke models status
grawke models list
grawke models set <model-or-alias>
grawke models scan
```

`grawke models status` shows the resolved default/fallbacks plus an auth overview.
When provider usage snapshots are available, the OAuth/token status section includes
provider usage headers.
Add `--probe` to run live auth probes against each configured provider profile.
Probes are real requests (may consume tokens and trigger rate limits).

Notes:
- `models set <model-or-alias>` accepts `provider/model` or an alias.
- Model refs are parsed by splitting on the **first** `/`. If the model ID includes `/` (OpenRouter-style), include the provider prefix (example: `openrouter/moonshotai/kimi-k2`).
- If you omit the provider, Grawke treats the input as an alias or a model for the **default provider** (only works when there is no `/` in the model ID).

### `models status`
Options:
- `--json`
- `--plain`
- `--check` (exit 1=expired/missing, 2=expiring)
- `--probe` (live probe of configured auth profiles)
- `--probe-provider <name>` (probe one provider)
- `--probe-profile <id>` (repeat or comma-separated profile ids)
- `--probe-timeout <ms>`
- `--probe-concurrency <n>`
- `--probe-max-tokens <n>`

## Aliases + fallbacks

```bash
grawke models aliases list
grawke models fallbacks list
```

## Auth profiles

```bash
grawke models auth add
grawke models auth login --provider <id>
grawke models auth setup-token
grawke models auth paste-token
```
`models auth login` runs a provider plugin’s auth flow (OAuth/API key). Use
`grawke plugins list` to see which providers are installed.

Notes:
- `setup-token` runs `claude setup-token` on the current machine (requires the Claude Code CLI).
- `paste-token` accepts a token string generated elsewhere.
