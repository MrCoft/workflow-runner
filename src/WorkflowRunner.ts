import {WorkflowPlugin} from "./types/WorkflowPlugin";
import {WorkflowRunnerConfig} from "./types/WorkflowRunnerConfig";
import {nativePlugin} from "./nativePlugin";

export class WorkflowRunner {
  private _plugins: WorkflowPlugin[];
  private _nodeTypes: Record<string, WorkflowPlugin['nodeTypes'][number]> = {};
  private _functionsById: Record<string, WorkflowPlugin['functions'][number]> = {};

  constructor(config?: WorkflowRunnerConfig) {
    this._plugins = [
      nativePlugin,
      ...config?.plugins ?? []
    ];

    this.build()
  }

  build() {
    this._nodeTypes = {}
    this._functionsById = {}

    for (const plugin of this._plugins) {
      for (const nodeType of plugin.nodeTypes) {
        this._nodeTypes[nodeType.fullyQualifiedName] = nodeType
      }

      for (const func of plugin.functions) {
        this._functionsById[func.id] = func
      }
    }
  }

  async execute(nodeType: string, input: any): Promise<any> {
    const nodeTypeObj = this._nodeTypes[nodeType]

    if (!nodeTypeObj) {
      throw new Error(`Node type ${nodeType} not found`)
    }

    const func = this._functionsById[nodeTypeObj.functionId]

    let result = null
    let isExecuted = false

    switch (func.implementation.type) {
      case 'native':
        isExecuted = true;
        result = await func.implementation.nativeFunction(input)
        break
      case 'http-api':
        // isExecuted = true;
        break
      case 'cli':
        // isExecuted = true;
        break
    }

    return result
  }
}
