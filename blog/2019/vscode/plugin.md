---
layout: post
title: 'vscode插件开发'
categories: Mac 笔记 vscode
comments: true
date: 2019-08-22 22:35:39 +0800
published: true
---

Title:目的是为了将剪切板里面的图片一键base64到markdown当中, 省去建立图床的步骤. 当然后续是有可能搭建图床去保存图片.

## 前期准备

* 需要安装 *node.js* `brew install node`
* 利用 *npm* 安装 另外两个工具 *Yeoman* 和 *VS Code Extension generator* . 类似于脚手架 `npm install -g yo generator-code`

## 生成工程

`yo code` 即可
