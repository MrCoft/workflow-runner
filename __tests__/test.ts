import {WorkflowRunner} from "../src/WorkflowRunner";
import {testData_emptyPlugin, testData_mathPlugin} from "./test.data";
import {WorkflowJson} from "../src/types/WorkflowJson";
import {WorkflowJsonConstructor} from "../src/types/WorkflowJsonConstructor";

test('empty constructor', () => {
  const runner = new WorkflowRunner()
})

test('constructor no plugins', () => {
  const runner = new WorkflowRunner({})
})

test('load plugin', () => {
  const runner = new WorkflowRunner({
    plugins: [testData_emptyPlugin]
  })
})

test('exec native node type', async () => {
  const runner = new WorkflowRunner({
    plugins: [testData_mathPlugin]
  })
  const result = await runner.execute(
    'math.add',
    {
      a: 1,
      b: 2,
    }
  )
  expect(result).toEqual(3)
})

test('convert directed graph to array', async () => {
  const runner = new WorkflowRunner({
    plugins: [testData_mathPlugin],
  })
  const workflowJson = {
    nodes: [
      {
        id: 'node2',
        nodeType: 'pass',
        // inputs: {
        //   a: 1,
        //   b: 2,
        // }
        inputEdgeIds: ['edge1'],
        outputEdgeIds: []
      },
      {
        id: 'node1',
        nodeType: 'math.add',
        // inputs: {
        //   a: 3,
        //   b: 4,
        // }
        inputEdgeIds: [],
        outputEdgeIds: ['edge1']
      },
    ],
    edges: [
      {
        id: 'edge1',
        sourceNodeId: 'node1',
        sourceKey: 'default',
        targetNodeId: 'node2',
        targetKey: 'default'
      }
    ]
  } satisfies WorkflowJsonConstructor

  const result = await runner.execute(
    'math.add',
    {
      a: 1,
      b: 2,
    }
  )
  expect(result).toEqual(3)
})
