---
layout: post
title: 'fullstack开源库'
categories: Github
comments: true
date: 2019-06-10 20:10:20 +0800
published: true
---

Title: 大致就是项目做完没给钱，然后就开源了。

Github：[fullstack][fullstack]
提交是 *586fe8bea5d5a12406253994bb848c257109eb15*

## 大致步骤

1. 首先准备本地环境
   1. 安装 node 环境 `brew install node`
   2. 安装 yarn `brew install yarn`
2. 去准备 api 参数
   1. 先去谷歌云平台 [Google Cloud Platform][google_cloud] 里面创建一个凭据，在 *API和服务* 里面的 *凭据*, 这时候会获得一个密钥，将其记作 **GOOGLE_MAPS_KEY**。
   2. 然后到 *API和服务* 里面的 *库*，找的地图类别中的 *Places API*，将其启用，谷歌这边就算是完成了。
   3. 然后到 [PLAID][plaid] 上注册账号，这个网站应该是专门获取银行账户内信息的一个聚合平台。完成后找到 `Node.js` 选项，下面会有对应的信息

        ```json
        {
            "ACCOUNTS_SECRET": "secret",
            "PLAID_CLIENT_ID": "xxxxxxxxxxxxxxxxxxxx",
            "PLAID_SECRET": "xxxxxxxxxxxxxxxxxxxx",
            "PLAID_PUBLIC_KEY": "xxxxxxxxxxxxxxxxxxxx",
            "PLAID_PRODUCTS": "transactions",
            "PLAID_COUNTRY_CODES": "US",
            "PLAID_ENV": "sandbox"
        }
        ```

3. 填写参数
   1. 将 **GOOGLE_MAPS_KEY** 替换到 `/client/src/config/example.env.json` 文件内。
   2. 将 **PLAID_PUBLIC_KEY** 也替换到这个文件内。
   3. 将 **PLAID_CLIENT_ID**、**PLAID_SECRET**、**PLAID_PUBLIC_KEY** 替换到 `server/config/default.json` 文件内。
4. 然后启动本地的 mongo

    `mongod --dbpath /Users/imagons/mongo/data`

    这个只是我的启动方式。

5. 进入到 `server` 目录, 然后执行 `yarn install` 和 `yarn watch`
6. 另起一个终端，然后进入到 `client` 目录，然后执行
   1. `cp ./src/config/example.env.json ./src/config/development.env.json`
   2. `yarn install`
   3. `yarn start`
7. （这一步貌似不执行也能运行了）又再起一个终端，继续在 `client` 目录，执行 `yarn gen:types:watch`

## 注意事项

* 如果遇到 `npm` 相关的问题，建议重装 `node` 环境。

* 4000 的端口和 3000 的端口不要被占用。

[fullstack]:https://github.com/TrillCyborg/fullstack
[google_cloud]:https://console.cloud.google.com/
[plaid]:https://plaid.com/
