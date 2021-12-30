---
sidebar_position: 2
---

# 概览

这份参考手册是对 Lua 语言的官方定义。 关于 Lua 编程的全部细节，则放在 [Programming in Lua][1] 这本书中。

[开始][2] · [目录][3] · [索引][4] · [中英术语对照表][5]

---

[Lua.org][6], PUC-Rio 版权所有 © 2015 ， 在遵循 [Lua license][7] 条款下，可自由使用。

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

|         _[表][213]_          |      [数学][146]       |      [基础][73]      |   [输入输出][124]   |     [字符串][195]      |        [调试][107]        |   [操作系统][174]   |         [包][186]         |          [协程][99]          |
| :--------------------------: | :--------------------: | :------------------: | :-----------------: | :--------------------: | :-----------------------: | :-----------------: | :-----------------------: | :--------------------------: |
|     [table.concat][214]      |    [math.abs][147]     |      [\_G][74]       |   [io.close][125]   |   [string.byte][196]   |    [debug.debug][108]     |   [os.clock][175]   |   [package.config][187]   |   [coroutine.create][100]    |
|     [table.insert][215]      |    [math.acos][148]    |   [\_VERSION][75]    |   [io.flush][126]   |   [string.char][197]   |   [debug.gethook][109]    |   [os.date][176]    |   [package.cpath][188]    | [coroutine.isyieldable][101] |
|      [table.move][216]       |    [math.asin][149]    |     [assert][76]     |   [io.input][127]   |   [string.dump][198]   |   [debug.getinfo][110]    | [os.difftime][177]  |   [package.loaded][189]   |   [coroutine.resume][102]    |
|      [table.pack][217]       |    [math.atan][150]    | [collectgarbage][77] |   [io.lines][128]   |   [string.find][199]   |   [debug.getlocal][111]   |  [os.execute][178]  |  [package.loadlib][190]   |   [coroutine.running][103]   |
|     [table.remove][218]      |    [math.ceil][151]    |     [dofile][78]     |   [io.open][129]    |  [string.format][200]  | [debug.getmetatable][112] |   [os.exit][179]    |    [package.path][191]    |   [coroutine.status][104]    |
|      [table.sort][219]       |    [math.cos][152]     |     [error][79]      |  [io.output][130]   |  [string.gmatch][201]  | [debug.getregistry][113]  |  [os.getenv][180]   |  [package.preload][192]   |    [coroutine.wrap][105]     |
|     [table.unpack][220]      |    [math.deg][153]     |  [getmetatable][80]  |   [io.popen][131]   |   [string.gsub][202]   |  [debug.getupvalue][114]  |  [os.remove][181]   | [package.searchers][193]  |    [coroutine.yield][106]    |
|         [utf8][221]          |    [math.exp][154]     |     [ipairs][81]     |   [io.read][132]    |   [string.len][203]    | [debug.getuservalue][115] |  [os.rename][182]   | [package.searchpath][194] |
|       [utf8.char][222]       |   [math.floor][155]    |      [load][82]      |  [io.stderr][133]   |  [string.lower][204]   |   [debug.sethook][116]    | [os.setlocale][183] |
|   [utf8.charpattern][223]    |    [math.fmod][156]    |    [loadfile][83]    |   [io.stdin][134]   |  [string.match][205]   |   [debug.setlocal][117]   |   [os.time][184]    |
|    [utf8.codepoint][224]     |    [math.huge][157]    |      [next][84]      |  [io.stdout][135]   |   [string.pack][206]   | [debug.setmetatable][118] |  [os.tmpname][185]  |
|      [utf8.codes][225]       |    [math.log][158]     |     [pairs][85]      |  [io.tmpfile][136]  | [string.packsize][207] |  [debug.setupvalue][119]  |
|       [utf8.len][226]        |    [math.max][159]     |     [pcall][86]      |   [io.type][137]    |   [string.rep][208]    | [debug.setuservalue][120] |
|      [utf8.offset][227]      | [math.maxinteger][160] |     [print][87]      |   [io.write][138]   | [string.reverse][209]  |  [debug.traceback][121]   |
|       [LUA_CPATH][228]       |    [math.min][161]     |    [rawequal][88]    |  [file:close][139]  |   [string.sub][210]    |  [debug.upvalueid][122]   |
|     [LUA_CPATH_5_3][229]     | [math.mininteger][162] |     [rawget][89]     |  [file:flush][140]  |  [string.unpack][211]  | [debug.upvaluejoin][123]  |
|       [LUA_INIT][230]        |    [math.modf][163]    |     [rawlen][90]     |  [file:lines][141]  |  [string.upper][212]   |
|     [LUA_INIT_5_3][231]      |     [math.pi][164]     |     [rawset][91]     |  [file:read][142]   |
|       [LUA_PATH][232]        |    [math.rad][165]     |    [require][92]     |  [file:seek][143]   |
|     [LUA_PATH_5_3][233]      |   [math.random][166]   |     [select][93]     | [file:setvbuf][144] |
|       [lua_Alloc][234]       | [math.randomseed][167] |  [setmetatable][94]  |  [file:write][145]  |
|     [lua_CFunction][235]     |    [math.sin][168]     |    [tonumber][95]    |
|       [lua_Debug][236]       |    [math.sqrt][169]    |    [tostring][96]    |
|       [lua_Hook][237]        |    [math.tan][170]     |      [type][97]      |
|      [lua_Integer][238]      | [math.tointeger][171]  |     [xpcall][98]     |
|     [lua_KContext][239]      |    [math.type][172]    |
|     [lua_KFunction][240]     |    [math.ult][173]     |
|      [lua_Number][241]       |
|      [lua_Reader][242]       |
|       [lua_State][243]       |
|     [lua_Unsigned][244]      |
|      [lua_Writer][245]       |
|     [lua_absindex][246]      |
|       [lua_arith][247]       |
|      [lua_atpanic][248]      |
|       [lua_call][249]        |
|       [lua_callk][250]       |
|    [lua_checkstack][251]     |
|       [lua_close][252]       |
|      [lua_compare][253]      |
|      [lua_concat][254]       |
|       [lua_copy][255]        |
|    [lua_createtable][256]    |
|       [lua_dump][257]        |
|       [lua_error][258]       |
|        [lua_gc][259]         |
|     [lua_getallocf][260]     |
|   [lua_getextraspace][261]   |
|     [lua_getfield][262]      |
|     [lua_getglobal][263]     |
|      [lua_gethook][264]      |
|   [lua_gethookcount][265]    |
|    [lua_gethookmask][266]    |
|       [lua_geti][267]        |
|      [lua_getinfo][268]      |
|     [lua_getlocal][269]      |
|   [lua_getmetatable][270]    |
|     [lua_getstack][271]      |
|     [lua_gettable][272]      |
|      [lua_gettop][273]       |
|    [lua_getupvalue][274]     |
|   [lua_getuservalue][275]    |
|      [lua_insert][276]       |
|     [lua_isboolean][277]     |
|    [lua_iscfunction][278]    |
|    [lua_isfunction][279]     |
|     [lua_isinteger][280]     |
|  [lua_islightuserdata][281]  |
|       [lua_isnil][282]       |
|      [lua_isnone][283]       |
|    [lua_isnoneornil][284]    |
|     [lua_isnumber][285]      |
|     [lua_isstring][286]      |
|      [lua_istable][287]      |
|     [lua_isthread][288]      |
|    [lua_isuserdata][289]     |
|    [lua_isyieldable][290]    |
|        [lua_len][291]        |
|       [lua_load][292]        |
|     [lua_newstate][293]      |
|     [lua_newtable][294]      |
|     [lua_newthread][295]     |
|    [lua_newuserdata][296]    |
|       [lua_next][297]        |
|  [lua_numbertointeger][298]  |
|       [lua_pcall][299]       |
|      [lua_pcallk][300]       |
|        [lua_pop][301]        |
|    [lua_pushboolean][302]    |
|   [lua_pushcclosure][303]    |
|   [lua_pushcfunction][304]   |
|    [lua_pushfstring][305]    |
|  [lua_pushglobaltable][306]  |
|    [lua_pushinteger][307]    |
| [lua_pushlightuserdata][308] |
|    [lua_pushliteral][309]    |
|    [lua_pushlstring][310]    |
|      [lua_pushnil][311]      |
|    [lua_pushnumber][312]     |
|    [lua_pushstring][313]     |
|    [lua_pushthread][314]     |
|     [lua_pushvalue][315]     |
|   [lua_pushvfstring][316]    |
|     [lua_rawequal][317]      |
|      [lua_rawget][318]       |
|      [lua_rawgeti][319]      |
|      [lua_rawgetp][320]      |
|      [lua_rawlen][321]       |
|      [lua_rawset][322]       |
|      [lua_rawseti][323]      |
|      [lua_rawsetp][324]      |
|     [lua_register][325]      |
|      [lua_remove][326]       |
|      [lua_replace][327]      |
|      [lua_resume][328]       |
|      [lua_rotate][329]       |
|     [lua_setallocf][330]     |
|     [lua_setfield][331]      |
|     [lua_setglobal][332]     |
|      [lua_sethook][333]      |
|       [lua_seti][334]        |
|     [lua_setlocal][335]      |
|   [lua_setmetatable][336]    |
|     [lua_settable][337]      |
|      [lua_settop][338]       |
|    [lua_setupvalue][339]     |
|   [lua_setuservalue][340]    |
|      [lua_status][341]       |
|  [lua_stringtonumber][342]   |
|     [lua_toboolean][343]     |
|    [lua_tocfunction][344]    |
|     [lua_tointeger][345]     |
|    [lua_tointegerx][346]     |
|     [lua_tolstring][347]     |
|     [lua_tonumber][348]      |
|     [lua_tonumberx][349]     |
|     [lua_topointer][350]     |
|     [lua_tostring][351]      |
|     [lua_tothread][352]      |
|    [lua_touserdata][353]     |
|       [lua_type][354]        |
|     [lua_typename][355]      |
|     [lua_upvalueid][356]     |
|   [lua_upvalueindex][357]    |
|    [lua_upvaluejoin][358]    |
|      [lua_version][359]      |
|       [lua_xmove][360]       |
|       [lua_yield][361]       |
|      [lua_yieldk][362]       |
|      [luaL_Buffer][363]      |
|       [luaL_Reg][364]        |
|      [luaL_Stream][365]      |
|     [luaL_addchar][366]      |
|    [luaL_addlstring][367]    |
|     [luaL_addsize][368]      |
|    [luaL_addstring][369]     |
|     [luaL_addvalue][370]     |
|     [luaL_argcheck][371]     |
|     [luaL_argerror][372]     |
|     [luaL_buffinit][373]     |
|   [luaL_buffinitsize][374]   |
|     [luaL_callmeta][375]     |
|     [luaL_checkany][376]     |
|   [luaL_checkinteger][377]   |
|   [luaL_checklstring][378]   |
|   [luaL_checknumber][379]    |
|   [luaL_checkoption][380]    |
|    [luaL_checkstack][381]    |
|   [luaL_checkstring][382]    |
|    [luaL_checktype][383]     |
|    [luaL_checkudata][384]    |
|   [luaL_checkversion][385]   |
|      [luaL_dofile][386]      |
|     [luaL_dostring][387]     |
|      [luaL_error][388]       |
|    [luaL_execresult][389]    |
|    [luaL_fileresult][390]    |
|   [luaL_getmetafield][391]   |
|   [luaL_getmetatable][392]   |
|   [luaL_getsubtable][393]    |
|       [luaL_gsub][394]       |
|       [luaL_len][395]        |
|    [luaL_loadbuffer][396]    |
|   [luaL_loadbufferx][397]    |
|     [luaL_loadfile][398]     |
|    [luaL_loadfilex][399]     |
|    [luaL_loadstring][400]    |
|      [luaL_newlib][401]      |
|   [luaL_newlibtable][402]    |
|   [luaL_newmetatable][403]   |
|     [luaL_newstate][404]     |
|     [luaL_openlibs][405]     |
|    [luaL_optinteger][406]    |
|    [luaL_optlstring][407]    |
|    [luaL_optnumber][408]     |
|    [luaL_optstring][409]     |
|    [luaL_prepbuffer][410]    |
|   [luaL_prepbuffsize][411]   |
|    [luaL_pushresult][412]    |
|  [luaL_pushresultsize][413]  |
|       [luaL_ref][414]        |
|     [luaL_requiref][415]     |
|     [luaL_setfuncs][416]     |
|   [luaL_setmetatable][417]   |
|    [luaL_testudata][418]     |
|    [luaL_tolstring][419]     |
|    [luaL_traceback][420]     |
|     [luaL_typename][421]     |
|      [luaL_unref][422]       |
|      [luaL_where][423]       |
|     [luaopen_base][424]      |
|   [luaopen_coroutine][425]   |
|     [luaopen_debug][426]     |
|      [luaopen_io][427]       |
|     [luaopen_math][428]      |
|      [luaopen_os][429]       |
|    [luaopen_package][430]    |
|    [luaopen_string][431]     |
|     [luaopen_table][432]     |
|     [luaopen_utf8][433]      |
|      [LUA_ERRERR][434]       |
|      [LUA_ERRFILE][435]      |
|      [LUA_ERRGCMM][436]      |
|      [LUA_ERRMEM][437]       |
|      [LUA_ERRRUN][438]       |
|     [LUA_ERRSYNTAX][439]     |
|     [LUA_HOOKCALL][440]      |
|     [LUA_HOOKCOUNT][441]     |
|     [LUA_HOOKLINE][442]      |
|      [LUA_HOOKRET][443]      |
|   [LUA_HOOKTAILCALL][444]    |
|     [LUA_MASKCALL][445]      |
|     [LUA_MASKCOUNT][446]     |
|     [LUA_MASKLINE][447]      |
|      [LUA_MASKRET][448]      |
|    [LUA_MAXINTEGER][449]     |
|    [LUA_MININTEGER][450]     |
|     [LUA_MINSTACK][451]      |
|      [LUA_MULTRET][452]      |
|       [LUA_NOREF][453]       |
|        [LUA_OK][454]         |
|       [LUA_OPADD][455]       |
|      [LUA_OPBAND][456]       |
|      [LUA_OPBNOT][457]       |
|       [LUA_OPBOR][458]       |
|      [LUA_OPBXOR][459]       |
|       [LUA_OPDIV][460]       |
|       [LUA_OPEQ][461]        |
|      [LUA_OPIDIV][462]       |
|       [LUA_OPLE][463]        |
|       [LUA_OPLT][464]        |
|       [LUA_OPMOD][465]       |
|       [LUA_OPMUL][466]       |
|       [LUA_OPPOW][467]       |
|       [LUA_OPSHL][468]       |
|       [LUA_OPSHR][469]       |
|       [LUA_OPSUB][470]       |
|       [LUA_OPUNM][471]       |
|      [LUA_REFNIL][472]       |
|   [LUA_REGISTRYINDEX][473]   |
|   [LUA_RIDX_GLOBALS][474]    |
|  [LUA_RIDX_MAINTHREAD][475]  |
|     [LUA_TBOOLEAN][476]      |
|     [LUA_TFUNCTION][477]     |
|  [LUA_TLIGHTUSERDATA][478]   |
|       [LUA_TNIL][479]        |
|       [LUA_TNONE][480]       |
|      [LUA_TNUMBER][481]      |
|      [LUA_TSTRING][482]      |
|      [LUA_TTABLE][483]       |
|      [LUA_TTHREAD][484]      |
|     [LUA_TUSERDATA][485]     |
|   [LUA_USE_APICHECK][486]    |
|       [LUA_YIELD][487]       |
|    [LUAL_BUFFERSIZE][488]    |

---

最后更新时间： 2015 年 1 月 18 日 19:49

[1]: http://www.lua.org/pil/
[2]: manual.md
[3]: #目录
[4]: #概览
[5]: glossary.md
[6]: http://Lua.org
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
[73]: manual.md#6.1
[74]: manual.md#_g
[75]: manual.md#_version
[76]: manual.md#assert-v--message
[77]: manual.md#collectgarbage-opt--arg
[78]: manual.md#dofile-filename
[79]: manual.md#error-message--level
[80]: manual.md#getmetatable-object
[81]: manual.md#ipairs-t
[82]: manual.md#load-chunk--chunkname--mode--env
[83]: manual.md#loadfile-filename--mode--env
[84]: manual.md#next-table--index
[85]: manual.md#pairs-t
[86]: manual.md#pcall-f--arg1-
[87]: manual.md#print-
[88]: manual.md#rawequal-v1-v2
[89]: manual.md#rawget-table-index
[90]: manual.md#rawlen-v
[91]: manual.md#rawset-table-index-value
[92]: manual.md#require-modname
[93]: manual.md#select-index-
[94]: manual.md#setmetatable-table-metatable
[95]: manual.md#tonumber-e--base
[96]: manual.md#tostring-v
[97]: manual.md#type-v
[98]: manual.md#xpcall-f-msgh--arg1-
[99]: manual.md#6.2
[100]: manual.md#coroutinecreate-f
[101]: manual.md#coroutineisyieldable-
[102]: manual.md#coroutineresume-co--val1-
[103]: manual.md#coroutinerunning-
[104]: manual.md#coroutinestatus-co
[105]: manual.md#coroutinewrap-f
[106]: manual.md#coroutineyield-
[107]: manual.md#6.10
[108]: manual.md#debugdebug-
[109]: manual.md#debuggethook-thread
[110]: manual.md#debuggetinfo-thread-f--what
[111]: manual.md#debuggetlocal-thread-f-local
[112]: manual.md#debuggetmetatable-value
[113]: manual.md#debuggetregistry-
[114]: manual.md#debuggetupvalue-f-up
[115]: manual.md#debuggetuservalue-u
[116]: manual.md#debugsethook-thread-hook-mask--count
[117]: manual.md#debugsetlocal-thread-level-local-value
[118]: manual.md#debugsetmetatable-value-table
[119]: manual.md#debugsetupvalue-f-up-value
[120]: manual.md#debugsetuservalue-udata-value
[121]: manual.md#debugtraceback-thread-message--level
[122]: manual.md#debugupvalueid-f-n
[123]: manual.md#debugupvaluejoin-f1-n1-f2-n2
[124]: manual.md#6.8
[125]: manual.md#ioclose-file
[126]: manual.md#ioflush-
[127]: manual.md#ioinput-file
[128]: manual.md#iolines-filename-
[129]: manual.md#ioopen-filename--mode
[130]: manual.md#iooutput-file
[131]: manual.md#iopopen-prog--mode
[132]: manual.md#ioread-
[133]: manual.md#68-输入输出库
[134]: manual.md#68-输入输出库
[135]: manual.md#68-输入输出库
[136]: manual.md#iotmpfile-
[137]: manual.md#iotype-obj
[138]: manual.md#iowrite-
[139]: manual.md#fileclose-
[140]: manual.md#fileflush-
[141]: manual.md#filelines-
[142]: manual.md#fileread-
[143]: manual.md#fileseek-whence--offset
[144]: manual.md#filesetvbuf-mode--size
[145]: manual.md#filewrite-
[146]: manual.md#6.7
[147]: manual.md#mathabs-x
[148]: manual.md#mathacos-x
[149]: manual.md#mathasin-x
[150]: manual.md#mathatan-y--x
[151]: manual.md#mathceil-x
[152]: manual.md#mathcos-x
[153]: manual.md#mathdeg-x
[154]: manual.md#mathexp-x
[155]: manual.md#mathfloor-x
[156]: manual.md#mathfmod-x-y
[157]: manual.md#mathhuge
[158]: manual.md#mathlog-x--base
[159]: manual.md#mathmax-x-
[160]: manual.md#mathmaxinteger
[161]: manual.md#mathmin-x-
[162]: manual.md#mathmininteger
[163]: manual.md#mathmodf-x
[164]: manual.md#mathpi
[165]: manual.md#mathrad-x
[166]: manual.md#mathrandom-m--n
[167]: manual.md#mathrandomseed-x
[168]: manual.md#mathsin-x
[169]: manual.md#mathsqrt-x
[170]: manual.md#mathtan-x
[171]: manual.md#mathtointeger-x
[172]: manual.md#mathtype-x
[173]: manual.md#mathult-m-n
[174]: manual.md#6.9
[175]: manual.md#osclock-
[176]: manual.md#osdate-format--time
[177]: manual.md#osdifftime-t2-t1
[178]: manual.md#osexecute-command
[179]: manual.md#osexit-code--close
[180]: manual.md#osgetenv-varname
[181]: manual.md#osremove-filename
[182]: manual.md#osrename-oldname-newname
[183]: manual.md#ossetlocale-locale--category
[184]: manual.md#ostime-table
[185]: manual.md#ostmpname-
[186]: manual.md#6.3
[187]: manual.md#packageconfig
[188]: manual.md#packagecpath
[189]: manual.md#packageloaded
[190]: manual.md#packageloadlib-libname-funcname
[191]: manual.md#packagepath
[192]: manual.md#packagepreload
[193]: manual.md#packagesearchers
[194]: manual.md#packagesearchpath-name-path--sep--rep
[195]: manual.md#6.4
[196]: manual.md#stringbyte-s--i--j
[197]: manual.md#stringchar-
[198]: manual.md#stringdump-function--strip
[199]: manual.md#stringfind-s-pattern--init--plain
[200]: manual.md#stringformat-formatstring-
[201]: manual.md#stringgmatch-s-pattern
[202]: manual.md#stringgsub-s-pattern-repl--n
[203]: manual.md#stringlen-s
[204]: manual.md#stringlower-s
[205]: manual.md#stringmatch-s-pattern--init
[206]: manual.md#stringpack-fmt-v1-v2-
[207]: manual.md#stringpacksize-fmt
[208]: manual.md#stringrep-s-n--sep
[209]: manual.md#stringreverse-s
[210]: manual.md#stringsub-s-i--j
[211]: manual.md#stringunpack-fmt-s--pos
[212]: manual.md#stringupper-s
[213]: manual.md#6.6
[214]: manual.md#tableconcat-list--sep--i--j
[215]: manual.md#tableinsert-list-pos-value
[216]: manual.md#tablemove-a1-f-e-t-a2
[217]: manual.md#tablepack-
[218]: manual.md#tableremove-list--pos
[219]: manual.md#tablesort-list--comp
[220]: manual.md#tableunpack-list--i--j
[221]: manual.md#6.5
[222]: manual.md#utf8char-
[223]: manual.md#utf8charpattern
[224]: manual.md#utf8codepoint-s--i--j
[225]: manual.md#utf8codes-s
[226]: manual.md#utf8len-s--i--j
[227]: manual.md#utf8offset-s-n--i
[228]: manual.md#7-独立版-lua
[229]: manual.md#7-独立版-lua
[230]: manual.md#7-独立版-lua
[231]: manual.md#7-独立版-lua
[232]: manual.md#7-独立版-lua
[233]: manual.md#7-独立版-lua
[234]: manual.md#lua_Alloc
[235]: manual.md#lua_CFunction
[236]: manual.md#lua_Debug
[237]: manual.md#lua_Hook
[238]: manual.md#lua_Integer
[239]: manual.md#lua_KContext
[240]: manual.md#lua_KFunction
[241]: manual.md#lua_Number
[242]: manual.md#lua_Reader
[243]: manual.md#lua_State
[244]: manual.md#lua_Unsigned
[245]: manual.md#lua_Writer
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
[363]: manual.md#luaL_Buffer
[364]: manual.md#luaL_Reg
[365]: manual.md#luaL_Stream
[366]: manual.md#luaL_addchar
[367]: manual.md#luaL_addlstring
[368]: manual.md#luaL_addsize
[369]: manual.md#luaL_addstring
[370]: manual.md#luaL_addvalue
[371]: manual.md#luaL_argcheck
[372]: manual.md#luaL_argerror
[373]: manual.md#luaL_buffinit
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
[384]: manual.md#luaL_checkudata
[385]: manual.md#luaL_checkversion
[386]: manual.md#luaL_dofile
[387]: manual.md#luaL_dostring
[388]: manual.md#luaL_error
[389]: manual.md#luaL_execresult
[390]: manual.md#luaL_fileresult
[391]: manual.md#luaL_getmetafield
[392]: manual.md#luaL_getmetatable
[393]: manual.md#luaL_getsubtable
[394]: manual.md#luaL_gsub
[395]: manual.md#luaL_len
[396]: manual.md#luaL_loadbuffer
[397]: manual.md#luaL_loadbufferx
[398]: manual.md#luaL_loadfile
[399]: manual.md#luaL_loadfilex
[400]: manual.md#luaL_loadstring
[401]: manual.md#luaL_newlib
[402]: manual.md#luaL_newlibtable
[403]: manual.md#luaL_newmetatable
[404]: manual.md#luaL_newstate
[405]: manual.md#luaL_openlibs
[406]: manual.md#luaL_optinteger
[407]: manual.md#luaL_optlstring
[408]: manual.md#luaL_optnumber
[409]: manual.md#luaL_optstring
[410]: manual.md#luaL_prepbuffer
[411]: manual.md#luaL_prepbuffsize
[412]: manual.md#luaL_pushresult
[413]: manual.md#luaL_pushresultsize
[414]: manual.md#luaL_ref
[415]: manual.md#luaL_requiref
[416]: manual.md#luaL_setfuncs
[417]: manual.md#luaL_setmetatable
[418]: manual.md#luaL_testudata
[419]: manual.md#luaL_tolstring
[420]: manual.md#luaL_traceback
[421]: manual.md#luaL_typename
[422]: manual.md#luaL_unref
[423]: manual.md#luaL_where
[424]: manual.md#6-标准库
[425]: manual.md#6-标准库
[426]: manual.md#6-标准库
[427]: manual.md#6-标准库
[428]: manual.md#6-标准库
[429]: manual.md#6-标准库
[430]: manual.md#6-标准库
[431]: manual.md#6-标准库
[432]: manual.md#6-标准库
[433]: manual.md#6-标准库
[434]: manual.md#lua_pcall
[435]: manual.md#lual_loadfilex
[436]: manual.md#lua_pcall
[437]: manual.md#lua_pcall
[438]: manual.md#lua_pcall
[439]: manual.md#lua_load
[440]: manual.md#lua_hook
[441]: manual.md#lua_hook
[442]: manual.md#lua_hook
[443]: manual.md#lua_hook
[444]: manual.md#lua_hook
[445]: manual.md#lua_sethook
[446]: manual.md#lua_sethook
[447]: manual.md#lua_sethook
[448]: manual.md#lua_sethook
[449]: manual.md#lua_integer
[450]: manual.md#lua_integer
[451]: manual.md#42-栈大小
[452]: manual.md#lua_call
[453]: manual.md#lual_ref
[454]: manual.md#lua_load
[455]: manual.md#lua_arith
[456]: manual.md#lua_arith
[457]: manual.md#lua_arith
[458]: manual.md#lua_arith
[459]: manual.md#lua_arith
[460]: manual.md#lua_arith
[461]: manual.md#lua_arith
[462]: manual.md#lua_arith
[463]: manual.md#lua_arith
[464]: manual.md#lua_arith
[465]: manual.md#lua_arith
[466]: manual.md#lua_arith
[467]: manual.md#lua_arith
[468]: manual.md#lua_arith
[469]: manual.md#lua_arith
[470]: manual.md#lua_arith
[471]: manual.md#lua_arith
[472]: manual.md#lual_ref
[473]: manual.md#45-注册表
[474]: manual.md#45-注册表
[475]: manual.md#45-注册表
[476]: manual.md#lua_type
[477]: manual.md#lua_type
[478]: manual.md#lua_type
[479]: manual.md#lua_type
[480]: manual.md#lua_type
[481]: manual.md#lua_type
[482]: manual.md#lua_type
[483]: manual.md#lua_type
[484]: manual.md#lua_type
[485]: manual.md#lua_type
[486]: manual.md#4-编程接口
[487]: manual.md#47-c-中的让出处理
[488]: manual.md#lual_prepbuffer
