---
summary: "Uninstall Grawke completely (CLI, service, state, workspace)"
read_when:
  - You want to remove Grawke from a machine
  - The gateway service is still running after uninstall
---

# Uninstall

Two paths:
- **Easy path** if `grawke` is still installed.
- **Manual service removal** if the CLI is gone but the service is still running.

## Easy path (CLI still installed)

Recommended: use the built-in uninstaller:

```bash
grawke uninstall
```

Non-interactive (automation / npx):

```bash
grawke uninstall --all --yes --non-interactive
npx -y grawke uninstall --all --yes --non-interactive
```

Manual steps (same result):

1) Stop the gateway service:

```bash
grawke gateway stop
```

2) Uninstall the gateway service (launchd/systemd/schtasks):

```bash
grawke gateway uninstall
```

3) Delete state + config:

```bash
rm -rf "${GRAWKE_STATE_DIR:-$HOME/.grawke}"
```

If you set `GRAWKE_CONFIG_PATH` to a custom location outside the state dir, delete that file too.

4) Delete your workspace (optional, removes agent files):

```bash
rm -rf ~/clawd
```

5) Remove the CLI install (pick the one you used):

```bash
npm rm -g grawke
pnpm remove -g grawke
bun remove -g grawke
```

6) If you installed the macOS app:

```bash
rm -rf /Applications/Grawke.app
```

Notes:
- If you used profiles (`--profile` / `GRAWKE_PROFILE`), repeat step 3 for each state dir (defaults are `~/.grawke-<profile>`).
- In remote mode, the state dir lives on the **gateway host**, so run steps 1-4 there too.

## Manual service removal (CLI not installed)

Use this if the gateway service keeps running but `grawke` is missing.

### macOS (launchd)

Default label is `com.grawke.gateway` (or `com.grawke.<profile>`):

```bash
launchctl bootout gui/$UID/com.grawke.gateway
rm -f ~/Library/LaunchAgents/com.grawke.gateway.plist
```

If you used a profile, replace the label and plist name with `com.grawke.<profile>`.

### Linux (systemd user unit)

Default unit name is `grawke-gateway.service` (or `grawke-gateway-<profile>.service`):

```bash
systemctl --user disable --now grawke-gateway.service
rm -f ~/.config/systemd/user/grawke-gateway.service
systemctl --user daemon-reload
```

### Windows (Scheduled Task)

Default task name is `Grawke Gateway` (or `Grawke Gateway (<profile>)`).
The task script lives under your state dir.

```powershell
schtasks /Delete /F /TN "Grawke Gateway"
Remove-Item -Force "$env:USERPROFILE\.grawke\gateway.cmd"
```

If you used a profile, delete the matching task name and `~\.grawke-<profile>\gateway.cmd`.

## Normal install vs source checkout

### Normal install (install.sh / npm / pnpm / bun)

If you used `https://clawd.bot/install.sh` or `install.ps1`, the CLI was installed with `npm install -g grawke@latest`.
Remove it with `npm rm -g grawke` (or `pnpm remove -g` / `bun remove -g` if you installed that way).

### Source checkout (git clone)

If you run from a repo checkout (`git clone` + `grawke ...` / `bun run grawke ...`):

1) Uninstall the gateway service **before** deleting the repo (use the easy path above or manual service removal).
2) Delete the repo directory.
3) Remove state + workspace as shown above.
