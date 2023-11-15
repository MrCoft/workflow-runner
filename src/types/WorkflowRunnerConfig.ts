import {WorkflowPluginConstructor} from "./WorkflowPlugin";

export interface WorkflowRunnerConfig {
  plugins?: WorkflowPluginConstructor[]
}
