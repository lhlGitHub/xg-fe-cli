const { getTemplate } = require('./template.js')
module.exports = async (name, cmd) => {
  const repoUrl = await getTemplate()
  console.log('cmd', cmd)
  const isCreateRepo = cmd.git
  require('./initTemplate.js')(name, repoUrl, isCreateRepo)
}
