# 个人主页 README 维护

根 `README.md` 同时显示在 `github.com/danyow` 和源码仓库首页。它首先是个人介绍，不是网站部署手册。网站说明保存在 [SITE.md](SITE.md)。

## 版式与边界

采用 GitHub 原生 Markdown 与受支持的 HTML：居中姓名、原有座右铭、主站与备用站导航、两个阅读卡片、笔记与收藏入口、折叠维护说明。无第三方动态图卡、访客追踪、外部字体、技能排名、虚构履历或私有贡献统计。适应 GitHub 自身深浅主题，不依赖远端图片服务。

唯一自动写入区间是根 README 的 `<!-- PROFILE:RECENT:START -->` 与 `<!-- PROFILE:RECENT:END -->` 之间。区间外逐字保留。每个栏目最多两篇，显示真实日期及原摘要摘录，附主站和 Vercel 备用阅读链接。内容日期不是检查日期；无新内容不制造提交，不为绿格刷提交。

自动维护不改姓名、座右铭、身份、个人简介、固定链接、布局、权限、工作流、网站源码、日报原稿或发布请求。需要改变这些项目时由用户确认。公开主页不读取邮件、私有仓库、私人日历或聊天记录来生成动态。

## 单一每日任务

每日维护由用户授权的 ChatGPT 任务“GitHub 主页每日维护”负责，安排在 UTC+8 中午前后，避开上午日报开始时间。GitHub 中只运行测试与结构检查，不再安排第二份定时写入任务。任务是否已启用以 ChatGPT 的实际任务状态为准，不以本文件为证明。

每次任务先读取最新 README 与 blob SHA、当前维护脚本，然后读取发布仓库 `danyow/danyow.github.io` 的 `gh-pages` 提交 SHA。使用这个完整 SHA 读取两个栏目的 `index/recent.json`，不从尚未发布的源码稿件生成链接。检查最新报告对应的发布回执和日期页面；直接网络受限时可用相同发布提交的成功部署记录与产物交叉确认，明确区分页面实时访问和发布记录。

生成器会拒绝空索引、日期异常、路径注入、旧索引回退、修订回退、未升修订的哈希变化、标记丢失或重复。出现异常保留原 README，报告原因，不填造成功或清空卡片。

### 在线运行

在仓库根目录、Node 22 环境中：

```sh
node --test .github/profile/update.test.mjs
node .github/profile/update.mjs --check
node .github/profile/update.mjs --write
```

在线模式只匿名读取公开发布仓库，不需要新增 Token 或外部服务。

### 连接器读取后离线生成

如果工作容器没有外网，先通过已授权 GitHub 连接器读取上述公开文件，再将原始 JSON 返回值保存为下列输入结构。不要把此临时快照提交入库。

```json
{
  "schema": 1,
  "repository": "danyow/danyow.github.io",
  "ref": "实际读取到的完整gh-pages提交SHA",
  "channels": {
    "ai-engine-watch": {"schema": 1, "reports": []},
    "voice-agent-watch": {"schema": 1, "reports": []}
  }
}
```

这里的空数组只是结构示例，实际必须替换成已读取的完整公开索引；示例本身会被拒绝。然后运行：

```sh
node .github/profile/update.mjs --input /tmp/published-profile.json --readme README.md --write
node .github/profile/update.mjs --check
```

确认仅标记区间发生变化；用最新 blob SHA 条件更新根 README。冲突时重新读取并重新生成，不强推、不覆盖手工修改、不绕过分支保护。没有变化则不写。没有可用的工具或执行权限时报告受阻，不能把建议或本地文件说成已经发布。

README 单独更新已经从网站 push 构建触发范围排除；不会为刷新主页而更新 `deployment/source.json`、重发日报或重部署两个网站。PR 仍保留完整网站回归检查。

## 参考方案与取舍

本次调研日期：2026-09-16。只借鉴布局与维护方法，没有复制其他人的简介或成就。

- [GitHub 官方 Profile README](https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme)：同名公开仓库根 README 的用途。
- [Awesome GitHub Profile README](https://github.com/abhisheknaiidu/awesome-github-profile-readme)：参考 Minimalistic / Descriptive / GitHub Actions 类别，采用清晰介绍与少量重点入口。
- [Blog Post Workflow](https://github.com/gautamkrishnar/blog-post-workflow)：参考标记区间更新的维护方式。本站已有更准确的发布索引，所以不再引入 RSS 解析 Action。
- [lowlighter/metrics](https://github.com/lowlighter/metrics)：适合需要 GitHub 数据图卡的主页；本次不增加额外插件、凭据与数据墙。
- [GitHub Readme Stats](https://github.com/anuraghazra/github-readme-stats)：调研时原仓库已提示不再维护并提示公共实例可靠性问题；不恢复旧 README 的公共动态图卡。将来若增加统计，优先生成保存在仓库内的静态结果，仅用公开数据。

上述项目的维护状态以其官方仓库为准。不要为了追逐模板每天重做版式。
