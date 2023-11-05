import {spawn} from "child_process";
import stripAnsi from 'strip-ansi';

export async function* checkProcessOutput(cmd: string) {
  const [command, ...args] = cmd.split(' ')
  const child = spawn(command, args, { shell: true });
  let output = ''
  child.stdout.setEncoding('utf8');
  child.stdout.setEncoding('ascii');
  // child.stdout.on('data', (data) => output += data.toString())
  child.stdout.on('data', (data) => {
    output += stripAnsi(data.toString())
    console.log(data.toString())
  })

  const startTime = new Date().getTime()
  while (new Date().getTime() - startTime < 15000) {
    yield output
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error('Timeout')
}
