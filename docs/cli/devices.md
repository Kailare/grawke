---
summary: "CLI reference for `moltx devices` (device pairing + token rotation/revocation)"
read_when:
  - You are approving device pairing requests
  - You need to rotate or revoke device tokens
---

# `moltx devices`

Manage device pairing requests and device-scoped tokens.

## Commands

### `moltx devices list`

List pending pairing requests and paired devices.

```
moltx devices list
moltx devices list --json
```

### `moltx devices approve <requestId>`

Approve a pending device pairing request.

```
moltx devices approve <requestId>
```

### `moltx devices reject <requestId>`

Reject a pending device pairing request.

```
moltx devices reject <requestId>
```

### `moltx devices rotate --device <id> --role <role> [--scope <scope...>]`

Rotate a device token for a specific role (optionally updating scopes).

```
moltx devices rotate --device <deviceId> --role operator --scope operator.read --scope operator.write
```

### `moltx devices revoke --device <id> --role <role>`

Revoke a device token for a specific role.

```
moltx devices revoke --device <deviceId> --role node
```

## Common options

- `--url <url>`: Gateway WebSocket URL (defaults to `gateway.remote.url` when configured).
- `--token <token>`: Gateway token (if required).
- `--password <password>`: Gateway password (password auth).
- `--timeout <ms>`: RPC timeout.
- `--json`: JSON output (recommended for scripting).

## Notes

- Token rotation returns a new token (sensitive). Treat it like a secret.
- These commands require `operator.pairing` (or `operator.admin`) scope.
