---
title: git diff
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/log-and-diff/">日志查询与差异对比</a>
  <span class="separator">/</span>
  <span>git diff</span>
</div>

<div class="agc-detail-header">

# git diff

<div class="official-def">
  Show changes between commits, commit and working tree, etc. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-diff" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-diff</a>

</div>

## 核心功能描述

`git diff` 命令显示变更的具体内容。它是查看工作区修改、暂存区变更、提交差异的核心工具。

**三种核心用法**：

| 命令 | 比较对象 |
|------|----------|
| `git diff` | 工作区 vs 暂存区 |
| `git diff --staged` | 暂存区 vs 最新提交 |
| `git diff <commit1> <commit2>` | 两个提交之间 |

## 实战示例

```bash
# 查看工作区的修改
git diff

# 查看暂存区的修改
git diff --staged
# 或
git diff --cached

# 比较两个分支
git diff main..feature

# 只显示文件名和变更统计
git diff --stat

# 查看指定文件的差异
git diff src/main.js
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
  <a href="/commands/scene-category/log-and-diff/git-show">git show</a>
  <a href="/commands/scene-category/staging-and-commit/git-status">git status</a>
</div>
