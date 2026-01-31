---
summary: "CLI reference for `grawke reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
---

# `grawke reset`

Reset local config/state (keeps the CLI installed).

```bash
grawke reset
grawke reset --dry-run
grawke reset --scope config+creds+sessions --yes --non-interactive
```

