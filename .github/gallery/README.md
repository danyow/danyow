# 图集与每日主页换图

图集是个人网站的独立页面 `/gallery/`，不进入日报索引、新闻列表或邮件投递。GitHub README 只更换风景封面，姓名、原头像、座右铭、个人介绍、居中结构与三个入口不变。

## 已保存的历史作品

2026-09-18 对本次设计对话中可取得的九幅不重复生成作品完成归档：一幅纯底图、两幅头像探索、六幅主页概念。旧截图与重复附件不公开。概念图中的示例项目、统计、身份、联系方式和错误引文只属于设计占位，不是个人事实；网站默认将概念放在折叠区。

原始 PNG 按原字节存入用户文件库的图片归档 ZIP，原稿哈希、尺寸和字节数保存在目录中。仓库内是有损 WebP 浏览版，历史版本为 480 至 640 像素宽；不能将其称为原图或假定下载浏览版能恢复原始 PNG。生成日期没有可靠逐图记录，历史作品的 `created_on` 为 null，另记录实际归档日期。文件库不是公开图床，不把其访问标识、私有链接或凭据写入本仓库。

## 目录协议

`gallery/catalog.json` 是唯一作品目录；网页及 `/gallery/catalog.json` 从同一文件构建。`static/gallery/images/history/` 保留历史浏览版；每日新作品放入 `static/gallery/images/YYYY/MM/YYYY-MM-DD-原稿短哈希.webp`，相应的 GitHub 封面也保存为带 `-cover` 后缀的文件。历史图片不覆盖、不删除。

记录包括 id、title、category（background/avatar/concept）、caption、created_on、archived_on、generated=true、original 的 sha256/bytes/width/height、image 的 path/sha256/bytes/width/height/format/representation，以及稳定排序 order。公开目录不收录私人资料、原始附件路径、文件库ID、凭据或虚构的生成模型/种子。具体字段由 `check.mjs` 严格验证。

## 每日生成与发布

用户授权的 ChatGPT 任务“每日绘图与主页换图”负责实际图像生成；没有第二份 GitHub cron 生成器。任务是否启用以任务工具实际状态为准。图像生成能力属于每次任务实际可用的工具，不能只靠存在此文档就声称已生成或已上线。缺少生成、文件归档或真实二进制写入能力时应停止并保留旧版本，不用渐变、旧图或提示词代替新作品。

风格固定为低亮度的深靛、暮紫与少量粉橘，群山、湖面、薄雾、晚霞或星空；每日有新构图，不生成 UI、标题、任务信息或新人物。用户已确认的头像固定在 `.github/profile/reference/approved-cover.webp` 中，处理时提取该图的头像，不读取前一天反复有损压缩的封面作为新参考，也不修改 GitHub 账号头像设置。

先将实际生成的 PNG 按原始字节存入用户文件库的日期归档，再在含最新仓库文件的工作副本中执行（Node.js 22 与 Python/Pillow）：

```sh
node .github/gallery/check.mjs
node .github/profile/check.mjs
python .github/gallery/prepare.py --input /tmp/actual-generated.png --date YYYY-MM-DD --title '真实作品标题' --caption '简短画面描述' --out /tmp/new-cover-bundle
```

`prepare.py` 不是生成模型，只处理已经生成的 PNG。它生成六个待更新文件及 `upload-plan.json`，不修改源工作副本；固定输出 1120×418 的封面、保留原头像与渐隐，生成不超过 1448 像素的风景浏览版，并追加目录。README 只更新封面 `src` 的内容哈希版本参数，其余字符保留。超出压缩预算、同日重复、原稿重复、头像参考变动或当前封面校验不一致都会报错。

将输出覆盖到另一个临时仓库副本，执行 gallery/profile 校验及测试，通过后使用当前主分支作为父提交，原子写入整套变更，且非强制更新分支。图片须通过真实二进制接口或 base64 blob API 上传；必须核对返回的 Git blob SHA（SHA1(`blob 字节数\0`+真实字节)），不能把 base64 文本当作图片上传，更不能跳过哈希检查。连接器仅支持文本且无法可靠传送二进制时，保留文件库原稿并报告受阻，不将半套资源发布到 main。合并或更新分支前重新确认远端基准；并发变化时重新读取并重新生成目录，不丢失其他日报或手工改动。

随后依照既有 `research/PUBLISHING.md`，条件更新 `danyow/danyow.github.io` 的 `master:deployment/source.json` 到包含本次图片的实际源码提交。这是发布图集必需的现有发布请求，不是新调度服务。保持 schema=1、repository=danyow/danyow、branch=main，不能倒退已经推进的请求。

```sh
node --test tests/gallery.test.mjs tests/gallery-profile.test.mjs
node .github/gallery/verify.mjs https://danyow.cn
node .github/gallery/verify.mjs https://danyow.vercel.app
node .github/profile/check.mjs --public 实际源码提交SHA
```

公网校验逐一检查作品目录、网页引用、图片字节/哈希/尺寸和根站回执。`Check gallery and public collection` 在 main 图片变化后等待两站发布，最多约十分钟；失败须检查实际发布请求，不通过删除作品或降低校验标准消除错误。原稿已存、浏览版入库、主页换图和两站图集上线是不同阶段，应分别报告。

## 写入边界

日常任务仅写新图片、目录、当前封面及其资产 manifest、README 的封面 src。为发布这些图像可更新现有发布请求。代码、工作流、依赖、个人文案、其他链接、日报内容、域名与隐私设置不能由每日任务自动改写。本次图库基础设施改动另有用户专项授权。失败保留旧封面和历史作品，不创建重复任务、不发送日报或额外邮件。
