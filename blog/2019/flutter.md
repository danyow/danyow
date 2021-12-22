---
layout: post
title: 'Hello flutter'
categories: 笔记 flutter
comments: true
date: 2019-08-01 10:55:00 +0800
published: true
---

Title: 关于flutter的初体验

安装就不哔哔了

## 环境变量配置

> macOS Todo

mac的，唉~由于在安装配置完后使用的是10.15的beta版本。 目前 fultter 还不支持就先告一段落了。

2019-12-22 更新:
流程没啥大毛病
`flutter doctor` 走就完事了

但是启动ios模拟器的时候 没有反应
需要配置相应环境
`brew install --HEAD libimobiledevice`

> Windows

*bin* 目录配置 *Path* 即可

## 自检环节

`flutter doctor`

会检查以下几个环境

1. Flutter 本身环境 （macOS 10.15 beta 就是在这里挂了）
2. Android SDK 环境
   1. `flutter doctor --android-licenses`
3. Android Studio 环境 需要装插件
   1. 在开始界面点击 `Configure` 里的 `Plugins`
4. VSCode 环境 需要装插件
5. 连接设备
6. Mac 下还会检测 XCode 以及其命令行环境
