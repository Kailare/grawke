---
summary: "Uninstall MoltX completely (CLI, service, state, workspace)"
read_when:
  - You want to remove MoltX from a machine
  - The gateway service is still running after uninstall
---

# Uninstall

Two paths:
- **Easy path** if `moltx` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
moltx uninstall
```

Non-interactive (automation / npx):

```bash
moltx uninstall --all --yes --non-interactive
npx -y moltx uninstall --all --yes --non-interactive
```

Manual steps (same result):

1) Stop the gateway service:

```bash
moltx gateway stop
```

2) Uninstall the gateway service (launchd/systemd/schtasks):

```bash
moltx gateway uninstall
```

3) Delete state + config:

```bash
rm -rf "${MOLTX_STATE_DIR:-$HOME/.moltx}"
```

If you set `MOLTX_CONFIG_PATH` to a custom location outside the state dir, delete that file too.

4) Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/clawd
```

5) Remove the CLI install (pick the one you used):

```bash
npm rm -g moltx
pnpm remove -g moltx
bun remove -g moltx
```

6) If you installed the macOS app:

```bash
rm -rf /Applications/MoltX.app
```

Notes:
- If you used profiles (`--profile` / `MOLTX_PROFILE`), repeat step 3 for each state dir (defaults are `~/.moltx-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `moltx` is missing.

### macOS (launchd)

Default label is `com.moltx.gateway` (or `com.moltx.<profile>`):

```bash
launchctl bootout gui/$UID/com.moltx.gateway
rm -f ~/Library/LaunchAgents/com.moltx.gateway.plist
```

If you used a profile, replace the label and plist name with `com.moltx.<profile>`.

### Linux (systemd user unit)

Default unit name is `moltx-gateway.service` (or `moltx-gateway-<profile>.service`):

```bash
systemctl --user disable --now moltx-gateway.service
rm -f ~/.config/systemd/user/moltx-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `MoltX Gateway` (or `MoltX Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "MoltX Gateway"
Remove-Item -Force "$env:USERPROFILE\.moltx\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.moltx-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://clawd.bot/install.sh` or `install.ps1`, the CLI was installed with `npm install -g moltx@latest`.
Remove it with `npm rm -g moltx` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `moltx ...` / `bun run moltx ...`):

1) Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2) Delete the repo directory.
3) Remove state + workspace as shown above.
