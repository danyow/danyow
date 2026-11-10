// noinspection DuplicatedCode

/**
 * 获取并整理「danyow 在 GitHub 上 star 的他人仓库」，生成分类 Markdown 文档。
 *
 * 分类维度：
 *   1. 按编程语言（GitHub 自动检测的主语言）
 *   2. 按 GitHub Topics（仓库作者打的标签）
 *
 * 使用方式：GITHUB_TOKEN=<personal_access_token> node scripts/stars.js
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const OUTPUT_FILE = path.resolve(__dirname, '../note/stars.md')

/**
 * 使用 GitHub REST API 获取指定页的 Star 仓库列表。
 * 使用认证端点 /user/starred，返回当前 token 用户所 star 的全部仓库
 * （即 danyow star 的其他人的仓库）。
 */
function fetchPage(page, token, callback) {
  const headers = {
    'User-Agent': 'danyow-stars-script',
    'Accept': 'application/vnd.github+json',
  }
  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  // /user/starred — 认证用户自己 star 的仓库（均为他人创建的仓库）
  const options = {
    hostname: 'api.github.com',
    path: '/user/starred?per_page=100&page=' + page,
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
function categorizeByLanguage(repos) {
  const categories = {}
  for (const repo of repos) {
    const lang = repo.language || '其他'
    if (!categories[lang]) {
      categories[lang] = []
    }
    categories[lang].push(repo)
  }
  for (const lang in categories) {
    categories[lang].sort(function (a, b) {
      return b.stargazers_count - a.stargazers_count
    })
  }
  return categories
}

/**
 * 按 GitHub Topics 分类（一个仓库可出现在多个话题下）
 */
function categorizeByTopic(repos) {
  const categories = {}
  const addedToTopic = {}
  for (const repo of repos) {
    const topics = repo.topics && repo.topics.length > 0 ? repo.topics : ['未分类']
    for (const topic of topics) {
      if (!categories[topic]) {
        categories[topic] = []
        addedToTopic[topic] = new Set()
      }
      if (!addedToTopic[topic].has(repo.full_name)) {
        addedToTopic[topic].add(repo.full_name)
        categories[topic].push(repo)
      }
    }
  }
  for (const topic in categories) {
    categories[topic].sort(function (a, b) {
      return b.stargazers_count - a.stargazers_count
    })
  }
  return categories
}

/**
 * 将分类对象按「分类内仓库数量从多到少」排序，返回排好序的键数组
 */
function sortedKeys(categories) {
  return Object.keys(categories).sort(function (a, b) {
    return categories[b].length - categories[a].length
  })
}

/**
 * 将语言/话题名称转换为 Markdown 锚点
 */
function toAnchor(name) {
  return name
    .toLowerCase()
    .replace(/\+/g, 'p')
    .replace(/#/g, 'sharp')
    .replace(/[\s]+/g, '-')
    .replace(/[^\w\u4e00-\u9fa5-]/g, '')
}

/**
 * 生成一个分类表格块
 */
function renderTable(repos) {
  let md = '| 仓库 | 描述 | ⭐ |\n'
  md += '| --- | --- | ---: |\n'
  for (const repo of repos) {
    const desc = (repo.description || '').replace(/\\/g, '\\\\').replace(/\|/g, '\\|')
    md += '| [' + repo.full_name + '](' + repo.html_url + ') | ' + desc + ' | ' + repo.stargazers_count + ' |\n'
  }
  return md + '\n'
}

/**
 * 生成完整 Markdown 文档（按语言 + 按 Topic 两个维度）
 */
function generateMarkdown(repos) {
  const date = new Date().toISOString().split('T')[0]
  const byLang = categorizeByLanguage(repos)
  const byTopic = categorizeByTopic(repos)
  const langKeys = sortedKeys(byLang)
  const topicKeys = sortedKeys(byTopic)

  let md = '# ⭐ 我 Star 的仓库\n\n'
  md += '> 这里收录了 [danyow](https://github.com/danyow) **star 的他人仓库**，按编程语言和 GitHub Topics 两个维度分类。\n'
  md += '>\n'
  md += '> 最后更新: ' + date + '，共 **' + repos.length + '** 个仓库。\n'
  md += '> 此文件由 [GitHub Actions](https://github.com/danyow/danyow/actions/workflows/stars.yml) 自动生成，请勿手动编辑。\n\n'

  // ── 按语言分类 ──────────────────────────────────────────────────────────────
  md += '## 按编程语言分类\n\n'
  for (const lang of langKeys) {
    const anchor = toAnchor(lang)
    md += '- [' + lang + '](#' + anchor + ') (' + byLang[lang].length + ')\n'
  }
  md += '\n'
  for (const lang of langKeys) {
    md += '### ' + lang + '\n\n'
    md += renderTable(byLang[lang])
  }

  // ── 按 Topic 分类 ────────────────────────────────────────────────────────────
  md += '## 按 Topics 分类\n\n'
  // 只列出出现 ≥ 2 次的 topic，避免噪音太多
  const popularTopics = topicKeys.filter(function (t) { return byTopic[t].length >= 2 })
  for (const topic of popularTopics) {
    const anchor = toAnchor(topic)
    md += '- [' + topic + '](#' + anchor + ') (' + byTopic[topic].length + ')\n'
  }
  md += '\n'
  for (const topic of popularTopics) {
    md += '### ' + topic + '\n\n'
    md += renderTable(byTopic[topic])
  }

  return md
}

// 主流程
fetchAllStars(function (err, repos) {
  if (err) {
    console.error('获取 Star 仓库失败:', err.message)
    process.exit(1)
  }

  console.log('共获取 ' + repos.length + ' 个他人的 Star 仓库')

  const md = generateMarkdown(repos)

  const dir = path.dirname(OUTPUT_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(OUTPUT_FILE, md, 'utf-8')
  console.log('已写入: ' + OUTPUT_FILE)
})

