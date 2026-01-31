import { resolveGatewayService } from "./service.js";
import { NODE_SERVICE_KIND, NODE_SERVICE_MARKER, NODE_WINDOWS_TASK_SCRIPT_NAME, resolveNodeLaunchAgentLabel, resolveNodeSystemdServiceName, resolveNodeWindowsTaskName, } from "./constants.js";
function withNodeServiceEnv(env) {
    return {
        ...env,
        GRAWKE_LAUNCHD_LABEL: resolveNodeLaunchAgentLabel(),
        GRAWKE_SYSTEMD_UNIT: resolveNodeSystemdServiceName(),
        GRAWKE_WINDOWS_TASK_NAME: resolveNodeWindowsTaskName(),
        GRAWKE_TASK_SCRIPT_NAME: NODE_WINDOWS_TASK_SCRIPT_NAME,
        GRAWKE_LOG_PREFIX: "node",
        GRAWKE_SERVICE_MARKER: NODE_SERVICE_MARKER,
        GRAWKE_SERVICE_KIND: NODE_SERVICE_KIND,
    };
}
function withNodeInstallEnv(args) {
    return {
        ...args,
        env: withNodeServiceEnv(args.env),
        environment: {
            ...args.environment,
            GRAWKE_LAUNCHD_LABEL: resolveNodeLaunchAgentLabel(),
            GRAWKE_SYSTEMD_UNIT: resolveNodeSystemdServiceName(),
            GRAWKE_WINDOWS_TASK_NAME: resolveNodeWindowsTaskName(),
            GRAWKE_TASK_SCRIPT_NAME: NODE_WINDOWS_TASK_SCRIPT_NAME,
            GRAWKE_LOG_PREFIX: "node",
            GRAWKE_SERVICE_MARKER: NODE_SERVICE_MARKER,
            GRAWKE_SERVICE_KIND: NODE_SERVICE_KIND,
        },
    };
}
export function resolveNodeService() {
    const base = resolveGatewayService();
    return {
        ...base,
        install: async (args) => {
            return base.install(withNodeInstallEnv(args));
        },
        uninstall: async (args) => {
            return base.uninstall({ ...args, env: withNodeServiceEnv(args.env) });
        },
        stop: async (args) => {
            return base.stop({ ...args, env: withNodeServiceEnv(args.env ?? {}) });
        },
        restart: async (args) => {
            return base.restart({ ...args, env: withNodeServiceEnv(args.env ?? {}) });
        },
        isLoaded: async (args) => {
            return base.isLoaded({ env: withNodeServiceEnv(args.env ?? {}) });
        },
        readCommand: (env) => base.readCommand(withNodeServiceEnv(env)),
        readRuntime: (env) => base.readRuntime(withNodeServiceEnv(env)),
    };
}
