// @ts-ignore
const program = require('commander')
const createProgram = require('../actions/CreateProjectAction')
// @ts-ignore
const {addVueComponentAction} = require('../actions/AddComponentAction');
// @ts-ignore
const {addVuePageAction} = require("../actions/AddPageAction");
//@ts-ignore
const {addVueStoreAction} = require("../actions/AddStoreAction");
/**
 *  创建工程
 */
// @ts-ignore
const createCommand = async function (): void {
    program
        .command('create <project> [...others]')
        .description('clone repository into a folder')
        .action((project, others) => {
            // console.log(project, others)
            createProgram(project, others)
        })

    /**
     * 添加vue组件
     */
    program
        .command("add-vue-component <name>  [targetPath]")
        .description('add vue component', '例如: wolf add-vue-component HelloWorld [src/components]')
        .action(function (name: string) {
            addVueComponentAction(name, arguments[1] || 'src/components')
        })

    /**
     * 添加vue页面和对应路由
     */
    program
        .command("add-vue-page <name> [targetPath]")
        .description('add vue page and router', '例如 add-vue-page Home [src/Pages]')
        .action(function (pageName: string) {
            addVuePageAction(pageName, arguments[1] || `src/pages`)
        })

    program
        .command("add-vue-store <name> [targetPath]")
        .description('add vuex store', '例如: add-vue-store Main [src/store]')
        .action(function (storeName: string): void {
            addVueStoreAction(storeName, arguments[1] || `src/store/modules`)
        })
}

module.exports = createCommand
