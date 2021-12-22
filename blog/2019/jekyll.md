---
layout: post
title:  "Hello World!"
categories: jekyll whiteglass Disqus Travis
comments: true
date: 2019-05-26 12:40:24 +0800
---

1. **jekyll** 静态页面框架
2. **whiteglass** 主题
3. **Disqus** 评论系统（国内*IP*应该无法访问）
4. **Travis CI** 自动构建工具

## jekyll

之所以采用 **jekyll** 而没有去使用中文文档更为丰富的 *Hexo*，是因为 *Github* 官方推荐的是前者。 同时也有另外一个原因，**jekyll** 看起来会简约许多。

大致步骤如下:

1. 安装 *bundler* 和 *jekyll*
    `gem install bundler jekyll`
2. 创建项目
   `jekyll new blog` 和 `jekyll new blog --skip-bundle`
   后者是针对 **whiteglass** 的，后面会讲到。
3. 进入目录
   `bundle install`
4. 启动本地调试
   `bundle exec jekyll serve`

以上就算是把房子建好了，剩下的就是需要让房客（我的笔记）入住，和让房间更好看些（**whiteglass**）。  
这些生成出来的文件直接推送到 *Github* 时，是可以正常运行的。

## whiteglass

这个是在 [*jekyllthemes*][jekyllthemes] 主题网站上面找到的。
推荐采用重新建房子的方式。

大致使用方法:

1. 创建项目 `jekyll new blog --skip-bundle`
2. 添加 `gem "jekyll-whiteglass"` 到 `Gemfile`
3. 编辑 `_config.yml`

    ```yml
     theme: jekyll-whiteglass
     plugins:
     - jekyll-archives
     - jekyll-paginate
     - jekyll-sitemap

     permalink: /:year/:month/:day/:title/
     paginate_path: /posts/:num/
     paginate: 5

     jekyll-archives:
     enabled:
         - categories
         - tags
     layout: category_archives
     permalinks:
         category: /categories/:name/
      tag: /tags/:name/
    ```

4. 依次执行以下命令

    ```shell
    rm index.md
    curl -L -O "https://github.com/yous/whiteglass/raw/master/{index.html,about.md,archives.md,feed.xml}"
    curl -L --create-dirs -o _data/navigation.yml https://github.com/yous/whiteglass/raw/master/_data/navigation.yml
    ```

5. 安装所需文件和启动

    ```shell
    bundle install
    bundle exec jekyll serve
    ```

但这里做完之后直接推送到 *Github* 上时是没有任何反应，看不到任何界面。
这时需要 **Travis CI**

## Travis CI

由于主题用到了 *gem* 包，而 *Github* 又并不能直接支持去操作 *gem*，所以需要一个类似 *Jenkins* 的持续集成工具来完成该操作。  
**Travis** 会根据当前 *master* 分支下的 `.travis.yml` 这个文件去执行相应操作。  
根目录下新建 `.travis.yml` 或者去 [下载最新的文件][new_yml]  

```yml
language: ruby
sudo: false
cache: bundler
rvm:
  - 2.6.3
before_install:
  - gem update --system
  - gem install bundler
script:
  - rm -rf _site
  - bundle exec jekyll build
branches:
  only:
    - master
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GITHUB_TOKEN  # <-- 1
  keep-history: true
  local-dir: _site
  target-branch: gh-pages   # <-- 2
  on:
    branch: master
```

*yml* 区别于 *xml*，其中 *tab* 键以两个空格为主，可读性很高。

有几点说明:

   1. 这个参数不需要修改，但是需要在 *Github* 的设置（*Settings*）后台的（*Developer settings*）上添加一个（*Personal access tokens*）. 得到这个 *key* 后添加到 **Travis** 的对应仓库的设置后台。 在 *Environment Variables* 键入 *GITHUB_TOKEN* 为 *Name*，*key* 为 *Value*。 然后直接 *Add* 即可。
   2. 这里需要新建一个名为 *gh-pages* 的分支，主要是给 **Travis** 自动构建完后推送用。

做完这些，新建一个新的提交，**Travis** 就会自动开始运行，然后就可以查看网页了。

* 可能这里也并不能直接的查看网页，需要修改 `_config.yml`

```yml
baseurl: "/blog" # 为你的项目名
url: "https://xxx.github.io"    # xxx为你的 Github 用户名
```

## Disqus

这个会比较简单:

   1. 新建目录和文件 `_includes/custom_comments_provider.html`
   2. 添加 `comments: true` 到 `_config.yml`

然后去到 **Disqus** 的后台，新建站点，然后选择 **jekyll**，把他的通用代码全部拷贝到刚刚新建的 *html* 文件当中。

### 其他

> 自定义域名

1. 自定义域名解析三处。

   ```text
   *.xxx.com
   www.xxx.com
   @.xxx.com
   ```

2. *ip* 地址的获取 `ping xxx.github.io`
3. 由于变成了子域名，需要更改`_config.xml`

    ```yml
    baseurl: ""
    url: "https://blog.xxx.com"    # blog作为子域名放在前面 xxx为你的 Github 用户名
    ```

>Ps: 2019年8月2日更新

由于最近在 *Windows* 平台上开发, 所以遇到一个问题.
*Travis CI* 不会自动运行构建了. 应该说每次运行都会报错.
查找发现有个回答

`啊，我明白了。您正在使用Windows计算机进行开发，但构建将在Linux上运行。如果您无法访问Linux机器，我认为最好不要Gemfile.lock登录您的Git存储库。`

[jekyllthemes]:https://jekyllthemes.dev/
[new_yml]:https://github.com/yous/whiteglass/blob/master/.travis.yml
