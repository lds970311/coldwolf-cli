// @ts-ignore
const program = require('commander')
// @ts-ignore
const startProjectAction = require("../actions/VueActions/StartProjectAction");

// @ts-ignore
const startProject = async function () {
    program
        .command('start')
        .description('start program')
        .action((project) => {
            startProjectAction(project)
        })
}

module.exports = startProject
