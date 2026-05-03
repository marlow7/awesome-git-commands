---
title: Git 核心命令对比：reset / restore / revert
---

<div class="agc-breadcrumb">
  <a href="/">首页</a>
  <span class="separator">/</span>
  <a href="/guides/">实用指南</a>
  <span class="separator">/</span>
  <span>reset / restore / revert 对比</span>
</div>

# Git 核心命令对比：reset / restore / revert

这是开发者最容易混淆的三个 Git 命令。本文将详细对比它们的核心区别与适用场景。

## 一句话总结

| 命令 | 核心作用 | 是否产生新提交 | 是否修改历史 | 安全性 |
|------|----------|----------------|--------------|--------|
| `git reset` | 移动 HEAD 和分支指针 | ❌ | ✅ | ⚠️ 危险 |
| `git restore` | 恢复工作区或暂存区的文件 | ❌ | ❌ | ✅ 安全 |
| `git revert` | 创建新提交来撤销指定提交 | ✅ | ❌ | ✅ 安全 |

## git reset — 回退到指定提交

### 核心原理

`git reset` 将当前分支的 HEAD 指针移动到指定提交，根据参数决定是否修改暂存区和工作区。

### 三种模式对比

| 模式 | HEAD | 暂存区 | 工作区 | 使用场景 |
|------|------|--------|--------|----------|
| `--soft` | ✅ 移动 | ❌ 不变 | ❌ 不变 | 撤销提交但保留变更在暂存区 |
| `--mixed`（默认） | ✅ 移动 | ✅ 重置 | ❌ 不变 | 撤销提交和暂存，保留变更在工作区 |
| `--hard` | ✅ 移动 | ✅ 重置 | ✅ 重置 | 彻底回退，丢弃所有变更 |

### 实战示例

```bash
# 撤销最近一次提交，变更保留在暂存区
git reset --soft HEAD~1

# 撤销最近一次提交，变更回到工作区
git reset HEAD~1

# 彻底回退到上一次提交（危险！变更全部丢失）
git reset --hard HEAD~1
```

::: danger --hard 会丢失数据
`git reset --hard` 会永久丢弃暂存区和工作区的所有变更。如果误操作，可通过 `git reflog` 找回。
:::

## git restore — 恢复文件状态

### 核心原理

`git restore` 是 Git 2.23 引入的命令，专门用于恢复工作区或暂存区的文件，不涉及提交操作。

### 实战示例

```bash
# 丢弃工作区的修改（恢复为暂存区的版本）
git restore src/main.js

# 取消暂存（将暂存区恢复为 HEAD 的版本，工作区不变）
git restore --staged src/main.js

# 同时恢复工作区和暂存区
git restore --staged --worktree src/main.js

# 恢复到指定提交的版本
git restore --source=HEAD~3 src/main.js
```

::: tip restore 取代了 checkout 的部分功能
Git 2.23 将 `git checkout` 的文件恢复功能拆分到 `git restore`，分支切换功能拆分到 `git switch`，使命令职责更清晰。
:::

## git revert — 安全撤销提交

### 核心原理

`git revert` 创建一个新提交来撤销指定提交的变更，不修改历史记录。适用于已推送到远程的提交。

### 实战示例

```bash
# 撤销最近一次提交
git revert HEAD

# 撤销指定提交
git revert abc1234

# 撤销多个提交（按顺序创建多个撤销提交）
git revert abc1234 def5678

# 撤销但不自动提交
git revert -n abc1234
```

## 如何选择？

### 决策流程图

```
需要撤销什么？
├── 撤销整个提交
│   ├── 提交已推送到远程？ → git revert（安全，不改历史）
│   └── 提交仅在本地？ → git reset --soft HEAD~1（干净利落）
├── 恢复文件状态
│   ├── 工作区文件误改？ → git restore <file>
│   └── 误暂存了文件？ → git restore --staged <file>
└── 彻底回退到某个版本
    └── 确认丢弃所有变更？ → git reset --hard <commit>（最后手段）
```

### 常见场景速查

| 场景 | 推荐命令 |
|------|----------|
| 刚提交了，想修改提交消息 | `git commit --amend` |
| 刚提交了，想撤销提交但保留变更 | `git reset --soft HEAD~1` |
| 误改了工作区文件，想恢复 | `git restore <file>` |
| 误暂存了文件，想取消暂存 | `git restore --staged <file>` |
| 已推送的提交有错误，需撤销 | `git revert <commit>` |
| 想彻底回退到某个历史版本 | `git reset --hard <commit>` + `git reflog` 兜底 |

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/rollback-and-restore/git-reset">git reset</a>
  <a href="/commands/scene-category/rollback-and-restore/git-restore">git restore</a>
  <a href="/commands/scene-category/rollback-and-restore/git-revert">git revert</a>
  <a href="/commands/scene-category/rollback-and-restore/git-reflog">git reflog</a>
</div>
