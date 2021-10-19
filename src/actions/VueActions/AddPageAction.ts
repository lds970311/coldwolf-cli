const fs2 = require("fs")
const path2 = require("path");
const writeFile1 = require("../../utils/WriteFile");
const compiler1 = require("../../utils/Compiler");

// @ts-ignore
const addVuePageAction = async (name: string, destination: string | undefined): Promise<void> => {
    const targetPath = path2.resolve(destination, `${name.toLowerCase()}/${name}.vue`)
    const routerPath = path2.resolve(destination, `${name.toLowerCase()}/router.js`)
    let pageResult;
    let routerResult;
    try {
        pageResult = await compiler1("component.vue.ejs", {name, lowerName: name.toLowerCase()})
        routerResult = await compiler1("router.vue.ejs", {name, lowerName: name.toLowerCase()})
        //创建一个同名文件夹
        fs2.mkdir(`./${destination}/${name.toLowerCase()}`, {
            recursive: true,
            mode: 0o755
        }, (err: string) => {
            if (err) {
                console.log(`页面同名文件夹生成失败, 原因: ${err}`)
            }
        })
        //写入文件
        await writeFile1(targetPath, pageResult)
        await writeFile1(routerPath, routerResult)
        console.log(`页面${name}生成成功, 位置${targetPath}`)
        console.log(`路由${name}生成成功, 位置${targetPath}`)

    } catch (e) {
        //错误, 文件夹不存在,则创建
        if (!fs2.existsSync(`./${destination}/${name.toLowerCase()}`)) {
            fs2.mkdir(`./${destination}/${name.toLowerCase()}`, {
                recursive: true,
                mode: 0o755
            }, async (err: string | any) => {
                if (err) {
                    console.log(`文件夹生成失败! ${err}`);
                    return
                }
                try {
                    await writeFile1(targetPath, pageResult)
                    await writeFile1(routerPath, routerResult)
                    console.log(`组件${name}生成成功, 位置${targetPath}`)
                    console.log(`路由${name}生成成功, 位置${routerPath}`)
                } catch (e) {
                    console.log(`组件生成失败! ${e}`)
                }
            })
        }
    }
}

module.exports = {
    addVuePageAction
}
