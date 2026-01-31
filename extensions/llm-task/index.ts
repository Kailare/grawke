import type { GrawkePluginApi } from "../../src/plugins/types.js";

import { createLlmTaskTool } from "./src/llm-task-tool.js";

export default function register(api: GrawkePluginApi) {
  api.registerTool(createLlmTaskTool(api), { optional: true });
}
