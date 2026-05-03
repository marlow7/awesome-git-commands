---
title: git show-branch
---

<div class="agc-breadcrumb">
  <a href="../../">命令大全</a>
  <span class="separator">/</span>
  <a href="./">分支管理</a>
  <span class="separator">/</span>
  <span>git show-branch</span>
</div>

<div class="agc-detail-header">

# git show-branch

<div class="official-def">
  Show branches and their commits. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-high">场景：分支提交溯源</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-show-branch" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-show-branch</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git show-branch [-a | --all] [-r | --remotes] [--topo-order | --date-order]
		[--current] [--color[=&when>] | --no-color] [--sparse]
		[--more=&n> | --list | --independent | --merge-base]
		[--no-name | --sha1-name] [--topics]
		[(<rev> | <glob>)…]
git show-branch (-g | --reflog)[=&n>[,&base]] [--list] [<ref>]
```

## 核心功能描述

`git show-branch` 是 Git 分支关系可视化的核心命令，能够以半可视化的形式，展示指定分支、标签、提交的提交祖先关系图，清晰呈现多分支之间的分叉、合并、共同祖先等拓扑关系。

该命令单次最多支持展示 26 个分支与提交，无参数执行时，会自动读取 `showbranch.default` 配置项作为默认展示范围。它通过简洁的字符符号标记提交所属分支，无需图形化工具，即可在终端快速梳理多分支的提交脉络。

**适用场景**：
- 快速查看多个本地/远程分支的提交差异与分叉关系
- 查找多个分支的共同合并祖先，排查合并冲突根源
- 追踪主题分支的独有提交，确认哪些提交未合入主干
- 查看分支 reflog 历史的拓扑关系，定位分支变更记录
- 批量对比多个分支的提交进度，梳理多分支开发脉络

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<rev>` | `<glob>` | 指定要展示的提交、分支名、标签名，或匹配分支/标签的 glob 模式（如 `topic/*` 匹配所有 topic 子目录下的分支） | 无参数时读取 `showbranch.default` 配置 |
| `-r, --remotes` | 展示所有远程跟踪分支 | 关闭，默认仅展示本地分支 |
| `-a, --all` | 同时展示所有本地分支与远程跟踪分支 | 关闭 |
| `--current` | 即使未在命令中指定，也强制包含当前分支 | 关闭 |
| `--topo-order` | 按拓扑顺序展示提交（后代提交展示在父提交之前） | 关闭，默认按提交时间倒序 |
| `--date-order` | 按提交日期排序，同时保证拓扑规则（父提交不会展示在所有子提交之前） | 关闭 |
| `--sparse` | 展示仅能从一个分支末端访问到的合并提交 | 关闭，默认省略此类合并提交 |
| `--more=&lt;n&gt;` | 控制展示的提交深度，默认展示到所有分支的共同祖先为止；`n` 为正数时，额外展示 `n` 层共同祖先；`n` 为负数时，仅展示指定的引用，不展示祖先树 | 0，展示到首个共同祖先 |
| `--list` | 仅列出指定的分支/引用，不展示提交祖先图，等价于 `--more=-1` | 关闭 |
| `--merge-base` | 不展示提交列表，仅计算并输出指定多个提交的所有可能合并基 | 关闭 |
| `--independent` | 仅输出无法从其他指定引用到达的独立引用 | 关闭 |
| `--no-name` | 不展示每个提交的命名字符串 | 关闭 |
| `--sha1-name` | 使用提交对象 ID 的唯一前缀命名提交，而非分支相对路径（如 `master~2`） | 关闭 |
| `--topics` | 仅展示不在第一个指定分支中的提交，用于追踪主题分支的独有提交 | 关闭 |
| `-g, --reflog[=&lt;n&gt;[,&lt;base&gt;]]` | 展示指定引用的最近 `n` 条 reflog 记录，可指定 `base` 作为起始点（支持计数或日期） | 不指定 `n` 时默认展示最近记录，不指定引用时默认当前分支 |
| `--color[=&lt;when&gt;]` | 为每个分支对应的提交状态标记着色，可选值 `always/never/auto` | auto，终端环境默认开启 |
| `--no-color` | 关闭输出着色，等价于 `--color=never` | 关闭 |

> 注意：`--more`、`--list`、`--independent`、`--merge-base` 四个参数互斥，不可同时使用。

## 实战示例

### 示例 1：基础分支对比（最常用）

```bash
# 对比两个分支的提交关系
git show-branch main dev

# 对比多个分支的提交脉络
git show-branch main dev feature1 feature2
```

**输出说明**：
- 首行带 `*` 的是当前分支，其他分支带 `!` 标记
- 每一行提交前的 `+` 号标记该提交所属的分支
- `*++` 格式表示该提交同时存在于多个分支中
- 最终的共同祖先提交会标记所有相关分支的符号

### 示例 2：全部分支展示

```bash
# 展示所有本地分支
git show-branch

# 展示所有远程跟踪分支
git show-branch -r

# 展示所有本地+远程分支
git show-branch -a

# 展示所有 topic 目录下的主题分支
git show-branch topic/*
```

### 示例 3：控制输出深度与格式

```bash
# 仅列出分支列表，不展示提交树
git show-branch --list main dev feature

# 额外展示共同祖先之后的5层提交
git show-branch --more=5 main dev

# 展示提交的 SHA-1 前缀，而非分支相对路径
git show-branch --sha1-name main dev
```

### 示例 4：主题分支独有提交追踪

```bash
# 仅展示 dev 分支有、但 main 分支没有的提交
git show-branch --topics main dev

# 追踪多个主题分支相对于主干的独有提交
git show-branch --topics main feature1 feature2 bugfix
```

### 示例 5：合并基与独立引用查询

```bash
# 查找多个分支的所有合并基
git show-branch --merge-base main dev feature

# 筛选出无法从其他分支到达的独立分支
git show-branch --independent main dev feature1 feature2
```

### 示例 6：Reflog 历史查看

```bash
# 查看当前分支的最近10条 reflog 记录
git show-branch --reflog=10

# 查看 master 分支1小时前的10条 reflog 记录，仅列表展示
git show-branch --reflog="10,1 hour ago" --list master

# 查看 reflog 记录的拓扑关系
git show-branch --reflog=5 HEAD
```

### 示例 7：排序与过滤优化

```bash
# 按拓扑顺序展示提交
git show-branch --topo-order main dev feature

# 按提交日期排序展示
git show-branch --date-order main dev

# 展示被省略的稀疏合并提交
git show-branch --sparse main dev
```

## 常见踩坑与注意事项

::: tip 输出结果符号解读
```bash
* [master] 提交说明  # * 标记当前分支
 ! [dev] 提交说明     # ! 标记其他分支
---
 +  [dev] 仅dev分支的提交
*++ [master] 所有分支共有的提交
```
`+` 号的位置与首行分支顺序一一对应，快速定位提交所属分支。
:::

::: warning 分支数量上限限制
该命令单次最多只能展示 **26个分支/提交**，超出数量会执行失败。如需对比大量分支，建议使用 `git log` 或图形化工具替代。
:::

::: tip 配置默认展示分支
可通过全局配置设置默认展示的分支，无需每次手动指定：
```bash
# 全局配置默认展示所有主分支，按拓扑排序
git config --global showbranch.default --topo-order
git config --global showbranch.default heads/*
```
配置后直接执行 `git show-branch` 即可生效。
:::

::: warning 与 git log 的核心区别
- `git show-branch` 专注于**多分支横向对比**，一眼看清提交在哪些分支存在
- `git log` 专注于**单分支纵向历史**，适合查看单个分支的提交时序
- 多分支关系梳理优先用 `git show-branch`，详细提交历史查看优先用 `git log`
:::

::: warning 互斥参数使用禁忌
`--more`、`--list`、`--independent`、`--merge-base` 四个参数不可同时使用，同时指定会导致命令执行失败，仅能选择其中一个。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/branch-management/git-branch">git branch</a>
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
  <a href="/commands/scene-category/merge-and-rebase/git-merge-base">git merge-base</a>
  <a href="/commands/scene-category/troubleshooting/git-reflog">git reflog</a>
  <a href="/commands/scene-category/log-and-diff/git-diff">git diff</a>
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
</div>