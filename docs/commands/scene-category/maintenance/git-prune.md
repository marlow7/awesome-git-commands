---
title: git prune
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/maintenance/">仓库优化与维护</a>
  <span class="separator">/</span>
  <span>git prune</span>
</div>

<div class="agc-detail-header">

# git prune

<div class="official-def">
  Prune all unreachable objects from the object database. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-low">底层</span>
  <span class="agc-tag agc-tag-high">场景：冗余对象清理/仓库瘦身</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-prune" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-prune</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git prune [-n] [-v] [--progress] [--expire <time>] [--] [<head>…]
```

## 核心功能描述

`git prune` 是 Git 底层的对象清理命令，用于从对象数据库中删除**无法从任何分支、标签、reflog 等引用到达的松散对象**，同时清理已打包的重复松散对象、无引用的浅克隆条目。

> 官方核心提示：绝大多数日常场景，无需直接执行该命令，应优先使用 `git gc`，它会自动调用 `git prune` 并完成一整套安全的仓库维护任务。

**核心适用场景**：
- 手动清理已彻底废弃、reflog 已过期的冗余对象
- `git gc` 后仍有残留松散对象的补充清理
- 仓库深度瘦身、底层对象泄漏调试

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `-n, --dry-run` | 干运行模式，不实际删除对象，仅报告会被清理的内容 | 关闭 |
| `-v, --verbose` | 详细模式，输出所有被删除的对象信息 | 关闭 |
| `--progress` | 强制显示清理进度，即使非终端环境 | 终端环境默认开启 |
| `--expire <time>` | 仅清理超过指定时间的松散对象，支持 `2.weeks.ago`、`now` 等值 | 默认2周前 |
| `<head>…` | 额外指定头引用，这些引用可达的对象会被强制保留 | 无 |

## 实战示例

### 示例1：清理前预览（必做，防止误删）
```bash
# 预览会被删除的不可达对象，不实际执行删除操作
git prune -n
```

### 示例2：标准安全清理（最常用）
```bash
# 清理超过2周的不可达松散对象，输出详细的清理日志
git prune -v
```

### 示例3：强制立即清理所有不可达对象
```bash
# 无宽限期，立即清理所有不可达松散对象（谨慎使用）
git prune --expire=now -v
```

## 常见踩坑与注意事项

::: warning 日常使用优先用 git gc，不要直接用 git prune
`git gc` 会自动处理 reflog 过期、对象打包、prune 清理等一整套维护流程，比直接执行 `git prune` 更安全、更全面，仅特殊底层调试场景才需要直接使用该命令。
:::

::: danger 执行前必须用 -n 预览，删除后无法恢复
不可达对象被 prune 删除后，无法通过 Git 恢复，执行前务必先用 `-n` 预览要删除的内容，确认无误后再执行实际清理。
:::

::: tip reflog 会保护对象，不会被轻易清理
只要提交还在 reflog 中有记录，Git 就会判定为可达，`git prune` 不会删除这些对象；只有 reflog 过期后，对象才会被识别为不可达。
:::

::: warning 仅清理松散对象，打包对象不受影响
`git prune` 只能删除未打包的零散松散对象，已经压缩到 pack 包中的不可达对象，需要通过 `git repack -d` 才能清理。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/repo-optimization/git-gc">git gc</a>
  <a href="/commands/scene-category/troubleshooting/git-fsck">git fsck</a>
  <a href="/commands/scene-category/troubleshooting/git-reflog">git reflog</a>
  <a href="/commands/scene-category/repo-optimization/git-repack">git repack</a>
</div>