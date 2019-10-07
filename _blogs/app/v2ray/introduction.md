---
layout: blog
title: v2ray 使用简介
date: 2019-08-23 00:00:00 +0800
tags: 
---

v2ray 是 Project V 的核心工具。Project V 是一个工具集合，它可以帮助你打造专属的基础通信网络。 v2ray 主要负责网络协议和功能的实现，与其它 Project V 通信。 v2ray 可以单独运行，也可以和其它工具配合，以提供简便的操作流程。

## 下载

在 [Releases · v2ray/v2ray-core · GitHub](https://github.com/v2ray/v2ray-core/releases) 下载最新的 v2ray 二进制文件。其原生支持许多桌面和服务器平台，包括 Linux 和 Windows 。 Linux 还支持脚本安装到系统， Windows 和 macOS 则是一份可直接运行的命令行程序。

然后在 [Releases · v2ray/domain-list-community · GitHub](https://github.com/v2ray/domain-list-community/releases) 下载最新的 dlc.dat 文件，重命名为 geosite.dat 并替换掉文件夹中原来的 geosite.dat 。这是 v2ray 工具的一部分，专门负责维护域名列表，其更新频率目前比 v2ray 高，所以 v2ray 中自带的 .dat 文件可能已经很旧了。

## 平台支持、安装和运行

见[下载安装 · Project V 官方网站](https://www.v2ray.com/chapter_00/install.html)或 [Project V · Project V 官方网站](https://www.v2ray.com/)。

上述两个网站需要翻墙。简单说明就是 Windows 平台下载 v2ray-windows-64.zip 文件，解压出文件夹直接运行 v2ray.exe 即可；若不能使用则下载 v2ray-windows-32.zip 文件； Linux 平台执行脚本安装即可。

### 开机启动

Windows 平台的 v2ray 二进制文件有 v2ray.exe 和 wv2ray.exe ，两者均可以双击运行。运行 v2ray.exe 时能保留命令行界面，可以直接关闭；运行 wv2ray.exe 时没有界面，一般通过任务管理器结束进程。

可以右键单击 wv2ray.exe 创建快捷方式，并将快捷方式复制到 %APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup 实现后台开机启动。

## v2ray 电脑客户端配置

Windows 和 Linux 平台的 v2ray 客户端配置非常简单，将其他人提供的 config.json 替换掉原来的文件，重新运行即可。

诶，怎么配置？这不是这篇文章的重点。如果想深入学习，请去 [Project V · Project V 官方网站](https://www.v2ray.com/)从头学起。

### 浏览器配置

连接 v2ray 入口的方法是配置代理，而各个应用程序有各个应用程序的代理配置方法。以下基于原生的 v2ray ，用 Firefox 配置 socks 代理举例，其它应用程序和代理协议同理。也有各平台的第三方 GUI 工具，在[神一样的工具们 · Project V 官方网站](https://www.v2ray.com/awesome/tools.html)列出了部分推荐。

#### Firefox

{% include lang/zh/firefox.md %}

1. 找到 Open menu ，点击 Open menu → Options 。
1. 找到 Network Settings 。
1. 点击 Settings..\.。
1. 选择 Manual proxy configuration 。
1. 取消选择 Use this proxy server for all protocols 。
1. SOCKS Host 填 127.0.0.1 和 config.json 中 inbound 的 port 。
   - 如果 v2ray 在局域网的其它机器运行，则应填其它机器的 ip地址 或 域名。
1. 选择 SOCKS v5 。
1. 点击 OK 。

更高级的代理配置，不应直接使用浏览器自带配置。可以安装 [Proxy SwitchyOmega – Get this Extension for 🦊 Firefox (en-US)](https://addons.mozilla.org/en-US/firefox/addon/switchyomega/) ，插件配置方法略过不提。

#### Chrome

一般直接安装 [Proxy SwitchyOmega - Chrome Web Store](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif) ，做高级的代理配置。

### 全局配置

一般不建议全局配置，因为这样会导致电脑上三教九流的软件都可能经过 v2ray 。如果其中有什么流氓软件，也许会带来安全隐患。另外，下文提到的最简单的配置方法是非强制的，软件完全可以自己选择听不听，所以这种配置对网络连接不可控。如果非要做全局配置，比如为了查找错误什么的，可以尝试一下。

1. Windows 10 下，按 Windows 键，输入 Internet 选项，回车。
1. 点击 连接。
1. 点击 局域网设置。
1. 选择 为 LAN 使用代理服务器：
   - 地址： 127.0.0.1 。
   - 端口： config.json 中 inbound 的 port 。
1. 将 config.json 中 inbound 的 protocol 改成 http 。

## v2ray 手机端配置

全局配置需要局域网中有一台运行 v2ray 的电脑，不要求手机安装任何 v2ray 客户端；客户端配置不需要电脑。

### 全局配置

1. 将手机和运行 v2ray 的电脑连到同一局域网。
1. 将电脑客户端 config.json 中 inbound 的 listen 改成 0.0.0.0 。
1. 将电脑客户端 config.json 中 inbound 的 protocol 改成 http 。
1. 重启电脑客户端的 v2ray 。
1. 进入手机 WLAN 设置，修改网络。
1. 配置代理为手动：
   - 地址：电脑的 ip 地址
   - 端口：电脑客户端 config.json 中 inbound 的 port 。
1. 重新连接手机 WLAN 。

### 客户端配置

[神一样的工具们 · Project V 官方网站](https://www.v2ray.com/awesome/tools.html)有许多手机客户端推荐。 Android 平台可以在 Google Play 免费下载 v2rayNG 或 Kitsunebi ， iOS 平台应用均需要付费，其中 Kitsunebi 应该和 Android 客户端一样。

下面以 v2rayNG 为例：

1. 点击 右上角的添加配置。
1. 手动输入\[Vmess\]，并根据 config.json 中 outbounds 里 protocol 为 vmess 一项的键值配置以下内容：
   - 别名：随便写。
   - 地址： settings.vnext.address 。
   - 端口： settings.vnext.port 。
   - 用户 ID ： settings.vnext.users.id 。
   - 额外 ID ： settings.vnext.users.alterId 。
   - 加密方式： settings.vnext.users.security 。
   - 传输协议： streamSettings.network （没有则留空）。
   - 伪装域名： streamSettings.xxxSettings.host （没有则留空）。
   - path ： streamSettings.xxxSettings.path （没有则留空）。
   - 底层传输安全： streamSettings.security （没有则留空）。
   - 点击 右上角的保存配置。
1. 点击 左上角 并进入 设置：
   1. 点击 分应用代理：
      - 选择 分应用代理。
      - 点击 右上角的更多选项。
      - 点击 自动选中需代理应用。
      - 点击 左上角。
   1. 路由设置：
      - 点击 域名策略： AsIs 。
      - 点击 路由模式：绕过局域网及大陆网址。

## 常见问题

1. 运行 v2ray 发现闪退/没有界面。
   - 一般是配置文件有问题；其次可能电脑上已经运行了 v2ray 或 wv2ray ，请通过任务管理器结束所有相关进程。
1. 运行 wv2ray 发现没有界面。
   - wv2ray 是在后台运行，没有界面，所以这种情况是正常的。
1. 我拿到客户端配置文件之后可以改哪里？
   - outbounds 是和其它服务器通信的配置，所以只有客户端的配置文件一般无需也不能更改。
   - log 一般也不会自己看，能找到那两个文件即可。
   - inbounds 是应用程序连接的入口，如果应用程序连不上可以检查 protocol ，如果发现其它应用程序偷偷连可以更改 port 。
     - inbounds 中的 port 和应用程序代理配置中的 port 对应，改的话要一起改哦。
   - routing 可以基于域名或 ip 来决定流量走哪个出口。示例中的 rules 最后一条是无条件直接连接，所以是典型的黑名单配置。如果实际使用中发现有其它需要添加进黑名单的，可以添加到前面对应的规则里。
1. 我更改了配置文件，想要让流量 xxx ，但是 yyy 了。
   - 首先检查 inbounds 配置和应用程序配置，然后检查 routing 配置和 outbounds 配置。
   - 即使将相应的流量转发到其他服务器，服务器上也会有一套规则来决定连还是不连哦。
1. 我自己找不出问题了。
   - 把两个日志文件发给别人求助吧。
