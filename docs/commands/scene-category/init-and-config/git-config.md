---
title: git config
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/init-and-config/">仓库初始化与基础配置</a>
  <span class="separator">/</span>
  <span>git config</span>
</div>

<div class="agc-detail-header">

# git config

<div class="official-def">
  Get and set repository or global options. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：配置</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-config" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-config</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git config [<file-option>] [--type=<type>] [--show-origin] [--show-scope]
           [-z|--null] name [value [value-pattern]]
git config [<file-option>] [--type=<type>] --add name value
git config [<file-option>] [--type=<type>] --replace-all name value [value-pattern]
git config [<file-option>] [--type=<type>] [--show-origin] [--show-scope]
           [-z|--null] --get name [value-pattern]
git config [<file-option>] [--type=<type>] [--show-origin] [--show-scope]
           [-z|--null] --get-all name [value-pattern]
git config [<file-option>] [--type=<type>] [--show-origin] [--show-scope]
           [-z|--null] [--name-only] --get-regexp name_regex [value-pattern]
git config [<file-option>] [--type=<type>] [-z|--null] --unset name [value-pattern]
git config [<file-option>] [-z|--null] --unset-all name [value-pattern]
git config [<file-option>] --rename-section old_name new_name
git config [<file-option>] --remove-section name
git config [<file-option>] [-z|--null] [--name-only] -l | --list
git config [<file-option>] --get-colorbool name [stdout-is-tty]
git config [<file-option>] --get-color name [default]
```

## 核心功能描述

`git config` 命令用于获取和设置 Git 的配置选项。Git 配置分为三个层级：系统级（--system）、全局级（--global）和仓库级（--local），优先级从低到高。

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `--global` | 操作全局配置文件（~/.gitconfig） | — |
| `--local` | 操作仓库配置文件（.git/config） | 默认 |
| `--system` | 操作系统级配置文件 | — |
| `--list, -l` | 列出所有配置 | — |
| `--get <name>` | 获取指定配置的值 | — |
| `--get-all <name>` | 获取指定配置的所有值 | — |
| `--add <name> <value>` | 添加配置项 | — |
| `--unset <name>` | 删除配置项 | — |
| `--replace-all` | 替换所有匹配的配置项 | — |
| `--show-origin` | 显示配置来源文件 | — |
| `--show-scope` | 显示配置作用域 | — |

## 实战示例

### 示例 1：基础配置（首次安装必做）

```bash
# 设置用户名和邮箱
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# 设置默认编辑器
git config --global core.editor vim

# 设置默认分支名
git config --global init.defaultBranch main
```

### 示例 2：常用配置

```bash
# 启用颜色输出
git config --global color.ui auto

# 设置 pull 默认使用 rebase
git config --global pull.rebase true

# 设置 push 默认只推送当前分支
git config --global push.default current

# 设置别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.lg "log --oneline --graph --all"
```

### 示例 3：查看配置

```bash
# 列出所有配置
git config --list

# 列出配置并显示来源
git config --list --show-origin --show-scope

# 查看指定配置
git config user.name
```

## 常见踩坑与注意事项

::: tip 配置优先级
仓库级（--local）> 全局级（--global）> 系统级（--system）。同名配置项，高优先级覆盖低优先级。
:::

::: warning 不同项目使用不同身份
如果需要在不同项目中使用不同的 Git 身份（如工作项目用公司邮箱，个人项目用个人邮箱），应在项目目录下使用 `--local` 配置：
```bash
cd /path/to/work-project
git config --local user.name "Work Name"
git config --local user.email "work@company.com"
```
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/init-and-config/git-init">git init</a>
  <a href="/commands/scene-category/init-and-config/git-clone">git clone</a>
  <a href="/commands/scene-category/remote-collaboration/git-remote">git remote</a>
</div>
