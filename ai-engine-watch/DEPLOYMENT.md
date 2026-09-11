# 部署与切换：danyow/danyow

## 当前默认方案（2026-09-12）

**修改已有定时任务即可，不要求部署 Google Apps Script。** 使用当前已授权的GitHub写入与Gmail发送能力：北京时间09:00开始检索 → 生成Markdown → 直接写入本仓库 → 现有Actions构建发布 → 同一任务核验公开页面 → 邮件摘要与固定链接 → 已配置的pushplus通道。

已有任务的直接执行提示词已保存，保持原调度，不创建第二个任务。修改配置不等于已经完成一次新流程端到端验收。应用可用性、审批和分支保护按实际运行处理；提示词不能新增权限。失败时保留MD，并在发信能力可用时回退为带错误标记的纯文本日报，不发送未上线链接。

## 1. 沿用现有站点

沿用Docusaurus、/danyow/路径及gh-pages分支。博客、笔记、Lua、Unity和原Gitee工作流不删除。不要加入第二套覆盖全站的publish.yml。

现有deploy.yml负责统一构建：PR只验证，main才发布。既有Pages设置保持不动。先确认平台发布状态，再实际检查栏目及当天页面。暂时没有日报时列表为空正常，不用未核验历史或虚构资讯填充。

## 2. 默认直接模式的验收

1. 当前任务能实际读取GitHub、调用目标reports目录的文件写入工具和Gmail发送工具；无需另建令牌。
2. 原稿只包含可公开研究内容，通过现有格式、隐私与修订检查。主分支回读与提交内容一致。
3. 对应Actions构建/发布成功，gh-pages回执的日期、revision、SHA-256匹配原稿。
4. 实际公开页面及raw原稿与回执版本一致，再发送摘要和日期固定链接。
5. 本人邮箱与已验证pushplus地址分别去重、分别记录Gmail返回结果；手机最终接收仍需接收端确认。
6. 验证失败回退、重跑不重复提交、部分收件人失败只补该端。不要为此删除已有报告或重置历史。

[任务协议](TASK_INSTRUCTIONS.md)是不含收件信息的说明。真实收件地址仅放在私有任务配置，不写入公开文件或Issue。不要将含推送地址的私有任务分享为公开链接。

## 3. 哪些东西不需要部署

不需要Apps Script项目、不需要Google定时触发器、不需要Gmail收稿轮询、不需要把GitHub token交给Google脚本。仓库HTML/索引生成和Actions仍需保留，这部分不是任务提示词能替代的排版程序。

bridge/Core.gs是被Node构建器和测试引用的纯函数模块。保留该文件不代表启用了Google账户内的Apps Script；不要误删破坏构建。bridge/Code.gs及appsscript.json仅是可选备用实现，本轮不安装、不授权、不运行。

## 4. 默认模式故障处理

- GitHub写权限或分支规则阻止：不绕过，保存MD并明确报告，发信可用时先邮件回退。
- 网页404、构建未完成或哈希不符：本次运行内有限重试；无法核验时不发成品链接。
- Gmail审批：任务可能暂停；不宣称成功，也不扩大其他应用权限。
- 发送结果不确定：先查已发送，确认前不盲目重发；逐收件人保留状态。
- 后续已发布但此前只发过回退：可补发明确标注的归档链接，按日期、revision、哈希及收件人去重。
- 暂停或回滚：修改/暂停原任务即可；不删历史邮件、原稿或代码，不强推main。

## 附录：Apps Script备用路线（默认不启用）

只有用户另行选择独立中转，或实际运行证明直接模式无法满足写入/长期重试要求时才考虑。不要将这些步骤列为当前必做项，也不要同时启用两套通知。

备用流程是“原始MD收稿邮件 → Apps Script → GitHub → 发布核验 → 摘要邮件”。在本人Google账户建立项目，复制bridge/Core.gs、bridge/Code.gs、bridge/appsscript.json。GmailApp授权可能较广，代码限制不等于OAuth权限隔离；不要把项目分享给不可信编辑者。

Script Properties私有属性：GITHUB_OWNER=danyow、GITHUB_REPO=danyow、仅此仓库Contents读写的GITHUB_TOKEN、SOURCE_EMAIL、SOURCE_START_DATE、实际PAGES_BASE_URL、RECIPIENT_EMAILS_JSON。初始PUBLIC_REPOSITORY_APPROVED=false、PUBLIC_SITE_APPROVED=false、DRY_RUN=true、ENABLE_NOTIFICATIONS=false、ENABLE_WATCHDOG=false。真实值不提交仓库，仓库级Contents权限不是目录级隔离。

仅备用模式使用严格主题[AIENGINE-SOURCE] YYYY-MM-DD收稿。publication必须publish，不把hold/imported-unverified稿提交公开仓库。先validateConfiguration与DRY_RUN，再只写入，再核验回执与公开页面，最后打开通知；用户选择后才运行installBridgeTrigger安装每五分钟检查，并关闭直接模式的重复通知。

备用脚本的retryBlockedOrExpired用于修复后的重试；uncertain先核对已发送再人工处理；removeBridgeTriggers只移除本中转触发器。ENABLE_WATCHDOG只在备用脚本真正运行时生效，不要在当前直接模式下声称已经存在独立缺稿告警。

## 验证边界

本地模拟测试、GitHub构建、网页可访问和手机送达是不同验收项。2026-09-12的调整仅更新任务配置及本文档，未宣称新直接流程已经整条跑通。月度Dependabot仍只提出更新PR，不自动合并升级。
