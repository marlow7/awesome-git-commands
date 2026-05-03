---
title: git reflog
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/troubleshooting/">故障排查与恢复</a>
  <span class="separator">/</span>
  <span>git reflog</span>
</div>

<div class="agc-detail-header">

# git reflog

<div class="official-def">
  Manage reflog information. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-medium">进阶</span>
  <span class="agc-tag agc-tag-high">场景：提交恢复/故障回滚</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-reflog" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-reflog</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git reflog [show] [<log-options>] [<ref>]
git reflog list
git reflog exists <ref>
git reflog write <ref> <old-oid> <new-oid> <message>
git reflog delete [--rewrite] [--updateref]
	[--dry-run | -n] [--verbose] <ref>@{<specifier>}...
git reflog drop [--all [--single-worktree] | <refs>…]
git reflog expire [--expire=<time>] [--expire-unreachable=<time>]
	[--rewrite] [--updateref] [--stale-fix]
	[--dry-run | -n] [--verbose] [--all [--single-worktree] | <refs>…]
```

## 核心功能描述

`git reflog` 是 Git 的「引用日志管理」核心命令，也是开发者的「终极后悔药」。它会完整记录本地仓库中所有分支、标签、HEAD 等引用的末端更新历史，覆盖分支切换、提交、合并、重置、变基、删除等全量操作，即使这些操作已从分支历史中消失，依然能在 reflog 中找到完整记录。

reflog 的核心价值在于，它能让你定位到仓库任意时刻的状态，恢复误删的分支、错误重置的提交、失败的变基/合并等几乎所有本地操作失误。Git 中绝大多数的「数据丢失」场景，都能通过 reflog 找回，是 Git 故障恢复的核心工具。

**核心适用场景**：
- 恢复 `git reset --hard` 误丢弃的提交与代码
- 找回误删除的本地分支及其完整提交历史
- 修复失败的 `git rebase`、`git merge` 操作，还原仓库状态
- 查看分支切换历史，追溯仓库状态变更过程
- 定位代码丢失的操作节点，还原到任意历史时刻

## 核心子命令速览

| 子命令 | 核心作用 |
|--------|----------|
| `show` | 默认子命令，展示指定引用的 reflog 日志，不指定引用时默认展示 `HEAD` 的 reflog |
| `list` | 列出当前仓库中所有存在对应 reflog 的引用 |
| `exists` | 检查指定引用是否存在 reflog，脚本中用于自动化判断 |
| `delete` | 删除 reflog 中的指定单条记录，不删除整个 reflog |
| `drop` | 彻底删除指定引用的整个 reflog，风险极高 |
| `expire` | 修剪超过指定时间的老旧 reflog 记录，`git gc` 会自动调用 |

## 全量参数详解

| 参数 | 适用子命令 | 描述 | 默认值 |
|------|------------|------|--------|
| `<ref>` | show/exists/write/delete | 指定要操作的引用，如 `HEAD`、`main`、`dev` | 无，默认 `HEAD` |
| `<log-options>` | show | 所有 `git log` 支持的格式化、筛选选项 | 无 |
| `--all` | drop/expire | 操作所有引用的 reflog | 关闭 |
| `--single-worktree` | drop/expire | 配合 `--all` 使用，仅处理当前工作树的 reflog | 关闭，默认处理所有工作树 |
| `--expire=<time>` | expire | 设置可达记录的过期时间，支持 `90.days.ago`、`never`、`all` 等值 | 默认90天，读取 `gc.reflogExpire` 配置 |
| `--expire-unreachable=<time>` | expire | 设置不可达记录的过期时间 | 默认30天，读取 `gc.reflogExpireUnreachable` 配置 |
| `--updateref` | delete/expire | 修剪顶部记录时，同步更新引用的指向 | 关闭 |
| `--rewrite` | delete/expire | 修剪记录时，自动调整前后记录的 SHA-1 关联 | 关闭 |
| `-n, --dry-run` | delete/expire | 干运行模式，仅预览操作结果，不实际修改数据 | 关闭 |
| `--verbose` | delete/expire | 输出详细的操作日志 | 关闭 |
| `--stale-fix` | expire | 清理指向损坏对象的 reflog 记录，修复旧版本 Git 导致的仓库损坏 | 关闭 |

## 实战示例

### 示例1：基础查看与核心恢复场景（最常用）
```bash
# 查看 HEAD 的 reflog 记录（默认行为，最常用）
git reflog

# 查看指定分支的 reflog 记录
git reflog show main

# 恢复 git reset --hard 误丢弃的提交
# 1. 找到误操作前的记录序号（如 HEAD@{2}）
git reflog
# 2. 重置回误操作前的状态
git reset --hard HEAD@{2}

# 恢复误删除的本地分支
# 1. 找到分支删除前的最后一次提交记录
git reflog
# 2. 从记录中重建分支
git checkout -b dev HEAD@{3}
```

### 示例2：时间定位与高级筛选
```bash
# 查看1天前 HEAD 指向的状态
git reflog show HEAD@{1.day.ago}

# 查看1周前 main 分支的状态
git reflog show main@{1.week.ago}

# 格式化输出 reflog 完整信息
git reflog --pretty=format:"%h | %gd | %gs | %cr | %an"
```

### 示例3：reflog 管理与维护
```bash
# 列出当前仓库所有带 reflog 的引用
git reflog list

# 预览即将过期清理的 reflog 记录
git reflog expire --dry-run --expire=30.days.ago --all

# 手动清理超过30天的 reflog 记录
git reflog expire --expire=30.days.ago --all
```

## 常见踩坑与注意事项

::: warning reflog 是本地独有的，不会同步到远程仓库
reflog 仅记录本地仓库的操作历史，不会随着 `git push` 同步到远程仓库；重新克隆仓库后，原仓库的 reflog 会完全丢失，其他协作者也无法访问你的 reflog 记录。
:::

::: tip reflog 记录有过期时间，不是永久保留
Git 会自动清理过期的 reflog 记录，默认规则：可达记录保留90天，不可达记录保留30天；可通过 `gc.reflogExpire` 和 `gc.reflogExpireUnreachable` 配置自定义过期时间。
:::

::: danger drop/expire 操作不可逆
`git reflog drop` 和 `git reflog expire` 会永久删除 reflog 记录，一旦执行，被删除的记录将无法恢复，彻底失去对应的恢复能力，非必要场景不要手动执行，交给 `git gc` 自动处理即可。
:::

::: warning 误操作后第一时间不要执行 git gc
`git gc` 会自动清理不可达对象和过期 reflog 记录，发生误操作后，不要执行 `git gc`，先通过 reflog 定位并恢复数据，否则可能导致对象被清理，无法恢复。
:::

::: tip HEAD 与分支 reflog 的核心区别
`HEAD` 的 reflog 会记录所有操作，包括分支切换；而分支的 reflog 仅记录该分支本身的更新操作，分支切换不会被记录，排查全量操作历史优先查看 `HEAD` 的 reflog。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/branch-management/git-reset">git reset</a>
  <a href="/commands/scene-category/troubleshooting/git-fsck">git fsck</a>
  <a href="/commands/scene-category/repo-optimization/git-gc">git gc</a>
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/merge-and-rebase/git-rebase">git rebase</a>
</div>