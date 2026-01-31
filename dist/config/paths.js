import os from "node:os";
import path from "node:path";
/**
 * Nix mode detection: When GRAWKE_NIX_MODE=1, the gateway is running under Nix.
 * In this mode:
 * - No auto-install flows should be attempted
 * - Missing dependencies should produce actionable Nix-specific error messages
 * - Config is managed externally (read-only from Nix perspective)
 */
export function resolveIsNixMode(env = process.env) {
    return env.GRAWKE_NIX_MODE === "1";
}
export const isNixMode = resolveIsNixMode();
/**
 * State directory for mutable data (sessions, logs, caches).
 * Can be overridden via GRAWKE_STATE_DIR environment variable.
 * Default: ~/.grawke
 */
export function resolveStateDir(env = process.env, homedir = os.homedir) {
    const override = env.GRAWKE_STATE_DIR?.trim();
    if (override)
        return resolveUserPath(override);
    return path.join(homedir(), ".grawke");
}
function resolveUserPath(input) {
    const trimmed = input.trim();
    if (!trimmed)
        return trimmed;
    if (trimmed.startsWith("~")) {
        const expanded = trimmed.replace(/^~(?=$|[\\/])/, os.homedir());
        return path.resolve(expanded);
    }
    return path.resolve(trimmed);
}
export const STATE_DIR_GRAWKE = resolveStateDir();
/**
 * Config file path (JSON5).
 * Can be overridden via GRAWKE_CONFIG_PATH environment variable.
 * Default: ~/.grawke/grawke.json (or $GRAWKE_STATE_DIR/grawke.json)
 */
export function resolveConfigPath(env = process.env, stateDir = resolveStateDir(env, os.homedir)) {
    const override = env.GRAWKE_CONFIG_PATH?.trim();
    if (override)
        return resolveUserPath(override);
    return path.join(stateDir, "grawke.json");
}
export const CONFIG_PATH_GRAWKE = resolveConfigPath();
export const DEFAULT_GATEWAY_PORT = 18789;
/**
 * Gateway lock directory (ephemeral).
 * Default: os.tmpdir()/grawke-<uid> (uid suffix when available).
 */
export function resolveGatewayLockDir(tmpdir = os.tmpdir) {
    const base = tmpdir();
    const uid = typeof process.getuid === "function" ? process.getuid() : undefined;
    const suffix = uid != null ? `grawke-${uid}` : "grawke";
    return path.join(base, suffix);
}
const OAUTH_FILENAME = "oauth.json";
/**
 * OAuth credentials storage directory.
 *
 * Precedence:
 * - `GRAWKE_OAUTH_DIR` (explicit override)
 * - `GRAWKE_STATE_DIR/credentials` (canonical server/default)
 * - `~/.grawke/credentials` (legacy default)
 */
export function resolveOAuthDir(env = process.env, stateDir = resolveStateDir(env, os.homedir)) {
    const override = env.GRAWKE_OAUTH_DIR?.trim();
    if (override)
        return resolveUserPath(override);
    return path.join(stateDir, "credentials");
}
export function resolveOAuthPath(env = process.env, stateDir = resolveStateDir(env, os.homedir)) {
    return path.join(resolveOAuthDir(env, stateDir), OAUTH_FILENAME);
}
export function resolveGatewayPort(cfg, env = process.env) {
    const envRaw = env.GRAWKE_GATEWAY_PORT?.trim();
    if (envRaw) {
        const parsed = Number.parseInt(envRaw, 10);
        if (Number.isFinite(parsed) && parsed > 0)
            return parsed;
    }
    const configPort = cfg?.gateway?.port;
    if (typeof configPort === "number" && Number.isFinite(configPort)) {
        if (configPort > 0)
            return configPort;
    }
    return DEFAULT_GATEWAY_PORT;
}
