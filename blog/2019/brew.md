---
layout: post
title: 'Mac的包管理工具brew'
categories: Mac 笔记 brew 
comments: true
date: 2019-08-06 14:55:00 +0800
published: true
---

Title: brew工具的使用

## 相关指令介绍

1. 升级本体

   `brew update`
2. 升级所有程序

    `brew upgrade`
3. 查看本地安装了哪些'环境'和'应用'

    ```shell
    brew list
    brew cask list
    ```

## 相关使用技巧

* 经常在安装的会去检查本体的更新, 可能会导致长时间的等待. 所以可以采用关闭自动更新. `export HOMEBREW_NO_AUTO_UPDATE=true` 但每次重启后都需要重新设置, 可以将这行加入到对应的shell配置文件中去.

## 个人已经安装的

```shell
brew cask install visual-studio-code
brew cask install the-unarchiver
brew cask install google-chrome
brew cask install sourcetree
brew cask install wechat
brew cask install iterm2
brew cask install powershell
brew cask install sogouinput ## 需要自己重新打开一下
brew cask install qq
brew cask install synergy
brew cask install unity-hub
brew cask install beyond-compare
brew cask install steam
brew cask install neteasemusic
brew cask install baidunetdisk
brew cask install vlc
brew cask install aria2gui
brew cask install teamviewer
brew cask install background-music ## 这个工具可以推荐一下 很赞! 类似windows上的声音合成器
brew cask install vnc-viewer
brew cask install impactor
brew cask install thunder
brew cask install epic-games
brew cask install svnx
brew cask install visual-studio
brew cask install weiyun
brew cask install spotifree
brew cask install spotify
brew cask install free-download-manager ## 顶替迅雷的
brew cask install tencent-lemon ## 顶替CMM的
brew cask install android-studio
brew cask install genymotion
brew cask install airserver ## 哎~ 这个还是之后自行破解或者付费吧 只能14天
brew cask install java
brew cask install postman
brew cask install microsoft-remote-desktop-beta
brew cask install qqmusic
brew cask install adobe-air
brew cask install poedit
brew cask install yinxiangbiji
brew cask install mailmaster

brew install antigen ## zsh下的管理工具
brew install python3
brew install node
brew install dotnet
brew install ruby ## 这样安装的并不能正常使用 需要配置环境 建议采用 rvm来安装
```

## 额外无法在brew上找到的

1. 人人影视
2. Parallels Desktop
3. C4D
4. MAYA

### *VSCode* 所使用到的插件

1. Better Align -> 代码对齐 -> 需要在键盘快捷方式里面加入键值绑定
2. C#
3. C# XML Documentation Comments
4. Chinese
5. Comment Translate
6. Debugger for Unity
7. GitLens
8. Jekyll Snippets
9. Jekyll Syntax Support
10. luaide -> 密码不能有符号
11. Markdown All in One -> 快捷键
12. markdownlint -> 语法纠查
13. Material Icon Theme
14. Material Theme
15. Partial Diff -> 代码比对
16. Paste Image
17. Python
18. Python
19. TSLint
