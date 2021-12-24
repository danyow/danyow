const fs = require('fs')
const path = require('path')
const readline = require('readline')
const TService = require("turndown")
const os = require("os");

const tds = new TService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
  linkStyle: "",
  // linkReferenceStyle: "full",
})
//要遍历的文件夹所在的路径
const DIR_EN = path.resolve('../unity_doc/en/')
const TEMP = path.resolve('../unity_doc/temp/')
const DIR_MD = path.resolve('../unity_doc/md')

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
          if (line.includes('<div class="footer-wrapper">')) {
            isStart = false
          }
          if (isStart) {
            writeStream.write(line + os.EOL)
          }
          if (line.includes('<div id="_leavefeedback"></div>')) {
            isStart = true
          }
          if (line.includes('<div class="mb20 clear" id="">')) {
            isStart = true
          }
        })
        reader.on('close', function () {
          writeStream.close(function () {
            let html = fs.readFileSync(tempPath).toString()
            let md = tds.turndown(html)

            md = md.replaceAll('.html', '.md')
            // 锚点首字母小写 .md# 和 ](#
            md = md.replaceAll(/(\.md#\w+)|(\]\(#\w+)/g, function (str) {
              let words = str.replaceAll(/([A-Z][a-z]+)|([a-z][A-Z]+)/g, function (word) {
                return word.toLocaleLowerCase() + '-'
              })
              words = words.replaceAll(/([0-9A-Z]+)/g, function (word) {
                return word.toLocaleLowerCase() + '-'
              })
              words = words.substr(0, words.length - 1)
              return words
            })
            md = md.replaceAll('(../', 'https://docs.unity3d.com/')
            md = md.replaceAll(/(https:\/\/|http:\/\/)[\w|\/|\.|\-]+\.md/g, function (str) {
              return str.replaceAll('.md', '.html')
            })
            fs.writeFileSync(destPath, md)
          })
        })
      }
    } else if (states.isDirectory()) {
      readDirectory(filePath, tempPath, destPath)
    }
  })
}