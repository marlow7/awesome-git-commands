---
title: 核心高层命令（Main Porcelain Commands）
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <span>官方原生分类</span>
  <span class="separator">/</span>
  <span>核心高层命令</span>
</div>

# 核心高层命令（Main Porcelain Commands）

> 官方定义：日常开发中最常使用的 Git 命令，覆盖暂存、提交、分支、合并、远程操作等核心功能。
>
> 内容来源：[Git 官方文档 - Main Porcelain Commands](https://git-scm.com/docs/git#_main_porcelain_commands)

## 命令列表

| 命令 | 官方描述 | 标签 |
|------|----------|------|
| [git add](/commands/scene-category/staging-and-commit/git-add) | Add file contents to the index | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git am](/commands/scene-category/patch-and-email/git-am) | Apply a series of patches from a mailbox | <span class="agc-tag agc-tag-common">常用</span> |
| [git archive](/commands/scene-category/maintenance/git-archive) | Create an archive of files from a named tree | <span class="agc-tag agc-tag-common">常用</span> |
| [git bisect](/commands/scene-category/troubleshooting/git-bisect) | Use binary search to find the commit that introduced a bug | <span class="agc-tag agc-tag-common">常用</span> |
| [git branch](/commands/scene-category/branch-management/git-branch) | List, create, or delete branches | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git bundle](/commands/scene-category/maintenance/git-bundle) | Move objects and refs by archive | <span class="agc-tag agc-tag-low">底层</span> |
| [git checkout](/commands/scene-category/branch-management/git-checkout) | Switch branches or restore working tree files | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git cherry-pick](/commands/scene-category/merge-and-rebase/git-cherry-pick) | Apply the changes introduced by some existing commits | <span class="agc-tag agc-tag-common">常用</span> <span class="agc-tag agc-tag-medium">进阶</span> |
| [git citool](/commands/official-category/main-porcelain/) | Graphical alternative to git-commit | <span class="agc-tag agc-tag-low">底层</span> |
| [git clone](/commands/scene-category/remote-collaboration/git-clone) | Clone a repository into a new directory | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git commit](/commands/scene-category/staging-and-commit/git-commit) | Record changes to the repository | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git describe](/commands/scene-category/maintenance/git-describe) | Give an object a human readable name based on an available ref | <span class="agc-tag agc-tag-common">常用</span> |
| [git diff](/commands/scene-category/log-and-diff/git-diff) | Show changes between commits, commit and working tree, etc | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git fetch](/commands/scene-category/remote-collaboration/git-fetch) | Download objects and refs from another repository | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git format-patch](/commands/scene-category/patch-and-email/git-format-patch) | Prepare patches for e-mail submission | <span class="agc-tag agc-tag-common">常用</span> |
| [git gc](/commands/scene-category/maintenance/git-gc) | Cleanup unnecessary files and optimize the local repository | <span class="agc-tag agc-tag-common">常用</span> |
| [git grep](/commands/scene-category/log-and-diff/git-grep) | Print lines matching a pattern | <span class="agc-tag agc-tag-common">常用</span> |
| [git gui](/commands/official-category/main-porcelain/) | A portable graphical interface to Git | <span class="agc-tag agc-tag-low">底层</span> |
| [git init](/commands/scene-category/init-and-config/git-init) | Create an empty Git repository or reinitialize an existing one | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git log](/commands/scene-category/log-and-diff/git-log) | Show commit logs | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git maintenance](/commands/scene-category/maintenance/git-maintenance) | Run tasks to optimize Git repository data | <span class="agc-tag agc-tag-common">常用</span> |
| [git merge](/commands/scene-category/merge-and-rebase/git-merge) | Join two or more development histories together | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-medium">进阶</span> |
| [git mv](/commands/scene-category/staging-and-commit/git-mv) | Move or rename a file, a directory, or a symlink | <span class="agc-tag agc-tag-common">常用</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git notes](/commands/official-category/main-porcelain/) | Add or inspect object notes | <span class="agc-tag agc-tag-low">底层</span> |
| [git pull](/commands/scene-category/remote-collaboration/git-pull) | Fetch from and integrate with another repository or a local branch | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git push](/commands/scene-category/remote-collaboration/git-push) | Update remote refs along with associated objects | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git range-diff](/commands/scene-category/log-and-diff/git-range-diff) | Compare two commit ranges | <span class="agc-tag agc-tag-low">底层</span> |
| [git rebase](/commands/scene-category/merge-and-rebase/git-rebase) | Reapply commits on top of another base tip | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-medium">进阶</span> |
| [git reset](/commands/scene-category/rollback-and-restore/git-reset) | Reset current HEAD to the specified state | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-medium">进阶</span> |
| [git restore](/commands/scene-category/rollback-and-restore/git-restore) | Restore working tree files | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git revert](/commands/scene-category/rollback-and-restore/git-revert) | Revert some existing commits | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-medium">进阶</span> |
| [git rm](/commands/scene-category/staging-and-commit/git-rm) | Remove files from the working tree and from the index | <span class="agc-tag agc-tag-common">常用</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git shortlog](/commands/scene-category/log-and-diff/git-shortlog) | Summarize git log output | <span class="agc-tag agc-tag-common">常用</span> |
| [git show](/commands/scene-category/log-and-diff/git-show) | Show various types of objects | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git sparse-checkout](/commands/scene-category/maintenance/git-sparse-checkout) | Initialize and modify the sparse-checkout | <span class="agc-tag agc-tag-low">底层</span> |
| [git stash](/commands/scene-category/staging-and-commit/git-stash) | Stash the changes in a dirty working directory away | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-medium">进阶</span> |
| [git status](/commands/scene-category/staging-and-commit/git-status) | Show the working tree status | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git submodule](/commands/scene-category/submodule-and-worktree/git-submodule) | Initialize, update or inspect submodules | <span class="agc-tag agc-tag-common">常用</span> <span class="agc-tag agc-tag-medium">进阶</span> |
| [git switch](/commands/scene-category/branch-management/git-switch) | Switch branches | <span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git tag](/commands/scene-category/init-and-config/git-tag) | Create, list, delete or verify a tag object signed with GPG | <span class="agc-tag agc-tag-common">常用</span> <span class="agc-tag agc-tag-easy">入门</span> |
| [git worktree](/commands/scene-category/submodule-and-worktree/git-worktree) | Manage multiple working trees | <span class="agc-tag agc-tag-common">常用</span> <span class="agc-tag agc-tag-medium">进阶</span> |
