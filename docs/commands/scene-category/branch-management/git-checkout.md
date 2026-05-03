---
title: git checkout
---

<div class="agc-breadcrumb">
  <a href="../../">命令大全</a>
  <span class="separator">/</span>
  <a href="./">分支管理与切换</a>
  <span class="separator">/</span>
  <span>git checkout</span>
</div>

<div class="agc-detail-header">

# git checkout

<div class="official-def">
  Switch branches or restore working tree files. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：分支切换 / 文件恢复</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-checkout" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-checkout</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git checkout [-q] [-f] [-m] [--detach] <commit>
git checkout [-q] [-f] [-m] --detach [<branch>]
git checkout [[-q] [-f] [-l] [-b <new-branch>] [-t|--track[=(direct|inherit)]]
             [--orphan <new-branch>] [-B <new-branch>]
             [--[no-]overlay] [--[no-]recurse-submodules]
             [--conserve-mode] <branch>]
git checkout [-f|--ours|--theirs|-m|--conflict=<style>]
             [--[no-]overlay] [--[no-]recurse-submodules]
             [<tree-ish>] [--] <pathspec>…​
```

## 核心功能描述

`git checkout` 是一个多功能命令，可以切换分支、创建新分支、恢复工作区文件。由于其职责不单一，Git 2.23+ 引入了 `git switch` 和 `git restore` 分别替代其分支切换和文件恢复功能。

**适用场景**：
- 切换到已有分支
- 创建并切换到新分支
- 恢复工作区文件到暂存区或指定提交的状态

::: tip 推荐使用新命令
Git 2.23+ 推荐使用 `git switch` 替代分支切换功能，`git restore` 替代文件恢复功能，语义更清晰。
:::

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `-b <new-branch>` | 创建新分支并切换 | — |
| `-B <new-branch>` | 创建或重置新分支并切换 | — |
| `-t, --track` | 创建跟踪远程分支的本地分支 | — |
| `--orphan <new-branch>` | 创建孤立分支（无提交历史） | — |
| `--detach` | 分离 HEAD 模式 | — |
| `-f, --force` | 强制切换（丢弃本地修改） | 关闭 |
| `-q, --quiet` | 静默模式 | 关闭 |
| `--ours, --theirs` | 冲突时选择我们的/他们的版本 | — |
| `-m, --merge` | 切换分支时合并本地修改 | 关闭 |
| `--conflict=<style>` | 冲突标记风格 | merge |
| `<tree-ish> -- <pathspec>` | 恢复指定文件到指定提交的状态 | — |

## 实战示例

### 示例 1：切换分支

```bash
# 切换到已有分支
git checkout main

# 创建并切换到新分支
git checkout -b feature-login

# 基于远程分支创建本地跟踪分支
git checkout -b feature-login origin/feature-login
```

### 示例 2：恢复工作区文件

```bash
# 恢复文件到暂存区的状态（丢弃工作区修改）
git checkout -- README.md

# 恢复文件到指定提交的状态
git checkout HEAD~2 -- config.js
```

::: warning checkout 恢复文件的歧义
当文件名与分支名相同时，`git checkout <name>` 会被解释为切换分支。使用 `git checkout -- <name>` 明确指定为恢复文件。
:::

## 常见踩坑与注意事项

::: danger 丢弃未提交的修改
切换分支时，如果工作区有未提交的修改且与目标分支冲突，Git 可能拒绝切换或强制覆盖。建议先 `git stash` 暂存变更。
:::

::: warning detached HEAD 状态
`git checkout <commit-hash>` 会进入分离 HEAD 状态，此时提交不会被任何分支引用。如需保留提交，应先创建分支：`git checkout -b <branch>`。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/branch-management/git-switch">git switch</a>
  <a href="/commands/scene-category/rollback-and-restore/git-restore">git restore</a>
  <a href="/commands/scene-category/branch-management/git-branch">git branch</a>
  <a href="/commands/scene-category/staging-and-commit/git-stash">git stash</a>
</div>
