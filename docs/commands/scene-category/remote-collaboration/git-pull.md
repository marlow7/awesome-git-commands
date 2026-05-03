---
title: git pull
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/remote-collaboration/">远程仓库协作</a>
  <span class="separator">/</span>
  <span>git pull</span>
</div>

<div class="agc-detail-header">

# git pull

<div class="official-def">
  Fetch from and integrate with another repository or a local branch. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：拉取</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-pull" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-pull</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git pull [options] [<repository> [<refspec>…​]]
```

## 核心功能描述

`git pull` 命令从远程仓库获取变更并自动合并到当前分支。它实际上是 `git fetch` + `git merge` 的组合操作。

**适用场景**：
- 同步远程仓库的最新变更到本地
- 在推送前先拉取他人的最新提交

**与同类命令的边界**：
- `git pull` = `git fetch` + `git merge`（默认）；可配置为 `git fetch` + `git rebase`
- `git fetch` 只下载不合并；`git pull` 下载并自动合并

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `--rebase[=false\|true\|merges\|preserve\|interactive]` | 使用 rebase 代替 merge 合并变更 | 配置决定 |
| `--no-rebase` | 使用 merge 代替 rebase | — |
| `--ff, --ff-only` | 快进合并；--ff-only 只允许快进合并 | --ff |
| `--no-ff` | 禁止快进合并，总是创建合并提交 | — |
| `--commit` | 自动提交合并结果 | 开启 |
| `--no-commit` | 不自动提交合并结果 | 关闭 |
| `--squash` | 将合并内容压缩为工作区的变更 | 关闭 |
| `--allow-unrelated-histories` | 允许合并不相关的历史 | 关闭 |
| `-v, --verbose` | 详细输出 | 关闭 |
| `-q, --quiet` | 静默模式 | 关闭 |
| `--autostash` | 自动在操作前后使用 stash | 关闭 |
| `--depth <depth>` | 浅克隆的深度 | — |
| `--unshallow` | 将浅克隆转为完整克隆 | — |

## 实战示例

### 示例 1：拉取并合并远程变更

**场景**：团队成员推送了新提交，需要同步到本地

```bash
# 拉取当前分支的远程变更并合并
git pull

# 使用 rebase 方式拉取（推荐，保持提交历史线性）
git pull --rebase

# 只允许快进合并（如果远程有新提交但本地也有未推送的提交，会失败）
git pull --ff-only
```

### 示例 2：拉取指定远程和分支

**场景**：从非默认远程仓库拉取变更

```bash
# 从 upstream 远程拉取 main 分支
git pull upstream main
```

## 常见踩坑与注意事项

::: warning 推荐使用 git pull --rebase
默认的 `git pull` 会创建一个合并提交，导致提交历史混乱。建议配置 `git config --global pull.rebase true` 或使用 `git pull --rebase`，保持提交历史线性。
:::

::: tip 更安全的做法：先 fetch 再 merge/rebase
```bash
git fetch origin
git log --oneline origin/main..HEAD  # 查看本地领先的提交
git rebase origin/main               # 或 git merge origin/main
```
这样可以先查看远程变更再决定如何合并，比 `git pull` 更可控。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/remote-collaboration/git-fetch">git fetch</a>
  <a href="/commands/scene-category/remote-collaboration/git-push">git push</a>
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/merge-and-rebase/git-rebase">git rebase</a>
</div>
