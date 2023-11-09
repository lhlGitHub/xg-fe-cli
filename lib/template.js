const inquirer = require('inquirer')
async function getTemplate() {
  let list = require('../data.json')
  let types = list.map((item) => `${item.name} ${item.description}`)
  const { template } = await inquirer.prompt({
    type: 'list',
    message: '请选择一个模板',
    name: 'template',
    choices: types
  })
  const index = types.findIndex((item) => item === template)
  return list[index].url // 返回 仓库地址
}


module.exports = {
  getTemplate
}
