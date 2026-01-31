import type { MoltXPluginApi } from "../../src/plugins/types.js";

import { createLlmTaskTool } from "./src/llm-task-tool.js";

export default function register(api: MoltXPluginApi) {
  api.registerTool(createLlmTaskTool(api), { optional: true });
}
