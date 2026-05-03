---
title: git switch
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/branch-management/">分支管理与切换</a>
  <span class="separator">/</span>
  <span>git switch</span>
</div>

<div class="agc-detail-header">

# git switch

<div class="official-def">
  Switch branches. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：分支切换</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-switch" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-switch</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git switch [-c | -C] [--guess] [--force] [-d] [--merge] [--conflict=<style>]
           [--orphan <new-branch>] [--[no-]track] [--recurse-submodules]
           [-f | --discard-changes] [-q | --quiet] [<branch>]
```

## 核心功能描述

`git switch` 命令用于切换分支，是 Git 2.23+ 引入的命令，用于替代 `git checkout` 的分支切换功能，语义更清晰。

**适用场景**：
- 切换到已有分支
- 创建并切换到新分支

**与 git checkout 的区别**：
- `git switch` 只负责分支切换，不会恢复文件
- `git restore` 负责文件恢复
- 两者组合替代了 `git checkout` 的全部功能

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<branch>` | 要切换到的分支名 | — |
| `-c <new-branch>, --create <new-branch>` | 创建新分支并切换 | — |
| `-C <new-branch>, --force-create <new-branch>` | 创建或重置新分支并切换 | — |
| `-d, --detach` | 切换到分离 HEAD 模式 | — |
| `--orphan <new-branch>` | 创建孤立分支 | — |
| `--guess` | 当本地分支不存在时尝试匹配远程分支 | 开启 |
| `-f, --force, --discard-changes` | 丢弃本地修改强制切换 | 关闭 |
| `-t, --track[=(direct\|inherit)]` | 设置跟踪关系 | — |
| `--no-track` | 不设置跟踪关系 | — |
| `--merge` | 切换时合并本地修改 | 关闭 |
| `--conflict=<style>` | 冲突标记风格 | — |
| `-q, --quiet` | 静默模式 | 关闭 |
| `--recurse-submodules` | 递归更新子模块 | — |

## 实战示例

### 示例 1：切换分支

```bash
# 切换到已有分支
git switch main

# 创建并切换到新分支
git switch -c feature-login

# 基于指定提交创建分支
git switch -c hotfix-123 abc1234
```

### 示例 2：切换到远程分支

```bash
# 自动创建跟踪远程分支的本地分支
git switch feature-remote
# 等同于
git switch -c feature-remote origin/feature-remote
```

## 常见踩坑与注意事项

::: tip 优先使用 git switch 替代 git checkout
`git switch` 语义明确，只做分支切换，不会误操作恢复文件。Git 2.23+ 强烈推荐使用。
:::

::: warning 切换前保存工作
如果工作区有未提交的修改且与目标分支冲突，Git 会拒绝切换。此时应先 `git stash` 暂存变更。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
  <a href="/commands/scene-category/rollback-and-restore/git-restore">git restore</a>
  <a href="/commands/scene-category/branch-management/git-branch">git branch</a>
  <a href="/commands/scene-category/staging-and-commit/git-stash">git stash</a>
</div>
