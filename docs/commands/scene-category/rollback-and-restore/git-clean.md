---
title: git clean
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/rollback-and-restore/">提交回滚与版本恢复</a>
  <span class="separator">/</span>
  <span>git clean</span>
</div>

<div class="agc-detail-header">

# git clean

<div class="official-def">
  Remove untracked files from the working tree. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-medium">进阶</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-clean" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-clean</a>

</div>

## 核心功能描述

`git clean` 命令从工作树中删除未跟踪的文件。它是 `git reset --hard` 的补充——reset 处理已跟踪文件，clean 处理未跟踪文件。

## 实战示例

```bash
# 查看将被删除的文件（试运行）
git clean -n

# 删除未跟踪的文件
git clean -f

# 同时删除未跟踪的目录
git clean -fd

# 同时删除被忽略的文件
git clean -fdx

# 交互式选择要删除的文件
git clean -i
```

::: danger 数据不可恢复
`git clean` 删除的文件无法通过 Git 命令恢复。建议先用 `-n` 试运行确认，再实际执行。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/rollback-and-restore/git-reset">git reset</a>
  <a href="/commands/scene-category/staging-and-commit/git-status">git status</a>
</div>
