---
layout: post
title: 'Python高手之路'
categories: 笔记 python
comments: true
date: 2019-06-09 11:28:32 +0800
published: true
---

Title: 第三版

* 10.1 生成器

查看一个函数是否是生成器 `isgeneratorfunction()`

```python
import inspect

inspect.isgeneratorfunction(foo)
```

获取生成器的当前状态 `getgeneratorstate()`

1. `GEN_CREATED`    等待被第一次执行
2. `GEN_RUNNING`    正在被执行
3. `GEN_SUSPENDED`  等待被 `next()` 调用
4. `GEN_CLOSED`     结束运行