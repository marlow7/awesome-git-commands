---
title: git merge
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/merge-and-rebase/">代码合并与变基</a>
  <span class="separator">/</span>
  <span>git merge</span>
</div>

<div class="agc-detail-header">

# git merge

<div class="official-def">
  Join two or more development histories together. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-medium">进阶</span>
  <span class="agc-tag agc-tag-high">场景：分支合并</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-merge" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-merge</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git merge [-n] [--stat] [--no-commit] [--squash] [--[no-]edit]
          [--no-verify] [-s <strategy>] [-X <strategy-option>]
          [--[no-]allow-unrelated-histories]
          [--[no-]rerere-autoupdate] [-m <msg>] [--into-name <name>]
          [<commit>…​]
git merge (--continue | --abort | --quit)
```

## 核心功能描述

`git merge` 命令将指定分支的变更合并到当前分支。如果两个分支修改了同一部分代码，会产生合并冲突，需要手动解决。

**适用场景**：
- 将功能分支合并到主分支
- 同步不同开发线的变更

**与 git rebase 的区别**：
- `git merge` 保留完整的分支历史，创建合并提交
- `git rebase` 将提交重新应用到目标分支顶端，保持线性历史
- 公共分支用 merge，个人分支用 rebase

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<commit>…​` | 要合并的提交或分支 | — |
| `--ff` | 快进合并（默认行为） | 开启 |
| `--no-ff` | 禁止快进，总是创建合并提交 | 关闭 |
| `--ff-only` | 只允许快进合并，否则中止 | 关闭 |
| `--squash` | 将合并内容压缩为工作区变更 | 关闭 |
| `--no-commit` | 不自动提交合并结果 | 关闭 |
| `-m <msg>` | 设置合并提交消息 | 自动生成 |
| `--edit, -e` | 编辑合并提交消息 | — |
| `--no-edit` | 不编辑合并提交消息 | — |
| `--abort` | 中止合并，恢复合并前状态 | — |
| `--continue` | 解决冲突后继续合并 | — |
| `--quit` | 退出合并但保留工作区变更 | — |
| `-s <strategy>` | 合并策略 | ort |
| `-X <option>` | 合并策略选项 | — |
| `--allow-unrelated-histories` | 允许合并不相关的历史 | 关闭 |
| `--no-verify` | 跳过 pre-merge-commit 钩子 | 关闭 |

## 实战示例

### 示例 1：基本合并

```bash
# 切换到目标分支
git switch main

# 合并功能分支
git merge feature-login

# 禁止快进合并（保留分支历史）
git merge --no-ff feature-login
```

### 示例 2：解决合并冲突

```bash
# 合并时产生冲突
git merge feature-login
# 输出: CONFLICT (content): Merge conflict in src/main.js

# 手动编辑冲突文件，选择保留的内容
# 冲突标记: <<<<<<< HEAD / ======= / >>>>>>> feature-login

# 标记冲突已解决
git add src/main.js

# 完成合并
git commit
```

### 示例 3：squash 合并

```bash
# 将功能分支的所有提交压缩为一个变更集
git merge --squash feature-login

# 手动提交
git commit -m "feat: add login functionality"
```

## 常见踩坑与注意事项

::: danger 合并冲突处理
遇到合并冲突时，必须手动编辑冲突文件解决冲突。使用 `git merge --abort` 可以放弃合并，恢复到合并前的状态。
:::

::: tip --no-ff vs --ff
在合并功能分支到主分支时，建议使用 `--no-ff`，这样可以保留分支历史信息，方便日后追溯。快进合并不会创建合并提交，会丢失分支信息。
:::

::: warning squash 合并不会自动提交
`--squash` 只是将变更放到工作区，需要手动 `git commit`。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/merge-and-rebase/git-rebase">git rebase</a>
  <a href="/commands/scene-category/merge-and-rebase/git-cherry-pick">git cherry-pick</a>
  <a href="/commands/scene-category/branch-management/git-branch">git branch</a>
  <a href="/commands/scene-category/staging-and-commit/git-add">git add</a>
</div>
