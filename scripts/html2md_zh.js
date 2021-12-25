// const fs = require('fs')
// const path = require('path')
// const readline = require('readline')
// const TService = require("turndown")
// const TPlugin = require('turndown-plugin-gfm')
//
// const os = require("os");
//
// const tds = new TService({
//   headingStyle: "atx",
//   bulletListMarker: "-",
//   codeBlockStyle: "fenced",
//   emDelimiter: "*",
//   linkStyle: "referenced",
//   linkReferenceStyle: "full",
// })
// tds.use(TPlugin.gfm)
// tds.use([TPlugin.tables, TPlugin.strikethrough])
// tds.addRule('pre2Code', {
//   filter: ['pre'],
//   replacement(content) {
//     const len = content.length
//     // 除了pre标签，里面是否还有code标签包裹，有的话去掉首尾的`（针对微信文章）
//     const isCode = content[0] === '`' && content[len - 1] === '`'
//     const result = isCode ? content.substr(1, len - 2) : content
//     return '```\n' + result + '\n```\n'
//   }
// })
//
// //要遍历的文件夹所在的路径
// const DIR_EN = path.resolve('../unity_doc/zh/')
// const TEMP = path.resolve('../unity_doc/temp/')
// const DIR_MD = path.resolve('./docs/')
//
// const nonSplitWords = [
//   "GameObject",
//   "WebGL",
// ]
//
// const replaceWords = []
// for (let index = 0; index < nonSplitWords.length; index++) {
//   let word = nonSplitWords[index].toLowerCase()
//   replaceWords[index] = word.replace(word.charAt(0), word.charAt(0).toUpperCase());
// }
//
// //调用文件遍历方法
// readDirectory(DIR_EN, TEMP, DIR_MD, false)
//
// /**
//  * 文件遍历方法
//  * @param sourceDir 需要遍历的文件路径
//  * @param tempDir 放到哪个文件夹
//  * @param destDir 放到哪个文件夹
//  */
// function readDirectory(sourceDir, tempDir, destDir) {
//   if (!fs.existsSync(destDir)) {
//     fs.mkdirSync(destDir)
//   }
//   if (!fs.existsSync(tempDir)) {
//     fs.mkdirSync(tempDir)
//   }
//   let fileInfos = fs.readdirSync(sourceDir)
//   fileInfos.forEach(function (fileInfo) {
//     // 获取绝对路径得到 states
//     const filePath = path.join(sourceDir, fileInfo)
//     const tempPath = path.join(tempDir, fileInfo)
//     const destPath = path.join(destDir, fileInfo.replace(".html", ".md"))
//     let states = fs.statSync(filePath)
//     if (states.isFile()) {
//       if (fileInfo.endsWith('.html')) {
//         // 按行读取文件
//         let readStream = fs.createReadStream(filePath, "utf8")
//         if (!fs.existsSync(tempPath)) {
//           fs.writeFileSync(tempPath, '')
//         }
//         let writeStream = fs.createWriteStream(tempPath)
//         let reader = readline.createInterface(readStream)
//         let isStart = false
//         reader.on('line', function (line) {
//           if (line.includes('<div class="nextprev clear">')) {
//             isStart = false
//           }
//           if (line.includes('<h1>')) {
//             isStart = true
//           }
//           if (isStart) {
//             writeStream.write(line + os.EOL)
//           }
//         })
//         reader.on('close', function () {
//           writeStream.close(function () {
//             let html = fs.readFileSync(tempPath).toString()
//             let md = tds.turndown(html)
//
//             // md = md.replaceAll('.html', '.md')
//             md = md.replaceAll('../StaticFilesManual/', 'https://docs.unity3d.com/StaticFilesManual/')
//             md = md.replaceAll('../ScriptReference/', 'https://docs.unity3d.com/ScriptReference/')
//             md = md.replaceAll('../StaticFiles/', 'https://docs.unity3d.com/StaticFiles/')
//             md = md.replaceAll('../uploads/', 'https://docs.unity3d.com/uploads/')
//             md = md.replaceAll('https://docs.unity3d.com/Manual/', '')
//             // 把 `Manual` 文件内的文件格式转为 `md`
//             md = md.replaceAll(/]: [\w\-]+\.html/g, function (rep) {
//               return rep.replaceAll('.html', '.md')
//             })
//             md = md.replaceAll(/(]: [\w\-]+\.md#)([\w\-]+)/g, function (rep, _, tag) {
//               rep = rep.replaceAll(/#[\w\-]+/g, function (_) {
//                 // 判断这个单词在不在不可分割的表里面
//                 let index = nonSplitWords.findIndex(function (word) {
//                   return word.includes(tag)
//                 })
//                 if (index != -1) {
//                   tag = tag.replaceAll(nonSplitWords[index], replaceWords[index])
//                 }
//
//                 // 首字母小写但后面全大写
//                 tag = tag.replaceAll(/^[a-z][A-Z]+/g, function (rep) {
//                   return rep.toLocaleLowerCase()
//                 })
//                 // 首字母大写但后面小写
//                 tag = tag.replaceAll(/[A-Z][a-z]+/g, function (rep) {
//                   return rep.toLocaleLowerCase() + '-'
//                 })
//                 // 首字母为数字或者大写且后面大写
//                 tag = tag.replaceAll(/([0-9]|[A-Z])[A-Z]+/g, function (rep) {
//                   return rep.toLocaleLowerCase() + '-'
//                 })
//                 if (tag.endsWith('-')) {
//                   tag = tag.substr(0, tag.length - 1)
//                 }
//                 // 修复错误
//                 if (tag.includes('--')) {
//                   tag = tag.replaceAll('--', '-')
//                 }
//                 return '#' + tag
//               })
//               return rep
//             })
//
//
//             fs.writeFileSync(destPath, md)
//           })
//         })
//       }
//     } else if (states.isDirectory()) {
//       readDirectory(filePath, tempPath, destPath)
//     }
//   })
// }
