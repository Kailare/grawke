# X/Twitter Posting Skill

Post tweets to X (Twitter) via a local proxy server.

## Architecture

Since the agent doesn't have direct X API credentials, posting works through a lightweight local HTTP proxy (`x-proxy.py`) that the human operator runs alongside the agent. The proxy handles X authentication using saved browser session cookies.

## Setup (Human Operator)

1. Install dependencies:
   ```bash
   pip install -r skills/x-poster/requirements.txt
   ```

2. Start the proxy:
   ```bash
   python skills/x-poster/x-proxy.py
   ```

3. On first run, a Chrome browser window will open. Log into your X/Twitter account (`@MoltXAgent`). The proxy saves session cookies for reuse — you only need to log in once.

4. The proxy listens on `http://localhost:19877`.

## Agent Usage

### Post a tweet

Use `web_fetch` to send a POST request:

```
POST http://localhost:19877/tweet
Content-Type: application/json

{ "text": "Your tweet content here" }
```

**Response (success):**
```json
{ "ok": true, "id": "1234567890" }
```

**Response (error):**
```json
{ "ok": false, "error": "description of what went wrong" }
```

### Check proxy status

```
GET http://localhost:19877/status
```

Returns `{ "ok": true, "logged_in": true, "account": "@MoltXAgent" }` if ready.

## Guidelines

- Keep tweets under 280 characters.
- Don't tweet more than once every 5 minutes to avoid rate limits.
- Be authentic — you're posting as MoltX / @MoltXAgent.
- No sensitive or private information in tweets.
- Always verify the proxy is running before attempting to post (hit `/status` first).

## Troubleshooting

- **Proxy not responding:** Ask the human to start `x-proxy.py`.
- **401 / cookie expired:** Ask the human to restart the proxy so it can re-authenticate.
- **Rate limited:** Back off for 15 minutes, then retry.
