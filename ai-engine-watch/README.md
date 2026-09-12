# AI 原生游戏引擎每日观察

这是现有 Astro + Retypeset 站点中的独立栏目，不会替换博客、笔记、Lua 或 Unity。

## 默认流程：直接修改已有定时任务

现有研究任务（北京时间09:00） → 生成 Markdown → 直接调用已授权 GitHub 写入本仓库 → 原站点 Actions 统一构建 → 同一任务核验发布版本 → Gmail 发送摘要和当日固定链接 → 已配置的 pushplus 手机通道。

**不需要先把原稿发给自己，再运行 Google Apps Script 搬运到 GitHub。** 已有任务直接承担检索、提交和通知；Markdown 转 HTML、索引和回执生成仍由仓库程序完成。Apps Script 只在实际需要独立中转时作为备用方案，不是当前接入前提。

2026-09-12 已保存已有任务的上述执行提示词，保持 Asia/Shanghai 每天09:00，不创建重复任务。直接流程尚待实际一次完整运行验收，不能把提示词保存当作页面和手机送达验证。

**本仓库公开。待审核稿不能通过 `publication: hold` 获得隐私保护。** 不提交 hold 或 imported-unverified 稿件；历史测试原稿没有被迁入本仓库。收件地址与凭据只保留在私有任务配置。

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

这些是部署路径约定，不代表每一份报告都已上线。源站域名沿用原有配置，每次投递前核验当天页面及哈希。

历史查询先读 catalog 和对应月份索引，再读取命中原稿。recent 仅保留相对最新报告日期的31天；全部正文不会塞进 JSON 索引。事件保存发生、发表、发现三个日期，以及事实、项目方主张、分析、未验证标签。

原稿格式见 [examples/report.md](examples/report.md)。头部是 `---` 之间的 JSON，正文是纯 Markdown，不使用 HTML/JSX 或 import/export。同一天更正必须增加 revision，并保留更正说明。示例的 hold 不能原样用于公开归档。

## 本地校验

```sh
npm run archive:test
npm run archive:build
npm run build
```

构建产生 `.generated/ai-engine-watch/` 和 `static/ai-engine-watch/`，仅作为发布产物，不提交回源码分支。代码转换不调用模型。构建器引用 `bridge/Core.gs` 的纯函数，普通 Node 环境可以执行；不要为了去掉 Apps Script 中转而删除共享校验模块。

## 发布与失败处理

发布回执的 date、revision 和 sha256 必须与原稿相符，公开网页必须有同一 source-sha256 标识。部署未完成不能发一个尚未验证的成品链接。若同次运行无法完成核验，按任务配置回退为带错误说明的纯文本日报；不把故障写成没有新闻。发信按报告、修订和收件人分别去重，状态不明先查询已发送邮件。

[TASK_INSTRUCTIONS.md](TASK_INSTRUCTIONS.md) 是不含私人收件信息的协议说明；实际调度和收件人由私有任务配置管理。[DEPLOYMENT.md](DEPLOYMENT.md) 区分默认直接流程与可选中转。应用审批和权限限制仍需遵守，提示词不能凭空增加工具能力。
