---
summary: "CLI reference for `grawke browser` (profiles, tabs, actions, extension relay, remote serve)"
read_when:
  - You use `grawke browser` and want examples for common tasks
  - You want to control a remote browser via `browser.controlUrl`
  - You want to use the Chrome extension relay (attach/detach via toolbar button)
---

# `grawke browser`

Manage Grawke’s browser control server and run browser actions (tabs, snapshots, screenshots, navigation, clicks, typing).

Related:
- Browser tool + API: [Browser tool](/tools/browser)
- Chrome extension relay: [Chrome extension](/tools/chrome-extension)

## Common flags

- `--url <controlUrl>`: override `browser.controlUrl` for this command invocation.
- `--browser-profile <name>`: choose a browser profile (default comes from config).
- `--json`: machine-readable output (where supported).

## Quick start (local)

```bash
grawke browser --browser-profile chrome tabs
grawke browser --browser-profile clawd start
grawke browser --browser-profile clawd open https://example.com
grawke browser --browser-profile clawd snapshot
```

## Profiles

Profiles are named browser routing configs. In practice:
- `clawd`: launches/attaches to a dedicated Grawke-managed Chrome instance (isolated user data dir).
- `chrome`: controls your existing Chrome tab(s) via the Chrome extension relay.

```bash
grawke browser profiles
grawke browser create-profile --name work --color "#FF5A36"
grawke browser delete-profile --name work
```

Use a specific profile:

```bash
grawke browser --browser-profile work tabs
```

## Tabs

```bash
grawke browser tabs
grawke browser open https://docs.clawd.bot
grawke browser focus <targetId>
grawke browser close <targetId>
```

## Snapshot / screenshot / actions

Snapshot:

```bash
grawke browser snapshot
```

Screenshot:

```bash
grawke browser screenshot
```

Navigate/click/type (ref-based UI automation):

```bash
grawke browser navigate https://example.com
grawke browser click <ref>
grawke browser type <ref> "hello"
```

## Chrome extension relay (attach via toolbar button)

This mode lets the agent control an existing Chrome tab that you attach manually (it does not auto-attach).

Install the unpacked extension to a stable path:

```bash
grawke browser extension install
grawke browser extension path
```

Then Chrome → `chrome://extensions` → enable “Developer mode” → “Load unpacked” → select the printed folder.

Full guide: [Chrome extension](/tools/chrome-extension)

## Remote browser control (`grawke browser serve`)

If the Gateway runs on a different machine than the browser, run a standalone browser control server on the machine that runs Chrome:

```bash
grawke browser serve --bind 127.0.0.1 --port 18791 --token <token>
```

Then point the Gateway at it using `browser.controlUrl` + `browser.controlToken` (or `GRAWKE_BROWSER_CONTROL_TOKEN`).

Security + TLS best-practices: [Browser tool](/tools/browser), [Tailscale](/gateway/tailscale), [Security](/gateway/security)
