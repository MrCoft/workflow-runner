import {WorkflowJson} from "./WorkflowJson";

type OptionalKeys = {
  nodes: 'name' | 'attributesJson' | 'positionX' | 'positionY'
}

export type WorkflowJsonConstructor = {
  nodes: (Omit<WorkflowJson['nodes'][number], OptionalKeys['nodes']> & Partial<Pick<WorkflowJson['nodes'][number], OptionalKeys['nodes']>>)[]
  edges: WorkflowJson['edges']
}
