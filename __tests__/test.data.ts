import {WorkflowPlugin} from "../src/types/WorkflowPlugin";

export const testData_emptyPlugin = {
  name: 'Empty Plugin',
  version: '0.0.0',
  nodeTypes: [],
  functions: [],
} satisfies WorkflowPlugin

export const testData_examplePlugin = {
  name: 'Example Plugin',
  version: '0.0.0',
  nodeTypes: [],
  functions: [],
} satisfies WorkflowPlugin
