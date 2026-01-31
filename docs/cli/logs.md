---
summary: "CLI reference for `grawke logs` (tail gateway logs via RPC)"
read_when:
  - You need to tail Gateway logs remotely (without SSH)
  - You want JSON log lines for tooling
---

# `grawke logs`

Tail Gateway file logs over RPC (works in remote mode).

Related:
- Logging overview: [Logging](/logging)

## Examples

```bash
grawke logs
grawke logs --follow
grawke logs --json
grawke logs --limit 500
```

