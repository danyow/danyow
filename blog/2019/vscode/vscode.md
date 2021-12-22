---
layout: post
title: 'mac VSCode报错'
categories: 笔记
comments: true
date: 2019-06-19 22:20:03 +0800
published: true
---

Title: *mac VSCode* 更新失败，提示 *Permission denied* 解决办法

## 1. 针对右下提示如下

```error
Could not create temporary directory: Permission denied
```

### 解决办法

1. 完全关闭 *VSCode*
2. 终端输入

    ```shell
    sudo chown -R $USER ~/Library/Caches/com.microsoft.VSCode.ShipIt/
    xattr -dr com.apple.quarantine /Applications/Visual\ Studio\ Code.app
    ```

3. 完成

## 多去 *[VSCode][Github]* 底下的提交问题

[原issues地址][Issues]
[Github地址][Github]

[Github]:https://github.com/microsoft/vscode
[Issues]:https://github.com/Microsoft/vscode/issues/7426