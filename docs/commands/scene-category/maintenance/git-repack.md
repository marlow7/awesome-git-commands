---
title: git repack
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/maintenance/">仓库优化与维护</a>
  <span class="separator">/</span>
  <span>git repack</span>
</div>

<div class="agc-detail-header">

# git repack

<div class="official-def">
  Pack unpacked objects in a repository. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-low">底层</span>
  <span class="agc-tag agc-tag-high">场景：仓库打包优化</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-repack" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-repack</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git repack [-a] [-A] [-d] [-f] [-F] [-l] [-n] [-q] [-b] [-m]
	[--window=<n>] [--depth=<n>] [--threads=<n>] [--keep-pack=<pack-name>]
	[--write-midx] [--name-hash-version=<n>] [--path-walk]
```

## 核心功能描述

`git repack` 是 Git 底层的对象打包优化命令，用于将仓库中未打包的**松散对象**合并为高效的 pack 压缩包，也可将多个零散的现有 pack 包重新组织为单个更优的压缩包，通过增量压缩技术减少仓库磁盘占用、提升 Git 命令执行性能。

pack 包是 Git 的核心存储格式，将多个对象集中压缩存储、支持增量差分压缩，能大幅降低磁盘占用，同时优化网络传输、对象查找的效率。
> 官方提示：绝大多数日常场景，无需直接执行该命令，`git gc` 会自动调用 `git repack` 完成标准化的打包优化；仅在大仓库深度调优、发布前仓库瘦身、特殊打包需求场景下，才需要手动使用。

**核心适用场景**：
- 大仓库深度优化，合并零散 pack 包，极致压缩磁盘占用
- 仓库发布前打包，优化镜像/备份的传输与存储效率
- 调整增量压缩参数，定制化优化仓库读写性能
- 清理冗余 pack 包与松散对象，修复仓库索引异常

## 核心参数详解

| 参数 | 核心描述 | 默认值 |
|------|----------|--------|
| `-a` | 将所有可达对象打包为单个 pack 包，而非仅增量打包松散对象 | 关闭，默认仅打包未压缩的松散对象 |
| `-A` | 与 `-a -d` 配合使用，将旧 pack 中的不可达对象转为松散对象，交由后续 `git gc` 按规则清理 | 关闭 |
| `-d` | 打包完成后，删除冗余的旧 pack 包，同时执行 `git prune-packed` 清理重复的松散对象 | 关闭 |
| `--cruft` | 与 `-a -d` 配合使用，将不可达对象单独打包为 cruft 包，保留过期清理规则 | 关闭 |
| `-f` | 强制重新计算增量压缩，不复用已有的 delta 数据 | 关闭，默认复用现有增量数据 |
| `-F` | 强制不复用任何现有对象，全量重新打包所有对象 | 关闭 |
| `-q, --quiet` | 静默模式，抑制所有进度输出与警告信息 | 关闭 |
| `-n` | 打包后不更新服务器信息，跳过 HTTP/FTP 发布所需的本地索引更新 | 关闭 |
| `--window=<n>` | 增量压缩的滑动窗口大小，值越大越可能找到更优的压缩结果，耗时越长 | 默认10 |
| `--depth=<n>` | 增量压缩的最大深度，限制 delta 链的最大长度，值越大压缩率越高，解压耗时越长 | 默认50，最大4095 |
| `--threads=<n>` | 压缩并行线程数，提升大仓库打包速度 | 自动匹配CPU核心数 |
| `-b, --write-bitmap-index` | 打包同时生成可达性位图索引，大幅提升大仓库 `git clone`、`git fetch` 性能 | 关闭 |
| `--geometric=<factor>` | 按几何级数组织 pack 包结构，每个后续包的对象数至少是前一个的 `<factor>` 倍，平衡打包频率与性能 | 关闭 |
| `-m, --write-midx` | 生成多包索引（MIDX），优化多 pack 包场景下的对象查找性能 | 关闭 |

## 实战示例

### 示例1：标准打包清理（最常用）
```bash
# 打包所有松散对象，完成后删除冗余包与重复松散对象
git repack -d
```

### 示例2：全量单包深度优化
```bash
# 将仓库所有可达对象打包为单个最优pack包，删除冗余包，极致优化仓库体积
git repack -a -d
```

### 示例3：带位图索引的发布级打包
```bash
# 全量单包打包，同时生成可达性位图索引，大幅提升大仓库克隆/拉取性能
git repack -a -d -b
```

### 示例4：激进重打包，极致压缩
```bash
# 强制重新计算所有增量压缩，扩大滑动窗口与深度，换取最高压缩率
git repack -a -d -f --window=250 --depth=250
```

## 常见踩坑与注意事项

::: warning 日常使用优先用 git gc，不要直接用 git repack
`git gc` 会自动匹配最优的打包参数，同时完成 reflog 清理、prune、repack 一整套维护流程，比手动执行 `git repack` 更安全、更适配常规场景；仅在大仓库定制化调优时，才需要手动使用该命令。
:::

::: tip `-a -d` 是手动使用的黄金组合
绝大多数手动使用场景，`-a -d` 就足够满足需求，它会将所有对象整合为单个高效 pack 包，同时清理所有冗余文件，是平衡压缩效果与操作安全的最佳选择。
:::

::: warning 增量压缩参数的性能权衡
`--window` 和 `--depth` 越大，压缩率越高，但打包耗时会呈指数级增长，同时过大的深度会导致仓库读取、解压性能下降；非特殊场景不要超过默认值太多，避免得不偿失。
:::

::: warning 位图索引仅单包场景生效
`-b` 生成位图索引，仅在 `-a` 全量单包打包时生效；如果拆分了多个 pack 包，位图索引无法生成，需配合 `-m` 生成多包索引来优化性能。
:::

::: danger 打包操作不会删除不可达对象
默认 `git repack` 不会处理不可达对象，仅会打包可达对象；需要清理不可达对象，需配合 `git gc` 或 `git prune` 执行，或使用 `--cruft` 参数单独管理不可达对象。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/repo-optimization/git-gc">git gc</a>
  <a href="/commands/scene-category/repo-optimization/git-prune">git prune</a>
  <a href="/commands/scene-category/troubleshooting/git-fsck">git fsck</a>
  <a href="/commands/scene-category/init-and-config/git-clone">git clone</a>
  <a href="/commands/scene-category/remote-collaboration/git-fetch">git fetch</a>
</div>