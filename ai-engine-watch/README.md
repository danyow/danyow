# AI 原生游戏引擎每日观察

这是现有 Docusaurus 站点中的独立栏目，不会替换博客、笔记、Lua 或 Unity。

## 流程

现有研究任务（北京时间 09:00） → 原始 Markdown 邮件 → 本人 Apps Script 收稿 → 本仓库 → 原站点统一构建 → 校验发布版本 → 摘要和当日链接邮件 → pushplus。

**本仓库公开。待审核稿不能通过 `publication: hold` 获得隐私保护。** 中转拒绝提交 hold 或 imported-unverified 稿件；历史测试原稿没有被迁入本仓库。

## 目录和入口

| 用途 | 路径 |
| --- | --- |
| 唯一原稿 | `ai-engine-watch/reports/YYYY/MM/YYYY-MM-DD.md` |
| 网站栏目 | `/danyow/ai-engine-watch/` |
| 当日网页 | `/danyow/ai-engine-watch/reports/YYYY-MM-DD` |
| 近期索引 | `/danyow/ai-engine-watch/index/recent.json` |
| 月份目录 | `/danyow/ai-engine-watch/index/catalog.json` |
| 按月索引 | `/danyow/ai-engine-watch/index/YYYY-MM.json` |
| Markdown 原稿 | `/danyow/ai-engine-watch/raw/YYYY/MM/YYYY-MM-DD.md` |
| 发布回执 | `/danyow/ai-engine-watch/receipts/YYYY-MM-DD.json` |

这些是部署路径约定，不代表网页已上线或每天检索已接通。源站域名沿用原有配置。

历史查询先读 catalog 和对应月份索引，再读取命中原稿。recent 仅保留相对最新报告日期的 31 天；全部正文不会塞进 JSON 索引。事件保存发生、发表、发现三个日期，以及事实、项目方主张、分析、未验证标签。

原稿格式见 [examples/report.md](examples/report.md)。头部是 `---` 之间的 JSON，正文是纯 Markdown，不使用 HTML/JSX 或 import/export。同一天更正必须增加 revision，保留明确的更正说明；不得无声覆盖历史。

## 本地校验

```sh
yarn archive:test
yarn archive:build
yarn build
```

构建产生 `.generated/ai-engine-watch/` 和 `static/ai-engine-watch/`，仅作为发布产物，不提交回源码分支。代码转换不调用模型。

## 接入

[部署和验收](DEPLOYMENT.md) · [现有定时任务的修改指令](TASK_INSTRUCTIONS.md)

程序上传不等于 Gmail 或 Apps Script 已授权。首次部署保持 `DRY_RUN=true` 和 `ENABLE_NOTIFICATIONS=false`，确认网页和原稿哈希一致后才打开通知。不要提前关闭旧投递通道。
