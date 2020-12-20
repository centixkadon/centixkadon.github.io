
# Github Pages

[![Github Pages](https://github.com/centixkadon/centixkadon.github.io/workflows/Github%20Pages/badge.svg)](https://github.com/centixkadon/centixkadon.github.io/actions?query=workflow%3A%22Github+Pages%22)

## 原理

基于 Jekyll 工具生成静态博客，通过 Github Actions 构建并推送到 gh-pages 分支，然后配置 Github Pages 将该分支的内容挂载到 https://centixkadon.github.io/ 。

## 技术

### Github Actions

[Github Actions](https://github.com/features/actions) 是 Github 提供的自动化工具，可以由 push 、 pull_request 等事件触发工作流，在 Github 提供的虚拟环境中完成一系列自定义操作。

Github Actions 提供了 Ubuntu 、 Windows Server 、 macOS 等[虚拟环境](https://github.com/actions/virtual-environments)，提供了大部分工具链，也提供了一些[官方 action](https://github.com/actions) ，还提供了[缓存](https://docs.github.com/actions/guides/caching-dependencies-to-speed-up-workflows)的功能解决重复安装依赖等问题。

### Jekyll

[Jekyll](https://jekyllrb.com/) 是基于 Ruby 的静态博客工具，支持 Markdown 、 Liquid 、 SCSS 。另外可以根据需要添加插件获得更多功能，也可以用 Ruby 自定义插件。

### Docker

[Docker](https://docs.docker.com/) 是容器引擎，可以创建或使用容器以提供一致的环境。

Github Actions 提供的环境已经缓存了 jekyll/builder:latest 的 docker 镜像，就不用通过 gem 自行配置 bundler 和 jekyll 的环境了。

### Gem

[RubyGems](https://rubygems.org) 是 Ruby 的包管理器。

### Bundler

[Bundler](https://bundler.io/) 基于 gem 管理项目包。

它通过 [`Gemfile`](https://bundler.io/gemfile.html) 描述项目依赖，生成 `Gemfile.lock` 记录安装的 gem 包。一般使用以下命令安装项目 gem 包：

```bash
bundle install
```

这个命令会根据 `Gemfile.lock` 直接安装 gem 包。如果没有该文件，则相当于升级项目 gem 包：

```bash
bundle update
```

这个命令会根据 `Gemfile` 安装或升级 gem 包，然后生成或更新 `Gemfile.lock` 文件。
