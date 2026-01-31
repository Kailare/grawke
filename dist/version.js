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
// Single source of truth for the current grawke version.
// - Embedded/bundled builds: injected define or env var.
// - Dev/npm builds: package.json.
export const VERSION = (typeof __GRAWKE_VERSION__ === "string" && __GRAWKE_VERSION__) ||
    process.env.GRAWKE_BUNDLED_VERSION ||
    readVersionFromPackageJson() ||
    "0.0.0";
