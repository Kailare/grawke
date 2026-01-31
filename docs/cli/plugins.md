---
summary: "CLI reference for `grawke plugins` (list, install, enable/disable, doctor)"
read_when:
  - You want to install or manage in-process Gateway plugins
  - You want to debug plugin load failures
---

# `grawke plugins`

Manage Gateway plugins/extensions (loaded in-process).

Related:
- Plugin system: [Plugins](/plugin)
- Plugin manifest + schema: [Plugin manifest](/plugins/manifest)
- Security hardening: [Security](/gateway/security)

## Commands

```bash
grawke plugins list
grawke plugins info <id>
grawke plugins enable <id>
grawke plugins disable <id>
grawke plugins doctor
grawke plugins update <id>
grawke plugins update --all
```

Bundled plugins ship with Grawke but start disabled. Use `plugins enable` to
activate them.

All plugins must ship a `grawke.plugin.json` file with an inline JSON Schema
(`configSchema`, even if empty). Missing/invalid manifests or schemas prevent
the plugin from loading and fail config validation.

### Install

```bash
grawke plugins install <path-or-spec>
```

Security note: treat plugin installs like running code. Prefer pinned versions.

Supported archives: `.zip`, `.tgz`, `.tar.gz`, `.tar`.

Use `--link` to avoid copying a local directory (adds to `plugins.load.paths`):

```bash
grawke plugins install -l ./my-plugin
```

### Update

```bash
grawke plugins update <id>
grawke plugins update --all
grawke plugins update <id> --dry-run
```

Updates only apply to plugins installed from npm (tracked in `plugins.installs`).
