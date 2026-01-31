---
summary: "CLI reference for `moltx voicecall` (voice-call plugin command surface)"
read_when:
  - You use the voice-call plugin and want the CLI entry points
  - You want quick examples for `voicecall call|continue|status|tail|expose`
---

# `moltx voicecall`

`voicecall` is a plugin-provided command. It only appears if the voice-call plugin is installed and enabled.

Primary doc:
- Voice-call plugin: [Voice Call](/plugins/voice-call)

## Common commands

```bash
moltx voicecall status --call-id <id>
moltx voicecall call --to "+15555550123" --message "Hello" --mode notify
moltx voicecall continue --call-id <id> --message "Any questions?"
moltx voicecall end --call-id <id>
```

## Exposing webhooks (Tailscale)

```bash
moltx voicecall expose --mode serve
moltx voicecall expose --mode funnel
moltx voicecall unexpose
```

Security note: only expose the webhook endpoint to networks you trust. Prefer Tailscale Serve over Funnel when possible.

