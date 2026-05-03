---
title: git branch
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/branch-management/">分支管理与切换</a>
  <span class="separator">/</span>
  <span>git branch</span>
</div>

<div class="agc-detail-header">

# git branch

<div class="official-def">
  List, create, or delete branches. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：分支管理</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-branch" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-branch</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git branch [--color[=<when>] | --no-color] [--show-current]
           [-v [--abbrev=<n> | --no-abbrev]]
           [--column[=<options>] | --no-column] [--sort=<key>]
           [--merged [<commit>]] [--no-merged [<commit>]]
           [--contains [<commit>]] [--no-contains [<commit>]]
           [-l <pattern>]
           [--show-reflags]
           [<branchname>…​]

git branch [--track[=(direct|inherit)] | --no-track] [-f]
           [--recurse-submodules] <branchname> [<start-point>]

git branch (--set-upstream-to=<upstream> | -u <upstream>) [<branchname>]

git branch --unset-upstream [<branchname>]

git branch (-m | -M) [<oldbranch>] <newbranch>

git branch (-c | -C) [<oldbranch>] <newbranch>

git branch (-d | -D) [-r] <branchname>…​

git branch --edit-description [<branchname>]
```

## 核心功能描述

`git branch` 命令用于列出、创建或删除分支。分支是 Git 中最核心的概念之一，它允许你在不同的开发线之间并行工作。

**适用场景**：
- 创建新的功能分支
- 查看所有本地/远程分支
- 删除已合并的功能分支
- 重命名分支

**与其他命令的边界**：
- `git branch` 只创建/删除分支，不切换；`git switch` / `git checkout` 才切换分支
- `git branch -d` 删除已合并的分支；`git branch -D` 强制删除

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<branchname>` | 分支名称 | — |
| `<start-point>` | 新分支的起始提交 | HEAD |
| `-d, --delete` | 删除已完全合并的分支 | — |
| `-D` | 强制删除分支（等同于 --delete --force） | — |
| `-m, --move` | 重命名分支 | — |
| `-M` | 强制重命名分支 | — |
| `-c, --copy` | 复制分支 | — |
| `-C` | 强制复制分支 | — |
| `-a, --all` | 列出所有分支（本地 + 远程跟踪） | 只列本地 |
| `-r, --remotes` | 列出远程跟踪分支 | — |
| `-v, -vv` | 显示分支的最后一次提交 | 关闭 |
| `--show-current` | 显示当前分支名 | — |
| `--merged [<commit>]` | 列出已合并到指定提交的分支 | — |
| `--no-merged [<commit>]` | 列出未合并的分支 | — |
| `--contains [<commit>]` | 列出包含指定提交的分支 | — |
| `-u, --set-upstream-to=<upstream>` | 设置分支的上游跟踪 | — |
| `--unset-upstream` | 取消上游跟踪 | — |
| `--track` | 创建跟踪分支 | — |
| `--no-track` | 不创建跟踪分支 | — |

## 实战示例

### 示例 1：创建和查看分支

```bash
# 创建新分支（不切换）
git branch feature-login

# 创建并切换到新分支（推荐使用 git switch -c）
git switch -c feature-login

# 查看所有本地分支
git branch

# 查看所有分支（含远程）
git branch -a

# 查看分支及其最后提交
git branch -vv

# 只显示当前分支名
git branch --show-current
```

### 示例 2：删除分支

```bash
# 删除已合并的分支（安全）
git branch -d feature-login

# 强制删除未合并的分支（慎用，会丢失未合并的提交）
git branch -D feature-login

# 删除远程分支
git push origin --delete feature-login
```

### 示例 3：查找可清理的分支

```bash
# 列出已合并到 main 的分支（可安全删除）
git branch --merged main

# 列出未合并的分支（删除前需确认）
git branch --no-merged main
```

## 常见踩坑与注意事项

::: danger 不能删除当前分支
删除分支前必须先切换到其他分支，否则会报错 `Cannot delete branch 'xxx' checked out at ...`。
:::

::: warning -d 与 -D 的区别
`-d` 只删除已合并的分支，是安全的；`-D` 强制删除，即使分支有未合并的提交也会被删除，可能导致数据丢失。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/branch-management/git-switch">git switch</a>
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/rollback-and-restore/git-reset">git reset</a>
</div>
