// @ts-ignore
const {commandSpawn} = require("../../utils/Terminal")

// @ts-ignore
const startProjectAction = async (project: string) => {
    //开启项目
    const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    try {
        await commandSpawn('cd', [project], {cmd: `./${project}`})
        await commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`})
    } catch (e) {
        console.log(e)
    }
}

module.exports = startProjectAction
