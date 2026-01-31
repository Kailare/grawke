import { createRequire } from "node:module";
function readVersionFromPackageJson() {
    try {
        const require = createRequire(import.meta.url);
        const pkg = require("../package.json");
        return pkg.version ?? null;
    }
    catch {
        return null;
    }
}
// Single source of truth for the current moltx version.
// - Embedded/bundled builds: injected define or env var.
// - Dev/npm builds: package.json.
export const VERSION = (typeof __MOLTX_VERSION__ === "string" && __MOLTX_VERSION__) ||
    process.env.MOLTX_BUNDLED_VERSION ||
    readVersionFromPackageJson() ||
    "0.0.0";
