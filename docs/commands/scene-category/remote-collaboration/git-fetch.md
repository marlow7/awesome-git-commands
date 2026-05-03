---
title: git fetch
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/remote-collaboration/">远程仓库协作</a>
  <span class="separator">/</span>
  <span>git fetch</span>
</div>

<div class="agc-detail-header">

# git fetch

<div class="official-def">
  Download objects and refs from another repository. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：拉取远程数据</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-fetch" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-fetch</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git fetch [<options>] [<repository> [<refspec>…​]]
git fetch [<options>] <group>
git fetch --multiple [<options>] [(<repository> | <group>)…​]
git fetch --all [<options>]
```

## 核心功能描述

`git fetch` 命令从远程仓库下载对象和引用，但**不会**修改工作区或合并变更。它是安全的远程数据获取方式。

**与 git pull 的区别**：
- `git fetch` 只下载，不合并
- `git pull` = `git fetch` + `git merge`（或 rebase）

**适用场景**：
- 查看远程仓库的最新变更，再决定是否合并
- 在不确定远程变更内容时，安全地获取最新数据

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `--all` | 获取所有远程仓库的更新 | — |
| `-p, --prune` | 删除远程已删除分支的本地跟踪引用 | 关闭 |
| `--dry-run` | 试运行 | 关闭 |
| `--depth=<depth>` | 浅获取 | — |
| `--unshallow` | 转为完整获取 | — |
| `-q, --quiet` | 静默模式 | 关闭 |
| `-v, --verbose` | 详细输出 | 关闭 |
| `--tags` | 同时获取标签 | — |
| `--no-tags` | 不获取标签 | — |
| `-j, --jobs=<n>` | 并行下载的子模块数量 | — |
| `--recurse-submodules` | 递归获取子模块 | — |

## 实战示例

### 示例 1：获取远程更新

```bash
# 获取 origin 的所有更新
git fetch origin

# 获取所有远程仓库的更新
git fetch --all

# 获取并清理已删除的远程分支
git fetch -p
```

### 示例 2：查看获取的更新

```bash
# 获取后查看远程分支的最新提交
git fetch origin
git log HEAD..origin/main --oneline

# 查看远程分支的变更摘要
git diff --stat HEAD..origin/main
```

## 常见踩坑与注意事项

::: tip fetch 比 pull 更安全
`git fetch` 不会修改工作区和当前分支，可以安全地先查看远程变更再决定如何合并。建议在不确定远程变更内容时优先使用 `git fetch`。
:::

::: warning 定期使用 --prune
远程分支被删除后，本地仍会保留对应的远程跟踪引用。使用 `git fetch -p` 或 `git remote prune origin` 清理。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/remote-collaboration/git-pull">git pull</a>
  <a href="/commands/scene-category/remote-collaboration/git-push">git push</a>
  <a href="/commands/scene-category/remote-collaboration/git-remote">git remote</a>
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
</div>
