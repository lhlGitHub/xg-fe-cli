const ora = require('ora')
const spinner = ora('🚀  初始化模板...')
// const { token, username } = require('../lib/config')
const inquirer = require('inquirer')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const execa = require('execa')
const cwd = process.cwd()
const path = require('path')

async function initTemplate(name, repo) {
  await download(name, repo)
  let targetDir = path.resolve(cwd, name)
  await installDependencies(targetDir)
}
async function getUserName() {
  const { username } = await inquirer.prompt({
    type: 'input',
    message: '请输入 gitlab 用户名',
    name: 'username'
  })
  return username
}
async function getUserToken() {
  const { token } = await inquirer.prompt({
    type: 'input',
    message: '请输入 gitlab token',
    name: 'token'
  })
  return token
}

// 下载模板
async function download(name, repo) {
  const username = await getUserName()
  const token = await getUserToken()
  if (!username || !token) {
    spinner.fail('获取用户信息失败')
    process.exit()
  }
  spinner.start()
  try {
    await exec(`git clone https://${username}:${token}@${repo} ${name}`)
    spinner.succeed()
  } catch (error) {
    console.log('error', error)
    spinner.fail()
    process.exit()
  }
}
// 安装依赖
async function installDependencies(projectPath) {
  spinner.start('🚀  安装依赖...')
  try {
    await execa(
      'npm',
      ['install', '--registry', 'https://registry.npmjs.org/'],
      { stdio: 'inherit', cwd: projectPath }
    )
    spinner.succeed()
  } catch (error) {
    console.log('error', error)
    spinner.fail()
  }
}


module.exports = (name, repo) => {
  initTemplate(name, repo)
}
