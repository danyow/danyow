const fs = require('fs')
const path = require('path')
const TService = require("turndown")

const tds = new TService()
//要遍历的文件夹所在的路径
const DIR_EN = path.resolve('en/')
const DIR_MD = path.resolve('md/')

//调用文件遍历方法
readDirectory(DIR_EN, DIR_MD, false)

/**
 * 文件遍历方法
 * @param sourceDir 需要遍历的文件路径
 * @param destDir 放到哪个文件夹
 */
function readDirectory(sourceDir, destDir) {
  if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir)
  }
  let fileInfos = fs.readdirSync(sourceDir)
  fileInfos.forEach(function (fileInfo) {
    // 获取绝对路径得到 states
    const filePath = path.join(sourceDir, fileInfo)
    const destPath = path.join(destDir, fileInfo.replace(".html", ".md"))
    let states = fs.statSync(filePath)
    if (states.isFile()) {
      if (fileInfo.endsWith('.html')) {
        // 按行读取文件
        let md = tds.turndown(fs.readFileSync(filePath, 'utf8'))
          fs.writeFileSync(destPath, md)
      } else {
        fs.copyFileSync(filePath, destPath)
      }
    } else if (states.isDirectory()) {
      readDirectory(filePath, destPath)
    }
  })
}


// // var markdown = tds.turndown()