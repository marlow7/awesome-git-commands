---
title: git push
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/remote-collaboration/">远程仓库协作</a>
  <span class="separator">/</span>
  <span>git push</span>
</div>

<div class="agc-detail-header">

# git push

<div class="official-def">
  Update remote refs along with associated objects. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：推送</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-push" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-push</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git push [--all | --mirror | --tags] [--follow-tags] [--atomic] [-n | --dry-run]
         [--receive-pack=<git-receive-pack>] [--repo=<repository>]
         [-f | --force] [-d | --delete] [--prune] [-v | --verbose]
         [-u | --set-upstream] [--push-option=<string>]
         [--[no-]signed|--sign=(true|false|if-asked)]
         [--force-with-lease[=<refname>[:<expect>]]]
         [--no-verify] [<repository> [<refspec>…​]]
```

## 核心功能描述

`git push` 命令将本地提交推送到远程仓库，更新远程引用和关联的对象。这是将本地变更共享给团队其他成员的核心操作。

**适用场景**：
- 将本地新提交推送到远程仓库
- 首次推送新分支到远程并设置跟踪关系
- 删除远程分支

**与同类命令的边界**：
- `git push` 是上传操作；`git pull` / `git fetch` 是下载操作
- `git push --force` 会覆盖远程历史，应谨慎使用

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<repository>` | 远程仓库名（如 origin） | origin |
| `<refspec>` | 指定推送的分支映射 | — |
| `--all` | 推送所有本地分支 | 关闭 |
| `--tags` | 推送所有标签 | 关闭 |
| `--follow-tags` | 推送关联的附注标签 | 关闭 |
| `-f, --force` | 强制推送，覆盖远程历史 | 关闭 |
| `--force-with-lease` | 安全的强制推送，只在远程无新提交时覆盖 | 关闭 |
| `-u, --set-upstream` | 设置本地分支跟踪远程分支 | 关闭 |
| `-d, --delete` | 删除远程引用 | 关闭 |
| `--prune` | 删除远程已删除分支的本地跟踪引用 | 关闭 |
| `-n, --dry-run` | 试运行 | 关闭 |
| `--mirror` | 镜像推送所有引用 | 关闭 |
| `--atomic` | 原子推送（全部成功或全部失败） | 关闭 |
| `-v, --verbose` | 详细输出 | 关闭 |
| `--no-verify` | 跳过 pre-push 钩子 | 关闭 |
| `--push-option=<string>` | 传递给远程接收端的选项 | — |
| `--signed` | GPG 签名推送 | — |

## 实战示例

### 示例 1：推送当前分支到远程

**场景**：完成开发后推送本地提交到远程仓库

```bash
# 首次推送新分支，设置跟踪关系
git push -u origin feature-login

# 后续推送（已设置跟踪）
git push
```

### 示例 2：强制推送（需谨慎）

**场景**：使用 --amend 修改了已推送的提交，需要强制推送

```bash
# 安全的强制推送（推荐）
git push --force-with-lease origin feature-login

# 普通强制推送（危险，可能覆盖他人提交）
git push --force origin feature-login
```

::: danger 强制推送风险
`--force` 会无条件覆盖远程分支，可能丢失其他人的提交。**始终优先使用 `--force-with-lease`**，它只在远程分支未被他人更新时才允许覆盖。
:::

### 示例 3：推送标签

**场景**：创建了版本标签，需要推送到远程

```bash
# 推送单个标签
git push origin v1.0.0

# 推送所有标签
git push --tags

# 同时推送提交和关联的附注标签（推荐）
git push --follow-tags
```

## 常见踩坑与注意事项

::: danger 公共分支禁止 force push
在 main/master 等公共分支上，**严禁使用 --force 或 --force-with-lease**，这会导致其他协作者的提交历史混乱。
:::

::: warning 推送被拒绝
如果推送被拒绝（`failed to push some refs`），说明远程有新的提交。应先 `git pull` 合并远程变更后再推送。
:::

::: tip --force-with-lease 优于 --force
`--force-with-lease` 会在远程分支有新提交时拒绝推送，比 `--force` 安全得多。建议在需要强制推送时始终使用此选项。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/remote-collaboration/git-pull">git pull</a>
  <a href="/commands/scene-category/remote-collaboration/git-fetch">git fetch</a>
  <a href="/commands/scene-category/remote-collaboration/git-remote">git remote</a>
  <a href="/commands/scene-category/init-and-config/git-tag">git tag</a>
</div>
