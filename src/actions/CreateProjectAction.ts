const {promisify} = require("util")
const download = promisify(require("download-git-repo"))
// @ts-ignore
const open = require("open")
// @ts-ignore
let {vueRepo} = require("../config/repo.config")
// @ts-ignore
const {commandSpawn} = require("../utils/Terminal")

/**
 * 创建工程Action
 * @param project:action传递过来的工程名称
 * @param others:其他参数
 */
const createProjectAction = async function (project: string, others: string | string[]) {
    //1. clone项目
    try {
        let result = await download(vueRepo, project, {clone: true})
    } catch (e) {
        console.log(e);
    }
    // 2. 执行npm install
    try {
        const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
        let res = await commandSpawn(command, ['install'], {cwd: `./${project}`})
        console.log(res)
        //3. 执行npm run serve
        await commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`})
        //4. 打开浏览器
        open("http://localhost:8080")
    } catch (e) {
        console.log(e)
    }
}

module.exports = createProjectAction;
