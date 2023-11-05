import {resolve} from "path";
import {execSync, spawn} from "child_process";
import fs from "fs";
import packageJson from "../package.json";
import {checkProcessOutput} from "./utils/checkProcessOutput";
import axios from "axios";

const SKIP_SETUP = true as boolean

beforeEach(() => {
  if (SKIP_SETUP == false) {
    const rootDir = resolve(__dirname, '..')
    process.chdir(rootDir)
    execSync('npm run build', {stdio: 'inherit'})
    execSync('npm pack', {stdio: 'inherit'})
    const packName = 'vite-plugin-root-redirect.tgz'
    if (fs.existsSync(packName)) {
      fs.unlinkSync(packName)
    }
    fs.renameSync(`netglade-vite-plugin-root-redirect-${packageJson.version}.tgz`, packName)
  }
})

const cwdAndInstallTestProject = (name: string) => {
  const rootDir = resolve(__dirname, '..')
  const testProjectsDir = resolve(rootDir, 'test-projects')
  process.chdir(resolve(testProjectsDir, name))
  if (SKIP_SETUP == false) {
    if (fs.existsSync('node_modules')) {
      fs.rmSync('node_modules', { recursive: true, force: true })
    }
    execSync('npm i -D ../../vite-plugin-root-redirect.tgz', { stdio: 'inherit' })
    execSync('npm install', { stdio: 'inherit' })
  }

  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\nTesting setup end.  Now running test.')
}
