import {WorkflowPlugin, workflowPluginWithDefaults} from "./types/WorkflowPlugin";

export const nativePlugin = workflowPluginWithDefaults({
  name: 'native',
  version: '0.0.0',
  nodeTypes: [],
  functions: [],
}) satisfies WorkflowPlugin;
