---
title: git cherry-pick
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/merge-and-rebase/">代码合并与变基</a>
  <span class="separator">/</span>
  <span>git cherry-pick</span>
</div>

<div class="agc-detail-header">

# git cherry-pick

<div class="official-def">
  Apply the changes introduced by some existing commits. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-medium">进阶</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-cherry-pick" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-cherry-pick</a>

</div>

## 核心功能描述

`git cherry-pick` 命令将指定提交引入的变更应用到当前分支。它用于从其他分支挑选特定的提交，而不需要合并整个分支。

## 实战示例

```bash
# 将指定提交应用到当前分支
git cherry-pick abc1234

# 应用多个提交
git cherry-pick abc1234 def5678

# 应用提交但不自动提交
git cherry-pick -n abc1234

# 中止 cherry-pick
git cherry-pick --abort

# 继续冲突解决后的 cherry-pick
git cherry-pick --continue
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/merge-and-rebase/git-rebase">git rebase</a>
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
</div>
