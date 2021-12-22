---
layout: post
title: 'mac上启动文件服务器'
categories: Mac 笔记
comments: true
date: 2019-09-10 22:39:06 +0800
published: true
---

Title: 使用 *mac* 自带的*apache* 启动文件服务器

1. 开启 *apache*

    `sudo apachectl start`

2. `cd` 到对应的目录下
3. 开启 *HttpServer*

    `python -m SimpleHTTPServer`

4. 访问链接

    `http://localhost:8000`
