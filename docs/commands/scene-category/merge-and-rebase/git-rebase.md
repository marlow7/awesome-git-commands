---
title: git rebase
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/merge-and-rebase/">代码合并与变基</a>
  <span class="separator">/</span>
  <span>git rebase</span>
</div>

<div class="agc-detail-header">

# git rebase

<div class="official-def">
  Reapply commits on top of another base tip. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-medium">进阶</span>
  <span class="agc-tag agc-tag-high">场景：变基</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-rebase" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-rebase</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git rebase [-i | --interactive] [<options>] [--exec <cmd>]
           [--onto <newbase> | --keep-base] [<upstream> [<branch>]]

git rebase [-i | --interactive] [<options>] [--exec <cmd>] [--onto <newbase>]
           --root [<branch>]

git rebase (--continue | --skip | --abort | --quit | --edit-todo)
```

## 核心功能描述

`git rebase` 命令将当前分支的提交重新应用到另一个基线提交之上。它通过"重放"提交来实现，可以保持提交历史的线性。

**适用场景**：
- 将功能分支更新到主分支最新状态
- 交互式修改提交历史（合并、重排、编辑提交消息）
- 保持提交历史整洁

**与 git merge 的区别**：
- `git rebase` 重写提交历史，保持线性；`git merge` 创建合并提交，保留分支历史
- **黄金法则**：不要对已推送到公共仓库的提交执行 rebase

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<upstream>` | 变基的目标上游分支 | — |
| `<branch>` | 要变基的分支 | 当前分支 |
| `--onto <newbase>` | 变基到指定的提交而非上游 | — |
| `-i, --interactive` | 交互式变基 | 关闭 |
| `--continue` | 解决冲突后继续变基 | — |
| `--skip` | 跳过当前提交 | — |
| `--abort` | 中止变基，恢复原始状态 | — |
| `--quit` | 退出变基但保留工作区 | — |
| `--edit-todo` | 编辑交互式变基的待办列表 | — |
| `--exec <cmd>` | 在每个提交后执行命令 | — |
| `--autosquash` | 自动标记 fixup/squash 提交 | 关闭 |
| `--autostash` | 自动在操作前后使用 stash | 关闭 |
| `--no-autostash` | 不自动 stash | — |
| `--keep-base` | 保留合并基线 | 关闭 |
| `--root` | 变基到仓库根提交 | 关闭 |
| `--no-ff` | 禁止快进变基 | — |

## 实战示例

### 示例 1：基本变基

```bash
# 将 feature 分支变基到 main 最新
git switch feature
git rebase main

# 或者一步完成
git rebase main feature
```

### 示例 2：交互式变基（最常用）

```bash
# 修改最近 3 个提交
git rebase -i HEAD~3
```

在编辑器中显示：
```
pick abc1234 feat: add login page
pick def5678 fix: correct validation
pick ghi9012 docs: update README

# 可用操作：
# pick   = 保留提交
# reword = 保留提交，修改提交消息
# edit   = 保留提交，暂停修改
# squash = 合并到上一个提交
# fixup  = 合并到上一个提交，丢弃消息
# drop   = 删除提交
```

### 示例 3：中止和继续变基

```bash
# 遇到冲突
git rebase main
# ... 解决冲突 ...
git add .
git rebase --continue

# 放弃变基
git rebase --abort
```

## 常见踩坑与注意事项

::: danger 黄金法则：不要对公共分支执行 rebase
对已推送到远程的提交执行 rebase 会改变提交的 SHA，导致其他协作者的历史与你的不一致。**永远不要对 main/master 等公共分支执行 rebase。**
:::

::: warning rebase 过程中的冲突
rebase 可能在每个提交上都产生冲突，需要逐一解决。如果冲突太多，可以使用 `git rebase --abort` 放弃，改用 `git merge`。
:::

::: tip 交互式变基是 Git 最强大的功能之一
通过 `git rebase -i`，你可以：合并多个小提交为一个、修改历史提交消息、删除不需要的提交、调整提交顺序。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/merge-and-rebase/git-cherry-pick">git cherry-pick</a>
  <a href="/commands/scene-category/rollback-and-restore/git-reset">git reset</a>
  <a href="/commands/scene-category/rollback-and-restore/git-revert">git revert</a>
</div>
