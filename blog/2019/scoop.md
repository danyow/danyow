---
layout: post
title: 'Scoop的安装'
categories: Windows 笔记 scoop
comments: true
date: 2020/6/14 14:55:00 +0800
published: true
---

Title: ~~目前暂不推荐, 因为自带的软件较少, 而且更多的需要使用到别人的 *Bucket* .~~

反省一下，比起之前的 _Chocolatey_ 来说，还是推荐的，因为它更加适合程序员和具有高度强迫症的患者。

> 优点：

1. 环境和后续安装的软件都可以不放在**C**盘
2. 扩展包也比较丰富

> 缺点：

1. 如果网速慢的情况下（因为使用到了 _github_ ）安装某个包的时候，可能会出现半天安装不上的情况，这时候取消的话会使得 _scoop_ 误以为安装完成，这时需要卸载。
2. 后续依据使用情况补充

## Scoop的安装

1. _PowerShell_ 下运行下述内容，确保 _PowerShell_ 允许可以执行本地脚本。

    `Set-ExecutionPolicy RemoteSigned -scope CurrentUser`

2. 然后安装 _Scoop_ ，看网速来的。

    `Invoke-Expression (New-Object System.Net.WebClient).DownloadString('https://get.scoop.sh')`

    or 更短的

    `iwr -useb get.scoop.sh | iex`

3. 进入桶子环境准备阶段。即添加 _Bucket_ 库。但由于 _Bucket_ 是依托于 _Github_ ，所以要先安装 _git_ 环境

    `scoop install git`

如果你没有 7zip 的话，会顺手给你安装git的依赖。

```txt
  7zip 21.06 [main]
  adb 31.0.3 [main]
  adopt8-hotspot 8u292-b10 [java]
  android-sdk 4333796 [extras]
  ant 1.10.12 [main]
  archwsl 21.8.28.0 [extras]
  beyondcompare-zh-cn 4.4.0.25886 [dorado]
  brotli 1.0.9_6 [main]
  cacert 2021-10-26 [main]
  ccleaner 5.87.9306 [extras]
  clash-for-windows 0.19.1 [dorado]
  cmake 3.22.1 [main]
  codeblocks-mingw 20.03 [extras]
  curl 7.80.0 [main]
  dark 3.11.2 [main]
  dingtalk 6.3.5.10278702 [dorado]
  DirectX 9.29.1974.1-June2010 [Scoop-Ash258]
  diskgenius 5.4.2.1239 [extras]
  docker-machine 0.16.2 [silver886]
  docker-nightly nightly-20211121 [main]
  dotnet-sdk 6.0.100 [main]
  EpicGamesLauncher 13.0.0 [dorado]
  gcc 11.2.0-9.0.0-r3 [main]
  git 2.34.1.windows.1 [main]
  github 2.9.5 [extras]
  gradle-bin 7.3.1 [main]
  innounp 0.50 [main]
  ipfs-desktop 0.17.0 [extras]
  jetbrains-toolbox 1.22.10774 [extras]
  k2pdfopt 2.53 [seu]
  lcow v4.14.35-v0.3.9 [main]
  lessmsi 1.10.0 [main]
  meshlab 2021.10 [extras]
  microsoftedge  *failed*
  mls-software-openssh 8.8p1-1 [main]
  mongodb 5.2.0-rc0 [main]
  motrix 1.6.11 [extras]
  msys2 2021-11-30 [main]
  nginx 1.21.4 [main]
  nodejs-lts 16.13.1 [main]
  nuget 6.0.0 [main]
  nuwen-mingw-gcc 11.2.0-18.0 [dorado]
  nvidia-display-driver-dch-np 7 *failed*
  obs-studio 27.1.3 [extras]
  office-tool-plus 8.1.5.15 [Master-Hash]
  openjdk 17.0.1-12 [java]
  openssl 3.0.0 [main]
  oraclejdk8 8u291 [iszy]
  oraclejre8 8u311 [java]
  poedit 3.0.6387 [extras]
  potplayer 211118 [extras]
  powertoys-np 0.51.1 [nonportable]
  premake 5.0.0-beta1 [main]
  protobuf 3.19.1 [extras]
  pxcook 3.9.960.202101211055 [dorado]
  python 3.10.1 [main]
  python27 2.7.18 [versions]
  RevokeMsgPatcher 1.1 [Darkatse]
  rime-weasel-np 0.14.3.0 [scoop-jingyu9575]
  ruby 3.0.3-1 [main]
  rufus 3.17 [extras]
  Sejda-pdf 7.3.7 [extras]
  SogouPinyin-Portable 0.3 [scoop-zapps]
  sourcetree 3.4.7 [extras]
  steam nightly-20200928 [extras]
  sudo 0.2020.01.26 [main]
  telnet msys-inetutils-1.7-1 [main]
  todesk 4.1.0 [dorado]
  TranslucentTb 2020.2 [dorado]
  VcXsrv 1.20.9.0 [extras]
  virtualbox-np 6.1.30 [nonportable]
  vscode 1.63.0 [extras]
  wechat nightly-20200613 [dorado]
  wget 1.21.2 [main]
  winscp 5.19.5 [extras]
  Writage 2.7.2 [cvp]
  yarn 1.22.15 [main]
```
