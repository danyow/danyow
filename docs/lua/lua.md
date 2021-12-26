# Lua

## Lua程序设计（第4版）

### 运算符

```lua
local a = 15
print(a ^ 2) -- 225
```

### 注释技巧

```lua

--[[ 加多一个`-`就可以解开这段代码的注释
print("Hello world") 
--]]

---[[ 
print("Hello world")
--]]

```

### 加载文件

```lua
--- 打开指定的文件并将其内容作为 Lua 块执行。
--- 当不带参数调用时，`dofile` 执行标准输入（`stdin`）的内容。
--- 返回块返回的所有值。
--- 如果出现错误，`dofile` 会将错误传播给它的调用者（即，`dofile` 不在保护模式下运行）。
---@overload fun():table
---@param filename string
---@return table
function dofile(filename) end
```

### 内存回收

把 `nil` 赋值给全局变量时, `Lua` 会回收该全局变量.

> 主动内存回收 调用函数 `collectgarbage()`

```lua
---
--- 此函数是垃圾收集器的通用接口。它根据第一个参数 `opt` 执行不同的功能：
---
--- **"collect"**:      执行完整的垃圾收集循环。这是默认选项。
--- **"stop"**:         停止垃圾收集器的自动执行。收集器仅在显式调用时运行，直到调用重新启动它。
--- **"restart"**:      重新启动垃圾收集器的自动执行。
--- **"count"**:        以千字节为单位返回 Lua 使用的总内存。
---               该值有一个小数部分，因此乘以 1024 给出 Lua 使用的确切字节数（溢出除外）。
--- **"step"**:         执行垃圾收集步骤。步长“大小”由`arg`控制。
---               对于零值，收集器将执行一个基本（不可分割的）步骤。
---               对于非零值，收集器将执行该内存量（以千字节为单位）已由 Lua 分配。
---               如果该步骤完成了一个收集周期，则返回 `true`。
--- **"setpause"**:     将 `arg` 设置为收集器暂停的新值（参见第 2.5 节）。返回 `pause` 的前一个值。
--- **"incremental"**:  将收集器模式更改为增量。此选项后面可以跟三个数字：垃圾收集器暂停、步长乘数和步长。
--- **"generational"**: 将收集器模式更改为分代。此选项后面可以跟两个数字：垃圾收集器次要乘数和主要乘数。
--- **"isrunning"**:    返回一个布尔值，告诉收集器是否正在运行（即，未停止）。
---@overload fun():any
---@param opt string
---@param arg string
---@return any
function collectgarbage(opt, arg)
end
```

### [异常捕获](https://blog.csdn.net/mycwq/article/details/49256003)

lua有两个函数可用于捕获异常：pcall 和 xpcall，这两个函数很类似，都会在保护模式下执行函数，效果类似try-catch，可捕获并处理异常。

```lua
--- 在保护模式下使用给定的参数调用函数`f`。
--- 这意味着`f` 中的任何错误都不会传播；
--- 相反，`pcall` 会捕获错误并返回一个状态代码。
--- 它的第一个结果是状态代码（一个布尔值），如果调用成功且没有错误，则为真。
--- 在这种情况下，`pcall` 还会在第一个结果之后返回调用的所有结果。
--- 如果出现任何错误，`pcall` 返回 false 加上错误消息。
---@overload fun(f:fun():any):boolean|table
---@param f fun():any
---@param arg1 table
---@return boolean|table
function pcall(f, arg1, ...)
end

--- 这个函数类似于`pcall`，除了它设置了一个新的消息处理程序`msgh`。
---@param f fun():any
---@param msgh fun():string message handle
---@return any
function xpcall(f, msgh, arg1, ...)
end
```

对比两个函数，xpcall多了一个消息处理参数 msgh。 对于pcall，异常处理完时只简单记录错误信息，然后释放调用栈空间， 而对于xpcall，这个参数可用于在调用栈释放前跟踪到这些数据。效果如下：

```Shell
> f=function(...) error(...) end
> pcall(f, 123)
false   stdin:1: 123
> xpcall(f, function(e) print(debug.traceback()) return e end, 123)
stack traceback:
        stdin:1: in function <stdin:1>
        [C]: in function 'error'
        stdin:1: in function 'f'
        [C]: in function 'xpcall'
        stdin:1: in main chunk
        [C]: in ?
false   stdin:1: 123
```

