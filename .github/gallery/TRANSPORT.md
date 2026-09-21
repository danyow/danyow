# 图片上传修复：程序传文件，受控分块作为连接器后备

## 2026-09-21 的修复范围

生成器、PNG 私人归档、图片尺寸/压缩预算和个人主页版式不变。修复上传与回读：图片始终以真实字节处理；GitHub JSON 的 `content` 明确按 Base64 解码，不再用 UTF-8 图片读取包装器。禁止跳过哈希验证。

`publish.py` 是无第三方 Python 上传依赖的直接文件发布器。它从 `prepare.py` 产生的目录读取六个文件，由程序编码和发送；返回 Git Blob SHA、回读字节数、SHA-256 及完整字节均必须一致，之后才创建一个 Git tree / commit 并以 `force=false` 推进 main。只允许既定六个文件，目录只能追加，README 只能变更封面 src 参数。并发或前置哈希改变会拒绝发布，而不是覆盖。

## 有已授权、可联网的文件执行环境时

在干净且已同步的源码工作副本中，先按原流程归档 PNG、运行 prepare.py 与校验。凭据只通过执行环境的 `GALLERY_GITHUB_TOKEN` 传入，不能放进聊天、仓库、图片包或日志；可使用只允许源码仓库内容读写的 GitHub App installation token。

```sh
python .github/gallery/publish.py --bundle /path/to/prepared-bundle --expected-head FULL_MAIN_SHA
python .github/gallery/publish.py --bundle /path/to/prepared-bundle --expected-head FULL_MAIN_SHA --apply
```

第一条只验证，不上传。第二条会上传并更新 main。需要同时推进既有跨仓库发布请求时，另外在执行环境配置发布仓库的 `GALLERY_DEPLOY_TOKEN`，并显式加 `--request-deploy`。两仓库不能假装是一次原子事务；源提交成功但发布请求失败必须保留该提交并恢复后半程。

## 当前 ChatGPT GitHub 连接器的后备通道

当前工具只有字符串内容参数，没有可供本会话直接调用的原生文件上传参数。这种情况下，不再尝试单次转填 5 万至 13 万字符的 Base64；使用**有界、逐块校验、全文件复核的上传队列**。这是受控后备传输，并不声称已经给连接器增加原生文件输入。

1. 运行 `package_upload.py` 将六文件包按至多 8192 字节分块，输出独立 Base64 文件、每块预期 Git SHA 和小型数据清单。不改变图片像素、压缩或原始文件字节；重复封面块复用同一 blob。
2. 用 `create_blob(encoding="base64")` 上传每块，逐一对照 `transport-plan.json` 的 SHA。不一致就停止，最多重试该块，不把错误 SHA 写入清单。
3. 全块通过后，读取最新 main。若基准已变，保留已上传的内容寻址块，重新读取相关文件并重新准备目录/请求，不能替换 source_head 来掩盖并发修改。
4. 以该 main 为唯一父提交，将 `incoming.json` 存为 `.github/gallery/incoming.json`，创建 `gallery-upload/<请求SHA256前20位>` 分支。请求文件只有路径、尺寸、哈希、块 ID 和前置哈希，不含程序、命令、任意下载地址、原稿PNG或凭据。
5. 事件触发已有仓库的 `Verify and receive gallery file uploads`，不是新增 cron。接收 job **只从 main 检出可执行代码**，从请求提交读取数据。每块回读 SHA/尺寸与整个文件 SHA256/字节完全通过后，运行原有 gallery/profile 校验和测试，再由 `publish.py` 原子提交六文件。
6. 读取 job 的 `gallery-upload-receipt.json` 和实际 source commit。GitHub Actions 的仓库令牌生成的提交不保证触发其他工作流，因此接收 job 自己执行必要测试及公开 profile 检查。不要用 job 已提交代替两站发布成功。
7. 用现有已授权 GitHub 连接器条件更新发布仓库 `master:deployment/source.json`，随后核对根站和 Vercel 的实际发布结果。

```sh
python .github/gallery/package_upload.py --bundle /path/to/prepared-bundle --source-head FULL_MAIN_SHA --out /path/to/new-packets
```

接收器只有当前仓库 `contents:write` 权限，不需要新增长期令牌、第三方图床、付费生图 API 或独立服务器。它遵守分支保护；若仓库要求额外审批，必须走正常审批，不绕过。

## 原稿与恢复

9 月 19 日未发布的既有原稿应以真实 `created_on=2026-09-19` 补发，不能重新生图或标成当天新作品。PNG 仍只存私人文件库；网页版和封面按现有协议入库。失败只留下未引用的内容寻址 blob 或上传分支，main、旧图片和历史记录保持原样。

`gallery-source-snapshot` / `gallery-upload-result` 构建附件包含已提交的公开源码快照，方便没有网络的准备容器取得图片参考和校验脚本。快照不含 `.git`、环境变量或凭据。使用快照前须对照 GitHub 当前 README、catalog、manifest、处理脚本的 blob SHA；如果变更，重新取最新资料，不能假设旧快照就是当前 main。

## 验收及不能混淆的状态

```sh
python -m unittest discover -s .github/gallery -p 'test_*.py' -v
python .github/gallery/publish.py --probe
```

第二条显式使用 GitHub 授权，上传原参考 WebP 和加入 RIFF JUNK 数据块的大型有效 WebP 测试文件，再逐字节回读；它不生成新画作、不改变分支或主页。CI 只在可信 main 的代码更新/手动运行中做这个测试，PR 没有写权限。

测试文件传输通过、9 月 19 日真实图片补发、两个网站上线、下一次定时任务执行是四件事。只报告实际完成的阶段。保留逐次 receipt，防止把“旧数据传了一次”当成“无人值守已验证”。

官方接口依据：
- https://docs.github.com/en/rest/git/blobs
- https://docs.github.com/en/rest/git/trees
- https://docs.github.com/en/rest/git/refs
- https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-when-your-workflow-runs/triggering-a-workflow
