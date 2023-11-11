import {WorkflowRuntime} from "../src/WorkflowRuntime";
import {testData_emptyPlugin, testData_mathPlugin} from "./test.data";

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

test('exec native node type', async () => {
  const workflowRuntime = new WorkflowRuntime({
    plugins: [testData_mathPlugin]
  })
  const result = await workflowRuntime.execute(
    'math.add',
    {
      a: 1,
      b: 2,
    }
  )
  expect(result).toEqual(3)
})
