import {WorkflowPlugin} from "../src/types/WorkflowPlugin";

export const testData_emptyPlugin = {
  name: 'Empty Plugin',
  version: '0.0.0',
  nodeTypes: [],
  functions: [],
} satisfies WorkflowPlugin

export const testData_mathPlugin = {
  name: 'Math Plugin',
  version: '0.0.0',
  nodeTypes: [{
    'displayName': 'Add',
    'fullyQualifiedName': 'math.add',
    'functionId': 'math.add',
    'inputs': [{
      'name': 'a',
      'nodeTypeFullyQualifiedName': 'number',
      'defaultConstantValueId': null
    }, {
      'name': 'b',
      'nodeTypeFullyQualifiedName': 'number',
      'defaultConstantValueId': null
    }],
    'outputs': [{
      'name': 'result',
      'nodeTypeFullyQualifiedName': 'number'
    }]
  }],
  functions: [{
    'id': 'math.add',
    'implementation': {
      'type': 'native',
      'nativeFunction': async (input: any) => {
        return input.a + input.b
      }
    }
  }],
} satisfies WorkflowPlugin
