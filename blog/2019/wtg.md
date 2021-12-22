---
layout: post
title: 'Windows To Go'
categories: Windows 笔记 
comments: true
date: 2019-8-2 10:48:02 +0800
published: true
---

Title: Windows To Go 的一些使用说明

## Mac安装后键鼠供电问题

在 *mac* 供电方式推荐采用直接供电, 不推荐外接拓展坞，有可能导致键鼠使用出现问题.

## 访问本机磁盘

默认本机磁盘是脱机状态的

启用本机磁盘:

1. 启动 *cmd*
2. `DISKPART.exe`
3. `san`
4. `san policy=onlineall`
5. `list disk`
6. `select disk 1`
7. `attributes disk clear readonly`
8. `online disk`
