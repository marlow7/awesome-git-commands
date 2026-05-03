---
title: git restore
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/rollback-and-restore/">提交回滚与版本恢复</a>
  <span class="separator">/</span>
  <span>git restore</span>
</div>

<div class="agc-detail-header">

# git restore

<div class="official-def">
  Restore working tree files. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：文件恢复</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-restore" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-restore</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git restore [<options>] [--source=<tree>] [--staged] [--worktree] [--] <pathspec>…​
git restore (-p|--patch) [<options>] [--source=<tree>] [--staged] [--worktree] [--] [<pathspec>…​]
```

## 核心功能描述

`git restore` 命令用于恢复工作区或暂存区的文件，是 Git 2.23+ 引入的命令，用于替代 `git checkout` 的文件恢复功能。

**适用场景**：
- 丢弃工作区中对文件的修改
- 将暂存区的文件撤回（unstage）
- 从指定提交恢复文件

**与 git reset 的区别**：
- `git restore` 只恢复文件，不移动 HEAD
- `git reset` 移动 HEAD 指针，可能影响提交历史

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<pathspec>` | 要恢复的文件路径（必填） | — |
| `--source=<tree>` ⭐ | 从指定提交/分支恢复文件 | HEAD 或 index |
| `--staged` ⭐ | 恢复暂存区的文件（unstage） | — |
| `--worktree` | 恢复工作区的文件 | 默认行为 |
| `-S, --staged` | 恢复暂存区 | — |
| `-W, --worktree` | 恢复工作区 | — |
| `-p, --patch` | 交互式选择要恢复的变更块 | — |
| `-q, --quiet` | 静默模式 | 关闭 |
| `--ours` | 冲突时选择我们的版本 | — |
| `--theirs` | 冲突时选择他们的版本 | — |
| `--merge` | 恢复冲突文件的工作区版本 | — |
| `--ignore-unmerged` | 忽略未合并的文件 | — |
| `--ignore-skip-worktree-bits` | 忽略 skip-worktree 设置 | — |
| `--recurse-submodules` | 递归恢复子模块 | — |
| `--overlay` | 不删除文件，只恢复内容 | — |
| `--no-overlay` | 恢复后删除不在源中的文件 | 默认 |

## 实战示例

### 示例 1：丢弃工作区修改

```bash
# 丢弃单个文件的工作区修改
git restore README.md

# 丢弃所有工作区修改
git restore .
```

### 示例 2：撤销暂存（unstage）

```bash
# 将暂存区的文件撤回到工作区
git restore --staged src/main.js

# 撤回所有暂存
git restore --staged .
```

### 示例 3：从指定提交恢复文件

```bash
# 从 main 分支恢复文件
git restore --source=main config.js

# 从上一个提交恢复文件
git restore --source=HEAD~1 README.md
```

## 常见踩坑与注意事项

::: danger 丢弃工作区修改不可恢复
`git restore` 丢弃的工作区修改无法通过 Git 命令找回。执行前请确认不需要保留这些修改。
:::

::: tip restore 与 reset 的选择
- 只想撤销暂存（unstage）：用 `git restore --staged`
- 想撤销提交：用 `git reset`
- 想丢弃工作区修改：用 `git restore`
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/rollback-and-restore/git-reset">git reset</a>
  <a href="/commands/scene-category/rollback-and-restore/git-revert">git revert</a>
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
  <a href="/commands/scene-category/staging-and-commit/git-add">git add</a>
</div>
