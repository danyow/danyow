# Danyow · AI 与游戏观察

Astro + Retypeset 暗色资讯站。首页展示新资讯，旧笔记、文档和博客继续保留。

## 内容

- `ai-engine-watch/reports/YYYY/MM/YYYY-MM-DD.md`：日报唯一原稿。
- `note/`、`docs/`、`blog/`：旧文章原稿与日期保留；`published: false` 的草稿不进入公开构建。
- `lua/`、`unity/`：仅保留历史源文件，不参与构建或展示。

原有笔记、文档、博客与日报日期路径继续使用。没有把旧文章日期改成迁移日期，标题提纲不会自动补写。

## 开发

Node.js 22.16 及以上，使用 npm 锁文件。

```sh
npm ci
npm test
npm run dev
npm run build
npm run preview
```

构建读取 Markdown，生成静态 HTML 和搜索索引，再核对站内链接、原稿哈希和历史路径。不需要数据库或运行时服务器。

## 日报发布

定时任务提交 MD → Actions 构建 → gh-pages → Pages → 任务核验网页和回执 → 邮件发送摘要及阅读链接。

`ai-engine-watch/index/`、`raw/`、`receipts/` 保持兼容。私人邮箱和推送凭据不入库。

## 维护

默认暗色，可手动切换；不加载主题作者的评论或统计服务。主题来源见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)，迁移记录见 [REFACTOR_NOTES.md](REFACTOR_NOTES.md)。框架和主题升级通过 PR 测试，不自动覆盖定制代码。
