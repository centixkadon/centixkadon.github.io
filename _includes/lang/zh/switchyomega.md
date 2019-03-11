[Simplified Chinese]:#

{% assign abbr = include.abbr | split: ' ' %}

{% if abbr contains 'menu' %}

[===== Menu =====]:#

*[Direct]: 直接连接
*[System Proxy]: 系统代理
*[Options]: 选项

*[Interface]: 界面
*[General]: 通用
*[Import/Export]: 导入/导出
*[New profile...]: 新建情景模式...
*[Apply changes]: 应用选项
*[Discard changes]: 撤销更改

*[Profile]: 情景模式

{% endif %}

{% if abbr contains 'profile' %}

[===== Profiles =====]:#

*[auto switch]: 自动切换
*[proxy]: 代理

*[New Profile]: 新建情景模式
*[Profile name]: 情景模式名称
*[Proxy Profile]: 代理服务器
*[Switch Profile]: 自动切换模式
*[PAC Profile]: PAC情景模式
*[Virtual Profile]: 虚情景模式

*[Proxy servers]: 代理服务器
*[Scheme]: 网址协议
*[Protocol]: 代理协议
*[Server]: 代理服务器
*[Port]: 代理端口
*[default]: 默认
*[Show Advanced]: 显示高级设置
*[Bypass List]: 不代理的地址列表

*[Switch rules]: 切换规则
*[Sort]: 排序
*[Condition Type]: 条件类型
*[Condition Details]: 条件设置
*[Actions]: 操作
*[Add condition]: 添加条件
*[Host wildcard]: 域名通配符
*[URL wildcard]: 网址通配符
*[URL regex]: 网址正则
*[Import online rule lists]: 导入在线规则列表
*[Add a rule list]: 添加规则列表
*[Rule list rules]: 规则列表规则
*[Default]: 默认情景模式
*[Rule List Config]: 规则列表设置
*[Rule List Format]: 规则列表格式
*[Rule List URL]: 规则列表网址
*[Download Profile Now]: 立即更新情景模式
*[Rule List Text]: 规则列表正文

*[PAC URL]: PAC网址
*[PAC Script]: PAC脚本

{% endif %}
