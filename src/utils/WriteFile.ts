const fs = require('fs');


/**
 * 将模板内容写入文件
 * @param path
 * @param contents
 */
// @ts-ignore
const writeFile = (path: string, contents: string): Promise<void> => {
    return fs.promises.writeFile(path, contents)
}

module.exports = writeFile
