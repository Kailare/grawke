---
summary: "CLI reference for `moltx browser` (profiles, tabs, actions, extension relay, remote serve)"
read_when:
  - You use `moltx browser` and want examples for common tasks
  - You want to control a remote browser via `browser.controlUrl`
  - You want to use the Chrome extension relay (attach/detach via toolbar button)
---

# `moltx browser`

Manage MoltX’s browser control server and run browser actions (tabs, snapshots, screenshots, navigation, clicks, typing).

Related:
- Browser tool + API: [Browser tool](/tools/browser)
- Chrome extension relay: [Chrome extension](/tools/chrome-extension)

## Common flags

- `--url <controlUrl>`: override `browser.controlUrl` for this command invocation.
- `--browser-profile <name>`: choose a browser profile (default comes from config).
- `--json`: machine-readable output (where supported).

## Quick start (local)

```bash
moltx browser --browser-profile chrome tabs
moltx browser --browser-profile clawd start
moltx browser --browser-profile clawd open https://example.com
moltx browser --browser-profile clawd snapshot
```

## Profiles

Profiles are named browser routing configs. In practice:
- `clawd`: launches/attaches to a dedicated MoltX-managed Chrome instance (isolated user data dir).
- `chrome`: controls your existing Chrome tab(s) via the Chrome extension relay.

```bash
moltx browser profiles
moltx browser create-profile --name work --color "#FF5A36"
moltx browser delete-profile --name work
```

Use a specific profile:

```bash
moltx browser --browser-profile work tabs
```

## Tabs

```bash
moltx browser tabs
moltx browser open https://docs.clawd.bot
moltx browser focus <targetId>
moltx browser close <targetId>
```

## Snapshot / screenshot / actions

Snapshot:

```bash
moltx browser snapshot
```

Screenshot:

```bash
moltx browser screenshot
```

Navigate/click/type (ref-based UI automation):

```bash
moltx browser navigate https://example.com
moltx browser click <ref>
moltx browser type <ref> "hello"
```

## Chrome extension relay (attach via toolbar button)

This mode lets the agent control an existing Chrome tab that you attach manually (it does not auto-attach).

Install the unpacked extension to a stable path:

```bash
moltx browser extension install
moltx browser extension path
```

Then Chrome → `chrome://extensions` → enable “Developer mode” → “Load unpacked” → select the printed folder.

Full guide: [Chrome extension](/tools/chrome-extension)

## Remote browser control (`moltx browser serve`)

If the Gateway runs on a different machine than the browser, run a standalone browser control server on the machine that runs Chrome:

```bash
moltx browser serve --bind 127.0.0.1 --port 18791 --token <token>
```

Then point the Gateway at it using `browser.controlUrl` + `browser.controlToken` (or `MOLTX_BROWSER_CONTROL_TOKEN`).

Security + TLS best-practices: [Browser tool](/tools/browser), [Tailscale](/gateway/tailscale), [Security](/gateway/security)
