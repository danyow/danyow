# 已有研究任务：直接提交 GitHub，等待发布，再发阅读链接

2026-09-12 更新：采用同一次任务内轮询、发布成功后才通知的模式。本文件是不含私人收件地址的协议说明，不是另一个调度器。实际任务提示词已保存；保存配置不等于新流程已经完成端到端验收。

## 调度和职责

沿用已有任务，每天北京时间09:00开始，Asia/Shanghai。09:00是开始检索，不是保证完成投递的时间。

任务负责：检索、生成 Markdown、直接调用 GitHub、在本次执行内间隔检查构建及公开页面、调用 Gmail 通知。现有 GitHub Actions 负责：格式校验、Markdown 转 HTML、索引和版本回执生成、部署。**不要要求用户部署 Apps Script，不再先发 [AIENGINE-SOURCE] 邮件等待搬运，不新建重复任务。**

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

## 同一次任务内检查，直到发布验证通过

上传后立即进入等待阶段，不能因为第一次查询仍是构建中就提前发日报。保留原稿日期、revision、sha256、commit SHA、相应workflow run ID和等待开始时间。

1. 查找main分支、本次提交触发的push构建。使用可筛选branch/event/head_sha的查询；某些名为fetch_commit_workflow_runs的封装只返回PR运行，不适合据此判断main的push构建是否存在。必要时通过已授权GitHub工具读取actions/runs或工作流运行集合，再按head_sha核对。
2. 构建或部署仍queued/in_progress/pending时，在本次执行内间隔约60秒继续检查。只读取必要状态摘要，不反复下载完整日志和日报；限流遵守Retry-After，查询失败不自动等于构建失败。不得创建每分钟重复执行的第二个定时任务。
3. completed不代表成功，构建和部署的结论必须为success。明确failure/timed_out/action_required等状态时检查失败步骤或审批需求，不能对已失败运行无休止等待。cancelled时可检查是否有包含同一原稿的后续提交接替，但必须验证原稿哈希一致，不擅自改代码或无限重跑。
4. 还需确认对应GitHub Pages部署，并读取gh-pages的ai-engine-watch/receipts/YYYY-MM-DD.json。date、revision、sha256必须匹配当前MD，不能把历史成功记录当本次成功。
5. 实际请求公开回执、当天固定网页及必要的raw原稿。页面须正常返回、不是错误页或登录页，并包含source-sha256:<当前原稿哈希>；公开回执的日期、修订号和哈希也须一致。HTTP 200本身不能证明正文是最新版本。
6. 所有条件成立后才发正式摘要和固定阅读链接。未完成前不向邮件/pushplus发送日报全文、阶段性摘要、半成品网页或成功通知。

等待阶段目标最多20分钟，从提交后开始等待算起。这是防卡死的工作流策略，不是平台保证的单次运行时长；如本次执行预算更早耗尽、工具不可用或需要审批，则停止并报告。遵守各工具自身超时，不伪造等待，不无限轮询，也不声称任务结束后会凭提示词继续后台执行。

## 成功后发送

Gmail分别向私有任务配置中的本人邮箱和已验证pushplus邮箱独立发送。主题：[AIENGINE-DAILY] YYYY-MM-DD | AI 原生游戏引擎每日观察；更正追加修订号，恢复旧稿明确标为补发。正文是1至5条重点、简短判断、已验证的当天网页链接、归档入口、原稿哈希与AIENGINE-YYYY-MM-DD-rN标识。允许极简HTML包装链接，不发送整篇HTML，不只创建草稿。

发送前按日期、修订、原稿哈希、收件人和标识查已发送记录，不能只按标题去重；异常通知不算正式投递。只补未成功的一端；状态不明先查证，不盲目重复。Gmail成功仅记邮件发出，不当作手机最终送达。

## 失败、超时和恢复

写入、构建、部署或网页核验未完成时，不发送正式日报或未验证的阅读链接，也不回退成整篇正文推送。Gmail可用且授权允许时，只向各收件人发一次简短[AIENGINE-PIPELINE]异常说明，告知失败环节、最后状态及不含敏感信息的原稿版本，不夹带日报正文。按日期、revision、原因类别和收件人去重。隐私校验失败只告知本人，不把可疑原稿发往推送平台或公开仓库。

已入库MD留在仓库，未入库MD留在私有任务结果。保留日期、revision、sha256、提交、运行ID、已完成步骤及发信结果作为恢复依据；个人投递记录不能写进公开仓库。

下一次实际运行从仓库、回执、Gmail记录重建进度，复用原稿继续检查，成功后补发，不重写同稿或重复发送。优先恢复近7天最近一份未完成原稿，同时处理当天报告，不批量补发。当前只有每日调度，不能把下次恢复描述成超时后会立即自动续跑。

## 可选中转不是默认步骤

仅当实际运行证明必须跨单次执行持续检查，且用户另行选择时，才评估独立的持续重试方案。当前不部署Google Apps Script，不同时启用两套通知。仓库原有备用中转代码保留，不是本次任务的前置条件。
