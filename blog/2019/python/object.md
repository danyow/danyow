---
layout: post
title: 'Python3面向对象编程'
categories: 笔记 python
comments: true
date: 2019-05-27 22:33:07 +0800
published: true
---

Title: 第二版

## 2. Python 对象

* 自我解释 -> 在规范自己所编写的类的时候，应该加入详尽的注释。

```python
class Point:
    '这段是类注释，建议用单引号'

    def __init__(self, x=0, y=0):
        '''多行文档注释'''
        pass

    def foo(self):
        '单行文档注释'
        pass
```

* 双下划线的命名的变量，是会对其实施**命名改装**。会自动封装 _(类名)

## 3. 对象相似时

* 如果一个类继承了多个类，那么在初始化其父类时，可以采用如下方式。

```python
# 分别调用父类
class Teacher(Person, Title):
    def __init__(self, name, title, studens):
        Person.__init__(self, name)
        Title.__init__(self, title)
        self.studens = studens

'''
以上就是简单定义了一个多继承关系的类，这么看来是没什么问题的
但作者提到了一个问题，如果在定义模型的时候，需要连接数据库，那么每次都是连接两次数据库。
这里可以采用 __mro__ 来修改方法的调用顺序
'''

# 采用super() 和 **kw 的方式

class Person(object):
    def __init__(self, name='', **kw):
        self.name = name

class Title(object):
    def __init__(self, title='', **kw):
        self.title = title

class Teacher(Person, Title):
    def __init__(self, studens=null, **kw):
        super().__init__(**kw)
        self.studens = studens

'''
super() 的方式可以确保object只初始化一次。
**kw 的方式可以解决多父类情况下 参数不一致的问题
'''
```

* 如果定义了一个抽象基类 `abc` 而且这个类重写了 `__subclasshook__(cls, C)` 的时候，需要注意

任意类的实例在被调用 `insubclass` 和 `ininstance` 是会去调用抽象基类重写的 `__subclasshook__` 这个方法的，如果他说的是那么就是。

## 4. 异常捕获

* `else` 和 `finally` 的调用是，没有异常时前者会执行，后者无论如何都会执行。

* 异常的层级

```python
'''
    BaseException   <---    KeybordInterrupt, SystemExit
                    <---    Exception   <---    其他所有的异常
'''
```

## 6. Python 数据结构

* 无法给内置类实例添加属性，但可以给自定义类添加属性。

```python
o = object()
o.x = 0
'''
👆会报错
👇正常运行
'''
class MyClass(object):
    pass
m = MyClass()
m.x = 1
```

* 命名元组相当于字典

```python
from collections import namedtuple

Stock = namedtuple("Stock", "symbol current high low")
# Stock = namedtuple("Stock", "symbol, current, high, low")
stock = Stock("FB", 75.0, 75.3, 74.2)
# 可以使用点语法
stock.symbol
```

* `total_ordering` 对应着 `>, <, ==, !=, >=, <=` 逻辑运算符

* `operator.itemgetter` 可以对元组排序时，直接修改所要比较时用到的是第几个属性

```python
from operator import itemgetter

l = [('h', 4), ('n', 6), ('o', 5), ('p', 1), ('t', 3), ('y', 2)]
# 这里直接采用第二个键来做比较的项
l.sort(key=itemgetter(1))
```

* 队列有三种

1. FIFO 队列（*First In First Out*）

   `from queue import Queue`

2. LIFO 队列（*Last In First Out*）

    `from queue import LifoQueue`

3. 优先级队列

    `from queue import PriorityQueue`

## 7. Python 面向对象的捷径

* 上下文管理器，判断一个对象能否执行 `with` 语句，可以用哪个 `dir()` 查看里面是否有 `__ennter__` 和 `__exit__`

* 参数解包，对于列表对象的解包是加 `*`, 字典的解包是 `**`

## 8. 字符串与序列化

* 占位值改变打印样式

```python
'''
{0:10s}     s字符串，然后是占10个字节。
{1:^9d}     d整形，然后占9个字节，^(脱字符)表示居中对齐。
{2:<8.2f}   f浮点型，然后占8个字节，<表示向左对齐，.2省略两位小数
{3:>7.2f}   f浮点型，然后占7个字节，>表示向右对齐，.2省略两位小数
'''
orders = [('burger', 2, 5),
          ('fries', 3.5, 1),
          ('cola', 1.75, 3)]

print("PRODUCT    QUANTITY   PRICE    SUBTOTAL")

for product, price, quantity in orders:
    subtotal = price * quantity
    print("{0:10s}{1:^9d}   ${2:<8.2f}${3:>7.2f}".format(product, quantity, price, subtotal))

'''
PRODUCT    QUANTITY   PRICE    SUBTOTAL
burger        5       $2.00    $  10.00
fries         1       $3.50    $   3.50
cola          3       $1.75    $   5.25
'''
```

## 9. 迭代器模式

* 协程

```python
def tally():
    score = 0
    while True:
        increment = yield score
        print("increment : {}, score : {}".format(increment, score))
        score += increment

white_sox = tally()
next(white_sox)
white_sox.send(3)

'''
increment : 3, score : 0
'''
```

1. `yield` 的出现和生成器暂停。
2. 在函数外执行 `send()` 方法，且激活了生成器。
3. 发送的值赋给了 `yield` 语句左侧的变量。
4. 生成器继续执行，直至遇到下一个 `yield` 语句。

## 10. Python 设计模式 I

* 观察者模式在执行起来需要以下两个步骤

    1. 被观察者主动通知观察者 通过 `_update_observers`

    ```python
    class Inventory:
        def __init__(self):
            self.observers = []

        def _update_observers(self):
            for observer in self.observers:
                observer()
    ```

    1. 观察者自身现实被调用方法 通过 `__call__`

    ```python
    class Observer:
        def __init__(self, inventory):
            self.inventory = inventory

        def __call__(self):
            print("观察成功！")
    ```

## 12. 测试面向对象程序

* `unittest` 的 `setUp()` 是用于每次执行测试时，都会调用该方法用以保证数据被污染 和 `tearDown()` 是用来保证每次测试结束后调用。

* `py.test` 与之相对应的有类似几个。

  1. `setup_module`
  2. `teardown_module`
  3. `setup_class`
  4. `teardown_class`
  5. `setup_method`
  6. `teardown_method`

* `pytest_funcarg__<idenntifier>` 和被测试函数需要接受的参数作为测试

```python
def pytest_funcarg__numbers(request):
    return [1,2,3]

def test_sum(numbers):
    assert sum(numbers) == 6
```

## 13. 并发

* 自定义线程再被需要重写 `run()` 方法，但调用时用到的是 `start()`