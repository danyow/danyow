# GitHub 个人主页：暮色与留白

根 `README.md` 是 `github.com/danyow` 的个人介绍，不是网站首页、研究日报目录或任务面板。网站开发说明仍保存在 [SITE.md](SITE.md)。

## 已确认的设计

2026-09-17 按用户最终选定的概念落地：深靛、低饱和紫粉的群山湖畔暮色；原有白色剪影头像；主要内容居中；充足留白；不展示新闻卡片、统计墙或示例项目。网站只作为少量个人链接之一。

封面来自用户在本次对话中明确选定的独立底图，头像部分取自用户选定的概念图。不继续生成另一套画风，也不替换 GitHub 账号头像。中文座右铭完整保留，不使用概念图中错误的英文译句或名人署名；未确认公开的 Email 按钮不发布，改用已有的 Vercel 备用入口。

## GitHub 上的实际实现

GitHub README 会清理内联 CSS 和脚本，不能把整个账号页面变成概念图里的独立网页。因此：

- 风景和头像叠放合成为仓库内的 `profile/assets/dusk-cover.webp`，无需依赖 CSS 定位；保留的压缩图为 1120 × 418。
- 姓名、关注方向、座右铭和一句个人文案使用居中的原生 HTML 文本，保持可选择、可复制和移动端可读，不把整页内容做成一张截图。
- 三个小型 SVG 导航图片分别包在真实的 GitHub、个人网站和 Vercel 链接中。每个图片都有替代文本；SVG 不加载外部图片、字体或脚本。
- 图像随容器缩放，窄屏时链接可自然换行。深色封面本身保留暗色；正文跟随 GitHub 用户选定的主题，不强制改变账号或浏览器主题。
- GitHub 自带的左栏、关注信息、仓库标签和个人资料设置未修改。

参考：[GitHub Markup 清理规则](https://github.com/github/markup#github-markup) · [官方 README 格式说明](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github)。

## 移除旧的日报维护逻辑

旧的 `PROFILE:RECENT` 区块、日报链接和摘要均已从 README 移除。此前的 `profile/update.mjs` 与测试同时删除，避免只改页面但留下旧写入器。此前用于每日回填日报的 ChatGPT 维护任务已停用；本次不恢复它、不新建定时写入任务。原有两项研究日报任务不受本次改动影响。

当前维护是**只读校验**，不会写 README、拉取文章索引、生成自我介绍、刷更新时间或修改发布请求。需要新增个人经历、联系方式、技能、作品或统计数据时，由用户明确确认，不从私有资料推断并公开。

## 检查

在仓库根目录、Node.js 22 环境执行：

```sh
node --test .github/profile/check.test.mjs
node .github/profile/check.mjs
node .github/profile/check.mjs --public FULL_COMMIT_SHA
```

本地检查覆盖静态布局契约、原文保留、禁止日报回填、图片来源与校验和、SVG 安全性和公开链接范围。`--public` 匿名读取指定提交的 README 和图片，验证真实 GitHub 个人页已呈现封面及文案；无法请求或版本未更新时失败，不把缓存或本地预览当作成功证据。

`Check profile README` 在相关修改和 PR 上运行；main 更新后增加一次真实公开页检查。没有 cron、写入权限或额外密钥。README 和 `.github/profile/**` 单独变化仍不会触发网站 push 部署，PR 保留完整网站回归构建。已有站点原稿、域名、站点发布程序及依赖保持不变。

## 资源维护

资源出处与尺寸见 [assets/README.md](profile/assets/README.md)。`assets/manifest.json` 保存实际字节数及 SHA-256；只在主动更换资源后更新，不按日生成。替换图片前先检查桌面与手机预览，并在通过测试后合并。历史设计和旧维护器仍可通过 Git 历史查看，无需在当前主页保留它们。
