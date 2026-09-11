# danyow · 开发笔记与 AI 游戏引擎观察

[![Build and deploy](https://github.com/danyow/danyow/actions/workflows/deploy.yml/badge.svg)](https://github.com/danyow/danyow/actions/workflows/deploy.yml)

这里保留个人博客、开发笔记、Lua 与 Unity 文档，并逐步建立 AI 原生游戏引擎的长期观察归档。

## 内容导航

| 内容 | 原稿与说明 |
| --- | --- |
| 开发笔记 | [note](note/) |
| Lua | [lua](lua/) |
| Unity 文档 | [unity](unity/) |
| 博客 | [blog](blog/) |
| AI 原生游戏引擎观察 | [归档与接入说明](ai-engine-watch/README.md) |

站点沿用现有 `https://danyow.cn/danyow/` 配置；本次维护不修改域名、CNAME 或原有内容目录。

## 本地开发

使用 Node.js 22 与 Yarn Classic。依赖版本以 `yarn.lock` 为准。

```sh
corepack enable
yarn install --frozen-lockfile
yarn archive:test
yarn start
```

完整构建：

```sh
yarn generate  # 原有 Unity 文档生成流程，需要访问上游文档源
yarn build
```

`yarn build` 会先校验日报原稿并生成网页输入、轻量索引与版本回执，再由现有 Docusaurus 统一构建。不存在第二套覆盖整个站点的发布流程。

## AI 日报：一份原稿，两种用途

- 原稿：`ai-engine-watch/reports/YYYY/MM/YYYY-MM-DD.md`，用于历史查询和版本追踪。
- 阅读：Docusaurus 的 `/ai-engine-watch/` 栏目，复用现有站点主题。
- 自动生成：`.generated/ai-engine-watch/` 与 `static/ai-engine-watch/`，不提交 HTML 或重复原稿副本。
- 投递：确认网页版本后发送摘要与当日链接，不再把整篇 HTML 塞入邮件。

默认由已有定时任务直接调用已授权 GitHub 写入 Markdown，由现有 Actions 构建网页，再由同一任务核验发布并调用 Gmail 发送摘要和链接。**不要求 Google Apps Script、收稿邮件中转或新的令牌。** Apps Script 代码仅保留为可选备用；共享的 `Core.gs` 仍用于 Node 构建校验，不表示正在执行 Google 服务。

2026-09-12 已更新已有任务的直接执行提示词，保持北京时间09:00；配置保存不等于新流程端到端实测通过。发布或写入失败时使用有明确错误标记的邮件回退。详情见[部署说明](ai-engine-watch/DEPLOYMENT.md)。

## 维护边界

此仓库公开。**不要上传邮箱、pushplus 地址、token、Webhook、原始邮件或私人配置。** `publication: hold` 不是访问控制；待审核稿不要进入本仓库。

已有博客、笔记和 Unity 内容保留；没有批量升级主依赖，也没有改变已有许可证。代码和文档分别沿用 [LICENSE](LICENSE) 与 [LICENSE-docs](LICENSE-docs)，引用的第三方资料仍归原权利人所有。

<details>
<summary>历史镜像入口（本轮未逐一验证）</summary>

[Vercel](https://danyow.vercel.app/) · [Netlify](https://danyow.netlify.app/) · [Gitee](https://danyow.gitee.io/)

原 Gitee 同步工作流仍保留。请以各平台部署记录为准，不将旧徽章视为已验证的可用性保证。

</details>
