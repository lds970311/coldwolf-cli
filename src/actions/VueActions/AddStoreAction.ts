const fs3 = require("fs")
const path3 = require("path");
const writeFile2 = require("../../utils/WriteFile");
const compiler2 = require("../../utils/Compiler");

//@ts-ignore
const addVueStoreAction = async (name: string, destPath: string) => {
    let storeResult;
    let typeResult;
    const storePath = path3.resolve(destPath, `${name.toLowerCase()}/index.js`)
    const typePath = path3.resolve(destPath, `${name.toLowerCase()}/type.js`)
    try {
        //1. 解析模板
        storeResult = await compiler2("store.vue.ejs", {name, lowerName: name.toLowerCase()})
        typeResult = await compiler2("store-types.vue.ejs", "");
        //2. 写入文件
        //创建文件夹
        fs3.mkdir(`./${destPath}/${name.toLowerCase()}`, {
            recursive: true,
            mode: 0o755
        }, err => {
            if (err) {
                console.log(`store文件夹创建失败, 原因: ${err}`)
                return
            }
        })
        await writeFile2(storePath, storeResult)
        await writeFile2(typePath, typeResult)
        console.log(`store创建成功, 路径: ${storePath}`)
        console.log(`type创建成功, 路径: ${typePath}`)
    } catch (e) {
        if (!fs3.existsSync(`./${destPath}/${name.toLowerCase()}`)) {
            fs3.mkdir(`./${destPath}/${name.toLowerCase()}`, {
                recursive: true,
                mode: 0o755
            }, async (err: string) => {
                if (err) {
                    console.log(`store文件夹创建失败, 原因: ${err}`)
                    return
                }
                try {
                    await writeFile2(storePath, storeResult)
                    await writeFile2(typePath, typeResult)
                    console.log(`store创建成功, 路径: ${storePath}`)
                    console.log(`type创建成功, 路径: ${typePath}`)
                } catch (e) {
                    console.log(`store创建失败, 原因: ${e}`)
                }
            })
        }
    }
}

module.exports = {
    addVueStoreAction
}
