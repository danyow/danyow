const fs = require('fs')
const path = require('path')
const readline = require('readline')
const TService = require("turndown")
const os = require("os");


const tds = new TService()
//要遍历的文件夹所在的路径
const DIR_EN = path.resolve('../unity_doc/en/')
const TEMP = path.resolve('../unity_doc/temp/')
const DIR_MD = path.resolve('../unity_doc/md/')

// const DIR_EN = 'D:\\Unity\\Editors\\2020.3.24f1c2\\Editor\\Data\\Documentation\\en'
// const TEMP = 'D:\\Unity\\Editors\\2020.3.24f1c2\\Editor\\Data\\Documentation\\temp'
// const DIR_MD = 'D:\\Unity\\Editors\\2020.3.24f1c2\\Editor\\Data\\Documentation\\md'

//调用文件遍历方法
readDirectory(DIR_EN, TEMP, DIR_MD, false)

/**
 * 文件遍历方法
 * @param sourceDir 需要遍历的文件路径
 * @param tempDir 放到哪个文件夹
 * @param destDir 放到哪个文件夹
 */
function readDirectory(sourceDir, tempDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir)
  }
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir)
  }
  let fileInfos = fs.readdirSync(sourceDir)
  fileInfos.forEach(function (fileInfo) {
    // 获取绝对路径得到 states
    const filePath = path.join(sourceDir, fileInfo)
    const tempPath = path.join(tempDir, fileInfo)
    const destPath = path.join(destDir, fileInfo.replace(".html", ".md"))
    let states = fs.statSync(filePath)
    if (states.isFile()) {
      if (fileInfo.endsWith('.html')) {
        // 按行读取文件
        let readStream = fs.createReadStream(filePath, "utf8")
        if (!fs.existsSync(tempPath)) {
          fs.writeFileSync(tempPath, '')
        }
        let writeStream = fs.createWriteStream(tempPath)
        let reader = readline.createInterface(readStream)
        let isStart = false
        reader.on('line', function (line) {
          if (line.includes('<div id="_content"></div>')) {
            isStart = false
          }
          if (isStart) {
            writeStream.write(line + os.EOL)
          }
          if (line.includes('<div id="_leavefeedback"></div>')) {
            isStart = true
          }
        })
        reader.on('close', function () {
          let html = fs.readFileSync(tempPath).toString()
          let md = tds.turndown(html)

          md = md.replaceAll('.html', '.md')
          md = md.replaceAll('../uploads/', 'https://docs.unity3d.com/uploads/')
          md = md.replaceAll('../StaticFiles/', 'https://docs.unity3d.com/StaticFiles/')
          md = md.replaceAll('../StaticFilesManual/', 'https://docs.unity3d.com/StaticFilesManual/')
          md = md.replaceAll('../ScriptReference/docdata/', 'https://docs.unity3d.com/ScriptReference/docdata/')
          fs.writeFileSync(destPath, md)
        })
      }
    } else if (states.isDirectory()) {
      readDirectory(filePath, tempPath, destPath)
    }
  })
}


// // var markdown = tds.turndown()