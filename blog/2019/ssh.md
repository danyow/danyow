---
layout: post
title: 'SSH Windows'
categories: Windows 笔记 ssh 
comments: true
date: 2019-8-2 17:07:42 +0800
published: true
---

Title: Windows 下生成 *ssh* 用来连接 *git*

## 生成

`ssh-keygen -t rsa -C "i.zuucol@gmail.com"`

1. 然后他会询问你要存放的位置 -> 直接回车就是默认位置 -> `C:\Users\Danyow/.ssh/id_rsa`
2. 然后让你输入密码 -> 直接回车就是为空即可
3. 然后获取刚刚生成出来的公钥 `cat C:\Users\Danyow\.ssh\id_rsa.pub`
