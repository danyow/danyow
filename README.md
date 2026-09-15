# Danyow · AI 与游戏观察

Astro + Retypeset 暗色资讯站，正式首页为 `https://danyow.cn/`。首页展示新资讯，旧笔记、文档和博客继续保留。

## 内容

- `ai-engine-watch/reports/YYYY/MM/YYYY-MM-DD.md`：AI 原生游戏引擎日报唯一原稿。
- `voice-agent-watch/reports/YYYY/MM/YYYY-MM-DD.md`：电话语音 Agent 日报唯一原稿。
- `note/`、`docs/`、`blog/`：旧文章原稿与日期保留；`published: false` 的草稿不进入公开构建。
- `lua/`、`unity/`：仅保留历史源文件，不参与构建或展示。

原稿和完整日期文件名不因网址迁移改变。原有 `/danyow/` 项目站暂时保留以兼容旧邮件；新阅读链接直接使用根目录下 `/ai-engine-watch/` 和 `/voice-agent-watch/`。没有把旧文章日期改成迁移日期，标题提纲不会自动补写。

## 开发

Node.js 22.16 及以上，使用 npm 锁文件。

```sh
npm ci
npm test
SITE_BASE_URL=/ npm run dev
SITE_BASE_URL=/ npm run build
SITE_BASE_URL=/ npm run preview
```

构建读取 Markdown，生成静态 HTML 和搜索索引，再核对站内链接、原稿哈希和历史路径。不需要数据库或运行时服务器。环境变量 `SITE_BASE_URL=/` 用于正式根站；不传时保留旧项目站的 `/danyow/` 兼容构建。

## 日报发布

引擎日报每天北京时间09:00开始，电话语音日报09:10开始。任务开始时间相差十分钟，实际投递要等研究和发布完成。

源码和原稿统一维护在本仓库 `main`。根域名原先绑定 `danyow/danyow.github.io`，因此正式发布由该仓库 `master` 的 `Publish root news site` 工作流构建同一份源码，并输出到该仓库 `gh-pages`，不再构建旧站源码。

定时任务提交 MD → 条件更新根站仓库 `deployment/source.json` 中的真实源码提交 → 根站 Actions 以 `/` 构建发布 → 核验真实根首页、日期页、raw和回执 → 邮件发送短摘要与根目录链接。

详见 [根域名发布协议](research/PUBLISHING.md)。两个任务只获得额外更新这个发布请求文件的权限，不改工作流、域名或其他文章。没有新增调度服务或额外凭据。手动更新站点源码后也需更新发布请求或手动运行根站工作流；本仓库旧子路径构建成功不等于根站更新成功。

两个栏目的 `index/`、`raw/`、`receipts/` 协议保持兼容，正式读取目标在根站发布仓库 `gh-pages`。私人邮箱、电话、推送凭据和投递记录不入库。

## 维护

默认暗色，可手动切换；不加载主题作者的评论或统计服务。主题来源见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，迁移记录见 [REFACTOR_NOTES.md](REFACTOR_NOTES.md)。框架和主题升级通过 PR 测试，不自动覆盖定制代码。
