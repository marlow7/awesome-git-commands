---
title: git gc
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/maintenance/">仓库优化与维护</a>
  <span class="separator">/</span>
  <span>git gc</span>
</div>

<div class="agc-detail-header">

# git gc

<div class="official-def">
  Cleanup unnecessary files and optimize the local repository. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-high">场景：仓库垃圾回收</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-gc" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-gc</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git gc [--aggressive] [--auto] [--[no-]detach] [--quiet] [--prune=<date> | --no-prune] [--force] [--keep-largest-pack]
```

## 核心功能描述

`git gc`（Garbage Collection，垃圾回收）是 Git 仓库维护的核心命令，用于执行仓库内部的一系列清理优化任务：压缩文件修订版本、删除不可达的松散对象、打包引用、修剪过期的 reflog/rerere 元数据/陈旧工作树，同时更新提交图等辅助索引，最终实现**减少仓库磁盘占用、提升 Git 命令执行性能**的核心目标。

Git 会在执行 commit、merge、pull 等高频操作时，自动检测仓库体积增长情况，按需自动执行 `git gc --auto`；手动执行该命令，通常用于批量导入后的仓库优化、大仓库定期维护、磁盘空间清理等场景。

**核心执行的任务**：
1.  松散对象打包：将大量零散的松散对象压缩为 pack 包，优化磁盘占用与访问速度
2.  不可达对象清理：删除无法从任何分支、标签、reflog 到达的废弃对象
3.  reflog 修剪：清理超过保留期的过期 reflog 记录
4.  引用打包：将零散的引用打包为单个文件，提升引用查找性能
5.  提交图更新：重写 commit-graph 文件，加速日志、变基等操作的执行速度
6.  冗余数据清理：清理过期的 rerere 缓存、陈旧的工作树数据

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `--aggressive` | 启用深度激进优化，重新计算所有增量压缩，以更长的执行时间换取更好的磁盘空间优化效果；效果持久，普通场景不推荐频繁使用 | 关闭 |
| `--auto` | 自动模式，先检查是否需要执行清理，无需清理则直接退出；Git 日常操作自动调用的就是该模式 | 关闭 |
| `--detach/--no-detach` | 控制是否在后台执行 gc 任务，`--no-detach` 强制前台执行 | 开启，系统支持时默认后台执行 |
| `--cruft/--no-cruft` | 控制是否将过期不可达对象打包为 cruft 包，而非保留为松散对象 | 默认开启 `--cruft` |
| `--max-cruft-size=<n>` | 限制 cruft 包的最大体积，单位为字节，支持 k/m/g 单位后缀 | 无限制 |
| `--expire-to=<dir>` | 将修剪掉的对象写入指定目录的 cruft 包中，用于备份，需配合 `--cruft` 使用 | 关闭 |
| `--prune=<date>` | 修剪超过指定日期的松散对象，`--prune=now` 立即修剪所有过期对象，无宽限期；默认值为 2 周前 | 默认 2 周前，可通过 `gc.pruneExpire` 配置修改 |
| `--no-prune` | 不修剪任何松散对象，仅执行打包、优化等其他任务 | 关闭 |
| `--quiet` | 静默模式，抑制所有进度报告输出 | 关闭 |
| `--force` | 强制执行 gc，即使检测到有另一个 gc 进程正在运行 | 关闭，检测到并发 gc 时会直接退出 |
| `--keep-largest-pack` | 除最大的非 cruft 包、.keep 标记的包、cruft 包外，其他所有包合并为单个包；会忽略 `gc.bigPackThreshold` 配置 | 关闭 |

## 实战示例

### 示例 1：基础垃圾回收（最常用）

```bash
# 执行标准垃圾回收与仓库优化
git gc

# 静默执行，不输出任何进度
git gc --quiet
```

### 示例 2：自动模式与强制执行

```bash
# 自动检测是否需要清理，无需清理则直接退出
git gc --auto

# 强制执行 gc，即使有其他 gc 进程在运行
git gc --force
```

### 示例 3：深度激进优化

```bash
# 激进深度优化，极致压缩仓库体积，大仓库执行时间较长
git gc --aggressive

# 激进优化同时自定义增量压缩深度
git -c gc.aggressiveDepth=250 -c gc.aggressiveWindow=500 gc --aggressive
```

### 示例 4：自定义对象修剪规则

```bash
# 立即修剪所有过期对象，无2周宽限期（谨慎使用）
git gc --prune=now

# 仅修剪超过1个月的松散对象
git gc --prune="1.month.ago"

# 执行优化但不修剪任何对象
git gc --no-prune
```

### 示例 5：高级优化配置

```bash
# 保留最大的包文件，仅合并其他小包
git gc --keep-largest-pack

# 禁用 cruft 包，将不可达对象保留为松散对象
git gc --no-cruft

# 限制 cruft 包最大体积为100M
git gc --max-cruft-size=100m
```

## 常见踩坑与注意事项

::: tip 日常使用无需手动执行 gc
Git 会在 commit、merge、pull 等操作后自动执行 `git gc --auto`，检测到仓库需要优化时会自动处理，日常开发无需手动频繁执行。
仅在仓库体积明显增大、Git 命令执行变慢、批量导入/重构后，才需要手动执行 gc。
:::

::: warning 不要频繁使用 --aggressive
`--aggressive` 会丢弃已有的增量压缩，重新全量计算，执行时间极长，且仅能带来额外的少量空间优化。
- 普通仓库完全不需要使用该参数，标准 `git gc` 已足够
- 仅在仓库大规模重构、历史重写、批量导入后，可执行一次，无需定期执行
:::

::: warning --prune=now 有数据丢失风险
默认 gc 会保留2周内的对象，防止并发操作时删除正在使用的对象。`--prune=now` 会立即删除所有不可达对象，若有其他 Git 进程正在操作仓库，可能导致仓库损坏、数据丢失。
- 确保没有其他 Git 进程操作仓库时，再使用该参数
- 误删的对象可通过 `git fsck`、`git reflog` 尝试恢复，前提是未执行 gc
:::

::: tip 不可达对象不会被立即删除
Git 不会立即删除你重置、变基丢弃的提交，有两层保护机制：
1.  reflog 会保留记录，默认可达记录90天、不可达记录30天
2.  gc 修剪默认有2周的宽限期，仅删除超过2周的不可达对象
只要未执行 gc，误删的提交几乎都能通过 reflog 找回。
:::

::: warning 并发操作的风险
gc 运行时，若有其他进程在写入仓库，有极低概率出现仓库损坏。Git 有两个保护机制：
1.  修改时间晚于修剪日期的对象会被保留
2.  新增对象时会更新修改时间，避免被误删
但仍建议在仓库无活跃操作时执行 gc，尤其是带 `--prune=now` 的操作。
:::

::: tip 关闭自动 gc 的方法
若需要完全关闭 Git 自动 gc，执行以下配置：
```bash
# 完全关闭自动 gc
git config --global gc.auto 0
```
关闭后需手动定期执行 gc，否则仓库会逐渐产生大量松散对象，性能下降、磁盘占用升高。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/repo-optimization/git-prune">git prune</a>
  <a href="/commands/scene-category/troubleshooting/git-reflog">git reflog</a>
  <a href="/commands/scene-category/repo-optimization/git-repack">git repack</a>
  <a href="/commands/scene-category/troubleshooting/git-fsck">git fsck</a>
  <a href="/commands/scene-category/repo-optimization/git-commit-graph">git commit-graph</a>
  <a href="/commands/scene-category/merge-and-rebase/git-rerere">git rerere</a>
</div>