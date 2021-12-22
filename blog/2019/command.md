---
layout: post
title: '常用命令'
categories: 笔记
comments: true
date: 2019-06-16 21:03:12 +0800
published: true
---

Title: 记录下自己经常上网查的命令。

## Nginx

* 查看是否还在运行

`ps -ef|grep nginx`

* 重启

  1. 验证 `nginx.conf` 是否正确。 `nginx -t`
  2. 重启服务 `nginx -s reload`

## macOS

### 安装 *rvm*

1. 安装 *rvm* , 一个基于 *ruby* 的工具库？

    `curl -L get.rvm.io | bash -s stable`

2. 安装好 *rvm* 之后

    ```shell
    source ~/.bashrc
    source ~/.bash_profile
    ```

3. 测试安装是否正常

    `rvm -v`

4. 查看当前 *ruby* 版本

    `ruby -v`

5. 列出已知的 *ruby* 版本

    `rvm list known`

6. 安装 *ruby* 

    `rvm install x.x.x`

7. 升级 *gem* 

    `sudo gem update --system`

### *SSH*

1. 查看本地是否生成了 *SSH*

    `ls -al ~/.ssh`

2. 生成新的 *SSH* **key**

    `ssh-keygen -t rsa -C "i.zuucol@gmail.com"`

3. 查看公钥

    `cat ~/.ssh/id_rsa.pub`

### 提示安装文件损坏

`sudo spctl --master-disable`

### *cocoapod* 更新

`pod install --verbose --no-repo-update`
`pod update --verbose --no-repo-update`

### *Xcode* 无法被检测到时

`sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer`
