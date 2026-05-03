---
title: git log
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/log-and-diff/">日志查询与差异对比</a>
  <span class="separator">/</span>
  <span>git log</span>
</div>

<div class="agc-detail-header">

# git log

<div class="official-def">
  Show commit logs. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：查询历史</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-log" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-log</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git log [<options>] [<revision range>] [[--] <path>…​]
```

## 核心功能描述

`git log` 命令显示提交日志。它是查看项目历史、追踪变更、理解代码演进的核心工具。

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `--oneline` ⭐ | 每个提交显示一行 | 关闭 |
| `--graph` ⭐ | 显示分支合并图 | 关闭 |
| `--all` ⭐ | 显示所有分支 | 当前分支 |
| `-n <number>, --max-count=<number>` ⭐ | 限制显示的提交数量 | 无限制 |
| `--since=<date>, --after=<date>` ⭐ | 只显示指定日期之后的提交 | — |
| `--until=<date>, --before=<date>` | 只显示指定日期之前的提交 | — |
| `--author=<pattern>` ⭐ | 只显示匹配作者的提交 | — |
| `--grep=<pattern>` ⭐ | 搜索提交消息匹配的提交 | — |
| `-- <path>` ⭐ | 只显示涉及指定路径的提交 | — |
| `-p, --patch` | 显示每个提交的 diff | 关闭 |
| `--stat` | 显示每个提交的文件变更统计 | 关闭 |
| `--shortstat` | 只显示统计摘要 | 关闭 |
| `--name-only` | 只显示变更的文件名 | 关闭 |
| `--name-status` | 显示变更文件名和状态 | 关闭 |
| `--decorate[=short\|full\|auto\|no]` | 显示引用名称 | short |
| `--pretty=<format>` ⭐ | 自定义输出格式 | — |
| `--format=<format>` | 同 --pretty | — |
| `--abbrev-commit` | 缩短提交哈希 | 关闭 |
| `--no-merges` | 不显示合并提交 | 关闭 |
| `--merges` | 只显示合并提交 | 关闭 |
| `--first-parent` | 只跟踪第一父提交链 | 关闭 |
| `-L <start>,<end>:<file>` | 跟踪文件的指定行范围的演进 | — |

## 实战示例

### 示例 1：查看提交历史

```bash
# 简洁查看
git log --oneline

# 图形化查看（最常用）
git log --oneline --graph --all

# 查看最近 5 个提交
git log -5 --oneline
```

### 示例 2：按条件搜索

```bash
# 按作者搜索
git log --author="zhangsan" --oneline

# 按提交消息搜索
git log --grep="fix: login" --oneline

# 按日期范围搜索
git log --since="2024-01-01" --until="2024-12-31" --oneline

# 按文件路径搜索
git log -- src/main.js
```

### 示例 3：自定义格式

```bash
# 漂亮的图形化格式
git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit

# 查看 PR 风格的提交
git log --oneline --no-merges --first-parent
```

## 常见踩坑与注意事项

::: tip 推荐别名
```bash
git config --global alias.lg "log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
# 之后只需 git lg
```
:::

::: warning 大型仓库的 log 性能
在非常大的仓库中，`git log` 可能很慢。使用 `-- <path>` 限定路径，或 `-n` 限制数量可以加快查询。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/log-and-diff/git-diff">git diff</a>
  <a href="/commands/scene-category/log-and-diff/git-show">git show</a>
  <a href="/commands/scene-category/log-and-diff/git-blame">git blame</a>
  <a href="/commands/scene-category/rollback-and-restore/git-reflog">git reflog</a>
</div>
