import { createSubsystemLogger } from "../logging/subsystem.js";
import { loadGrawkePlugins } from "./loader.js";
const log = createSubsystemLogger("plugins");
export function resolvePluginProviders(params) {
    const registry = loadGrawkePlugins({
        config: params.config,
        workspaceDir: params.workspaceDir,
        logger: {
            info: (msg) => log.info(msg),
            warn: (msg) => log.warn(msg),
            error: (msg) => log.error(msg),
            debug: (msg) => log.debug(msg),
        },
    });
    return registry.providers.map((entry) => entry.provider);
}
