---
title: git remote
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/remote-collaboration/">远程仓库协作</a>
  <span class="separator">/</span>
  <span>git remote</span>
</div>

<div class="agc-detail-header">

# git remote

<div class="official-def">
  Manage set of tracked repositories. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：远程管理</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-remote" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-remote</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git remote [-v | --verbose]
git remote add [-t <branch>] [-m <master>] [-f] [--[no-]tags] [--mirror=(fetch|push)] <name> <url>
git remote rename [--[no-]progress] <old> <new>
git remote remove <name>
git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
git remote set-branches [--add] <name> <branch>…
git remote get-url [--push] [--all] <name>
git remote set-url [--push] <name> <newurl> [<oldurl>]
git remote set-url --add [--push] <name> <newurl>
git remote set-url --delete [--push] <name> <url>
git remote [-v | --verbose] show [-n] <name>…
git remote prune [-n | --dry-run] <name>…
git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)…​]
```

## 核心功能描述

`git remote` 命令管理本地仓库跟踪的远程仓库集合。远程仓库是指托管在网络上的项目版本，通过名称（如 origin）和 URL 来标识。

**适用场景**：
- 查看当前仓库的远程连接
- 添加、重命名、删除远程仓库
- 修改远程仓库的 URL

## 全量参数详解

| 子命令/参数 | 描述 |
|-------------|------|
| `git remote -v` | 显示所有远程仓库的名称和 URL |
| `git remote add <name> <url>` | 添加新的远程仓库 |
| `git remote remove <name>` | 删除远程仓库 |
| `git remote rename <old> <new>` | 重命名远程仓库 |
| `git remote show <name>` | 显示远程仓库的详细信息 |
| `git remote get-url <name>` | 获取远程仓库的 URL |
| `git remote set-url <name> <newurl>` | 修改远程仓库的 URL |
| `git remote prune <name>` | 删除过时的远程跟踪分支 |
| `git remote update` | 获取远程仓库的更新 |

## 实战示例

### 示例 1：查看和添加远程仓库

```bash
# 查看所有远程仓库
git remote -v

# 添加 origin 远程仓库
git remote add origin https://github.com/user/repo.git

# 添加上游仓库（fork 场景）
git remote add upstream https://github.com/original/repo.git
```

### 示例 2：修改远程仓库 URL

```bash
# 从 HTTPS 切换到 SSH
git remote set-url origin git@github.com:user/repo.git

# 查看修改后的 URL
git remote get-url origin
```

### 示例 3：清理过时的远程分支

```bash
# 查看将被清理的分支（试运行）
git remote prune origin --dry-run

# 实际清理
git remote prune origin
```

## 常见踩坑与注意事项

::: tip origin 与 upstream 的区别
- `origin`：默认远程仓库名称，通常指向你自己的 fork
- `upstream`：上游原始仓库，用于同步原始项目的更新
:::

::: warning 删除远程仓库不会删除本地分支
`git remote remove` 只删除远程连接配置，不影响本地分支。但对应的远程跟踪分支（如 `origin/feature`）会被删除。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/remote-collaboration/git-fetch">git fetch</a>
  <a href="/commands/scene-category/remote-collaboration/git-pull">git pull</a>
  <a href="/commands/scene-category/remote-collaboration/git-push">git push</a>
  <a href="/commands/scene-category/remote-collaboration/git-clone">git clone</a>
</div>
