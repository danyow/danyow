// noinspection DuplicatedCode

/**
 * 获取并整理 GitHub Star 仓库列表，生成分类 Markdown 文档。
 * 使用方式：GITHUB_TOKEN=<token> node scripts/stars.js
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const USERNAME = 'danyow'
const OUTPUT_FILE = path.resolve(__dirname, '../note/stars.md')

/**
 * 获取指定页的 Star 仓库列表
 */
function fetchPage(page, token, callback) {
  const headers = {
    'User-Agent': 'danyow-stars-script',
    'Accept': 'application/vnd.github+json',
  }
  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  const options = {
    hostname: 'api.github.com',
    path: '/users/' + USERNAME + '/starred?per_page=100&page=' + page,
    headers: headers,
  }

  let data = ''
  const req = https.get(options, function (res) {
    res.setEncoding('utf-8')
    res.on('data', function (chunk) {
      data += chunk
    })
    res.on('end', function () {
      try {
        const repos = JSON.parse(data)
        callback(null, repos)
      } catch (e) {
        callback(e, null)
      }
    })
  })

  req.on('error', function (e) {
    callback(e, null)
  })
  req.end()
}

/**
 * 获取所有 Star 仓库（自动翻页）
 */
function fetchAllStars(callback) {
  const token = process.env.GITHUB_TOKEN
  let allRepos = []
  let page = 1

  function fetchNext() {
    console.log('正在获取第 ' + page + ' 页...')
    fetchPage(page, token, function (err, repos) {
      if (err) {
        return callback(err, null)
      }
      if (!Array.isArray(repos)) {
        return callback(new Error('API 返回格式异常: ' + JSON.stringify(repos)), null)
      }
      allRepos = allRepos.concat(repos)
      if (repos.length === 100) {
        page++
        fetchNext()
      } else {
        callback(null, allRepos)
      }
    })
  }

  fetchNext()
}

/**
 * 按编程语言分类
 */
function categorize(repos) {
  const categories = {}

  for (const repo of repos) {
    const lang = repo.language || '其他'
    if (!categories[lang]) {
      categories[lang] = []
    }
    categories[lang].push(repo)
  }

  // 每个分类内按 Star 数降序排列
  for (const lang in categories) {
    categories[lang].sort(function (a, b) {
      return b.stargazers_count - a.stargazers_count
    })
  }

  return categories
}

/**
 * 生成 Markdown 文档
 */
function generateMarkdown(repos) {
  const categories = categorize(repos)
  const date = new Date().toISOString().split('T')[0]

  let md = '# ⭐ Star 列表\n\n'
  md += '> 最后更新: ' + date + '，共 **' + repos.length + '** 个仓库\n\n'

  // 按 Star 数对语言排序（多的在前）
  const langs = Object.keys(categories).sort(function (a, b) {
    return categories[b].length - categories[a].length
  })

  // 目录
  md += '## 目录\n\n'
  for (const lang of langs) {
    const anchor = lang.toLowerCase().replace(/\+/g, 'p').replace(/#/g, 'sharp').replace(/[\s]+/g, '-').replace(/[^\w\u4e00-\u9fa5-]/g, '')
    md += '- [' + lang + '](#' + anchor + ') (' + categories[lang].length + ')\n'
  }
  md += '\n'

  // 各分类
  for (const lang of langs) {
    md += '## ' + lang + '\n\n'
    md += '| 仓库 | 描述 | ⭐ |\n'
    md += '| --- | --- | ---: |\n'
    for (const repo of categories[lang]) {
      const desc = (repo.description || '').replace(/\\/g, '\\\\').replace(/\|/g, '\\|')
      md += '| [' + repo.full_name + '](' + repo.html_url + ') | ' + desc + ' | ' + repo.stargazers_count + ' |\n'
    }
    md += '\n'
  }

  return md
}

// 主流程
fetchAllStars(function (err, repos) {
  if (err) {
    console.error('获取 Star 仓库失败:', err.message)
    process.exit(1)
  }

  console.log('共获取 ' + repos.length + ' 个 Star 仓库')

  const md = generateMarkdown(repos)

  const dir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, md, 'utf-8')
  console.log('已写入: ' + OUTPUT_FILE)
})
