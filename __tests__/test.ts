import {WorkflowRuntime} from "../src/WorkflowRuntime";
import {testData_emptyPlugin} from "./test.data";

test('empty constructor', () => {
  const workflowRuntime = new WorkflowRuntime()
})

test('constructor no plugins', () => {
  const workflowRuntime = new WorkflowRuntime({})
})

test('load plugin', () => {
  const workflowRuntime = new WorkflowRuntime({
    plugins: [testData_emptyPlugin]
  })
})

test('exec native node type', () => {
  const workflowRuntime = new WorkflowRuntime({})
})
