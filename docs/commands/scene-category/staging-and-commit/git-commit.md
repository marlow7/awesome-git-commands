---
title: git commit
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/staging-and-commit/">文件暂存与提交管理</a>
  <span class="separator">/</span>
  <span>git commit</span>
</div>

<div class="agc-detail-header">

# git commit

<div class="official-def">
  Record changes to the repository. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：提交</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-commit" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-commit</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git commit [-a | --interactive | --patch] [-s] [-v] [-u<mode>] [--amend]
           [--dry-run] [(-c | -C | --fixup | --squash) <commit>]
           [-F <file> | -m <msg>] [--reset-author] [--allow-empty]
           [--allow-empty-message] [--no-verify] [-e] [--author=<author>]
           [--date=<date>] [--cleanup=<mode>] [--[no-]status]
           [-i | -o] [--pathspec-from-file=<file> [--pathspec-file-nul]]
           [-S[<keyid>]] [--] [<pathspec>…​]
```

## 核心功能描述

`git commit` 命令将暂存区中的变更记录为一个新的提交（commit）。每个提交都包含一个指向当前提交内容的快照、指向上一个提交的指针（父提交）、作者信息、提交者信息和提交消息。

**适用场景**：
- 将暂存区的变更正式记录为版本历史中的一个快照
- 修改上一次提交（--amend）
- 合并多个提交为一个（配合 rebase 使用）

**与同类命令的边界**：
- `git commit` 基于暂存区创建提交；`git stash` 则是将变更暂存到 stash 栈中
- `git commit --amend` 修改最近一次提交；`git revert` 创建新提交来撤销历史提交

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `-m <msg>, --message=<msg>` | 使用给定的消息作为提交消息 | 打开编辑器 |
| `-a, --all` | 自动暂存所有已修改和已删除的已跟踪文件 | 关闭 |
| `--amend` | 修改最近一次提交 | 关闭 |
| `--fixup=<commit>` | 创建一个修复提交，用于 rebase --autosquash | — |
| `--squash=<commit>` | 创建一个压缩提交，用于 rebase --autosquash | — |
| `-c <commit>` | 使用指定提交的消息作为模板，打开编辑器 | — |
| `-C <commit>` | 使用指定提交的消息，不打开编辑器 | — |
| `-F <file>, --file=<file>` | 从文件读取提交消息 | — |
| `-e, --edit` | 配合 -C/-F 使用时，仍打开编辑器 | — |
| `--author=<author>` | 覆盖提交作者信息 | — |
| `--date=<date>` | 覆盖提交日期 | — |
| `-s, --signoff` | 在提交消息末尾添加 Signed-off-by 行 | 关闭 |
| `--no-verify` | 跳过 pre-commit 和 commit-msg 钩子 | 关闭 |
| `--allow-empty` | 允许创建空提交 | 关闭 |
| `--allow-empty-message` | 允许空提交消息 | 关闭 |
| `--reset-author` | 配合 -C/-c/--amend 使用时，重置作者信息 | 关闭 |
| `-v, --verbose` | 在提交消息编辑器中显示 diff | 关闭 |
| `-u<mode>, --untracked-files=<mode>` | 显示未跟踪文件的模式 | — |
| `--dry-run` | 试运行，不实际创建提交 | 关闭 |
| `--cleanup=<mode>` | 设置提交消息的清理模式 | default |
| `--status` | 在提交消息编辑器中包含 git status 输出 | — |
| `-S[<keyid>], --gpg-sign[=<keyid>]` | 使用 GPG 签名提交 | 关闭 |
| `--no-gpg-sign` | 不签名提交，覆盖配置 | — |
| `-i, --include` | 在提交前添加指定路径到暂存区 | — |
| `-o, --only` | 只提交指定路径的变更 | — |
| `--pathspec-from-file=<file>` | 从文件读取 pathspec | — |
| `--pathspec-file-nul` | pathspec 文件使用 NUL 字符分隔 | 关闭 |

## 实战示例

### 示例 1：基本提交

**场景**：完成一个功能开发，暂存了变更，需要创建提交

```bash
# 提交暂存区的所有变更，并编写提交消息
git commit -m "feat: add user authentication module"

# 等同于不写 -m，会打开默认编辑器编写提交消息
git commit
```

**执行效果**：创建一个新提交，包含暂存区中的所有变更，HEAD 指向新提交。

### 示例 2：提交所有已跟踪文件的修改

**场景**：修改了多个已跟踪文件，想跳过 `git add` 步骤直接提交

```bash
# 自动暂存所有已修改和已删除的已跟踪文件，并提交
git commit -a -m "fix: correct login validation logic"
```

**注意事项**：`-a` 不会自动暂存新建的未跟踪文件，新文件仍需手动 `git add`。

### 示例 3：修改最近一次提交

**场景**：刚提交完发现有遗漏文件或提交消息有误

```bash
# 修改提交消息
git commit --amend -m "feat: add user authentication and session management"

# 添加遗漏的文件到最近一次提交
git add forgotten-file.js
git commit --amend --no-edit
```

::: danger 注意
`--amend` 会修改最近一次提交的 SHA，**如果已经 push 到远程，应避免使用 --amend**，否则会导致其他协作者的提交历史冲突。
:::

## 常见踩坑与注意事项

::: warning 提交消息规范
建议遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：`type(scope): description`，如 `feat(auth): add login page`。
:::

::: danger --amend 的风险
如果已经将提交推送到远程仓库，使用 `--amend` 会导致推送时需要 `git push --force`，可能覆盖其他人的提交。**在公共分支上禁止使用 --amend 修改已推送的提交。**
:::

::: tip --no-verify 的使用
`--no-verify` 可以跳过钩子检查，但除非有明确理由（如钩子配置错误），否则不建议使用，因为它会绕过代码质量检查。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/staging-and-commit/git-add">git add</a>
  <a href="/commands/scene-category/staging-and-commit/git-status">git status</a>
  <a href="/commands/scene-category/rollback-and-restore/git-reset">git reset</a>
  <a href="/commands/scene-category/rollback-and-restore/git-revert">git revert</a>
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
</div>
