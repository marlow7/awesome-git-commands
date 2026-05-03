---
title: git sparse-checkout
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/repo-optimization/">仓库优化与维护</a>
  <span class="separator">/</span>
  <span>git sparse-checkout</span>
</div>

<div class="agc-detail-header">

# git sparse-checkout

<div class="official-def">
  Reduce your working tree to a subset of tracked files. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-normal">中高频</span>
  <span class="agc-tag agc-tag-normal">进阶</span>
  <span class="agc-tag agc-tag-normal">场景：大仓库稀疏检出/按需拉取</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-sparse-checkout" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-sparse-checkout</a>

> ⚠️ 官方提示：该命令目前处于实验性阶段，其行为及其他 Git 命令在稀疏检出场景下的行为未来可能发生变更。

</div>

## 语法格式（SYNOPSIS）

```bash
git sparse-checkout (init | list | set | add | reapply | disable | check-rules | clean) [<options>]
```

## 核心功能描述

`git sparse-checkout` 是 Git 稀疏检出的核心管理命令，用于将大仓库/Monorepo 的工作树缩减为指定的目录子集，仅拉取和展示开发所需的文件，大幅降低磁盘占用、提升 Git 命令执行性能。

默认使用**cone 模式**（官方唯一推荐），仅需指定要包含的目录，即可自动适配规则；非 cone 模式已不推荐使用。开启稀疏检出后，Git 会自动忽略范围外的路径，切换分支、提交代码时不会处理无关文件。

**核心适用场景**：
- Monorepo 大仓库，仅开发少数模块
- 超大规模代码库，按需拉取文件
- CI/CD 流水线精简构建拉取流程

## 核心子命令速览

| 子命令 | 核心作用 |
|--------|----------|
| `set` | 核心命令，启用稀疏检出，设置要包含的目录，同步更新工作树 |
| `add` | 向现有规则追加新目录，不覆盖原有配置 |
| `list` | 查看当前稀疏检出配置 |
| `reapply` | 重新应用规则，修复合并/变基导致的规则失效 |
| `clean` | 清理稀疏范围外的残留文件 |
| `disable` | 关闭稀疏检出，恢复全量工作树 |
| `check-rules` | 调试路径是否匹配当前稀疏规则 |

## 实战示例（精华版）

### 示例1：标准稀疏检出全流程（最常用）
```bash
# 1. 克隆时直接开启稀疏检出（最佳实践，避免全量拉取）
git clone --sparse https://github.com/your-org/monorepo.git
cd monorepo

# 2. 设置仅需的目录（默认cone模式，无需复杂规则）
git sparse-checkout set packages/ui packages/utils docs

# 3. 查看当前生效的配置
git sparse-checkout list
```

### 示例2：追加目录到稀疏规则
```bash
# 新增需要的目录，不覆盖原有配置
git sparse-checkout add packages/server scripts
```

### 示例3：关闭稀疏检出，恢复全量文件
```bash
# 完全禁用稀疏检出，还原仓库所有文件
git sparse-checkout disable
```

### 示例4：规则修复与残留清理
```bash
# 重新应用规则，修复合并/变基导致的规则失效
git sparse-checkout reapply

# 先预览要清理的残留文件，确认无误后强制删除
git sparse-checkout clean --dry-run
git sparse-checkout clean -f
```

## 常见踩坑与注意事项（核心重点）

::: warning 必须优先用默认 cone 模式
非 cone 模式已官方不推荐，存在性能差、规则易出错、不支持稀疏索引等问题，仅指定目录即可，不要自定义复杂匹配规则。
:::

::: warning 克隆时加--sparse是最佳实践
先全量克隆再开稀疏检出，依然会拉取完整仓库历史，无法节省克隆时间和磁盘空间。
:::

::: warning 稀疏规则不会自动处理子模块
调整稀疏范围不会自动初始化 / 删除子模块，需单独用git submodule命令管理。
:::

::: warning clean 命令必须加-f才会实际删除文件
默认仅做预览，不会删除任何内容，避免误删本地未跟踪文件。
:::

::: warning 稀疏索引存在第三方工具兼容问题
开启后部分 IDE / 外部 Git 工具可能无法正常识别，出现兼容问题时用`git sparse-checkout reapply --no-sparse-index`关闭。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/init-and-config/git-clone">git clone</a>
  <a href="/commands/scene-category/submodule-worktree/git-worktree">git worktree</a>
  <a href="/commands/scene-category/branch-management/git-switch">git switch</a>
  <a href="/commands/scene-category/submodule-worktree/git-submodule">git submodule</a>
</div>