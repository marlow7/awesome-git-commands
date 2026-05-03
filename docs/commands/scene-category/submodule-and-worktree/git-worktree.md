---
title: git worktree
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/submodule-and-worktree/">子模块与多工作树管理</a>
  <span class="separator">/</span>
  <span>git worktree</span>
</div>

# git worktree

管理多个工作树。

<a class="official-link" href="https://git-scm.com/docs/git-worktree" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-worktree</a>

## 实战示例

```bash
# 创建新的工作树
git worktree add ../hotfix-branch hotfix/urgent-fix

# 列出所有工作树
git worktree list

# 删除工作树
git worktree remove ../hotfix-branch

# 清理已删除的工作树
git worktree prune
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/submodule-and-worktree/git-submodule">git submodule</a>
  <a href="/commands/scene-category/branch-management/git-branch">git branch</a>
</div>
