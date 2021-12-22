---
layout: post
title: 'zsh的使用'
categories: Mac 笔记 item2 zsh antigen
comments: true
date: 2019-08-21 23:33:55 +0800
published: true
---

Title:貌似这样可以让你的终端变得很好看呢

## 使用 *zsh*

切换默认的终端 *zsh*, 这会提示你输入密码.

`chsh -s /bin/zsh`

如果想改回来的话

`chsh -s /bin/bash`

## 使用 *antigen* 来安装 *oh my zsh*

`brew install antigen`

这里安装完后会有个提示说: 源目录在某个位置, 让你自己写到 **.zshrc** 里面去.

### 关于 *antigen* 的简单介绍

> 一款类似在 *bash* 下管理的 *brew* 工具, 因为直接使用 *oh my zsh* 会使得你的配置变得稍稍复杂.

1. 安装官方插件 `antigen bundle brew`
2. 安装*github*上的插件 `antigen bundle zsh-users/zsh-syntax-highlighting`
3. 生成缓存, 加快下次载入过程 `antigen cache-gen`
4. 更新某个或者全部插件 `antigen update [<bundle-name>]`: 如果留空那么就是更新全部.
5. 回滚更新 `antigen revert`: 回滚到更新前的状态
6. 列出本地安装的插件列表 `antigen list [--simple|--short|--long]`
7. 清理没有使用到的插件 `antigen cleanup`
8. 删除插件 `antigen purge`
9. 使用zsh框架 `antigen use oh-my-zsh`
10. 使用主题 `antigen theme`
11. 应用更改 `antigen apply`
12. 自身更新 `antigen selfupdate`

## 新建 **.zshrc** 文件 填入下面内容

```shell
source /usr/local/share/antigen/antigen.zsh

# 加载oh-my-zsh库
antigen use oh-my-zsh

# 加载原版oh-my-zsh中的功能(robbyrussell's oh-my-zsh).
antigen bundle brew
antigen bundle command-not-found
antigen bundle git
antigen bundle pip

# 语法高亮功能
antigen bundle zsh-users/zsh-syntax-highlighting

# 代码提示功能
antigen bundle zsh-users/zsh-autosuggestions

# 自动补全功能
antigen bundle zsh-users/zsh-completions

# 这个不知道是啥
antigen bundle zsh-users/zsh-apple-touchbar

# 加载主题
# antigen theme robbyrussell
antigen theme https://github.com/bhilburn/powerlevel9k powerlevel9k

# 保存更改
antigen apply

## 配合powerlevel9k主题使用
POWERLEVEL9K_PROMPT_ON_NEWLINE=true
POWERLEVEL9K_RPROMPT_ON_NEWLINE=true

POWERLEVEL9K_MODE='awesome-patched'
POWERLEVEL9K_SHORTEN_DIR_LENGTH=2
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(os_icon dir vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status nvm node_version)

POWERLEVEL9K_OS_ICON_BACKGROUND="white"
POWERLEVEL9K_OS_ICON_FOREGROUND="blue"
POWERLEVEL9K_DIR_HOME_FOREGROUND="white"
POWERLEVEL9K_DIR_HOME_SUBFOLDER_FOREGROUND="white"
POWERLEVEL9K_DIR_DEFAULT_FOREGROUND="white"

```

## 这时候终端界面会呈现为部分乱码, 因为缺少对应的图标字体

在终端执行以下步骤:

```shell
# 下载
git clone https://github.com/powerline/fonts.git
# 安装
cd fonts
./install.sh
# 删除安装包
cd ..
rm -rf fonts
```

## 在对应的终端工具内选择安装的字体

以 *VSCode* 为例, 在设置界面内查找字体, 然后找到终端输入 *Meslo LG S for Powerline* 就可以了!
