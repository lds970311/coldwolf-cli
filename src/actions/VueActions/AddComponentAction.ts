const compiler = require("../../utils/Compiler");
// @ts-ignore
const writeFile = require("../../utils/WriteFile");
// @ts-ignore
const path1 = require("path")

const fs1 = require("fs")

/**
 * 添加Vue组件
 * @param name
 * @param destination
 */
// @ts-ignore
const addVueComponentAction = function (name: string, destination: string | undefined) {
    compiler("component.vue.ejs", {name, lowerName: name.toLowerCase()})
        .then(async (res: any) => {
            //写入文件
            const targetPath = path1.resolve(destination, `${name}.vue`)
            console.log(targetPath)
            try {
                await writeFile(targetPath, res)
                console.log(`组件${name}生成成功, 位置${targetPath}`)
            } catch (e) {
                //错误, 文件夹不存在,则创建
                if (!fs1.existsSync(`./${destination}`)) {
                    fs1.mkdir(`./${destination}`, {
                        recursive: true,
                        mode: 0o755
                    }, async (err: string | any) => {
                        if (err) {
                            console.log(`文件夹生成失败! ${err}`);
                            return
                        }
                        try {
                            await writeFile(targetPath, res)
                            console.log(`组件${name}生成成功, 位置${targetPath}`)
                        } catch (e) {
                            console.log(`组件生成失败! ${e}`)
                        }
                    })
                }
            }
        })
        .catch(err => console.error(err));
}

module.exports = {
    addVueComponentAction
}
