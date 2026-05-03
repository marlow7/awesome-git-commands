---
title: git status
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/staging-and-commit/">文件暂存与提交管理</a>
  <span class="separator">/</span>
  <span>git status</span>
</div>

<div class="agc-detail-header">

# git status

<div class="official-def">
  Show the working tree status. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：查询</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-status" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-status</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git status [<options>…] [--] [<pathspec>…​]
```

## 核心功能描述

`git status` 命令显示工作树和暂存区的状态。它会告诉你哪些文件被修改了、哪些变更已暂存、哪些文件未被跟踪，是日常开发中最常用的查询命令之一。

**适用场景**：
- 在 `git add` 前确认哪些文件有变更
- 在 `git commit` 前确认暂存区内容是否正确
- 排查文件是否被意外修改或忽略

**与其他命令的边界**：
- `git status` 显示概要状态；`git diff` 显示具体变更内容
- `git status` 不修改任何内容，是纯查询命令

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `-s, --short` | 以简短格式输出 | 关闭 |
| `-b, --branch` | 显示分支和跟踪信息 | 关闭 |
| `--show-stash` | 显示暂存条目数量 | 关闭 |
| `--porcelain[=<version>]` | 以机器可读格式输出 | 关闭 |
| `--long` | 以长格式输出（默认） | 开启 |
| `-v, --verbose` | 显示未暂存变更的 diff | 关闭 |
| `-u<mode>, --untracked-files=<mode>` | 显示未跟踪文件的模式 | normal |
| `--ignore-submodules[=<when>]` | 忽略子模块的变更 | — |
| `--ignored[=<mode>]` | 显示被忽略的文件 | 关闭 |
| `-z` | 使用 NUL 字符分隔输出条目 | 关闭 |
| `--column, --no-column` | 以列格式显示未跟踪文件 | — |
| `--ahead-behind, --no-ahead-behind` | 显示/隐藏领先和落后于上游的提交数 | — |
| `--renames, --no-renames` | 启用/禁用重命名检测 | — |
| `--find-renames[=<n>]` | 设置重命名检测的相似度阈值 | — |

## 实战示例

### 示例 1：查看工作树状态

**场景**：日常开发中查看当前工作区状态

```bash
# 标准格式
git status

# 简短格式（推荐日常使用）
git status -s

# 同时显示分支信息
git status -sb
```

**执行效果**：
```
# 标准格式
On branch main
Changes to be committed:
  modified:   src/main.py

Changes not staged for commit:
  modified:   README.md

Untracked files:
  new-feature.py

# 简短格式
M  src/main.py
 M README.md
?? new-feature.py
```

简短格式说明：
- `M` = 修改（第一列为暂存区，第二列为工作区）
- `A` = 新增
- `D` = 删除
- `??` = 未跟踪
- `!!` = 被忽略

### 示例 2：查看被忽略的文件

**场景**：排查文件是否被 .gitignore 规则忽略

```bash
# 显示被忽略的文件
git status --ignored

# 只显示传统模式的被忽略文件
git status --ignored=traditional
```

## 常见踩坑与注意事项

::: tip 频繁使用
建议在每次 `git add` 和 `git commit` 前都运行 `git status`，确认操作的内容正确。这是避免误操作的最佳习惯。
:::

::: warning 简短格式的列含义
`git status -s` 输出中，第一列表示暂存区状态，第二列表示工作区状态。`M ` 表示已暂存的修改，` M` 表示未暂存的修改，`MM` 表示既有暂存的修改又有工作区的进一步修改。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/staging-and-commit/git-add">git add</a>
  <a href="/commands/scene-category/staging-and-commit/git-commit">git commit</a>
  <a href="/commands/scene-category/log-and-diff/git-diff">git diff</a>
  <a href="/commands/scene-category/staging-and-commit/git-rm">git rm</a>
</div>
