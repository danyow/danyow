---
layout: post
title: '部署新安装的centos服务器'
categories: Mac 笔记
comments: true
date: 2020-01-28 09:42:42 +0800
published: true
---

## 服务器链接超时解决

`vim /etc/ssh/sshd_config` 修改里面的两个参数

```config
ClientAliveInterval 60
ClientAliveCountMax 60
```

然后重启`ssh`

`systemctl restart ssh`

## 出现报错

内容`Failed to set locale, defaulting to C.UTF-8`

执行`echo "export LC_ALL=en_US.UTF-8"  >>  /etc/profile`

## 安装`docker`

1. 卸载旧的版本

    ```shell
    sudo yum remove docker \
                    docker-client \
                    docker-client-latest \
                    docker-common \
                    docker-latest \
                    docker-latest-logrotate \
                    docker-logrotate \
                    docker-engine
    ```

2. 安装依赖

    `sudo yum install -y yum-utils  device-mapper-persistent-data  lvm2`
    `sudo yum-config-manager  --add-repo   https://download.docker.com/linux/centos/docker-ce.repo`
    `sudo yum install docker-ce docker-ce-cli containerd.io`

3. 更新containerd.io

    `dnf install https://download.docker.com/linux/centos/7/x86_64/stable/Packages/containerd.io-1.2.6-3.3.el7.x86_64.rpm`

4. 安装

    `sudo yum install docker-ce docker-ce-cli containerd.io`

5. 启动docker

    `sudo systemctl start docker`

## 创建 `Dockerfile`

1. 创建 `docker/Dockerfile`

    `mkdir docker && cd docker && vim Dockerfile`

2. 加入下面内容

    ```docker
    FROM jenkins/jenkins:lts
    USER root
    WORKDIR /dotnet
    RUN wget -O dotnet.tar.gz https://download.visualstudio.microsoft.com/download/pr/c4b503d6-2f41-4908-b634-270a0a1dcfca/c5a20e42868a48a2cd1ae27cf038044c/dotnet-sdk-3.1.101-linux-x64.tar.gz
    RUN tar zxf dotnet.tar.gz -C ./
    RUN rm -rf dotnet.tar.gz
    ENV PATH="${PATH}:/dotnet:/var/jenkins_home/.dotnet/tools"
    ENV DOTNET_ROOT="/dotnet"
    RUN apt update -y
    RUN apt install icu-devtools vim zip unzip -y
    RUN usermod -a -G root jenkins
    USER jenkins
    ```

    1. 这个Docker镜像基于jenkins
    2. 设置当前用户为root，因为后面安装需要使用root
    3. 设置当前工作目录为dotnet
    4. 下载dotnet SDK包，保存为dotnet.tar.gz。这里要注意下载正确版本的SDK，可前往微软官方网站获取下载链接：https://dotnet.microsoft.com/download
    5. 解压dotnet SDK到当前目录，即/dotnet目录
    6. 删除dotnet SDK包
    7. 把dotnet目录和dotnet tools目录添加到环境变量PATH，这样就可以使用dotnet命令了
    8. 设置DOTNET_ROOT变量
    9. 更新源
    10. 安装一些必需的，常用的工具包，其中icu-devtools是运行dotnet需要的
    11. 修改jenkins用户到root附加组
    12. 设置当前用户为jenkins
3. 生成镜像

    `docker build -t jenkins:dotnet .`

4. 查看所有镜像

    `docker image`

5. 运行`docker`实例

    `docker run -p 8080:8080 -p 50000:50000 --name jenkins jenkins:dotnet`

6. 获取密码和访问链接

    1. 自定义安装
    2. 补充安装`GitHub`和`Publish Over SSH`

7. 添加编译执行脚本

    `dotnet publish`

8. 构建

9. 添加 `github webhook`

## 直接部署项目

1. 安装`git`

    `yum install git`

2. 克隆
3. `docker build -t dotnet .`
4. `docker run -d -p 8080:80 dotnet`
