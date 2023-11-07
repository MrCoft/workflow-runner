import pluginJson from "./assets/plugin.json"

type WorkflowPlugin = {
  name: string
  result: any
}[]

type WorkflowJson = {
  id: string
  func: string
  output: string
}[]

export class Workflow {
  loadPlugin(plugin: Readonly<WorkflowPlugin>) {
    return this
  }

  run(workflow: WorkflowJson) {
    return this
  }
}

/*
* runtime requirements

[ ] load from json
[ ] save to json
[ ] to async function
	[ ] run
[ ] load from db
[ ] find first unit of work
[ ] execute 1 node

[ ] load plugin
[ ] TS-support for plugins
[ ] TS-support for workflow
[ ] also non-TS support

*
* */

type T = typeof  pluginJson

const X: T = null as unknown as T

const plugin = [
  {
    name: 'add',
      result:    1
  },
  {
    name: 'subtract',
    result: 2
  },
] as const

const workflow = [
  {
    id: 'input',
    func: 'add',
    output: '2'
  },
  {
    id: '3',
    func: 'add',
    output: 'output'
  },
  {
    id: '2',
    func: 'subtract',
    output: '3',
  },
  {
    id: 'output',
    func: 'subtract',
    output: '//'
  }
] as const

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
// type WorkflowSelect<W extends Readonly<WorkflowJson>, Id extends string> = Omit<keyof W, keyof []>
type WorkflowSelect<W extends Readonly<WorkflowJson>, Id extends string> = Extract<W[number], { id: Id }>
type PluginSelect<W extends Readonly<WorkflowPlugin>, Id extends string> = Extract<W[number], { name: Id }>
// type WorkflowSelect<W extends Readonly<WorkflowJson>, Id extends string> = W[number]
// type WorkflowSelect<W extends Readonly<WorkflowJson>, Id extends string> = W[number] & { id: Id }

type Result = WorkflowSelect<typeof workflow, 'input'>

type Work<P extends Readonly<WorkflowPlugin>, W extends Readonly<WorkflowJson>, Id extends string> = WorkflowSelect<W, Id>['output'] extends '//' ? PluginSelect<P, WorkflowSelect<W, Id>['func']>['result'] : Work<P, W, WorkflowSelect<W, Id>['output']>
type Processor<P extends Readonly<WorkflowPlugin>, W extends Readonly<WorkflowJson>> = Work<P, W, 'input'>
/*
* TODO
*
* [ ] parametrized inputs, outputs
* [ ] mapping between JSON types and TS types
* [ ] report cast errors - attempts descend from every input, returns error or none
* */

const x = null as unknown as Processor<typeof plugin, typeof workflow>

const result = new Workflow()
  .loadPlugin(plugin)
  .run(workflow)
