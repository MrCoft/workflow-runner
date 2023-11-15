
export interface WorkflowJson {
  nodes: {
    id: string // GUID
    name?: string
    nodeType: string
    attributes?: JSON
    positionX?: number
    positionY?: number
    inputEdgeIds: string[]
    outputEdgeIds: string[]
  }[]
  edges: {
    id: string
    sourceNodeId: string
    sourceKey: string
    targetNodeId: string
    targetKey: string
  }[]
}
