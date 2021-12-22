---
layout: post
title:  "Python程序设计基础"
categories: 笔记 python
comments: true
date: 2019-05-27 21:06:13 +0800
---

Title: 上海市高等学校计算机等级考试（二级）推荐教材

## 2. Python程序的基本语法

* 四舍六入五留双 `round()`

```python
round(1.5)
round(2.5)
'''
2
2
'''
```

## 3. Python 程序的基本流程控制

* 允许 `x > y > z` `x < y > z`

* `while` 和 `else` 可以一起用 在退出循环的时候调用

## 4. Python的特征数据类型

* 列表和字典的 `clear()` 方法

```py
a = b = [1, 2, 3]
print(a, b)
a.clear()
print(a, b)

c = d = {'x':1, 'y':2}
print(c, d)
c.clear()
print(c, d)

'''
[1, 2, 3] [1, 2, 3]
[] []
{'x': 1, 'y': 2} {'x': 1, 'y': 2}
{} {}
clear可以理解为是清除指针指向所在地址的内存
'''
```

* 集合里面不能包含有列表或字典

* 列表自己 append 自身的时候会无穷递归 `lst.append(list)`

## 5. 文件

* 在表示路径的字符串中 `/` 等同于 `\`，但 `\` 又必须转义为 `\\`

```python
"D:\\Dir\\file.txt"

"D:/Dir/file.txt"
```

## 7. 面向对象的程序设计

* `dir()` 是可以返回当前对象里面的所有参数 包括方法和属性

* 多继承时，如果其父类当做有共同的方法时，子类调用会以第一个为准，即先查找先调用。
