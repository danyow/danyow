# 修改已有研究任务，不创建重复任务

仅在 Markdown 入库、网页发布和手机链接通知全部验收通过之后采用。本文件是配置指令，不是已经启用的调度。

## 调度

每天北京时间09:00开始，时区 Asia/Shanghai。日报日期、观察截止时间和邮件日期都使用北京时间。09:00是开始检索，不是保证完成投递的时间。

## 研究

实际联网检索全球 AI-native game engine、agent-first 引擎、神经游戏引擎、交互世界模型、相关论文、代码、模型权重、实验与可玩 Demo。持续发现新项目，不限制为已有名单。

以上次成功检索之后的新增为主，回看7天补漏。先读取日报站的 index/recent.json；历史问题先读取 index/catalog.json 和命中月份，再读取相关 raw Markdown。不能访问历史时说明去重限制，不重新读取全部 HTML，也不凭邮件主题断言没有历史。

每份正文包含今日重点、具体项目进展、论文贡献与局限、代码或演示入口、对其他AI原生引擎/传统引擎/行业的影响、值得跟踪事项及检索限制。区分事件发生、报道发表和本次发现日期。每条实质信息附原始来源，优先官网、论文和官方代码。区分 verified、source-claim、analysis、unverified；不给宣传、路线图或未实测数字自动加上独立验证标签。无重大新增仍报告；检索失败不能当成没有新闻。

## 输出协议

使用 examples/report.md 的 JSON front matter 结构，随后附完整 Markdown 正文。schema=1；timezone=Asia/Shanghai；date为当天；revision首次为1、更正递增；publication=publish只用于明确可公开的原稿；review_status=generated或reviewed，不发布 imported-unverified。未审查稿只留本人邮箱，不提交公开仓库。

summary 为1至5条简短摘要，每条最多280字。events 每项字段必须完整：project（稳定小写标识）、title、kind、event_date、publication_date、discovered_date、evidence、source。未知的 event_date/publication_date 使用 null，不猜日期。kind取 release/paper/code/demo/funding/industry/correction/other；evidence取 verified/source-claim/analysis/unverified。没有可收录事件时 events=[]。

正文用纯 Markdown，以一级标题开头。不要 HTML/JSX、import/export、脚本、转发头、邮箱、推送地址、Webhook、token 或账户设置。原始 URL 使用普通 Markdown 链接。

## 收稿邮件

使用已授权 Gmail 将原始 Markdown 实际发送给本人。本人收件地址只填写在私有任务配置，不从公开仓库寻找或猜测。

主题严格为 `[AIENGINE-SOURCE] YYYY-MM-DD`；正文以 text/plain 发送，且可附同名 `YYYY-MM-DD.md` 附件。不要用 HTML 包裹或 Markdown 代码围栏包住整篇原稿，不要转发上一封邮件，不要直接向 pushplus 发整篇正文。

归档栏目实际根地址单独填在私有任务配置。仓库程序生成网页和索引，中转校验回执和网页哈希之后才发送摘要及固定日期链接。不把尚未部署的链接伪装为成品；执行失败保留原稿并明确报告。
