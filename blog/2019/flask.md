---
layout: post
title: 'Flask全套组件及原理剖析'
categories: 笔记 python
comments: true
date: 2019-06-09 22:31:08 +0800
published: true
---

Title: [Bilibili][P1]

## P8

* 使用字符串来导入类

```python
__import__(name, globals=None, locals=None, fromlist=(), level=0)
```

* `config` 的配置文件路径默认在根目录下，需要更改目录的话，要查看对应的Api文档。

## P9

* `__name__` 函数调用的话，可以获取这个函数的名称。

## P18

* 怎么用父类去约束子类必须实现某方法，意指接口（`interface`）。

```python
class Base(object):
    def play():
        raise NoImplementedError('必须实现该方法')
```

* 顺带一提 [P18][P18] 这一讲当中大概是 20 几分钟左右讲到的配置去做某事的思路对我启发蛮大。并且有助于理解 *Django* 的中间件。

* 装饰器可以有多个，下面的会和被装饰的函数当成 inner 加入到上层的装饰器当中去。

* `endpoint` 的意义目前理解为 `id`。

## P19

* 利用 `functools.wraps()` 来帮助我们设置函数的元信息

```python
import functools

def wapper(func):
    @functools.wapper(func) # 保存元信息
    def inner(*args, **kw):
        return func(*args, **kw)
    return inner

@wapper
def foo():
    pass

print(foo.__name__)

'''
如果不设置元信息的话，会导致打印的是 inner
设置之后才可以确定是原先的函数
'''
```

## P20

* 闪现：类似于暂时存储部分内容的快照，取出来就没了。（阅后即焚）

    应用场景：对临时数据的操作，例如错误信息。

* 请求扩展，指的是在请求之前和响应之前的监听，可以有多个监听，请求之前的监听是顺序执行，响应的是倒序执行。

    ```python
    @app.before_request
    def before_request_1(*args, **kw):
        print("before_request_1 进来了")

    @app.before_request
    def before_request_2(*args, **kw):
        print("before_request_2 进来了")

    @app.after_request
    def after_request_1(response):
        print("after_request_1 走了")

    @app.after_request
    def after_request_2(response):
        print("after_request_2 走了")

    '''
    打印顺序为
    before_request_1 进来了
    before_request_2 进来了
    ...
    after_request_2 走了
    after_request_1 走了
    '''
    ```

    如果请求拦截之后，在他之后的请求就不会执行了，但响应的还是会继续执行。

* 根据状态码定义错误信息

    ```python
    @app.errorhandler(404)
    def error_404(args):
        return "404页面没找到"
    ```

* `before_first_request` 第一个请求

    ```python
    @app.before_first_request
    def first(*args, **kw):
        ## 连接数据库之类的
        pass
    ```

## P22

* 中间件的讲解 [P22][P22]

## P25

* `threading.local()` 给每个线程开辟一个内存空间用以对应的线程执行相应操作。达到类似加锁的目的。

## P36

* 数据的链接池库采用 `DBUtils` ，但如果使用的是 `PooledDB` 模式的话，其中有个参数需要注意 `maxshared` : 链接池中最多共享的链接数量。0 为全部共享，但这个值设置的时候是由 `creator` 的 `threadsafety` 来判别的，也就是说设置后不一定会生效。

[P1]:https://www.bilibili.com/video/av23109760/?p=1
[P18]:https://www.bilibili.com/video/av23109760/?p=18
[P22]:https://www.bilibili.com/video/av23109760/?p=22
