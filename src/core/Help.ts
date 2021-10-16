// @ts-ignore
const program = require("commander")

// @ts-ignore
const helpCommander = () => {
    //增加option
    program.option('-v --version', 'get codewolf cli version')
    program.option('-d --dest <dest>', 'a destination floder , for example: -d /src/components')
    program.option('-f --frameworks <frameworks>', 'your framework')

//监听输入
    program.on('--help', function () {
        console.log("")
        console.log("Other:")
        console.log("  other options")
    })
}

module.exports = helpCommander
