---
summary: "CLI reference for `grawke voicecall` (voice-call plugin command surface)"
read_when:
  - You use the voice-call plugin and want the CLI entry points
  - You want quick examples for `voicecall call|continue|status|tail|expose`
---

# `grawke voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.

Primary doc:
- Voice-call plugin: [Voice Call](/plugins/voice-call)

## Common commands

```bash
grawke voicecall status --call-id <id>
grawke voicecall call --to "+15555550123" --message "Hello" --mode notify
grawke voicecall continue --call-id <id> --message "Any questions?"
grawke voicecall end --call-id <id>
```

## Exposing webhooks (Tailscale)

```bash
grawke voicecall expose --mode serve
grawke voicecall expose --mode funnel
grawke voicecall unexpose
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.

