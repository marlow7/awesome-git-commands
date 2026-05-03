---
title: Git 常见错误与故障排查指南
---

<div class="agc-breadcrumb">
  <a href="/">首页</a>
  <span class="separator">/</span>
  <a href="/guides/">实用指南</a>
  <span class="separator">/</span>
  <span>常见错误与故障排查</span>
</div>

# Git 常见错误与故障排查指南

本文覆盖开发者高频遇到的 Git 问题，提供清晰的排查思路和解决方案。

## 1. 合并冲突解决

### 现象

```bash
git merge feature/login
# Auto-merging src/app.js
# CONFLICT (content): Merge conflict in src/app.js
# Automatic merge failed; fix conflicts and then commit the result.
```

### 解决步骤

```bash
# 1. 查看冲突文件
git status

# 2. 打开冲突文件，查找冲突标记
# <<<<<<< HEAD
# 当前分支的内容
# =======
# 被合并分支的内容
# >>>>>>> feature/login

# 3. 手动编辑解决冲突，选择需要保留的内容

# 4. 标记为已解决
git add src/app.js

# 5. 完成合并
git commit

# 如果想放弃合并
git merge --abort
```

### 使用 VS Code 解决冲突

VS Code 内置了冲突解决工具，点击 "Accept Current" / "Accept Incoming" / "Accept Both" 即可快速解决。

---

## 2. detached HEAD 处理

### 现象

```bash
# HEAD 游离在某个提交上
git checkout abc1234
# Note: switching to 'abc1234'.
# You are in 'detached HEAD' state.
```

### 解决方案

```bash
# 方案1：基于当前提交创建新分支
git checkout -b fix-branch

# 方案2：只是查看代码，切回原分支即可
git checkout main

# 方案3：如果已经在 detached HEAD 上做了提交，保存它们
git checkout -b new-branch-name
```

---

## 3. 误提交恢复

### 场景1：提交了错误的代码

```bash
# 撤销最近一次提交，保留变更在工作区
git reset HEAD~1

# 修改后重新提交
git add .
git commit -m "fix: correct the logic"
```

### 场景2：提交了敏感信息

```bash
# 如果还未推送
git reset HEAD~1
# 从文件中删除敏感信息
git add .
git commit -m "fix: remove sensitive data"

# 如果已推送（需要改写历史，危险操作）
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/sensitive-file" \
  --prune-empty --tag-name-filter cat -- --all
git push --force --all
```

::: danger 敏感信息一旦推送到远程，应立即更换密钥/密码，仅删除文件是不够的。
:::

---

## 4. 误删分支恢复

### 现象

```bash
git branch -D feature/login
# Deleted branch feature/login (was abc1234).
```

### 恢复方法

```bash
# 1. 通过 reflog 找到分支的最后一个提交
git reflog
# abc1234 HEAD@{2}: checkout: moving from feature/login to main

# 2. 基于该提交重建分支
git checkout -b feature/login abc1234
```

---

## 5. 误用 reset --hard 恢复

### 现象

```bash
git reset --hard HEAD~3
# 所有未提交的变更丢失！
```

### 恢复方法

```bash
# 1. 通过 reflog 找到 reset 之前的 HEAD
git reflog
# abc1234 HEAD@{1}: reset: moving to HEAD~3
# def5678 HEAD@{2}: commit: important work  ← 这是丢失的提交

# 2. 恢复到丢失的提交
git reset --hard def5678
```

::: tip reflog 是 Git 的后悔药
`git reflog` 记录了 HEAD 的所有移动，默认保留 90 天。只要没过期，几乎可以找回任何丢失的提交。
:::

---

## 6. 推送被拒绝

### 现象

```bash
git push origin main
# ! [rejected] main -> main (non-fast-forward)
```

### 原因
远程分支有本地没有的新提交。

### 解决方案

```bash
# 方案1：先拉取再推送（推荐）
git pull --rebase origin main
git push origin main

# 方案2：强制推送（仅限个人分支，危险！）
git push --force-with-lease origin feature/my-branch
```

::: warning 永远不要对共享分支使用 --force
强制推送会覆盖他人的提交，对 main/develop 等共享分支绝对禁止使用。
:::

---

## 7. 仓库体积过大

### 解决方案

```bash
# 查看仓库大小
du -sh .git

# 清理不必要的文件并优化本地仓库
git gc --aggressive --prune=now

# 查看哪些文件占用空间最大
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  sort -rnk3 | head -20
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/rollback-and-restore/git-reset">git reset</a>
  <a href="/commands/scene-category/rollback-and-restore/git-reflog">git reflog</a>
  <a href="/commands/scene-category/rollback-and-restore/git-revert">git revert</a>
  <a href="/commands/scene-category/remote-collaboration/git-push">git push</a>
</div>
