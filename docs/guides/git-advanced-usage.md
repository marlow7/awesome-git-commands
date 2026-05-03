---
title: Git 进阶用法指南
---

<div class="agc-breadcrumb">
  <a href="/">首页</a>
  <span class="separator">/</span>
  <a href="/guides/">实用指南</a>
  <span class="separator">/</span>
  <span>进阶用法指南</span>
</div>

# Git 进阶用法指南

本文介绍 Git 的高级用法，包括交互式变基、stash 高级用法和 submodule 管理。

## 1. 交互式变基（Interactive Rebase）

### 核心作用

交互式变基允许你在变基过程中对提交进行重新排序、合并、修改、删除等操作，是整理提交历史的利器。

### 启动交互式变基

```bash
# 重新整理最近 3 个提交
git rebase -i HEAD~3

# 重新整理到指定提交之后的所有提交
git rebase -i abc1234
```

### 操作命令

编辑器会打开一个待办列表：

```bash
pick abc1234 feat: add user model
pick def5678 fix: fix user validation
pick ghi9012 feat: add user API

# 可用操作：
# pick   = 使用提交（保持不变）
# reword = 使用提交，但修改提交消息
# edit   = 使用提交，但暂停以便修改提交内容
# squash = 将提交合并到前一个提交
# fixup  = 类似 squash，但丢弃提交消息
# drop   = 删除提交
```

### 常见场景

#### 合并多个提交

```bash
# 将多个小提交合并为一个
git rebase -i HEAD~4
# 将后三个提交的 pick 改为 squash
pick abc1234 feat: add user model
squash def5678 fix: fix user validation
squash ghi9012 feat: add user API
```

#### 修改历史提交消息

```bash
git rebase -i HEAD~3
# 将目标提交的 pick 改为 reword
pick abc1234 feat: add user model
reword def5678 fix: fix user validation  # 会弹出编辑器修改消息
pick ghi9012 feat: add user API
```

#### 修改历史提交内容

```bash
git rebase -i HEAD~3
# 将目标提交的 pick 改为 edit
edit abc1234 feat: add user model  # 变基会暂停在这里

# 修改文件内容
# ...

git add .
git commit --amend
git rebase --continue
```

::: warning 不要对已推送的提交进行变基
变基会改写提交历史，对已推送到远程的提交进行变基会影响其他协作者。
:::

---

## 2. Stash 高级用法

### 基础用法回顾

```bash
# 暂存当前修改
git stash

# 查看暂存列表
git stash list

# 恢复最近的暂存
git stash pop

# 恢复指定暂存
git stash apply stash@{1}
```

### 带消息的暂存

```bash
git stash push -m "WIP: working on search feature"
```

### 部分暂存

```bash
# 只暂存指定文件
git stash push src/main.js

# 只暂存已暂存的变更
git stash push --staged

# 交互式选择暂存内容
git stash push -p
```

### 创建分支从暂存

```bash
# 基于暂存创建新分支
git stash branch fix-branch stash@{0}
```

### 清理暂存

```bash
# 删除指定暂存
git stash drop stash@{1}

# 删除所有暂存
git stash clear
```

---

## 3. Submodule 子模块管理

### 添加子模块

```bash
# 添加子模块
git submodule add https://github.com/user/shared-lib.git libs/shared

# 初始化并更新子模块（克隆仓库后必须执行）
git submodule update --init --recursive
```

### 更新子模块

```bash
# 更新子模块到远程最新提交
git submodule update --remote

# 更新指定子模块
git submodule update --remote libs/shared
```

### 常见操作

```bash
# 查看子模块状态
git submodule status

# 在子模块目录内操作（与普通仓库一样）
cd libs/shared
git pull origin main
cd ../..

# 提交子模块变更（子模块指向新提交）
git add libs/shared
git commit -m "chore: update shared-lib to latest"
```

### 删除子模块

```bash
# 1. 反初始化
git submodule deinit -f libs/shared

# 2. 删除子模块目录
rm -rf .git/modules/libs/shared
git rm -f libs/shared

# 3. 提交
git commit -m "chore: remove shared-lib submodule"
```

::: tip 克隆含子模块的仓库
```bash
# 方式1：递归克隆
git clone --recurse-submodules <repo-url>

# 方式2：克隆后初始化
git clone <repo-url>
cd repo
git submodule update --init --recursive
```
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/merge-and-rebase/git-rebase">git rebase</a>
  <a href="/commands/scene-category/staging-and-commit/git-stash">git stash</a>
  <a href="/commands/scene-category/staging-and-commit/git-add">git add</a>
  <a href="/commands/scene-category/staging-and-commit/git-commit">git commit</a>
</div>
