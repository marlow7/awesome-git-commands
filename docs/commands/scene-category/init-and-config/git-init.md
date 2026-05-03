---
title: git init
---

<div class="agc-breadcrumb">
  <a href="../../">命令大全</a>
  <span class="separator">/</span>
  <a href="./">仓库初始化与基础配置</a>
  <span class="separator">/</span>
  <span>git init</span>
</div>

<div class="agc-detail-header">

# git init

<div class="official-def">
  Create an empty Git repository or reinitialize an existing one. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：初始化仓库</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-init" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-init</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git init [-q | --quiet] [--bare] [--template=<template-directory>]
         [--separate-git-dir <git-dir>] [--object-format=<format>]
         [--ref-format=<format>]
         [-b <branch-name> | --initial-branch=<branch-name>]
         [--shared[=<permissions>]] [<directory>]
```

## 核心功能描述

`git init` 命令创建一个新的 Git 仓库。它会在当前目录（或指定目录）下创建一个 `.git` 子目录，包含仓库的所有元数据。

**适用场景**：
- 在本地创建新的 Git 仓库
- 将已有项目纳入 Git 版本控制

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<directory>` | 在指定目录创建仓库 | 当前目录 |
| `--bare` | 创建裸仓库（无工作区） | 关闭 |
| `-b <branch>, --initial-branch=<branch>` | 设置初始分支名 | master 或配置值 |
| `--template=<directory>` | 使用指定模板目录 | 默认模板 |
| `--separate-git-dir=<git-dir>` | 将 .git 放在指定位置 | — |
| `--shared[=<permissions>]` | 设置仓库为共享（适用于团队服务器） | — |
| `-q, --quiet` | 静默模式 | 关闭 |
| `--object-format=<format>` | 对象存储格式 | sha1 |

## 实战示例

### 示例 1：初始化新仓库

```bash
# 在当前目录初始化
mkdir my-project && cd my-project
git init

# 指定初始分支为 main
git init -b main

# 在指定目录初始化
git init my-project
```

### 示例 2：将已有项目纳入版本控制

```bash
cd existing-project
git init
git add .
git commit -m "chore: initial commit"
```

## 常见踩坑与注意事项

::: tip 推荐设置默认分支名
```bash
# 全局设置默认分支名为 main
git config --global init.defaultBranch main
```
这样后续 `git init` 不需要每次指定 `-b main`。
:::

::: warning 不要在用户主目录执行 git init
在 `~` 目录执行 `git init` 会将整个用户目录变为 Git 仓库，影响其他 Git 操作。务必在项目目录内执行。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/init-and-config/git-clone">git clone</a>
  <a href="/commands/scene-category/init-and-config/git-config">git config</a>
  <a href="/commands/scene-category/staging-and-commit/git-add">git add</a>
  <a href="/commands/scene-category/staging-and-commit/git-commit">git commit</a>
</div>
