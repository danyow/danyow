---
layout: post
title: 'Windows的包管理工具chocolatey'
categories: Windows 笔记 chocolatey 
comments: true
date: 2019-08-01 14:55:00 +0800
published: true
---

Title: chocolatey工具的使用

## 安裝 **chocolatey**

官网首页：[Home][Home]

使用 **PowerShell** 即可

```powershell
iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))
```

### 更改安裝软件存放位置

新建环境变量  
名为 *ChocolateyInstall*  
值为 *你想要存放的路径*

### 相关链接

利用网页检索所需要的包 [Packages][Packages]

## 常用指令

1. 安装

    `choco install <package>`

    这是正常的安装，但只是装一两个软件还好，每次都需要你输入 *y、a、n* 等进行交互，可以加入后缀 `-y` 来自动全部确认

2. 其他常用命令
   1. 卸载 `choco uninstall <package>`
   2. 搜索 `choco search <package>`
   3. 更新 `choco upgrade <package>`
   4. 查看本地 `choco list --local-only` 或者 `choco list -lo`

3. 不常用指令
   1. 搜索所有版本 `choco search <package> -all`
   2. 安裝指定版本 `choco install <package> -version <版本号>`
   3. 更新所有 `choco upgrade -all`

## 个人已经安装的

```powershell
choco install 7zip -y
choco install androidstudio -y
choco install ccleaner -y
choco install curl -y
choco install Everything -y
choco install gimp -y
choco install git -y
choco install git-lfs -y
choco install github -y
choco install github-desktop -y
choco install golang -y
choco install GoogleChrome -y
choco install gradle -y
choco install javaruntime -y
choco install jdk8 -y
choco install jekyll -y
choco install jre8 -y
choco install nodejs -y
choco install openssh -y
choco install php -y
choco install PowerShell -y
choco install python -y
choco install ruby -y
choco install steam -y
choco install unity -y
choco install unity-hub -y
choco install vscode -y
choco install wechat -y
choco install tim -y
choco install flutter -y
choco install mongodb -y
choco install notepadplusplus -y
choco install dotnetcore-sdk -y
choco install sourcetree -y
choco install beyondcompare -y
```

### 个人使用但无法在chocolatey上找到的

1. 搜狗输入法
2. ShadowsocksR
3. ~~木木模拟器~~（已经删除，采用AS自带的模拟器）
4. WeGame
5. PanDownload（替换百度网盘）
6. Synergy

[Home]:https://chocolatey.org
[Packages]:https://chocolatey.org/packages
