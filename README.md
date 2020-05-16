# code-server 中文版

本页面由小翼个人进行手动汉化，内容链接均来自原作者,如需访问原作者，[点击这里](https://github.com/cdr/code-server)，**如有镜像特殊需求或问题，可[前往此处](https://github.com/fantwings/code-server_cn/issues)提交issue**。

**喜欢请点个Star！！你们的支持是我保持更新的动力！**

**最后维护日期：2020年5月16日19:01:23** - 
**Server版本：3.2.0 - VSCode版本：1.44.2**

### 最后更新内容：
- 主程序
  - 升级Node版本到 LTS (12.16.3).
  - 升级 VS Code 版本到 1.44.2.
  - 重新允许任何类型的扩展的安装 (比如 vscode-icons 现在可以重新使用了).
  - 为登录入口增加速率限制。
  - 移除了内置的SSH服务端。
    - 容器内的 --ssh-host-key 和 --disable-ssh 参数不再有效.
  - 修复在浏览器中运行的扩展未获得正确的存储路径问题。
  - 修复了浏览器字体刷错误的问题。
  - 修复了Code-Server在MacOS系统上的脚本错误。
  - 修复给用户显示的更新错误问题。
  - 允许在命令行上额外指定工作区。
- 镜像
  - 由于vscode-icons（图标包）又可以重新用了，所以我们为其重新加了回去。


## 容器集成以下模块：  
- **母版：Debian10**
  - 网易163 APT镜像
  - 中文UTF-8环境支持
  - 基础编译套件（build-essential）
  - 基础工具（bsdtar curl sudo wget git vim locales）
  - Python3 + Pip3
  - NodeJS
- **VSCODE 预装扩展清单（不需要可卸载，需要可额外安装，可随时更新不丢失）：**
  - **语言扩展相关**
    - Python
    - JAVA
    - GO
  - **功能扩展**
    - LiveServer（实时网页预览（需要额外映射监听端口号5500））
    - beautify（代码格式优化）
    - code-spell-checker（单词语法检查器）
    - gitblame（Git历史查询）
  - **美化扩展**
    - vscode-icons（图标包）
    - indent-rainbow（彩色TAB间隔）
    - onedark（Atom相似的主题）
    - bracket-pair-colorizer-2（彩色括号）
- **永久卷分区清单（用于保存永久数据，修改/重置docker不会丢失数据）：**
  - **/home** （用户家目录，保存环境变量，VSCODE主题/设置等等）
  - **/usr/local** （用户默认编译安装目录，根据个别小伙伴的需求，特地设置保存该目录，方便编译安装的程序得以保存。）


## 关于Code-Server

`Code-Server` 是微软 [VS Code](https://github.com/Microsoft/vscode) 运行在远端的在线 编辑器, 可以在任意的地方通过浏览器访问.

通过以下命令试一下：
```bash
docker run --name=容器名字 -p 127.0.0.1:8080:8080 fantwings/code-server_cn 
```
查询随机分配的默认密码：
```bash
docker logs 容器名字
```

- **在任意地方编辑:** 在Chromebook、平板电脑和笔记本电脑上使用一致的开发环境。在Linux机器上开发并从任何带有web浏览器的设备上随时继续编辑.
- **服务器加持:** 利用大型云服务器加速测试，编译、下载等。在旅途中节约移动设备的电池续航寿命，因为所有密集型计算都在服务器上运行。


![Example gif](https://github.com/cdr/code-server/blob/master/doc/assets/code-server.gif?raw=true)


## 开始使用

### 环境需求

- 64位宿主机.
- 至少拥有 1GB 以上的运行内存.
- 建议双核以上的CPU核心 (1核可能会出现运行上的卡顿或缓慢).
- 建议通过HTTPS 或者 localhost 进行安全访问 (用于开启 service workers 和
  剪贴板支持).
- Linux环境需求: GLIBC 2.17 或更高版本 以及 GLIBCXX 3.4.15 或更高版本。

### 通过Docker部署镜像运行（推荐）
IDE密码是通过环境变量“PASSWORD”进行定义的，默认为随机分配，如需要密码访问，可在部署时同时设置密码：
```bash
docker run --name=容器名字 -p 127.0.0.1:8080:8080 -e "PASSWORD=你的密码" fantwings/code-server_cn
```

### 通过SSH运行

使用 [sshcode](https://github.com/codercom/sshcode) 进行简单配置。

### Digital Ocean

[![Create a Droplet](./doc/assets/droplet.svg)](https://marketplace.digitalocean.com/apps/code-server)

### 从二进制文件中直接运行

1. [点击这里](https://github.com/cdr/code-server/releases). (支持 Linux 和
   OS X。 Windows 在未来计划支持。)
2. 解压下载好的 release 文件，然后运行含有 `code-server` 的脚本。
3. 在浏览器地址栏输入 `localhost:8080`.

## FAQ

可查看 [./doc/FAQ.md](./doc/FAQ.md).

## 贡献名单

可查看 [./doc/CONTRIBUTING.md](./doc/CONTRIBUTING.md).

## 企业版

前往 [我们的企业页面](https://coder.com) 获取更多企业版定制相关的需求。

