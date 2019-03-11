---
layout: blog
title: Shadowsocks Client Setup Guide
date: 2018-10-15 15:00:00 +0800
tags: 
---

_shadowsocks_, a fast tunnel proxy that helps you bypass firewalls. A secure socks5 proxy, designed to protect your Internet traffic. _shadowsocks-windows_ is one of shadowsocks clients for Windows.

## Download

Download the lastest release of shadowsocks-windows from [github release page](https://github.com/shadowsocks/shadowsocks-windows/releases).

## Requirements

Download and install Microsoft .NET Framework 4.6.2 or higher (e.g. [Microsoft .NET Framework 4.7.2](https://www.microsoft.com/net/download/thank-you/net472-offline)), [Microsoft Visual C++ 2015 Redistributable (x86)](https://go.microsoft.com/fwlink/?LinkId=615459).

## Run

Choose a path (e.g. D:\Portable\shadowsocks\), extract an exe file from the zip package and run without install.

## Setup

### Surfing when using system

*[tray icon]: 系统托盘图标
*[notification area]: 通知区域

{% include lang/zh/shadowsocks.md abbr='menu config'%}

1. Double click shadowsocks.exe (e.g. D:\Portable\shadowsocks\shadowsocks.exe).
1. Find shadowsocks tray icon in the notification area.
1. Double click the shadowsocks icon.
1. Configure:
   - Server Addr: server ip or host.
   - Server Port & Password: server port and password.
   - Encryption: choose a encryption.
   - Remarks: fill something.
   - Click OK.
1. Right click the shadowsocks icon → select Enable System Proxy.
1. Do somethine more:
   - Right click the shadowsocks icon → Help → Verbose Logging.
   - Right click the shadowsocks icon → Mode → PAC.
   - Right click the shadowsocks icon → PAC → Update Local PAC from GFWList.
   - Right click the shadowsocks icon → PAC → unselect Secure Local PAC.
1. Test [Google](https://www.google.com/) and success.
1. Query [ip](https://www.baidu.com/s?wd=ip) and show the same ip as before enabling shadowsocks.
1. Now you could surf the Internet.

### Only surfing when using browser

{% include lang/zh/switchyomega.md abbr='menu profile'%}

1. Recommends: [Firefox](https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US) or [Chrome](https://www.google.com/intl/en/chrome/?standalone=1).
1. - Firefox: Install [Proxy SwitchyOmega](https://addons.mozilla.org/firefox/addon/switchyomega/) add-ons.
   - Chrome: Install [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif) extension.
1. Find SwitchyOmega icon.
1. Click the SwitchyOmega icon → Options.
1. Delete auto switch profile.
1. Delete proxy profile.
1. New profile..\. → Profile name: Shadowsocks All →
          select Proxy Profile → click Create.
1. Configure:
   - Protocol: SOCKS5.
   - Server: 127.0.0.1.
   - Port: 1080.
   - Click Apply changes.
1. New profile..\. → Profile name: Shadowsocks →
          select Switch Profile → click Create.
1. Click Add a rule list and configure:
   - Rule List Format: AutoProxy.
   - Rule List URL: https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt.
   - Click Download Profile Now.
   - Switch rules → Condition Type → Rule list rules → Shadowsocks All.
   - Click Apply changes.
1. Right click the shadowsocks icon → unselect Enable System Proxy.
1. Click the SwitchyOmega icon and select different profiles, test [Google](https://www.google.com/) and query [ip](https://www.baidu.com/s?wd=ip) to see difference.
1. Now you could only surf the Internet when using the browser.

### Optional

- Right click the shadowsocks icon → Start on Boot.
- Right click the shadowsocks icon → Allow other Devices to connect.

### Debug

If you have any problem while using shadowsocks, try the following method:

Turn off shadowsocks, surf the Internet and check network connection...

Right click the shadowsocks icon → Help → Show Logs..\..

If there are many _timeout_ s, it means bad network connection.

If there are many _System.Net.Sockets.SocketException_ s, please contact shadowsocks administrator.

## More

Read <a href="https://github.com/shadowsocks/shadowsocks-windows/blob/master/README.md">shadowsocks-windows README.md</a>.

Find <a href="http://shadowsocks.org/en/download/clients.html">clients</a> for other platforms.

## page keys

{%- for key in page %}
{{ key }}
{%- endfor %}