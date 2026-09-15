# Danyow · AI 与游戏观察

Astro + Retypeset 暗色资讯站，正式首页为 `https://danyow.cn/`。首页展示新资讯，旧笔记、文档和博客继续保留。

## 内容

- `ai-engine-watch/reports/YYYY/MM/YYYY-MM-DD.md`：AI 原生游戏引擎日报唯一原稿。
- `voice-agent-watch/reports/YYYY/MM/YYYY-MM-DD.md`：电话语音 Agent 日报唯一原稿。
- `note/`、`docs/`、`blog/`：旧文章原稿与日期保留；`published: false` 的草稿不进入公开构建。
- `lua/`、`unity/`：仅保留历史源文件，不参与构建或展示。

原稿和完整日期文件名不因网址迁移改变。旧 `/danyow/` 不再发布第二套文章或网站资源，只保留轻量跳转页，自动转到根目录下对应的新页面。新阅读链接直接使用 `/ai-engine-watch/` 和 `/voice-agent-watch/`。没有把旧文章日期改成迁移日期，标题提纲不会自动补写。

## 开发

Node.js 22.16 及以上，使用 npm 锁文件。

```sh
npm ci
npm test
SITE_BASE_URL=/ npm run dev
SITE_BASE_URL=/ npm run build
SITE_BASE_URL=/ npm run preview
```

构建读取 Markdown，生成静态 HTML 和搜索索引，再核对站内链接、原稿哈希和历史路径。不需要数据库或运行时服务器。正式构建显式使用 `SITE_BASE_URL=/`；可配置基路径仅供本地测试，不代表保留旧项目网站。

## 日报发布

引擎日报每天北京时间09:00开始，电话语音日报09:10开始。任务开始时间相差十分钟，实际投递要等研究和发布完成。

源码和原稿统一维护在本仓库 `main`。根域名原先绑定 `danyow/danyow.github.io`，因此正式发布由该仓库 `master` 的 `Publish root news site` 工作流构建同一份源码，并输出到该仓库 `gh-pages`，不再构建旧站源码。

定时任务提交 MD → 条件更新根站仓库 `deployment/source.json` 中的真实源码提交 → 根站 Actions 以 `/` 构建发布 → 核验真实根首页、日期页、raw和回执 → 邮件发送短摘要与根目录链接。

详见 [根域名发布协议](research/PUBLISHING.md)。两个任务只获得额外更新这个发布请求文件的权限，不改工作流、域名或其他文章。没有新增调度服务或额外凭据。手动更新站点源码后也需更新发布请求或手动运行根站工作流；本仓库跳转入口发布成功不等于根站更新成功。

两个栏目的 `index/`、`raw/`、`receipts/` 协议保持兼容，正式读取目标在根站发布仓库 `gh-pages`。私人邮箱、电话、推送凭据和投递记录不入库。

## 旧地址自动跳转

本仓库的 Pages 产物现在只有跳转入口，不含正文、样式包或原稿副本。已知文章有对应的轻量跳转页，其他旧路径由自定义404处理。浏览器跳转会删除开头的 `/danyow`，保留后面的文章路径、查询参数和章节片段，并使用 `location.replace` 避免返回键循环。

这是 GitHub Pages 上的浏览器跳转，不是服务器HTTP 301/308。支持脚本的浏览器自动导航；已知页面另有无脚本的刷新和手动链接兜底。直接用HTTP客户端读取旧JSON或MD不能依赖这层浏览器跳转，必须使用正式根目录地址。页面声明不索引旧入口，已知页面的canonical指向新地址；不对搜索引擎的实际收录结果作保证。

`npm test` 包括路径、参数、片段、循环及安全检查；部署完成后另实际请求旧首页、两类日报、笔记、文档及未知路径，确认已替换成跳转产物且目标页面可访问。

## 维护

默认暗色，可手动切换；不加载主题作者的评论或统计服务。主题来源见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，迁移记录见 [REFACTOR_NOTES.md](REFACTOR_NOTES.md)。框架和主题升级通过 PR 测试，不自动覆盖定制代码。
