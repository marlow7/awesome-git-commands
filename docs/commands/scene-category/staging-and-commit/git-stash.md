---
title: git stash
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/staging-and-commit/">文件暂存与提交管理</a>
  <span class="separator">/</span>
  <span>git stash</span>
</div>

<div class="agc-detail-header">

# git stash

<div class="official-def">
  Stash the changes in a dirty working directory away. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-medium">进阶</span>
  <span class="agc-tag agc-tag-high">场景：暂存工作</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-stash" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-stash</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git stash list [<log-options>]
git stash show [<stash>]
git stash drop [-q | --quiet] [<stash>]
git stash pop [--index] [-q | --quiet] [<stash>]
git stash branch <branchname> [<stash>]
git stash [push [-p | --patch] [-k | --[no-]keep-index] [-q | --quiet]
           [-u | --include-untracked] [-a | --all] [--] [<pathspec>…​]]
git stash clear
git stash create [<message>]
git stash store [-m | --message <message>] [-q | --quiet] <commit>
```

## 核心功能描述

`git stash` 命令将当前工作目录中的脏状态（已修改的已跟踪文件和暂存的变更）保存到 stash 栈中，然后恢复工作目录到干净状态。之后可以通过 `git stash pop` 或 `git stash apply` 恢复这些变更。

**适用场景**：
- 需要切换分支处理紧急任务，但当前工作尚未完成
- 想暂时保存当前修改，拉取远程更新后再恢复
- 需要在一个干净的工作树上测试某些操作

**与其他命令的边界**：
- `git stash` 是临时保存，不创建提交；`git commit` 创建正式提交
- `git stash pop` 恢复并删除 stash；`git stash apply` 只恢复不删除

## 全量参数详解（push 子命令）

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `-p, --patch` | 交互式选择要暂存的变更块 | 关闭 |
| `-k, --keep-index` | 保留暂存区中的变更不被 stash | 关闭 |
| `--no-keep-index` | 暂存所有变更（包括暂存区的） | 开启 |
| `-u, --include-untracked` | 同时暂存未跟踪的文件 | 关闭 |
| `-a, --all` | 暂存所有文件（包括被忽略的文件） | 关闭 |
| `-q, --quiet` | 静默模式 | 关闭 |
| `-m <msg>, --message <msg>` | 为 stash 条目添加描述消息 | — |
| `<pathspec>…​` | 只暂存指定路径的变更 | — |
| `--index` (pop/apply) | 恢复暂存区状态 | 关闭 |

## 实战示例

### 示例 1：暂存当前工作并切换分支

**场景**：正在 feature 分支开发，需要紧急修复 main 分支的 bug

```bash
# 暂存当前所有变更
git stash push -m "WIP: feature login page"

# 切换到 main 分支修复 bug
git switch main
# ... 修复 bug ...

# 回到 feature 分支恢复工作
git switch feature
git stash pop
```

### 示例 2：暂存包含未跟踪文件的工作

**场景**：创建了新文件但还没 git add，也想一并暂存

```bash
# 暂存所有变更，包括未跟踪的新文件
git stash push -u -m "WIP: new feature with untracked files"

# 查看所有 stash 条目
git stash list

# 恢复但不删除 stash
git stash apply stash@{0}
```

### 示例 3：部分暂存

**场景**：只想暂存某些文件的变更

```bash
# 只暂存指定文件
git stash push -m "temp" src/config.js

# 交互式选择要暂存的变更块
git stash push -p
```

## 常见踩坑与注意事项

::: danger stash pop 的冲突
如果 `git stash pop` 恢复时产生冲突，stash 条目不会被自动删除。需要手动解决冲突后执行 `git stash drop` 删除该条目。
:::

::: warning 未跟踪文件默认不被暂存
`git stash` 默认不暂存未跟踪的文件。如果需要包含未跟踪文件，必须使用 `-u` 参数；如果还需要包含被忽略的文件，使用 `-a` 参数。
:::

::: tip 及时清理 stash
长期不清理的 stash 条目可能导致困惑。建议使用 `git stash list` 定期检查，用 `git stash drop` 清理不再需要的条目。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/staging-and-commit/git-add">git add</a>
  <a href="/commands/scene-category/staging-and-commit/git-commit">git commit</a>
  <a href="/commands/scene-category/branch-management/git-switch">git switch</a>
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
</div>
