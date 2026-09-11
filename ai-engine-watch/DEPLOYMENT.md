# 部署与切换：danyow/danyow

## 已有站点，不另建站点

沿用现有 Docusaurus、`/danyow/` 路径及 `gh-pages` 发布分支。博客、笔记、Lua、Unity 和原 Gitee 工作流不删除。不要把旧独立部署包的 publish.yml 直接放进本仓库，否则可能让两套发布流程互相覆盖。

本次接入不修改已有 ChatGPT 定时任务，也不自动授权 Google。中转未验收前继续保留原邮件通道。

## 1. 仓库和网页

合并维护修改后，由原 deploy.yml 统一构建。PR 只做测试和构建，不发布；main 才更新 gh-pages。既有 Pages 设置保持不动。如 gh-pages 已更新但网站未刷新，先检查 Pages 的实际发布记录，不要直接发送未上线的链接；需要迁移发布模式时单独审查。

先检查站点的 `/danyow/ai-engine-watch/` 入口及 `/danyow/ai-engine-watch/index/catalog.json`。没有日报时列表为空是正常现象，不将历史迁移样本或虚构新闻作为占位内容公开。

## 2. Google 中转

在本人账户建立 Apps Script 项目，复制 `bridge/Core.gs`、`bridge/Code.gs` 与 `bridge/appsscript.json`。GmailApp 会请求较广的邮箱权限；代码仅扫描本人已发送邮件中的严格专用主题，但这不构成 OAuth 权限范围的物理隔离。不要把脚本分享给陌生编辑者。

在 Script Properties 中配置以下值，真实值不提交到仓库：

| 属性 | 设置 |
| --- | --- |
| GITHUB_OWNER | danyow |
| GITHUB_REPO | danyow |
| GITHUB_TOKEN | 仅对此仓库的 Contents 读写令牌，在本地私有配置填写 |
| SOURCE_EMAIL | 运行脚本的本人 Gmail |
| SOURCE_START_DATE | 接受日报的最早北京时间日期，YYYY-MM-DD |
| PAGES_BASE_URL | 实际可访问的日报栏目根地址，例如当前配置下的 https://danyow.cn/danyow/ai-engine-watch |
| RECIPIENT_EMAILS_JSON | 本人邮箱与已验证 pushplus 邮箱组成的 JSON 数组 |
| PUBLIC_REPOSITORY_APPROVED | 初始 false；明确允许正文进入公开仓库后改 true |
| PUBLIC_SITE_APPROVED | 初始 false；确认允许公开网页后改 true |
| DRY_RUN | 初始 true |
| ENABLE_NOTIFICATIONS | 初始 false |
| ENABLE_WATCHDOG | 初始 false |

Script Properties 对脚本编辑者并不保密。令牌限制仓库、权限和有效期；不要给中转令牌管理成员、删除仓库或修改工作流的权限。仓库级 Contents 权限不能限制到单一目录，代码层面只允许 `ai-engine-watch/reports/` 下的规范日期路径。

运行 `validateConfiguration()`，然后用一封新测试邮件执行 `runBridge()`。主题必须严格为 `[AIENGINE-SOURCE] YYYY-MM-DD`。正文为原始 MD，或带同日期名的 `.md` 附件；附带转发头、HTML 邮件和普通配置指南不能当作原稿。

**旧的 hold/imported-unverified 样本不得直接提交到本公开仓库。** 真实原稿只能包含可公开的研究正文，publication 必须为 publish。公开测试也应明确是测试，不伪装新闻。

## 3. 正式验收顺序

1. DRY_RUN=true、ENABLE_NOTIFICATIONS=false：格式和配置检查，不写入不发信。
2. 确认可公开后 PUBLIC_REPOSITORY_APPROVED=true、DRY_RUN=false：只入库，检查 Actions。
3. 核验正文网页、原稿、receipts 中的日期、revision、SHA-256 一致。
4. PUBLIC_SITE_APPROVED=true、ENABLE_NOTIFICATIONS=true：向两个渠道分别发摘要和日期固定链接，检查手机实际接收。
5. 运行 installBridgeTrigger() 安装每五分钟收稿检查，再修改现有研究任务。

入库邮件本身不是手机通知。GitHub 提交成功也不是网站已经发布。Gmail 发出不代表 pushplus 或手机最终送达。

中转对已确认发送的收件人不再投递；中断造成的发送不确定状态，先搜索已发送邮件，不盲目重发。同日更正必须提高 revision。检索任务需要填充真实来源和事件日期，代码不会替代事实核验。

## 4. 定时任务最后切换

按 [TASK_INSTRUCTIONS.md](TASK_INSTRUCTIONS.md) 修改**已有任务**：北京时间09:00开始检索，生成 MD 发本人邮箱，删除直接向 pushplus 发送全文的旧步骤。只有新链路验收后才切换。该仓库没有创建第二个每日研究定时器。

启用 ENABLE_WATCHDOG 后，北京时间12:00仍无当天入库记录会向本人发送告警。没有日报不得写成没有新闻。

## 5. 故障与回滚

- GitHub权限失效：修复后运行 retryBlockedOrExpired()。
- 网页404/哈希不符：不发送，超过一小时告警，48小时后暂停该稿等待人工处理。
- uncertain：核对已发送邮箱后再人工处理，不能清空全部状态导致已成功渠道重复接收。
- 停用：removeBridgeTriggers() 只移除本中转的触发器，不删除邮件、仓库或其他任务。
- 仓库回滚：撤销维护 PR 的合并提交，保留历史；不要重置或强推 main。
- 未完成新通道验收：继续使用旧日报邮件方式。

本地测试使用模拟 Google/GitHub/邮件环境。线上需要分别确认 OAuth、令牌、仓库规则、构建、托管和最终手机展示。月度 Dependabot 只提出更新 PR，不自动合并升级。
