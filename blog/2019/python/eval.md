---
layout: post
title: 'Python 内置函数'
categories: 笔记 python
comments: true
date: 2019-05-28 22:28:38 +0800
published: true
---

## `eval()`

`eval(expression[, globals[, locals]])`

* expression -- 表达式。
* globals -- 变量作用域，全局命名空间，如果被提供，则必须是一个字典对象。
* locals -- 变量作用域，局部命名空间，如果被提供，可以是任何映射对象。

```python
>>>x = 7
>>> eval( '3 * x' )
21
>>> eval('pow(2,2)')
4
>>> eval('2 + 2')
4
>>> n=81
>>> eval("n + 4")
85
```

> 就好像是在 *python* 语言里面自建了一个 *python* 解析器。