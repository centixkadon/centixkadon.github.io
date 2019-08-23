---
layout: blog
title: v2ray 使用简介
date: 2019-08-23 00:00:00 +0800
tags: 
---

v2ray 是 Project V 的核心工具。Project V 是一个工具集合，它可以帮助你打造专属的基础通信网络。 v2ray 主要负责网络协议和功能的实现，与其它 Project V 通信。 v2ray 可以单独运行，也可以和其它工具配合，以提供简便的操作流程。

## 下载

在 [Releases · v2ray/v2ray-core · GitHub](https://github.com/v2ray/v2ray-core/releases) 下载最新的 v2ray 二进制文件。其原生支持许多桌面和服务器平台，包括 Linux 和 Windows 。 Linux 还支持脚本安装到系统， Windows 和 macOS 则是一份可直接运行的命令行程序。

然后在 [Releases · v2ray/domain-list-community · GitHub](https://github.com/v2ray/domain-list-community/releases) 下载最新的 dlc.dat 文件，替换掉文件夹中原来的 geosite.dat 。这是 v2ray 工具的一部分，专门负责维护域名列表，其更新频率目前比 v2ray 高，所以 v2ray 中自带的 .dat 文件可能已经很旧了。

## 平台支持、安装和运行

见[下载安装 · Project V 官方网站](https://www.v2ray.com/chapter_00/install.html)或 [Project V · Project V 官方网站](https://www.v2ray.com/)。

## v2ray 配置

v2ray 的配置非常简单，将其他人提供的 config.json 替换掉原来的文件，重新运行即可。

诶，怎么配置？这不是这篇文章的重点。如果想深入学习，请去 [Project V · Project V 官方网站](https://www.v2ray.com/)从头学起。

### 在提供的 config.json 基础上修改

如果不添加反向代理等支持、只配置最简单通信的话， Windows 客户端的 config.json 会形如以下示例：

```json
{
  "log": {
    "access": "log/access.log",
    "error": "log/error.log",
    "loglevel": "warning"
  },
  "outbounds": [
    {
      "protocol": "blackhole",
      "tag": "block"
    },
    {
      "protocol": "freedom",
      "tag": "direct"
    },
    {
      "protocol": "vmess",
      "tag": "vmess1"
    }
  ],
  "inbounds": [
    {
      "listen": "127.0.0.1",
      "port": 1081,
      "protocol": "socks",
      "tag": "socks1"
    }
  ],
  "routing": {
    "domainStrategy": "AsIs",
    "rules": [
      {
        "type": "field",
        "ip": [ "geoip:blabla" ],
        "outboundTag": "block"
      },
      {
        "type": "field",
        "domain": [ "geosite:blabla" ],
        "outboundTag": "block"
      },
      {
        "type": "field",
        "ip": [ "geoip:blabla" ],
        "outboundTag": "direct"
      },
      {
        "type": "field",
        "domain": [ "geosite:blabla" ],
        "outboundTag": "direct"
      },
      {
        "type": "field",
        "domain": [ "geosite:blabla" ],
        "outboundTag": "vmess1"
      },
      {
        "type": "field",
        "outboundTag": "direct"
      }
    ]
  }
}
```

文件分成几块， log 是日志， outbounds 是出口， inbounds 是入口， routing 是路由。

### log 日志

log 配置了 v2ray 日志的输出位置和输出级别。

示例中 access 和 error 是相对路径，也可以改成绝对路径。相对路径的基于程序运行目录的。 Windows 下可通过设置快捷方式的 起始位置 来更改。

更改该设置时，推荐将路径中的 `\` 改成 `/` 。因为 json 文件中会对 `\` 转义，所以改成 `\\` 也可以，就是长了一点。

### outbounds 出口

outbounds 是连接服务器的设置。

protocol 是协议。其中 blackhole 是断开连接， freedom 是直接连接， vmess 一般是连接到某个中转服务器。

tag 是标签，会在 routing 中用到。

### inbounds 入口

inbounds 是被应用程序连接的设置。

listen 是监听地址。 127.0.0.1 一般表示只有本机的应用程序可以连接， 0.0.0.0 一般表示局域网的电脑都可以连接。

port 是相应的监听端口。 不同入口设置的端口不能重复。

protocol 是协议。 socks 被大部分浏览器支持。

tag 是标签，会在 routing 中用到。

### routing 路由

routing 是入口到出口的设置，它规定了入口的流量要往哪个出口走。在示例中，即到底要断开连接，要直接连接，还是要转发到其它服务器再说呢。

domainStrategy 决定如何解析域名。 AsIs 表示在路由中不解析域名。

rules 是规则列表，优先从第一个匹配到最后一个，哪个先匹配到就走哪个出口。如果都没有匹配到，那在 domainStrategy 为 AsIs 的情况下，会将流量导向第一个 outbound 。

type 目前只支持 field 。

ip 、 domain 、 inboundTag 三项都是列表，各项内部的各条为或关系，即只要满足一条则算满足该项。

三项之间为与关系，即同时满足所有项才算满足。如果某一项没有，说明满足该项。

outboundTag 是满足该规则的出口。 

ip 和 domain 分别是 ip地址 和 域名，有多种表示形式，详见[路由配置 · Project V 官方网站](https://www.v2ray.com/chapter_02/03_routing.html)。 outboundTag 和 inboundTag 分别是 outbounds 和 inbounds 中的 tag 。

## 浏览器配置

连接 v2ray 入口的方法是配置代理，而各个应用程序有各个应用程序的代理配置方法。以下基于原生的 v2ray ，用 Firefox 举例，其它应用程序同理。也有各平台的第三方 GUI 工具，在[神一样的工具们 · Project V 官方网站](https://www.v2ray.com/awesome/tools.html)列出了部分推荐。

### Firefox

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

更高级的代理配置，可以在上述配置的基础上，安装 [Proxy SwitchyOmega – Get this Extension for 🦊 Firefox (en-US)](https://addons.mozilla.org/en-US/firefox/addon/switchyomega/) ，插件配置方法略过不提。

### Chrome

一般直接安装 [Proxy SwitchyOmega - Chrome Web Store](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif) ，做高级的代理配置。

## 全局配置

一般不建议全局配置，因为这样会让电脑上三教九流的软件都可能经过 v2ray 。如果其中有什么流氓软件，也许会带来安全隐患。另外，下文提到的最简单的配置方法是非强制的，软件完全可以自己选择听不听，所以这种配置对网络连接不可控。如果非要做全局配置，比如为了查找错误什么的，可以尝试一下。

1. Windows 10 下，按 Windows 键，输入 Internet 选项，回车。
1. 点击 连接。
1. 点击 局域网设置。
1. 选择 为 LAN 使用代理服务器。
1. 地址： 127.0.0.1 。
1. 端口： config.json 中 inbound 的 port 。
1. 将 config.json 中 inbound 的 protocol 改成 http 。

## 常见问题

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
