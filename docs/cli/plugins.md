---
summary: "CLI reference for `moltx plugins` (list, install, enable/disable, doctor)"
read_when:
  - You want to install or manage in-process Gateway plugins
  - You want to debug plugin load failures
---

# `moltx plugins`

Manage Gateway plugins/extensions (loaded in-process).

Related:
- Plugin system: [Plugins](/plugin)
- Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
- Security hardening: [Security](/gateway/security)

## Commands

```bash
moltx plugins list
moltx plugins info <id>
moltx plugins enable <id>
moltx plugins disable <id>
moltx plugins doctor
moltx plugins update <id>
moltx plugins update --all
```

Bundled plugins ship with MoltX but start disabled. Use `plugins enable` to
activate them.

All plugins must ship a `moltx.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### Install

```bash
moltx plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash
moltx plugins install -l ./my-plugin
```

### Update

```bash
moltx plugins update <id>
moltx plugins update --all
moltx plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).
