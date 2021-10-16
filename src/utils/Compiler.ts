const ejs = require('ejs')
const path = require('path')

/**
 * 编译ejs模板
 */
const compile = (templateName: string, data: string | object): Promise<string> => {
    const templatePosition = `../templates/${templateName}`
    const templatePath = path.resolve(__dirname, templatePosition)
    // console.log(templatePath)
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, {data}, {}, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = compile


