
export interface WorkflowPlugin {
  name: string
  version: string
  nodeTypes: {
    displayName: string
    fullyQualifiedName: string
    functionId: string,
    inputs: {
      name: string
      nodeTypeFullyQualifiedName: string
      defaultConstantValueId?: string
    }[],
    outputs: {
      name: string
      nodeTypeFullyQualifiedName: string
    }[]
  }[]
  functions: {
    id: string
    implementation: {
      type: 'native',
      nativeFunction: any
    } | {
      type: 'http-api',
    } | {
      type: 'cli',
    },
  }[]
  valueTypes: {
    displayName: string
    fullyQualifiedName: string
    format: 'json' | unknown
    fields: {
      name: string
      defaultConstantValueId: string
      webComponent: string
      attributes: Record<string, string>
    }[]
  }[]
  constantValues: {
    id: string
    valueTypeUniqueName: string
    base64encodedContent: string
  }[]
  migrations: {
    versionFrom: string
    versionTo: string
    nodeTypeFullyQualifiedNamesDiscard: string[]
    nodeTypeFullyQualifiedNamesRename: {
      from: string
      to: string
    }[],
    nodeTypeFullyQualifiedNamesCreate: string[]
    nodeTypeKeys: {
      fullyQualifiedName: string
      inputKeysDiscard: string[]
      inputKeysRename: {
        from: string
        to: string
      }[],
      inputKeysCreate: string[],
      outputKeysDiscard: string[]
      outputKeysRename: {
        from: string
        to: string
      }[],
      outputKeysCreate: string[],
    },
    valueTypeFullyQualifiedNamesDiscard: string[]
    valueTypeFullyQualifiedNamesRename: {
      from: string
      to: string
    }[],
    valueTypeFullyQualifiedNamesCreate: string[]
    valueTypeContents: {
      fullyQualifiedName: string
      functionId: string
    }[],
  }[]
  dependencies: {
    name: string
    semverRange: string
  }[]
}

export type WorkflowPluginConstructor = {
  name: WorkflowPlugin['name']
  version: WorkflowPlugin['version']
  nodeTypes: WorkflowPlugin['nodeTypes']
  functions: WorkflowPlugin['functions']
  valueTypes?: WorkflowPlugin['valueTypes']
  constantValues?: WorkflowPlugin['constantValues']
  migrations?: WorkflowPlugin['migrations']
  dependencies?: WorkflowPlugin['dependencies']
}

export const workflowPluginWithDefaults = (plugin: WorkflowPluginConstructor): WorkflowPlugin =>
  ({
    name: plugin.name,
    version: plugin.version,
    nodeTypes: plugin.nodeTypes,
    functions: plugin.functions,
    valueTypes: plugin.valueTypes ?? [],
    constantValues: plugin.constantValues ?? [],
    migrations: plugin.migrations ?? [],
    dependencies: plugin.dependencies ?? [],
  })
