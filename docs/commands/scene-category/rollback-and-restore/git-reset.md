---
title: git reset
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/rollback-and-restore/">提交回滚与版本恢复</a>
  <span class="separator">/</span>
  <span>git reset</span>
</div>

<div class="agc-detail-header">

# git reset

<div class="official-def">
  Reset current HEAD to the specified state. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-medium">进阶</span>
  <span class="agc-tag agc-tag-high">场景：版本回退</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-reset" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-reset</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git reset [-q] [<tree-ish>] [--] <pathspec>…​
git reset (--patch | -p) [<tree-ish>] [--] [<pathspec>…​]
git reset [--soft | --mixed [-N] | --hard | --merge | --keep] [-q] [<commit>]
```

## 核心功能描述

`git reset` 命令将当前 HEAD 重置到指定状态。根据使用的模式不同，它可以只移动 HEAD 指针，也可以同时修改暂存区和工作区。

**三种核心模式的区别**：

| 模式 | HEAD | 暂存区 | 工作区 | 风险 |
|------|------|--------|--------|------|
| `--soft` | 移动 | 不变 | 不变 | 安全 |
| `--mixed`（默认） | 移动 | 重置 | 不变 | 中等 |
| `--hard` | 移动 | 重置 | 重置 | **危险** |

**与 git revert 的区别**：
- `git reset` 重写历史，改变 HEAD 指针位置
- `git revert` 创建新提交来撤销变更，不修改历史

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<commit>` | 重置到的目标提交 | HEAD |
| `--soft` ⭐ | 只移动 HEAD，保留暂存区和工作区 | — |
| `--mixed` ⭐ | 移动 HEAD，重置暂存区，保留工作区（默认） | 默认 |
| `--hard` ⭐ | 移动 HEAD，重置暂存区和工作区 | — |
| `--merge` | 重置暂存区和工作区，保留已修改的未暂存文件 | — |
| `--keep` | 重置暂存区和工作区，但如果有本地修改会中止 | — |
| `-N, --intent-to-add` | 配合 --mixed，将重置的路径标记为 intent-to-add | — |
| `-p, --patch` | 交互式选择要重置的变更块 | — |
| `-q, --quiet` | 静默模式 | 关闭 |
| `<pathspec>` | 只重置指定路径 | — |

## 实战示例

### 示例 1：撤销最近一次提交（保留变更）

```bash
# 撤销最近一次提交，变更保留在暂存区
git reset --soft HEAD~1

# 撤销最近一次提交，变更保留在工作区（未暂存）
git reset HEAD~1
# 等同于
git reset --mixed HEAD~1
```

### 示例 2：撤销暂存（unstage）

```bash
# 将暂存区的文件撤回到工作区
git reset HEAD src/main.js

# 撤回所有暂存
git reset HEAD
```

### 示例 3：完全回退（危险操作）

```bash
# 回退到指定提交，丢弃所有后续提交和未提交的修改
git reset --hard abc1234

# 危险！如果已推送到远程，需要 force push
```

::: danger --hard 的数据丢失风险
`git reset --hard` 会永久丢弃工作区和暂存区的所有未提交修改，且无法通过 Git 命令找回。使用前务必确认不需要保留的变更。
:::

## 常见踩坑与注意事项

::: danger --hard 已推送后的连锁问题
如果 `git reset --hard` 回退了已推送到远程的提交，后续需要 `git push --force` 才能同步，这会覆盖远程历史，影响其他协作者。**对已推送的提交，优先使用 `git revert`。**
:::

::: tip 找回被 reset 丢失的提交
如果误用了 `git reset --hard`，可以通过 `git reflog` 找到丢失的提交，然后用 `git reset --hard <commit>` 恢复。reflog 默认保留 90 天。
:::

::: warning 三种模式的选择
- 想撤销提交但保留变更：`--soft`
- 想撤销提交和暂存但保留变更：`--mixed`（默认）
- 想彻底回退：`--hard`（极度危险）
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/rollback-and-restore/git-restore">git restore</a>
  <a href="/commands/scene-category/rollback-and-restore/git-revert">git revert</a>
  <a href="/commands/scene-category/rollback-and-restore/git-reflog">git reflog</a>
  <a href="/commands/scene-category/remote-collaboration/git-push">git push</a>
</div>
