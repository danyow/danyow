---
sidebar_position: 2
---

# 概览

这份参考手册是对 Lua 语言的官方定义。 关于 Lua 编程的全部细节，则放在 [Programming in Lua][2] 这本书中。

[开始][3] · [目录][4] · [索引][5] · [中英术语对照表][6]

* * *

Lua.org, PUC-Rio 版权所有 © 2015 ， 在遵循 [Lua license][7] 条款下，可自由使用。

## 目录

- [1 – 简介][8]

- [2 – 基本概念][9]

    - [2.1 – 值与类型][10]
    - [2.2 – 环境与全局环境][11]
    - [2.3 – 错误处理][12]
    - [2.4 – 元表及元方法][13]
    - [2.5 – 垃圾收集][14]
        - [2.5.1 – 垃圾收集的元方法][15]
        - [2.5.2 – 弱表][16]
    - [2.6 – 协程][17]

- [3 – 语言定义][18]

    - [3.1 – 词法约定][19]
    - [3.2 – 变量][20]
    - [3.3 – 语句][21]
        - [3.3.1 – 语句块][22]
        - [3.3.2 – 代码块][23]
        - [3.3.3 – 赋值][24]
        - [3.3.4 – 控制结构][25]
        - [3.3.5 – For 语句][26]
        - [3.3.6 – 函数调用语句][27]
        - [3.3.7 – 局部声明][28]
    - [3.4 – 表达式][29]
        - [3.4.1 – 数学运算操作符][30]
        - [3.4.2 – 位操作符][31]
        - [3.4.3 – 强制转换][32]
        - [3.4.4 – 比较操作符][33]
        - [3.4.5 – 逻辑操作符][34]
        - [3.4.6 – 字符串连接][35]
        - [3.4.7 – 取长度操作符][36]
        - [3.4.8 – 优先级][37]
        - [3.4.9 – 表构建][38]
        - [3.4.10 – 函数调用][39]
        - [3.4.11 – 函数定义][40]
    - [3.5 – 可见性规则][41]

- [4 – 编程接口][42]

    - [4.1 – 栈][43]
    - [4.2 – 栈大小][44]
    - [4.3 – 有效索引与可接受索引][45]
    - [4.4 – C 闭包][46]
    - [4.5 – 注册表][47]
    - [4.6 – C 中的错误处理][48]
    - [4.7 – C 中的让出处理][49]
    - [4.8 – 函数和类型][50]
    - [4.9 – 调试接口][51]

- [5 – 辅助库][52]

    - [5.1 – 函数和类型][53]

- [6 – 标准库][54]

    - [6.1 – 基本函数][55]
    - [6.2 – 协程管理][56]
    - [6.3 – 模块][57]
    - [6.4 – 字符串处理][58]
        - [6.4.1 – 匹配模式][59]
        - [6.4.2 – 打包和解包用到的格式串][60]
    - [6.5 – UTF-8 支持][61]
    - [6.6 – 表处理][62]
    - [6.7 – 数学函数][63]
    - [6.8 – 输入输出设施][64]
    - [6.9 – 操作系统设施][65]
    - [6.10 – 调试库][66]

- [7 – 独立版 Lua][67]

- [8 – 与之前版本不兼容的地方][68]

    - [8.1 – 语言的变更][69]
    - [8.2 – 库的变更][70]
    - [8.3 – API 的变更][71]

- [9 – Lua 的完整语法][72]

## 索引

<table width="100%"><tbody><tr valign="top"><td><h3><a name="functions">Lua 函数</a></h3><p><a href="manual.md#6.1">基础</a><br/><a href="manual.md#pdf-_G">_G</a><br/><a href="manual.md#pdf-_VERSION">_VERSION</a><br/><a href="manual.md#pdf-assert">assert</a><br/><a href="manual.md#pdf-collectgarbage">collectgarbage</a><br/><a href="manual.md#pdf-dofile">dofile</a><br/><a href="manual.md#pdf-error">error</a><br/><a href="manual.md#pdf-getmetatable">getmetatable</a><br/><a href="manual.md#pdf-ipairs">ipairs</a><br/><a href="manual.md#pdf-load">load</a><br/><a href="manual.md#loadfile-filename--mode--env">loadfile</a><br/><a href="manual.md#pdf-next">next</a><br/><a href="manual.md#pdf-pairs">pairs</a><br/><a href="manual.md#pdf-pcall">pcall</a><br/><a href="manual.md#pdf-print">print</a><br/><a href="manual.md#pdf-rawequal">rawequal</a><br/><a href="manual.md#pdf-rawget">rawget</a><br/><a href="manual.md#pdf-rawlen">rawlen</a><br/><a href="manual.md#pdf-rawset">rawset</a><br/><a href="manual.md#pdf-require">require</a><br/><a href="manual.md#pdf-select">select</a><br/><a href="manual.md#pdf-setmetatable">setmetatable</a><br/><a href="manual.md#pdf-tonumber">tonumber</a><br/><a href="manual.md#pdf-tostring">tostring</a><br/><a href="manual.md#pdf-type">type</a><br/><a href="manual.md#pdf-xpcall">xpcall</a><br/></p><p><a href="manual.md#6.2">协程</a><br/><a href="manual.md#pdf-coroutine.create">coroutine.create</a><br/><a href="manual.md#pdf-coroutine.isyieldable">coroutine.isyieldable</a><br/><a href="manual.md#pdf-coroutine.resume">coroutine.resume</a><br/><a href="manual.md#pdf-coroutine.running">coroutine.running</a><br/><a href="manual.md#pdf-coroutine.status">coroutine.status</a><br/><a href="manual.md#pdf-coroutine.wrap">coroutine.wrap</a><br/><a href="manual.md#pdf-coroutine.yield">coroutine.yield</a><br/></p><p><a href="manual.md#6.10">调试</a><br/><a href="manual.md#pdf-debug.debug">debug.debug</a><br/><a href="manual.md#pdf-debug.gethook">debug.gethook</a><br/><a href="manual.md#pdf-debug.getinfo">debug.getinfo</a><br/><a href="manual.md#pdf-debug.getlocal">debug.getlocal</a><br/><a href="manual.md#pdf-debug.getmetatable">debug.getmetatable</a><br/><a href="manual.md#pdf-debug.getregistry">debug.getregistry</a><br/><a href="manual.md#pdf-debug.getupvalue">debug.getupvalue</a><br/><a href="manual.md#pdf-debug.getuservalue">debug.getuservalue</a><br/><a href="manual.md#pdf-debug.sethook">debug.sethook</a><br/><a href="manual.md#pdf-debug.setlocal">debug.setlocal</a><br/><a href="manual.md#pdf-debug.setmetatable">debug.setmetatable</a><br/><a href="manual.md#pdf-debug.setupvalue">debug.setupvalue</a><br/><a href="manual.md#pdf-debug.setuservalue">debug.setuservalue</a><br/><a href="manual.md#pdf-debug.traceback">debug.traceback</a><br/><a href="manual.md#pdf-debug.upvalueid">debug.upvalueid</a><br/><a href="manual.md#pdf-debug.upvaluejoin">debug.upvaluejoin</a><br/></p><p><a href="manual.md#6.8">输入输出</a><br/><a href="manual.md#pdf-io.close">io.close</a><br/><a href="manual.md#pdf-io.flush">io.flush</a><br/><a href="manual.md#pdf-io.input">io.input</a><br/><a href="manual.md#pdf-io.lines">io.lines</a><br/><a href="manual.md#pdf-io.open">io.open</a><br/><a href="manual.md#pdf-io.output">io.output</a><br/><a href="manual.md#pdf-io.popen">io.popen</a><br/><a href="manual.md#pdf-io.read">io.read</a><br/><a href="manual.md#pdf-io.stderr">io.stderr</a><br/><a href="manual.md#pdf-io.stdin">io.stdin</a><br/><a href="manual.md#pdf-io.stdout">io.stdout</a><br/><a href="manual.md#pdf-io.tmpfile">io.tmpfile</a><br/><a href="manual.md#pdf-io.type">io.type</a><br/><a href="manual.md#pdf-io.write">io.write</a><br/><a href="manual.md#pdf-file:close">file:close</a><br/><a href="manual.md#pdf-file:flush">file:flush</a><br/><a href="manual.md#pdf-file:lines">file:lines</a><br/><a href="manual.md#pdf-file:read">file:read</a><br/><a href="manual.md#pdf-file:seek">file:seek</a><br/><a href="manual.md#pdf-file:setvbuf">file:setvbuf</a><br/><a href="manual.md#pdf-file:write">file:write</a><br/></p></td><td><h3>&nbsp;</h3><p><a href="manual.md#6.7">数学</a><br/><a href="manual.md#pdf-math.abs">math.abs</a><br/><a href="manual.md#pdf-math.acos">math.acos</a><br/><a href="manual.md#pdf-math.asin">math.asin</a><br/><a href="manual.md#pdf-math.atan">math.atan</a><br/><a href="manual.md#pdf-math.ceil">math.ceil</a><br/><a href="manual.md#pdf-math.cos">math.cos</a><br/><a href="manual.md#pdf-math.deg">math.deg</a><br/><a href="manual.md#pdf-math.exp">math.exp</a><br/><a href="manual.md#pdf-math.floor">math.floor</a><br/><a href="manual.md#pdf-math.fmod">math.fmod</a><br/><a href="manual.md#pdf-math.huge">math.huge</a><br/><a href="manual.md#pdf-math.log">math.log</a><br/><a href="manual.md#pdf-math.max">math.max</a><br/><a href="manual.md#pdf-math.maxinteger">math.maxinteger</a><br/><a href="manual.md#pdf-math.min">math.min</a><br/><a href="manual.md#pdf-math.mininteger">math.mininteger</a><br/><a href="manual.md#pdf-math.modf">math.modf</a><br/><a href="manual.md#pdf-math.pi">math.pi</a><br/><a href="manual.md#pdf-math.rad">math.rad</a><br/><a href="manual.md#pdf-math.random">math.random</a><br/><a href="manual.md#pdf-math.randomseed">math.randomseed</a><br/><a href="manual.md#pdf-math.sin">math.sin</a><br/><a href="manual.md#pdf-math.sqrt">math.sqrt</a><br/><a href="manual.md#pdf-math.tan">math.tan</a><br/><a href="manual.md#pdf-math.tointeger">math.tointeger</a><br/><a href="manual.md#pdf-math.type">math.type</a><br/><a href="manual.md#pdf-math.ult">math.ult</a><br/></p><p><a href="manual.md#6.9">操作系统</a><br/><a href="manual.md#pdf-os.clock">os.clock</a><br/><a href="manual.md#pdf-os.date">os.date</a><br/><a href="manual.md#pdf-os.difftime">os.difftime</a><br/><a href="manual.md#pdf-os.execute">os.execute</a><br/><a href="manual.md#pdf-os.exit">os.exit</a><br/><a href="manual.md#pdf-os.getenv">os.getenv</a><br/><a href="manual.md#pdf-os.remove">os.remove</a><br/><a href="manual.md#pdf-os.rename">os.rename</a><br/><a href="manual.md#pdf-os.setlocale">os.setlocale</a><br/><a href="manual.md#pdf-os.time">os.time</a><br/><a href="manual.md#pdf-os.tmpname">os.tmpname</a><br/></p><p><a href="manual.md#6.3">包</a><br/><a href="manual.md#pdf-package.config">package.config</a><br/><a href="manual.md#pdf-package.cpath">package.cpath</a><br/><a href="manual.md#pdf-package.loaded">package.loaded</a><br/><a href="manual.md#pdf-package.loadlib">package.loadlib</a><br/><a href="manual.md#pdf-package.path">package.path</a><br/><a href="manual.md#pdf-package.preload">package.preload</a><br/><a href="manual.md#pdf-package.searchers">package.searchers</a><br/><a href="manual.md#pdf-package.searchpath">package.searchpath</a><br/></p><p><a href="manual.md#6.4">字符串</a><br/><a href="manual.md#pdf-string.byte">string.byte</a><br/><a href="manual.md#pdf-string.char">string.char</a><br/><a href="manual.md#pdf-string.dump">string.dump</a><br/><a href="manual.md#pdf-string.find">string.find</a><br/><a href="manual.md#pdf-string.format">string.format</a><br/><a href="manual.md#pdf-string.gmatch">string.gmatch</a><br/><a href="manual.md#pdf-string.gsub">string.gsub</a><br/><a href="manual.md#pdf-string.len">string.len</a><br/><a href="manual.md#pdf-string.lower">string.lower</a><br/><a href="manual.md#pdf-string.match">string.match</a><br/><a href="manual.md#pdf-string.pack">string.pack</a><br/><a href="manual.md#pdf-string.packsize">string.packsize</a><br/><a href="manual.md#pdf-string.rep">string.rep</a><br/><a href="manual.md#pdf-string.reverse">string.reverse</a><br/><a href="manual.md#pdf-string.sub">string.sub</a><br/><a href="manual.md#pdf-string.unpack">string.unpack</a><br/><a href="manual.md#pdf-string.upper">string.upper</a><br/></p><p><a href="manual.md#6.6">表</a><br/><a href="manual.md#pdf-table.concat">table.concat</a><br/><a href="manual.md#pdf-table.insert">table.insert</a><br/><a href="manual.md#pdf-table.move">table.move</a><br/><a href="manual.md#pdf-table.pack">table.pack</a><br/><a href="manual.md#pdf-table.remove">table.remove</a><br/><a href="manual.md#pdf-table.sort">table.sort</a><br/><a href="manual.md#pdf-table.unpack">table.unpack</a><br/></p><p><a href="manual.md#6.5">utf8</a><br/><a href="manual.md#pdf-utf8.char">utf8.char</a><br/><a href="manual.md#pdf-utf8.charpattern">utf8.charpattern</a><br/><a href="manual.md#pdf-utf8.codepoint">utf8.codepoint</a><br/><a href="manual.md#pdf-utf8.codes">utf8.codes</a><br/><a href="manual.md#pdf-utf8.len">utf8.len</a><br/><a href="manual.md#pdf-utf8.offset">utf8.offset</a><br/></p><h3><a name="env">环境变量</a></h3><a href="manual.md#pdf-LUA_CPATH">LUA_CPATH</a><br/><a href="manual.md#pdf-LUA_CPATH_5_3">LUA_CPATH_5_3</a><br/><a href="manual.md#pdf-LUA_INIT">LUA_INIT</a><br/><a href="manual.md#pdf-LUA_INIT_5_3">LUA_INIT_5_3</a><br/><a href="manual.md#pdf-LUA_PATH">LUA_PATH</a><br/><a href="manual.md#pdf-LUA_PATH_5_3">LUA_PATH_5_3</a><br/></td><td><h3><a name="api">C API</a></h3><p><a href="manual.md#lua_Alloc">lua_Alloc</a><br/><a href="manual.md#lua_CFunction">lua_CFunction</a><br/><a href="manual.md#lua_Debug">lua_Debug</a><br/><a href="manual.md#lua_Hook">lua_Hook</a><br/><a href="manual.md#lua_Integer">lua_Integer</a><br/><a href="manual.md#lua_KContext">lua_KContext</a><br/><a href="manual.md#lua_KFunction">lua_KFunction</a><br/><a href="manual.md#lua_Number">lua_Number</a><br/><a href="manual.md#lua_Reader">lua_Reader</a><br/><a href="manual.md#lua_State">lua_State</a><br/><a href="manual.md#lua_Unsigned">lua_Unsigned</a><br/><a href="manual.md#lua_Writer">lua_Writer</a><br/></p><p><a href="manual.md#lua_absindex">lua_absindex</a><br/><a href="manual.md#lua_arith">lua_arith</a><br/><a href="manual.md#lua_atpanic">lua_atpanic</a><br/><a href="manual.md#lua_call">lua_call</a><br/><a href="manual.md#lua_callk">lua_callk</a><br/><a href="manual.md#lua_checkstack">lua_checkstack</a><br/><a href="manual.md#lua_close">lua_close</a><br/><a href="manual.md#lua_compare">lua_compare</a><br/><a href="manual.md#lua_concat">lua_concat</a><br/><a href="manual.md#lua_copy">lua_copy</a><br/><a href="manual.md#lua_createtable">lua_createtable</a><br/><a href="manual.md#lua_dump">lua_dump</a><br/><a href="manual.md#lua_error">lua_error</a><br/><a href="manual.md#lua_gc">lua_gc</a><br/><a href="manual.md#lua_getallocf">lua_getallocf</a><br/><a href="manual.md#lua_getextraspace">lua_getextraspace</a><br/><a href="manual.md#lua_getfield">lua_getfield</a><br/><a href="manual.md#lua_getglobal">lua_getglobal</a><br/><a href="manual.md#lua_gethook">lua_gethook</a><br/><a href="manual.md#lua_gethookcount">lua_gethookcount</a><br/><a href="manual.md#lua_gethookmask">lua_gethookmask</a><br/><a href="manual.md#lua_geti">lua_geti</a><br/><a href="manual.md#lua_getinfo">lua_getinfo</a><br/><a href="manual.md#lua_getlocal">lua_getlocal</a><br/><a href="manual.md#lua_getmetatable">lua_getmetatable</a><br/><a href="manual.md#lua_getstack">lua_getstack</a><br/><a href="manual.md#lua_gettable">lua_gettable</a><br/><a href="manual.md#lua_gettop">lua_gettop</a><br/><a href="manual.md#lua_getupvalue">lua_getupvalue</a><br/><a href="manual.md#lua_getuservalue">lua_getuservalue</a><br/><a href="manual.md#lua_insert">lua_insert</a><br/><a href="manual.md#lua_isboolean">lua_isboolean</a><br/><a href="manual.md#lua_iscfunction">lua_iscfunction</a><br/><a href="manual.md#lua_isfunction">lua_isfunction</a><br/><a href="manual.md#lua_isinteger">lua_isinteger</a><br/><a href="manual.md#lua_islightuserdata">lua_islightuserdata</a><br/><a href="manual.md#lua_isnil">lua_isnil</a><br/><a href="manual.md#lua_isnone">lua_isnone</a><br/><a href="manual.md#lua_isnoneornil">lua_isnoneornil</a><br/><a href="manual.md#lua_isnumber">lua_isnumber</a><br/><a href="manual.md#lua_isstring">lua_isstring</a><br/><a href="manual.md#lua_istable">lua_istable</a><br/><a href="manual.md#lua_isthread">lua_isthread</a><br/><a href="manual.md#lua_isuserdata">lua_isuserdata</a><br/><a href="manual.md#lua_isyieldable">lua_isyieldable</a><br/><a href="manual.md#lua_len">lua_len</a><br/><a href="manual.md#lua_load">lua_load</a><br/><a href="manual.md#lua_newstate">lua_newstate</a><br/><a href="manual.md#lua_newtable">lua_newtable</a><br/><a href="manual.md#lua_newthread">lua_newthread</a><br/><a href="manual.md#lua_newuserdata">lua_newuserdata</a><br/><a href="manual.md#lua_next">lua_next</a><br/><a href="manual.md#lua_numbertointeger">lua_numbertointeger</a><br/><a href="manual.md#lua_pcall">lua_pcall</a><br/><a href="manual.md#lua_pcallk">lua_pcallk</a><br/><a href="manual.md#lua_pop">lua_pop</a><br/><a href="manual.md#lua_pushboolean">lua_pushboolean</a><br/><a href="manual.md#lua_pushcclosure">lua_pushcclosure</a><br/><a href="manual.md#lua_pushcfunction">lua_pushcfunction</a><br/><a href="manual.md#lua_pushfstring">lua_pushfstring</a><br/><a href="manual.md#lua_pushglobaltable">lua_pushglobaltable</a><br/><a href="manual.md#lua_pushinteger">lua_pushinteger</a><br/><a href="manual.md#lua_pushlightuserdata">lua_pushlightuserdata</a><br/><a href="manual.md#lua_pushliteral">lua_pushliteral</a><br/><a href="manual.md#lua_pushlstring">lua_pushlstring</a><br/><a href="manual.md#lua_pushnil">lua_pushnil</a><br/><a href="manual.md#lua_pushnumber">lua_pushnumber</a><br/><a href="manual.md#lua_pushstring">lua_pushstring</a><br/><a href="manual.md#lua_pushthread">lua_pushthread</a><br/><a href="manual.md#lua_pushvalue">lua_pushvalue</a><br/><a href="manual.md#lua_pushvfstring">lua_pushvfstring</a><br/><a href="manual.md#lua_rawequal">lua_rawequal</a><br/><a href="manual.md#lua_rawget">lua_rawget</a><br/><a href="manual.md#lua_rawgeti">lua_rawgeti</a><br/><a href="manual.md#lua_rawgetp">lua_rawgetp</a><br/><a href="manual.md#lua_rawlen">lua_rawlen</a><br/><a href="manual.md#lua_rawset">lua_rawset</a><br/><a href="manual.md#lua_rawseti">lua_rawseti</a><br/><a href="manual.md#lua_rawsetp">lua_rawsetp</a><br/><a href="manual.md#lua_register">lua_register</a><br/><a href="manual.md#lua_remove">lua_remove</a><br/><a href="manual.md#lua_replace">lua_replace</a><br/><a href="manual.md#lua_resume">lua_resume</a><br/><a href="manual.md#lua_rotate">lua_rotate</a><br/><a href="manual.md#lua_setallocf">lua_setallocf</a><br/><a href="manual.md#lua_setfield">lua_setfield</a><br/><a href="manual.md#lua_setglobal">lua_setglobal</a><br/><a href="manual.md#lua_sethook">lua_sethook</a><br/><a href="manual.md#lua_seti">lua_seti</a><br/><a href="manual.md#lua_setlocal">lua_setlocal</a><br/><a href="manual.md#lua_setmetatable">lua_setmetatable</a><br/><a href="manual.md#lua_settable">lua_settable</a><br/><a href="manual.md#lua_settop">lua_settop</a><br/><a href="manual.md#lua_setupvalue">lua_setupvalue</a><br/><a href="manual.md#lua_setuservalue">lua_setuservalue</a><br/><a href="manual.md#lua_status">lua_status</a><br/><a href="manual.md#lua_stringtonumber">lua_stringtonumber</a><br/><a href="manual.md#lua_toboolean">lua_toboolean</a><br/><a href="manual.md#lua_tocfunction">lua_tocfunction</a><br/><a href="manual.md#lua_tointeger">lua_tointeger</a><br/><a href="manual.md#lua_tointegerx">lua_tointegerx</a><br/><a href="manual.md#lua_tolstring">lua_tolstring</a><br/><a href="manual.md#lua_tonumber">lua_tonumber</a><br/><a href="manual.md#lua_tonumberx">lua_tonumberx</a><br/><a href="manual.md#lua_topointer">lua_topointer</a><br/><a href="manual.md#lua_tostring">lua_tostring</a><br/><a href="manual.md#lua_tothread">lua_tothread</a><br/><a href="manual.md#lua_touserdata">lua_touserdata</a><br/><a href="manual.md#lua_type">lua_type</a><br/><a href="manual.md#lua_typename">lua_typename</a><br/><a href="manual.md#lua_upvalueid">lua_upvalueid</a><br/><a href="manual.md#lua_upvalueindex">lua_upvalueindex</a><br/><a href="manual.md#lua_upvaluejoin">lua_upvaluejoin</a><br/><a href="manual.md#lua_version">lua_version</a><br/><a href="manual.md#lua_xmove">lua_xmove</a><br/><a href="manual.md#lua_yield">lua_yield</a><br/><a href="manual.md#lua_yieldk">lua_yieldk</a><br/></p></td><td><h3><a name="auxlib">辅助库</a></h3><p><a href="manual.md#luaL_Buffer">luaL_Buffer</a><br/><a href="manual.md#luaL_Reg">luaL_Reg</a><br/><a href="manual.md#luaL_Stream">luaL_Stream</a><br/></p><p><a href="manual.md#luaL_addchar">luaL_addchar</a><br/><a href="manual.md#luaL_addlstring">luaL_addlstring</a><br/><a href="manual.md#luaL_addsize">luaL_addsize</a><br/><a href="manual.md#luaL_addstring">luaL_addstring</a><br/><a href="manual.md#luaL_addvalue">luaL_addvalue</a><br/><a href="manual.md#luaL_argcheck">luaL_argcheck</a><br/><a href="manual.md#luaL_argerror">luaL_argerror</a><br/><a href="manual.md#luaL_buffinit">luaL_buffinit</a><br/><a href="manual.md#luaL_buffinitsize">luaL_buffinitsize</a><br/><a href="manual.md#luaL_callmeta">luaL_callmeta</a><br/><a href="manual.md#luaL_checkany">luaL_checkany</a><br/><a href="manual.md#luaL_checkinteger">luaL_checkinteger</a><br/><a href="manual.md#luaL_checklstring">luaL_checklstring</a><br/><a href="manual.md#luaL_checknumber">luaL_checknumber</a><br/><a href="manual.md#luaL_checkoption">luaL_checkoption</a><br/><a href="manual.md#luaL_checkstack">luaL_checkstack</a><br/><a href="manual.md#luaL_checkstring">luaL_checkstring</a><br/><a href="manual.md#luaL_checktype">luaL_checktype</a><br/><a href="manual.md#luaL_checkudata">luaL_checkudata</a><br/><a href="manual.md#luaL_checkversion">luaL_checkversion</a><br/><a href="manual.md#luaL_dofile">luaL_dofile</a><br/><a href="manual.md#luaL_dostring">luaL_dostring</a><br/><a href="manual.md#luaL_error">luaL_error</a><br/><a href="manual.md#luaL_execresult">luaL_execresult</a><br/><a href="manual.md#luaL_fileresult">luaL_fileresult</a><br/><a href="manual.md#luaL_getmetafield">luaL_getmetafield</a><br/><a href="manual.md#luaL_getmetatable">luaL_getmetatable</a><br/><a href="manual.md#luaL_getsubtable">luaL_getsubtable</a><br/><a href="manual.md#luaL_gsub">luaL_gsub</a><br/><a href="manual.md#luaL_len">luaL_len</a><br/><a href="manual.md#luaL_loadbuffer">luaL_loadbuffer</a><br/><a href="manual.md#luaL_loadbufferx">luaL_loadbufferx</a><br/><a href="manual.md#luaL_loadfile">luaL_loadfile</a><br/><a href="manual.md#luaL_loadfilex">luaL_loadfilex</a><br/><a href="manual.md#luaL_loadstring">luaL_loadstring</a><br/><a href="manual.md#luaL_newlib">luaL_newlib</a><br/><a href="manual.md#luaL_newlibtable">luaL_newlibtable</a><br/><a href="manual.md#luaL_newmetatable">luaL_newmetatable</a><br/><a href="manual.md#luaL_newstate">luaL_newstate</a><br/><a href="manual.md#luaL_openlibs">luaL_openlibs</a><br/><a href="manual.md#luaL_optinteger">luaL_optinteger</a><br/><a href="manual.md#luaL_optlstring">luaL_optlstring</a><br/><a href="manual.md#luaL_optnumber">luaL_optnumber</a><br/><a href="manual.md#luaL_optstring">luaL_optstring</a><br/><a href="manual.md#luaL_prepbuffer">luaL_prepbuffer</a><br/><a href="manual.md#luaL_prepbuffsize">luaL_prepbuffsize</a><br/><a href="manual.md#luaL_pushresult">luaL_pushresult</a><br/><a href="manual.md#luaL_pushresultsize">luaL_pushresultsize</a><br/><a href="manual.md#luaL_ref">luaL_ref</a><br/><a href="manual.md#luaL_requiref">luaL_requiref</a><br/><a href="manual.md#luaL_setfuncs">luaL_setfuncs</a><br/><a href="manual.md#luaL_setmetatable">luaL_setmetatable</a><br/><a href="manual.md#luaL_testudata">luaL_testudata</a><br/><a href="manual.md#luaL_tolstring">luaL_tolstring</a><br/><a href="manual.md#luaL_traceback">luaL_traceback</a><br/><a href="manual.md#luaL_typename">luaL_typename</a><br/><a href="manual.md#luaL_unref">luaL_unref</a><br/><a href="manual.md#luaL_where">luaL_where</a><br/></p><h3><a name="library">标准库</a></h3><p><a href="manual.md#pdf-luaopen_base">luaopen_base</a><br/><a href="manual.md#pdf-luaopen_coroutine">luaopen_coroutine</a><br/><a href="manual.md#pdf-luaopen_debug">luaopen_debug</a><br/><a href="manual.md#pdf-luaopen_io">luaopen_io</a><br/><a href="manual.md#pdf-luaopen_math">luaopen_math</a><br/><a href="manual.md#pdf-luaopen_os">luaopen_os</a><br/><a href="manual.md#pdf-luaopen_package">luaopen_package</a><br/><a href="manual.md#pdf-luaopen_string">luaopen_string</a><br/><a href="manual.md#pdf-luaopen_table">luaopen_table</a><br/><a href="manual.md#pdf-luaopen_utf8">luaopen_utf8</a><br/></p><h3><a name="constants">常量</a></h3><a href="manual.md#pdf-LUA_ERRERR">LUA_ERRERR</a><br/><a href="manual.md#pdf-LUA_ERRFILE">LUA_ERRFILE</a><br/><a href="manual.md#pdf-LUA_ERRGCMM">LUA_ERRGCMM</a><br/><a href="manual.md#pdf-LUA_ERRMEM">LUA_ERRMEM</a><br/><a href="manual.md#pdf-LUA_ERRRUN">LUA_ERRRUN</a><br/><a href="manual.md#pdf-LUA_ERRSYNTAX">LUA_ERRSYNTAX</a><br/><a href="manual.md#pdf-LUA_HOOKCALL">LUA_HOOKCALL</a><br/><a href="manual.md#pdf-LUA_HOOKCOUNT">LUA_HOOKCOUNT</a><br/><a href="manual.md#pdf-LUA_HOOKLINE">LUA_HOOKLINE</a><br/><a href="manual.md#pdf-LUA_HOOKRET">LUA_HOOKRET</a><br/><a href="manual.md#pdf-LUA_HOOKTAILCALL">LUA_HOOKTAILCALL</a><br/><a href="manual.md#pdf-LUA_MASKCALL">LUA_MASKCALL</a><br/><a href="manual.md#pdf-LUA_MASKCOUNT">LUA_MASKCOUNT</a><br/><a href="manual.md#pdf-LUA_MASKLINE">LUA_MASKLINE</a><br/><a href="manual.md#pdf-LUA_MASKRET">LUA_MASKRET</a><br/><a href="manual.md#pdf-LUA_MAXINTEGER">LUA_MAXINTEGER</a><br/><a href="manual.md#pdf-LUA_MININTEGER">LUA_MININTEGER</a><br/><a href="manual.md#pdf-LUA_MINSTACK">LUA_MINSTACK</a><br/><a href="manual.md#pdf-LUA_MULTRET">LUA_MULTRET</a><br/><a href="manual.md#pdf-LUA_NOREF">LUA_NOREF</a><br/><a href="manual.md#pdf-LUA_OK">LUA_OK</a><br/><a href="manual.md#pdf-LUA_OPADD">LUA_OPADD</a><br/><a href="manual.md#pdf-LUA_OPBAND">LUA_OPBAND</a><br/><a href="manual.md#pdf-LUA_OPBNOT">LUA_OPBNOT</a><br/><a href="manual.md#pdf-LUA_OPBOR">LUA_OPBOR</a><br/><a href="manual.md#pdf-LUA_OPBXOR">LUA_OPBXOR</a><br/><a href="manual.md#pdf-LUA_OPDIV">LUA_OPDIV</a><br/><a href="manual.md#pdf-LUA_OPEQ">LUA_OPEQ</a><br/><a href="manual.md#pdf-LUA_OPIDIV">LUA_OPIDIV</a><br/><a href="manual.md#pdf-LUA_OPLE">LUA_OPLE</a><br/><a href="manual.md#pdf-LUA_OPLT">LUA_OPLT</a><br/><a href="manual.md#pdf-LUA_OPMOD">LUA_OPMOD</a><br/><a href="manual.md#pdf-LUA_OPMUL">LUA_OPMUL</a><br/><a href="manual.md#pdf-LUA_OPPOW">LUA_OPPOW</a><br/><a href="manual.md#pdf-LUA_OPSHL">LUA_OPSHL</a><br/><a href="manual.md#pdf-LUA_OPSHR">LUA_OPSHR</a><br/><a href="manual.md#pdf-LUA_OPSUB">LUA_OPSUB</a><br/><a href="manual.md#pdf-LUA_OPUNM">LUA_OPUNM</a><br/><a href="manual.md#pdf-LUA_REFNIL">LUA_REFNIL</a><br/><a href="manual.md#pdf-LUA_REGISTRYINDEX">LUA_REGISTRYINDEX</a><br/><a href="manual.md#pdf-LUA_RIDX_GLOBALS">LUA_RIDX_GLOBALS</a><br/><a href="manual.md#pdf-LUA_RIDX_MAINTHREAD">LUA_RIDX_MAINTHREAD</a><br/><a href="manual.md#pdf-LUA_TBOOLEAN">LUA_TBOOLEAN</a><br/><a href="manual.md#pdf-LUA_TFUNCTION">LUA_TFUNCTION</a><br/><a href="manual.md#pdf-LUA_TLIGHTUSERDATA">LUA_TLIGHTUSERDATA</a><br/><a href="manual.md#pdf-LUA_TNIL">LUA_TNIL</a><br/><a href="manual.md#pdf-LUA_TNONE">LUA_TNONE</a><br/><a href="manual.md#pdf-LUA_TNUMBER">LUA_TNUMBER</a><br/><a href="manual.md#pdf-LUA_TSTRING">LUA_TSTRING</a><br/><a href="manual.md#pdf-LUA_TTABLE">LUA_TTABLE</a><br/><a href="manual.md#pdf-LUA_TTHREAD">LUA_TTHREAD</a><br/><a href="manual.md#pdf-LUA_TUSERDATA">LUA_TUSERDATA</a><br/><a href="manual.md#pdf-LUA_USE_APICHECK">LUA_USE_APICHECK</a><br/><a href="manual.md#pdf-LUA_YIELD">LUA_YIELD</a><br/><a href="manual.md#pdf-LUAL_BUFFERSIZE">LUAL_BUFFERSIZE</a><br/></td></tr></tbody></table>

* * *

最后更新时间： 2015年1月18日19:49

[1]: http://www.lua.org/

[2]: http://www.lua.org/pil/

[3]: manual.md

[4]: #目录

[5]: #概览

[6]: glossary.md

[7]: http://www.lua.org/license.html

[8]: manual.md

[9]: manual.md#2

[10]: manual.md#2.1.1

[11]: manual.md#22-环境与全局环境

[12]: manual.md#23-错误处理

[13]: manual.md#24-元表及元方法

[14]: manual.md#25-垃圾收集

[15]: manual.md#2.5.1.5.1

[16]: manual.md#2.5.2.5.2

[17]: manual.md#26-协程

[18]: manual.md#3

[19]: manual.md#31-词法约定

[20]: manual.md#32-变量

[21]: manual.md#3.3.3

[22]: manual.md#3.3.1.3.1

[23]: manual.md#332-代码块

[24]: manual.md#333-赋值

[25]: manual.md#334-控制结构

[26]: manual.md#335-for-语句

[27]: manual.md#336-函数调用语句

[28]: manual.md#337-局部声明

[29]: manual.md#34-表达式

[30]: manual.md#341-数学运算操作符

[31]: manual.md#342-位操作符

[32]: manual.md#343-强制转换

[33]: manual.md#344-比较操作符

[34]: manual.md#345-逻辑操作符

[35]: manual.md#346-字符串连接

[36]: manual.md#347-取长度操作符

[37]: manual.md#348-优先级

[38]: manual.md#349-表构建

[39]: manual.md#3410-函数调用

[40]: manual.md#3411-函数定义

[41]: manual.md#35-可见性规则

[42]: manual.md#4

[43]: manual.md#4.1.1

[44]: manual.md#42-栈大小

[45]: manual.md#4.3.3

[46]: manual.md#44-c-闭包

[47]: manual.md#45-注册表

[48]: manual.md#46-c-中的错误处理

[49]: manual.md#47-c-中的让出处理

[50]: manual.md#4.8.8

[51]: manual.md#49-调试接口

[52]: manual.md#5

[53]: manual.md#5.1.1

[54]: manual.md#6

[55]: manual.md#61-基础函数

[56]: manual.md#62-协程管理

[57]: manual.md#63-模块

[58]: manual.md#64-字符串处理

[59]: manual.md#641-匹配模式

[60]: manual.md#642-打包和解包用到的格式串

[61]: manual.md#65-utf-8-支持

[62]: manual.md#66-表处理

[63]: manual.md#67-数学函数

[64]: manual.md#68-输入输出库

[65]: manual.md#69-操作系统库

[66]: manual.md#610-调试库

[67]: manual.md#7

[68]: manual.md#8-与之前版本不兼容的地方

[69]: manual.md#8.1.1

[70]: manual.md#8.2.2

[71]: manual.md#8.3.3

[72]: manual.md#9-lua-的完整语法

[73]: manual.md#61-基础函数

[74]: manual.md#_g

[75]: manual.md#_version

[76]: manual.md#pdf-assert

[77]: manual.md#collectgarbage-opt--arg

[78]: manual.md#pdf-dofile

[79]: manual.md#error-message--level

[80]: manual.md#getmetatable-object

[81]: manual.md#<code>ipairs<code>

[82]: manual.md#load-chunk--chunkname--mode--env

[83]: manual.md#loadfile-filename--mode--env

[84]: manual.md#next-table--index

[85]: manual.md#pdf-pairs

[86]: manual.md#pcall-f--arg1-

[87]: manual.md#<code>print<code>

[88]: manual.md#pdf-rawequal

[89]: manual.md#rawget-table-index

[90]: manual.md#pdf-rawlen

[91]: manual.md#rawset-table-index-value

[92]: manual.md#require-modname

[93]: manual.md#pdf-select

[94]: manual.md#setmetatable-table-metatable

[95]: manual.md#pdf-tonumber

[96]: manual.md#tostring-v

[97]: manual.md#type-v

[98]: manual.md#xpcall-f-msgh--arg1-

[99]: manual.md#62-协程管理

[100]: manual.md#coroutinecreate-f

[101]: manual.md#pdf-coroutine.isyieldable.isyieldable

[102]: manual.md#coroutineresume-co--val1-

[103]: manual.md#pdf-coroutine.running.running

[104]: manual.md#pdf-coroutine.status.status

[105]: manual.md#coroutinewrap-f

[106]: manual.md#coroutineyield-

[107]: manual.md#610-调试库

[108]: manual.md#pdf-debug.debug.debug

[109]: manual.md#pdf-debug.gethook.gethook

[110]: manual.md#<code>debuggetinfo<code>.getinfo

[111]: manual.md#debuggetlocal-thread-f-local

[112]: manual.md#pdf-debug.getmetatable.getmetatable

[113]: manual.md#pdf-debug.getregistry.getregistry

[114]: manual.md#pdf-debug.getupvalue.getupvalue

[115]: manual.md#pdf-debug.getuservalue.getuservalue

[116]: manual.md#<code>debugsethook<code>.sethook

[117]: manual.md#pdf-debug.setlocal.setlocal

[118]: manual.md#pdf-debug.setmetatable.setmetatable

[119]: manual.md#pdf-debug.setupvalue.setupvalue

[120]: manual.md#pdf-debug.setuservalue.setuservalue

[121]: manual.md#pdf-debug.traceback.traceback

[122]: manual.md#pdf-debug.upvalueid.upvalueid

[123]: manual.md#pdf-debug.upvaluejoin.upvaluejoin

[124]: manual.md#68-输入输出库

[125]: manual.md#pdf-io.close.close

[126]: manual.md#<code>ioflush<code>.flush

[127]: manual.md#ioinput-file

[128]: manual.md#<code>iolines<code>.lines

[129]: manual.md#ioopen-filename--mode

[130]: manual.md#pdf-io.output.output

[131]: manual.md#iopopen-prog--mode

[132]: manual.md#<code>ioread<code>.read

[133]: manual.md#pdf-io.stderr.stderr

[134]: manual.md#pdf-io.stdin.stdin

[135]: manual.md#pdf-io.stdout.stdout

[136]: manual.md#<code>iotmpfile<code>.tmpfile

[137]: manual.md#pdf-io.type.type

[138]: manual.md#pdf-io.write.write

[139]: manual.md#<code>fileclose<code>:close

[140]: manual.md#pdf-file:flush:flush

[141]: manual.md#pdf-file:lines:lines

[142]: manual.md#pdf-file:read:read

[143]: manual.md#fileseek-whence--offset

[144]: manual.md#pdf-file:setvbuf:setvbuf

[145]: manual.md#pdf-file:write:write

[146]: manual.md#67-数学函数

[147]: manual.md#pdf-math.abs.abs

[148]: manual.md#pdf-math.acos.acos

[149]: manual.md#pdf-math.asin.asin

[150]: manual.md#pdf-math.atan.atan

[151]: manual.md#pdf-math.ceil.ceil

[152]: manual.md#pdf-math.cos.cos

[153]: manual.md#pdf-math.deg.deg

[154]: manual.md#pdf-math.exp.exp

[155]: manual.md#pdf-math.floor.floor

[156]: manual.md#pdf-math.fmod.fmod

[157]: manual.md#pdf-math.huge.huge

[158]: manual.md#pdf-math.log.log

[159]: manual.md#pdf-math.max.max

[160]: manual.md#pdf-math.maxinteger.maxinteger

[161]: manual.md#pdf-math.min.min

[162]: manual.md#pdf-math.mininteger.mininteger

[163]: manual.md#pdf-math.modf.modf

[164]: manual.md#pdf-math.pi.pi

[165]: manual.md#pdf-math.rad.rad

[166]: manual.md#pdf-math.random.random

[167]: manual.md#pdf-math.randomseed.randomseed

[168]: manual.md#pdf-math.sin.sin

[169]: manual.md#pdf-math.sqrt.sqrt

[170]: manual.md#pdf-math.tan.tan

[171]: manual.md#pdf-math.tointeger.tointeger

[172]: manual.md#pdf-math.type.type

[173]: manual.md#pdf-math.ult.ult

[174]: manual.md#69-操作系统库

[175]: manual.md#pdf-os.clock.clock

[176]: manual.md#<code>osdate<code>.date

[177]: manual.md#pdf-os.difftime.difftime

[178]: manual.md#osexecute-command

[179]: manual.md#<code>osexit<code>.exit

[180]: manual.md#pdf-os.getenv.getenv

[181]: manual.md#pdf-os.remove.remove

[182]: manual.md#osrename-oldname-newname

[183]: manual.md#pdf-os.setlocale.setlocale

[184]: manual.md#<code>ostime<code>.time

[185]: manual.md#pdf-os.tmpname.tmpname

[186]: manual.md#63-模块

[187]: manual.md#pdf-package.config.config

[188]: manual.md#packagecpath

[189]: manual.md#packageloaded

[190]: manual.md#pdf-package.loadlib.loadlib

[191]: manual.md#packagepath

[192]: manual.md#packagepreload

[193]: manual.md#packagesearchers

[194]: manual.md#packagesearchpath-name-path--sep--rep

[195]: manual.md#64-字符串处理

[196]: manual.md#pdf-string.byte.byte

[197]: manual.md#pdf-string.char.char

[198]: manual.md#stringdump-function--strip

[199]: manual.md#stringfind-s-pattern--init--plain

[200]: manual.md#stringformat-formatstring-

[201]: manual.md#stringmatch-s-pattern--init

[202]: manual.md#stringgsub-s-pattern-repl--n

[203]: manual.md#pdf-string.len.len

[204]: manual.md#pdf-string.lower.lower

[205]: manual.md#stringmatch-s-pattern--init

[206]: manual.md#stringpack-fmt-v1-v2-

[207]: manual.md#stringpacksize-fmt

[208]: manual.md#pdf-string.rep.rep

[209]: manual.md#pdf-string.reverse.reverse

[210]: manual.md#stringsub-s-i--j

[211]: manual.md#stringunpack-fmt-s--pos

[212]: manual.md#pdf-string.upper.upper

[213]: manual.md#66-表处理

[214]: manual.md#pdf-table.concat.concat

[215]: manual.md#pdf-table.insert.insert

[216]: manual.md#pdf-table.move.move

[217]: manual.md#pdf-table.pack.pack

[218]: manual.md#pdf-table.remove.remove

[219]: manual.md#tablesort-list--comp

[220]: manual.md#pdf-table.unpack.unpack

[221]: manual.md#65-utf-8-支持

[222]: manual.md#pdf-utf8.char.char

[223]: manual.md#pdf-utf8.charpattern.charpattern

[224]: manual.md#pdf-utf8.codepoint.codepoint

[225]: manual.md#pdf-utf8.codes.codes

[226]: manual.md#pdf-utf8.len.len

[227]: manual.md#pdf-utf8.offset.offset

[228]: manual.md#pdf-LUA_CPATH

[229]: manual.md#pdf-LUA_CPATH_5_3

[230]: manual.md#pdf-LUA_INIT

[231]: manual.md#pdf-LUA_INIT_5_3

[232]: manual.md#pdf-LUA_PATH

[233]: manual.md#pdf-LUA_PATH_5_3

[234]: manual.md#lua_Alloc

[235]: manual.md#lua_cfunction

[236]: manual.md#lua_debug

[237]: manual.md#lua_hook

[238]: manual.md#lua_integer

[239]: manual.md#lua_KContext

[240]: manual.md#lua_kfunction

[241]: manual.md#lua_number

[242]: manual.md#<code>lua_reader<code>

[243]: manual.md#lua_state

[244]: manual.md#lua_Unsigned

[245]: manual.md#lua_writer

[246]: manual.md#lua_absindex

[247]: manual.md#lua_arith

[248]: manual.md#lua_atpanic

[249]: manual.md#lua_call

[250]: manual.md#lua_callk

[251]: manual.md#lua_checkstack

[252]: manual.md#lua_close

[253]: manual.md#lua_compare

[254]: manual.md#lua_concat

[255]: manual.md#lua_copy

[256]: manual.md#lua_createtable

[257]: manual.md#lua_dump

[258]: manual.md#lua_error

[259]: manual.md#lua_gc

[260]: manual.md#lua_getallocf

[261]: manual.md#lua_getextraspace

[262]: manual.md#lua_getfield

[263]: manual.md#lua_getglobal

[264]: manual.md#lua_gethook

[265]: manual.md#lua_gethookcount

[266]: manual.md#lua_gethookmask

[267]: manual.md#lua_geti

[268]: manual.md#lua_getinfo

[269]: manual.md#lua_getlocal

[270]: manual.md#lua_getmetatable

[271]: manual.md#lua_getstack

[272]: manual.md#lua_gettable

[273]: manual.md#lua_gettop

[274]: manual.md#lua_getupvalue

[275]: manual.md#lua_getuservalue

[276]: manual.md#lua_insert

[277]: manual.md#lua_isboolean

[278]: manual.md#lua_iscfunction

[279]: manual.md#lua_isfunction

[280]: manual.md#lua_isinteger

[281]: manual.md#lua_islightuserdata

[282]: manual.md#lua_isnil

[283]: manual.md#lua_isnone

[284]: manual.md#lua_isnoneornil

[285]: manual.md#lua_isnumber

[286]: manual.md#lua_isstring

[287]: manual.md#lua_istable

[288]: manual.md#lua_isthread

[289]: manual.md#lua_isuserdata

[290]: manual.md#lua_isyieldable

[291]: manual.md#lua_len

[292]: manual.md#lua_load

[293]: manual.md#lua_newstate

[294]: manual.md#lua_newtable

[295]: manual.md#lua_newthread

[296]: manual.md#lua_newuserdata

[297]: manual.md#lua_next

[298]: manual.md#lua_numbertointeger

[299]: manual.md#lua_pcall

[300]: manual.md#lua_pcallk

[301]: manual.md#lua_pop

[302]: manual.md#lua_pushboolean

[303]: manual.md#lua_pushcclosure

[304]: manual.md#lua_pushcfunction

[305]: manual.md#lua_pushfstring

[306]: manual.md#lua_pushglobaltable

[307]: manual.md#lua_pushinteger

[308]: manual.md#lua_pushlightuserdata

[309]: manual.md#lua_pushliteral

[310]: manual.md#lua_pushlstring

[311]: manual.md#lua_pushnil

[312]: manual.md#lua_pushnumber

[313]: manual.md#lua_pushstring

[314]: manual.md#lua_pushthread

[315]: manual.md#lua_pushvalue

[316]: manual.md#lua_pushvfstring

[317]: manual.md#lua_rawequal

[318]: manual.md#lua_rawget

[319]: manual.md#lua_rawgeti

[320]: manual.md#lua_rawgetp

[321]: manual.md#lua_rawlen

[322]: manual.md#lua_rawset

[323]: manual.md#lua_rawseti

[324]: manual.md#lua_rawsetp

[325]: manual.md#lua_register

[326]: manual.md#lua_remove

[327]: manual.md#lua_replace

[328]: manual.md#lua_resume

[329]: manual.md#lua_rotate

[330]: manual.md#lua_setallocf

[331]: manual.md#lua_setfield

[332]: manual.md#lua_setglobal

[333]: manual.md#lua_sethook

[334]: manual.md#lua_seti

[335]: manual.md#lua_setlocal

[336]: manual.md#lua_setmetatable

[337]: manual.md#lua_settable

[338]: manual.md#lua_settop

[339]: manual.md#lua_setupvalue

[340]: manual.md#lua_setuservalue

[341]: manual.md#lua_status

[342]: manual.md#lua_stringtonumber

[343]: manual.md#lua_toboolean

[344]: manual.md#lua_tocfunction

[345]: manual.md#lua_tointeger

[346]: manual.md#lua_tointegerx

[347]: manual.md#lua_tolstring

[348]: manual.md#lua_tonumber

[349]: manual.md#lua_tonumberx

[350]: manual.md#lua_topointer

[351]: manual.md#lua_tostring

[352]: manual.md#lua_tothread

[353]: manual.md#lua_touserdata

[354]: manual.md#lua_type

[355]: manual.md#lua_typename

[356]: manual.md#lua_upvalueid

[357]: manual.md#lua_upvalueindex

[358]: manual.md#lua_upvaluejoin

[359]: manual.md#lua_version

[360]: manual.md#lua_xmove

[361]: manual.md#lua_yield

[362]: manual.md#lua_yieldk

[363]: manual.md#lual_buffer

[364]: manual.md#lual_reg

[365]: manual.md#luaL_Stream

[366]: manual.md#luaL_addchar

[367]: manual.md#luaL_addlstring

[368]: manual.md#lual_addsize

[369]: manual.md#luaL_addstring

[370]: manual.md#lual_addvalue

[371]: manual.md#luaL_argcheck

[372]: manual.md#lual_argerror

[373]: manual.md#lual_buffinit

[374]: manual.md#luaL_buffinitsize

[375]: manual.md#luaL_callmeta

[376]: manual.md#luaL_checkany

[377]: manual.md#luaL_checkinteger

[378]: manual.md#luaL_checklstring

[379]: manual.md#luaL_checknumber

[380]: manual.md#luaL_checkoption

[381]: manual.md#luaL_checkstack

[382]: manual.md#luaL_checkstring

[383]: manual.md#luaL_checktype

[384]: manual.md#lual_checkudata

[385]: manual.md#luaL_checkversion

[386]: manual.md#luaL_dofile

[387]: manual.md#luaL_dostring

[388]: manual.md#lual_error

[389]: manual.md#luaL_execresult

[390]: manual.md#luaL_fileresult

[391]: manual.md#luaL_getmetafield

[392]: manual.md#luaL_getmetatable

[393]: manual.md#luaL_getsubtable

[394]: manual.md#luaL_gsub

[395]: manual.md#luaL_len

[396]: manual.md#luaL_loadbuffer

[397]: manual.md#lual_loadbufferx

[398]: manual.md#luaL_loadfile

[399]: manual.md#lual_loadfilex

[400]: manual.md#luaL_loadstring

[401]: manual.md#lual_newlib

[402]: manual.md#luaL_newlibtable

[403]: manual.md#lual_newmetatable

[404]: manual.md#lual_newstate

[405]: manual.md#lual_openlibs

[406]: manual.md#luaL_optinteger

[407]: manual.md#luaL_optlstring

[408]: manual.md#luaL_optnumber

[409]: manual.md#luaL_optstring

[410]: manual.md#lual_prepbuffer

[411]: manual.md#lual_prepbuffsize

[412]: manual.md#lual_pushresult

[413]: manual.md#luaL_pushresultsize

[414]: manual.md#lual_ref

[415]: manual.md#lual_requiref

[416]: manual.md#lual_setfuncs

[417]: manual.md#luaL_setmetatable

[418]: manual.md#luaL_testudata

[419]: manual.md#luaL_tolstring

[420]: manual.md#luaL_traceback

[421]: manual.md#luaL_typename

[422]: manual.md#lual_unref

[423]: manual.md#luaL_where

[424]: manual.md#pdf-luaopen_base

[425]: manual.md#pdf-luaopen_coroutine

[426]: manual.md#pdf-luaopen_debug

[427]: manual.md#pdf-luaopen_io

[428]: manual.md#pdf-luaopen_math

[429]: manual.md#pdf-luaopen_os

[430]: manual.md#pdf-luaopen_package

[431]: manual.md#pdf-luaopen_string

[432]: manual.md#pdf-luaopen_table

[433]: manual.md#pdf-luaopen_utf8

[434]: manual.md#pdf-LUA_ERRERR

[435]: manual.md#pdf-LUA_ERRFILE

[436]: manual.md#<code>lua_errgcmm<code>

[437]: manual.md#<code>lua_errmem<code>

[438]: manual.md#pdf-LUA_ERRRUN

[439]: manual.md#pdf-LUA_ERRSYNTAX

[440]: manual.md#pdf-LUA_HOOKCALL

[441]: manual.md#pdf-LUA_HOOKCOUNT

[442]: manual.md#pdf-LUA_HOOKLINE

[443]: manual.md#pdf-LUA_HOOKRET

[444]: manual.md#pdf-LUA_HOOKTAILCALL

[445]: manual.md#pdf-LUA_MASKCALL

[446]: manual.md#pdf-LUA_MASKCOUNT

[447]: manual.md#pdf-LUA_MASKLINE

[448]: manual.md#pdf-LUA_MASKRET

[449]: manual.md#pdf-LUA_MAXINTEGER

[450]: manual.md#pdf-LUA_MININTEGER

[451]: manual.md#pdf-LUA_MINSTACK

[452]: manual.md#pdf-LUA_MULTRET

[453]: manual.md#<code>lua_noref<code>

[454]: manual.md#<code>lua_ok<code>

[455]: manual.md#pdf-LUA_OPADD

[456]: manual.md#pdf-LUA_OPBAND

[457]: manual.md#pdf-LUA_OPBNOT

[458]: manual.md#pdf-LUA_OPBOR

[459]: manual.md#pdf-LUA_OPBXOR

[460]: manual.md#pdf-LUA_OPDIV

[461]: manual.md#pdf-LUA_OPEQ

[462]: manual.md#pdf-LUA_OPIDIV

[463]: manual.md#pdf-LUA_OPLE

[464]: manual.md#pdf-LUA_OPLT

[465]: manual.md#pdf-LUA_OPMOD

[466]: manual.md#pdf-LUA_OPMUL

[467]: manual.md#pdf-LUA_OPPOW

[468]: manual.md#pdf-LUA_OPSHL

[469]: manual.md#pdf-LUA_OPSHR

[470]: manual.md#pdf-LUA_OPSUB

[471]: manual.md#pdf-LUA_OPUNM

[472]: manual.md#<code>lua_refnil<code>

[473]: manual.md#pdf-LUA_REGISTRYINDEX

[474]: manual.md#pdf-LUA_RIDX_GLOBALS

[475]: manual.md#pdf-LUA_RIDX_MAINTHREAD

[476]: manual.md#pdf-LUA_TBOOLEAN

[477]: manual.md#pdf-LUA_TFUNCTION

[478]: manual.md#pdf-LUA_TLIGHTUSERDATA

[479]: manual.md#pdf-LUA_TNIL

[480]: manual.md#pdf-LUA_TNONE

[481]: manual.md#pdf-LUA_TNUMBER

[482]: manual.md#pdf-LUA_TSTRING

[483]: manual.md#pdf-LUA_TTABLE

[484]: manual.md#pdf-LUA_TTHREAD

[485]: manual.md#pdf-LUA_TUSERDATA

[486]: manual.md#pdf-LUA_USE_APICHECK

[487]: manual.md#lua_yield

[488]: manual.md#pdf-LUAL_BUFFERSIZE
