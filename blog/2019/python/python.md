---
layout: post
title: '廖雪峰Python学习教程'
categories: 笔记 python
comments: true
date: 2019-05-29 22:19:59 +0800
published: true
---

小白入门, 以前的笔记。

## 函数

### 函数的参数

* 当默认参数为可变对象的时候 eg:

```python
def add_end(L=[]):
    L.append('END')
    return L

'''
如果多次调用该函数
就会导致L的值不断递增
>>> add_end()
['END', 'END']
>>> add_end()
['END', 'END', 'END']
因为L也是一个变量
所以最佳做法是将 L=None
在函数内部去做判断
'''
```

* 定义可变参数的的函数

```python
def calc(*numbers):
    sum = 0
    for n in numbers:
        sum = sum + n * n
    return sum

'''
# 当如果要使用list传入的话
'''
nums = [1, 2, 3]
calc(*nums)
```

* 关键字参数的用法和可变参数类似

```python
# 定义
**kw
#调用
>>> extra = {'city': 'Beijing', 'job': 'Engineer'}
>>> person('Jack', 24, **extra)
```

* 命名关键字参数

```python
# 无可变参数时 必须加入*分隔
def person(name, age, *, city, job):
    print(name, age, city, job)

# 有可变参数时 无序理会
def person(name, age, *args, city, job):
    print(name, age, args, city, job)
```

* 参数组合

目前共有五种参数

1. 必选
2. 默认
3. 可变
4. 关键字
5. 命名关键字

定义必须遵循以上顺序

### 递归函数

* 递归需要注意一点就是: 防止函数栈溢出

* 尽可能的采用尾递归方式来处理递归函数
  * 尾递归：函数返回的时候, 只调用该函数本身, 不能添加其他的表达式.

## 高级特性

### 切片

* 当如果采用-号来进行倒序取数的时候, 并不是取得顺序也是倒的, 而是正序.

```python
L = ['Michael', 'Sarah', 'Tracy', 'Bob', 'Jack']
L[-2:]
# 这个-2指从倒数第二个开始, 继续往后取值, 而不是往前取值.
# 即: ['Bob', 'Jack']
# 而不是 ['Bob', 'Tracy', 'Sarah', 'Michael']
```

### 迭代

* 字典直接遍历时取得是所有的键, 需要字典的所有值是 `dic.values()`, 所有键值对是 `dic.items()`

* `Iterable`: 可迭代 `from collections import Iterable`

* `isinstance`: 判断一个对象的类型 `isinstance(object, class-or-type-or-tuple)`

* `enumerate` 将一个list改变为索引-元素对

```python
>>> for i, value in enumerate(['A', 'B', 'C']):
...     print(i, value)
...
0 A
1 B
2 C
```

* 可以同时引用两个变量

```py
>>> for x, y in [(1, 1), (2, 4), (3, 9)]:
...     print(x, y)
...
1 1
2 4
3 9
```

* `for ... in` 是不支持直接遍历字典的时候, 同时取到键和值需要以下方法

```py
# 会报错
d = {'key_1':'1', 'key_2':'2', 'key_3':'3'}
for key, value in d:
    print(key + value)

# 加上items这样就不会报错了
d = {'key_1':'1', 'key_2':'2', 'key_3':'3'}
for key, value in d.items():
    print(key + value)
```

### 列表生成器

* `[]`

### 生成器: generator

* `()` 或者 `yield`

### 迭代器: Iterator

* 凡是可作用于`for`循环的对象都是`Iterable`类型；
* 凡是可作用于`next()`函数的对象都是`Iterator`类型，它们表示一个惰性计算的序列；
* 集合数据类型如`list、dict、str`等是`Iterable`但不是`Iterator`，不过可以通过`iter()`函数获得一个`Iterator`对象。
* `for`循环本质上就是通过不断调用`next()`函数实现的

## 函数式编程

### builtins: 内置函数

* `abs`就在`import builtins`

### 高阶函数

* `map` 对每个数进行一次函数算法, 然后重新组装为一个数组.

* `reduce` 从 0, 1 每两个, 直到最后一个数进行一次函数算法, 然后返回.

* `filter` 遍历每个数对其进行过滤 真保存, 假删除.

> 以上都是返回的是 `Iterator` 类型 需要用`list()`让其算完.

## 模块

### 使用模块

* `sys.argv`存储了命令行输入参数, 当长度为1时没有输入参数.

* `if __name__=='__main__':` 被引入使用时失效, 仅在运行当前文件时生效, 主要用于测试.

### 安装第三方模块

* 模块搜索路径 环境修改`PYTHONPATH`

```py
# 仅仅在运行时添加
import sys
>>> sys.path.append('/Users/michael/my_py_scripts')
```

## 面向对象编程

### 获取对象信息

* 获取对象所有方法 `dir()`

* 类似OC动态运行时 `getattr()` `setattr()` `hasattr()`

## 面向对象高级编程

### 使用__slots__

* python的动态能力很强, 甚至可以给类添加绑定一个方法, 或者是给对象绑定一个参数. 但有问题就是想起限制作用, 这时候就可以使用到了__slots__

```py
class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称
'''
这里补充下网友发现的一些现象
1. 如果设置了__slots__ 但是给类直接绑定新的值, 还是可行 eg: Student.score = 99
2. 如果采用了__slots__内含有双下划线的变量时, 在继承的时候该 变量会变形 eg: Person __slots__('__name') Student(Person) __slots__() 这时候的Student的name在用的时候会报错. 由于其没有改写本身的__name, 所以已经变形为_Persion__name
'''
```

### 定制类

* `__init__`    初始化的时候使用
* `__len__`     `len()`方法的时候
* `__str__`     `print()`方法的时候
* `__repr__`    命令行直接输出的时候
* `__iter__`    返回迭代所需要的对象
* `__next__`    返回下一个取出来的值
* `__getitem__` `[::]`的方式取下标
* `__getattr__` 通常用作获取一个没有的值得属性的时候
* `__call__`    判断是否可调用的具体条件`callable()`

### 元类

* 类可以通过 `type()` 直接去创建.

```py
def fn(self, name='world'): # 先定义函数
    print('Hello, %s.' % name)
Hello = type('Hello', (object,), dict(hello=fn)) # 创建Hello class
```

* 而`metaclass`本质上就是监听创建这个类时的回调, 从而在本源上大规模的去改动这个类的创建形式.

```py
class ListMetaclass(type):
    def __new__(cls, name, bases, attrs):
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)
class MyList(list, metaclass=ListMetaclass):
    pass
'''
>>> L = MyList()
>>> L.add(1)
>> L
[1]
'''
```

## IO编程

### 序列化

* 模型转json

```py
# 自定义模式
def student2dict(std):
    return {
        'name': std.name,
        'age': std.age,
        'score': std.score
    }
json.dumps(s, default=student2dict)

# 偷懒模式
json.dumps(s, default=lambda obj: obj.__dict__)
```

* json转模型

```py
def dict2student(d):
    return Student(d['name'], d['age'], d['score'])
json.loads(json_str, object_hook=dict2student)
```

## 进程和线程

### 多线程

* GIL

    启动与CPU核心数量相同的N个线程，在4核CPU上可以监控到CPU占用率仅有102%，也就是仅使用了一核。

    但是用C、C++或Java来改写相同的死循环，直接可以把全部核心跑满，4核就跑到400%，8核就跑到800%，为什么Python不行呢？

    因为Python的线程虽然是真正的线程，但解释器执行代码时，有一个GIL锁：Global Interpreter Lock，任何Python线程执行前，必须先获得GIL锁，然后，每执行100条字节码，解释器就自动释放GIL锁，让别的线程有机会执行。这个GIL全局锁实际上把所有线程的执行代码都给上了锁，所以，多线程在Python中只能交替执行，即使100个线程跑在100核CPU上，也只能用到1个核。

    GIL是Python解释器设计的历史遗留问题，通常我们用的解释器是官方实现的CPython，要真正利用多核，除非重写一个不带GIL的解释器。

    所以，在Python中，可以使用多线程，但不要指望能有效利用多核。如果一定要通过多线程利用多核，那只能通过C扩展来实现，不过这样就失去了Python简单易用的特点。

    不过，也不用过于担心，Python虽然不能利用多线程实现多核任务，但可以通过多进程实现多核任务。多个Python进程有各自独立的GIL锁，互不影响。
