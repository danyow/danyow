---
layout: post
title: '安装ArchWSL'
categories: Mac 笔记
comments: true
date: 2022-03-15 09:42:42 +0800
published: true
---

## 先决条件

- Windows 10 1709 秋季创意者更新或者更高版本
- 开启 `适用于 Linux 的 Windows 子系统` 功能
- 其中有一步比较重要: [`下载 Linux 内核更新包`][Linux-Update]

## 安装 `ArchWSL`

1. `scoop bucket add extras`
2. ` scoop install archwsl`

## 启动并初始化

### 设置 `Root` 密码

```shell
> arch.exe
[root@danyow]# passwd
```

### 设置默认用户
```shell
[root@danyow]# echo "%wheel ALL=(ALL) ALL" > /etc/sudoers.d/wheel
[root@danyow]# useradd -m -G wheel -s /bin/bash danyow
[root@danyow]# passwd danyow
[root@danyow]# exit
> arch.exe config --default-user danyow
```

#### 重启 `LxssManager` (可选)

```shell
net stop lxssmanager | net start lxssmanager
```

#### 初始化密钥环 `keyring`

```shell
> arch.exe
[danyow@danyow]$ sudo pacman-key --init

[danyow@danyow]$ sudo pacman-key --populate

[danyow@danyow]$ sudo pacman -Syy archlinux-keyring
```

#### 添加源 `aur`

```shell
sudo vim /etc/pacman.conf
### 加入内容
[archlinuxcn]
Server = https://repo.archlinuxcn.org/$arch
### 结束
sudo pacman -Syy && sudo pacman -S archlinuxcn-keyring && sudo pacman -S yay
```


#### 安装 `glibc-linux4`

`sudo pacman -S glibc-linux4` or `yay -S glibc-linux4`

#### 安装 `fakeroot-tcp`

`yay -S fakeroot-tcp`

#### 安装 `make` `gcc` `cargo`

`yay -S make gcc cargo`

#### 安装 `genie-systemd-git`

`yay -S genie-systemd-git`

[Linux-Update]: https://docs.microsoft.com/zh-cn/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package
