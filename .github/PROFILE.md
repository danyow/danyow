# GitHub 个人主页：暮色与留白

根 `README.md` 是 `github.com/danyow` 的个人介绍，不是网站首页、研究日报目录或任务面板。网站开发说明仍保存在 [SITE.md](SITE.md)。

## 已确认的设计

2026-09-17 按用户最终选定的概念落地：深靛、低饱和紫粉的群山湖畔暮色；原有白色剪影头像；主要内容居中；充足留白；不展示新闻卡片、统计墙或示例项目。网站只作为少量个人链接之一。

原始封面来自用户明确选定的独立底图，头像部分取自用户选定的概念图。不替换 GitHub 账号头像。中文座右铭完整保留，不使用概念图中错误的英文译句或名人署名；未确认公开的 Email 按钮不发布，改用已有的 Vercel 备用入口。

## GitHub 上的实际实现

风景和头像叠放合成为 `.github/profile/assets/dusk-cover.webp`，尺寸为 1120×418，不依赖 CSS 定位。姓名、关注方向、座右铭和个人文案使用居中的原生 HTML 文本，保持可选择、可复制和移动端可读；三个 SVG 图片包在真实 GitHub、个人网站及 Vercel 链接中。SVG 不加载外部图片、字体或脚本，图像有替代文本，窄屏时导航自然换行。GitHub 自带的资料栏、导航、主题和隐私设置不改变。

## 每日仅更新图片

2026-09-18 用户另行授权每日生成新风景底图，切换 GitHub 封面，并将作品收入个人网站图集。该授权不是恢复旧的日报维护任务。`PROFILE:RECENT` 区块和旧日报写入器继续禁用；个人介绍、座右铭、布局和三个链接保持不变。

每日任务从不可变的 [approved-cover.webp](profile/reference/approved-cover.webp) 提取原头像，与当天真实生成的纯底图合成新封面；原始 PNG 归档于用户文件库，网页优化浏览版与封面归档于本仓库 `static/gallery/images/`。生成及验证成功后才更新当前封面与 `assets/manifest.json`，README 仅允许给该图片 src 加上 `?v=封面SHA256前16位`；不得为更换封面改写其他字符。版本参数用于区分资源版本，不承诺绕过所有缓存或永久在线。

日常图像生成由单一 ChatGPT 任务“每日绘图与主页换图”负责。旧的回填日报任务保持停用，不另建 GitHub 定时生成任务。任务配置已存在不等于每次实际运行都能获得图像生成和上传工具；未生成、未上传或未发布时必须保留旧版本并报告阻塞。完整协议和命令见 [图集维护说明](gallery/README.md)。

## 只读检查

在仓库根目录、Node.js 22 环境执行：

```sh
node --test .github/profile/check.test.mjs tests/gallery-profile.test.mjs
node .github/profile/check.mjs
node .github/profile/check.mjs --public FULL_COMMIT_SHA
```

检查保持静态个人主页契约，禁止日报回填，核对资源字节与 SHA-256、自包含 SVG、安全链接及封面版本。允许的唯一动态引用是当前封面的受约束哈希参数；其他图片不能携带任意参数。所有个人文字仍受检查。`--public` 匿名读取实际提交的 README、图片及公开 GitHub 主页，不能以本地预览代替真实线上结果。

`Check profile README` 只有读取权限，不会生成或写入内容。README/profile 单独变化仍不会触发网站构建；当新增作品或目录时，由既有站点构建和发布请求负责更新主站及 Vercel。原有两项日报任务和研究原稿不受影响。
