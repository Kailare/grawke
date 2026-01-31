---
summary: "CLI reference for `moltx logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
---

# `moltx logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:
- Logging overview: [Logging](/logging)

## Examples

```bash
moltx logs
moltx logs --follow
moltx logs --json
moltx logs --limit 500
```

