# 如何在创建文件时自动生成命名空间

在 **Unity Editor** 创建脚本或者相关文件时里面都会有一些预设的内容

比方说 `MonoBehaviour`

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class NewMonoBehaviour : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }
}
```

但是唯独不会生成命名空间, 当然可以使用别的代码编辑器相关的工具去达成以上的目的, 但对于喜欢直接在 _Editor_ 下创建文件的小伙伴来说就显得不那么友好了

## 直接修改安装目录下的模板

这是因为在 _Editor_ 的安装目录 `％EDITOR_PATH％\Data\Resources\ScriptTemplates` 里面存在着一些模板

- Windows: `C:\Program Files\Unity\Editor\Data\Resources\ScriptTemplates`
- Mac: `/Applications/Unity/Editor/Data/Resources/ScriptTemplates`
- Linux: `/home/Unity/Editor/Data/Resources/ScriptTemplates`

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

    #ROOTNAMESPACEBEGIN#
public class #SCRIPTNAME# : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
        #NOTRIM#
    }

    // Update is called once per frame
    void Update()
    {
        #NOTRIM#
    }
}
#ROOTNAMESPACEEND#

```

当然你可以直接修改这个模板, 但这只能你自己使用, 这并不 **Unity**, 所以采用第二种方案直接在各自工程目录下创建合适项目的模板

## 在工程里面自定义

首先在 `Assets` 目录下创建一个文件夹, 命名为 `ScriptTemplates` 和在 `ScriptTemplates` 这个目录下再建立一个 `Editor`

```tree
Assets
└── ScriptTemplates
    └── Editor
```

PS: 其中 `Editor` 用来后续添加 **命名空间**

## 创建模板文件

然后依照既定的规则存放自己想要的模板文件

`优先级-菜单路径-默认名称.文件扩展名.txt`
对比:
`81-C# Script-NewBehaviourScript.cs.txt`
`84-Shader__Unlit Shader-NewUnlitShader.shader.txt`

- 优先级: 越低越靠上
- 菜单路径:
  - 单文件路径: `C# Script`
  - 目录路径: `Shader__Unlit Shader`, `__` 双下划线等同于 `/`
    - 你甚至可以 `Create Script__CSharp__Interface__WithoutNameSpace`
- 默认名称: 理解为 `PlaceHolder` 占位符
- 文件扩展名: 正常就`.cs`就是对应的文件扩展名, 但如果定义为`.lua.txt` 这种, 其中的 `.lua` 就会被理解为文件的文件名去了

像是这样

```tree
Assets
└── ScriptTemplates
    ├── 80-C# Interface-NewInterface.cs.txt
    ├── 80-C# Serializable Class-NewScript.cs.txt
    ├── 81-C# Script-NewBehaviourScript.cs.txt
    ├── 99-Lua View Controller-NewViewController.lua.txt.txt
    └── Editor
        └── ScriptTemplateFixer.cs
```

## 添加模板内容

我们这里创建一个简单的可以自动生成命名空间的模板

```csharp
using UnityEngine;

namespace #NAMESPACE#
{
    public class #SCRIPTNAME# : MonoBehaviour
    {
        #NOTRIM#
    }
}
```

- `#SCRIPTNAME#` : 为创建时, 重命名默认名称时输入的文件名

  - `#SCRIPTNAME_LOWER#` : 名称的第一个字母更改为小写

- `#NOTRIM#` : 确保不删除空格，因此脚本始终包含方括号之间的那一行
- `#NAME#` : 它与 `#SCRIPTNAME#` 没有什么不同, 只不过适用于着色器模板

> 关于这些关键字的文档我没找到, 如有了解的大佬, 还望告知!

## 重启 **Unity** 激活模板文件

在对应的目录下右键创建文件

```csharp
using UnityEngine;

namespace #NAMESPACE#
{
    public class NewBehaviourScript : MonoBehaviour
    {

    }
}
```

此时报错是因为 `#NAMESPACE#` 不在 **Unity** 的默认关键字当中, 需要我们自己手动处理.

## 自定义修复工具

在之前的建立好 _Editor_ 目录下创建 `ScriptTemplateFixer` 脚本. 继承自 `UnityEditor.AssetModificationProcessor` 并实现 `OnWillCreateAsset` 方法.

```csharp

using System.Net.Mime;
using System.Linq;
using System;
using System.IO;
using UnityEditor;

// ReSharper disable once CheckNamespace
public class ScriptTemplateFixer : UnityEditor.AssetModificationProcessor
{
    public static void OnWillCreateAsset(string metaFilePath)
    {
        // 获取文件路径
        var filePath = metaFilePath.Replace(".meta", "");

        // 获取文件后缀
        switch (Path.GetExtension(filePath))
        {
            case ".cs": AddNameSpace(filePath); break;
            case ".txt":
                {
                    var fileName = Path.GetFileNameWithoutExtension(filePath);
                    // 如果是以 .lua.txt 结尾的话需要删除文件内的 .lua

                    if (Path.GetExtension(fileName) == ".lua")
                    {
                        RemoveDotLua(filePath);
                    }

                    break;
                }
            default: break;
        }
    }


    /// <summary>
    /// 添加命名空间
    /// </summary>
    /// <param name="filePath"></param>
    public static void AddNameSpace(string filePath)
    {

        // 获取目录路径 基于Assets/...
        var path = Path.GetDirectoryName(filePath);
        // 获取所有的目录
        var names = path.Split(Path.DirectorySeparatorChar).ToList();
        // 倒序遍历删除不需要的文件目录
        for (int index = names.Count - 1; index >= 0; index--)
        {
            var name = names[index];
            if (name == "Assets" || name == "Scripts")
            {
                names.RemoveAt(index);
                continue;
            }
            // 去掉文件可能的空格
            names[index] = name.Replace(" ", "");
        }
        if (names.Count == 0)
        {
            // 设置默认名
            names.Add(PlayerSettings.productName);
        }
        // 得到命名空间之后替换
        var nameSpace = string.Join('.', names);
        var fileContents = File.ReadAllText(Path.Combine(Environment.CurrentDirectory, filePath));

        File.WriteAllText(filePath, fileContents.Replace("#NAMESPACE#", nameSpace));
        AssetDatabase.Refresh();
    }

    /// <summary>
    /// 移除名称中 .lua 后缀
    /// </summary>
    /// <param name="filePath"></param>
    public static void RemoveDotLua(string filePath)
    {
        var fileContents = File.ReadAllText(Path.Combine(Environment.CurrentDirectory, filePath));
        File.WriteAllText(filePath, fileContents.Replace(".lua", ""));
    }
}

```

<script src="https://gist.github.com/danyow/559cd832322780a7d94bd09a2a87419f.js"></script>

[最新更新位置](https://gist.github.com/danyow/559cd832322780a7d94bd09a2a87419f)
