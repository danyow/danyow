# 已有研究任务：直接提交 GitHub，再发阅读链接

2026-09-12 调整为默认直接执行模式。本文件是不含私人收件地址的协议说明，不是另一个调度器；实际任务提示词已保存，但新流程端到端运行仍需验收。

## 调度和职责

沿用已有任务，每天北京时间09:00开始，Asia/Shanghai。09:00是开始检索，不是保证完成投递的时间。

任务负责：检索、生成 Markdown、直接调用 GitHub、核验发布、调用 Gmail 通知。现有 GitHub Actions 负责：格式校验、Markdown 转 HTML、索引和版本回执生成、部署。**不要要求用户部署 Apps Script，不再先发 [AIENGINE-SOURCE] 邮件等待搬运，不新建重复任务。**

## 研究与节约历史读取

实际联网检索全球 AI-native game engine、agent-first 引擎、神经游戏引擎、交互世界模型、相关论文、代码、模型权重、实验与可玩 Demo，持续发现新项目。

以上次成功检索后的新增为主，回看7天补漏。优先通过 GitHub 读取 gh-pages 中 ai-engine-watch/index/recent.json；历史问题先读 index/catalog.json 和命中月份，再读少量命中 Markdown。不要把全库或全部 HTML 作为输入。索引可能落后于尚未发布的原稿，应同时检查 main 中当天文件及已发送邮件。兼容此前日报主题，排除格式测试与旧迁移样本；历史读取不足时说明限制。

正文包含今日重点、项目进展、论文贡献与局限、代码/演示入口、对其他AI原生引擎和传统引擎及行业的影响、跟踪事项和检索限制。每条实质信息附原始来源；区分事件发生、报道发表、本次发现日期。事实、项目方主张、分析与未验证信息分开；无重大新增仍报告，检索失败不能当作没有新闻。

## Markdown 协议

原稿存入 danyow/danyow 的 main 分支：ai-engine-watch/reports/YYYY/MM/YYYY-MM-DD.md。使用 examples/report.md 的 JSON front matter：独立 --- 行、完整 JSON、独立 --- 行，随后是以一级标题开始的 Markdown 正文。

只允许且必须包含 schema/date/timezone/title/revision/publication/review_status/summary/events。schema=1；timezone=Asia/Shanghai；date使用报告北京时间日期；首次revision=1，更正递增；可公开稿publication=publish；自动生成review_status=generated，不冒充人工reviewed，不提交hold或imported-unverified。

summary为1至5条字符串，每条最多280字符。events最多40项，每项仅含project/title/kind/event_date/publication_date/discovered_date/evidence/source。project为不超过80字符的小写字母、数字、连字符标识；事件标题最多180字符。kind取release/paper/code/demo/funding/industry/correction/other；evidence取verified/source-claim/analysis/unverified。未知发生/发表日期使用null，发现日期不得晚于日报日期，来源使用无凭据的真实HTTP(S)链接。无可收录事件时events=[]。

全文UTF-8、无BOM、LF换行、首尾去空白后加一个末尾换行，不超过120000字节。纯Markdown，不含HTML/JSX、脚本、import/export、邮件头、邮箱、Webhook、token或私人配置。用程序校验格式并计算规范化全文SHA-256；共享解析规则位于bridge/Core.gs，文件名不代表需要运行Google服务。

## 直接提交

实际发现并调用当前任务可用的GitHub工具。先读取当天文件及其当前blob SHA：不存在则创建；完全相同则不重复提交；必要更正增加revision、注明原因，用当前SHA条件更新，不覆盖并发变化。日常仅操作reports目录，不改工作流、站点、权限或其他文章，不删除历史、不强推。

写入后回读确认，记录实际提交SHA。不要由模型另写HTML或提交生成副本，交给现有Actions。写权限不足、审批或分支保护阻止时明确失败，不绕过。

## 核验页面，然后发邮件

检查与本次提交相应的构建部署，并读取gh-pages的ai-engine-watch/receipts/YYYY-MM-DD.json。date、revision、sha256匹配原稿后，还需实际请求公开回执和当天网页，检查source-sha256标识，必要时下载raw原稿复算哈希。当天链接根据回执html字段构造，使用日期固定地址，不仅发送最新版首页。

部署未完成时仅在本次运行预算内有限次带间隔检查；不能无限轮询，不能假称结束后会继续后台处理。GitHub可读、部署成功、网页可访问、手机送达分别判断。

核验通过后，Gmail分别向私有任务配置中的本人邮箱和已验证pushplus邮箱独立发送。主题：[AIENGINE-DAILY] YYYY-MM-DD | AI 原生游戏引擎每日观察；更正追加修订号。正文是1至5条重点、简短判断、当天网页链接、归档入口、原稿哈希与AIENGINE-YYYY-MM-DD-rN标识。允许极简HTML包装链接，不再发送整篇HTML，不只创建草稿。

发送前按日期、修订、收件人和标识查已发送记录。只补未成功的一端；状态不明先查证，不盲目重复。Gmail成功仅记邮件发出，不当作手机最终送达。

## 失败回退

写入、部署或公开网页核验失败：保留完整MD，在Gmail可用且授权允许时分别发送带[归档或发布未完成]标记的纯文本日报和具体原因，本人邮件可附MD；不发送未验证网页链接。隐私校验失败的可疑原稿不发pushplus，只告知本人。

后续运行可在核验成功后补发明确标为[归档链接补发]的通知，按原稿哈希及收件人去重，不当新资讯，不批量补发。审批或发信不可用时保留任务结果并报告，不能宣称已发送。

## 可选中转不是默认步骤

仅当实际运行证实任务缺少必要写入能力或需要独立的长时间发布重试，并经用户另行选择时，再采用DEPLOYMENT.md中的Apps Script备用路线。不要同时启用两套通知。
