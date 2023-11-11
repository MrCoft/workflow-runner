
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
      defaultConstantValueId: string | null
    }[],
    outputs: {
      name: string
      nodeTypeFullyQualifiedName: string
    }[]
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
  }
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
  }
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
