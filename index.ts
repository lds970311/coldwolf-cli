#!/usr/bin/ts-node
const pkg = require("./package.json")
const fm = require("./frameworkVersion.json")
// @ts-ignore
const program = require("commander")
// @ts-ignore
const helpCommander = require("./src/core/Help");
// @ts-ignore
const createCommand = require("./src/core/CreateVue");
// @ts-ignore
const startProject = require('./src/core/StartProject')

//版本号
program.version(pkg.version, '-v, --version')
program.version(fm.framework.vue, '-f vue')
//帮助信息
helpCommander()

//创建命令
createCommand()

//启动项目
startProject()
program.parse(process.argv)


