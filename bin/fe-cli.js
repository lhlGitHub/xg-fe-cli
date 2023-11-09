#!/usr/bin/env node

const commander = require('commander')

commander.command('create <project-name>').option('--git','是否创建git仓库').action((name,cmd)=>{
   
 require('../lib/create')(name,cmd)
})
commander.parse(process.argv)
