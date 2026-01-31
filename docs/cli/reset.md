---
summary: "CLI reference for `moltx reset` (reset local state/config)"
read_when:
  - You want to wipe local state while keeping the CLI installed
  - You want a dry-run of what would be removed
---

# `moltx reset`

Reset local config/state (keeps the CLI installed).

```bash
moltx reset
moltx reset --dry-run
moltx reset --scope config+creds+sessions --yes --non-interactive
```

