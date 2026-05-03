---
title: git mv
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/staging-and-commit/">文件暂存与提交管理</a>
  <span class="separator">/</span>
  <span>git mv</span>
</div>

<div class="agc-detail-header">

# git mv

<div class="official-def">
  Move or rename a file, a directory, or a symlink. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：文件重命名/目录移动</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-mv" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-mv</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git mv [-v] [-f] [-n] [-k] <source> <destination>
git mv [-v] [-f] [-n] [-k] <source>... <destination-directory>
```

## 核心功能描述

`git mv` 是 Git 用于文件/目录重命名、移动的核心命令，它会同时完成**文件系统层面的移动/重命名**和**Git 索引的自动更新**，操作完成后变更会直接进入暂存区，无需额外执行 `git add` 操作。

它与系统原生 `mv` 命令的核心优势是：Git 会识别为**文件重命名**，而非「删除旧文件+新增新文件」，完整保留文件的提交历史，可通过 `git log --follow` 追溯文件重命名前的所有变更记录。

**适用场景**：
- 重命名已纳入 Git 跟踪的文件、目录、符号链接
- 移动单个/多个文件到指定目录，同步更新 Git 跟踪状态
- 调整项目目录结构，同时保留所有文件的提交历史
- 安全移动 Git 子模块，自动更新子模块配置与工作树

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<source>` | 要移动/重命名的源文件/目录，支持多个源路径，必须是 Git 已跟踪的文件 | 无（必填项） |
| `<destination>` | 目标文件名/路径，重命名时为新名称，移动时为目标目录 | 无（必填项） |
| `<destination-directory>` | 目标目录，批量移动时必须是已存在的目录 | 无 |
| `-f, --force` | 强制移动/重命名，即使目标路径已存在，会直接覆盖已有文件 | 关闭，目标已存在时会报错终止 |
| `-k` | 跳过会导致错误的操作（如源文件不存在、未被 Git 跟踪、目标已存在且无强制参数），不报错终止，仅执行有效操作 | 关闭，遇到错误直接终止 |
| `-n, --dry-run` | 干运行模式，不实际执行移动/重命名，仅预览会执行的操作 | 关闭 |
| `-v, --verbose` | 详细模式，输出每一个被移动/重命名的文件名称 | 关闭 |

## 实战示例

### 示例 1：基础重命名（最常用）

```bash
# 重命名单个文件，自动更新Git索引
git mv old-filename.js new-filename.js

# 重命名目录
git mv src/old-dir src/new-dir

# 重命名符号链接
git mv old-link new-link

# 提交重命名变更
git commit -m "refactor: rename file and directory"
```

### 示例 2：文件/目录移动

```bash
# 移动单个文件到指定目录
git mv src/utils.js utils/index.js

# 移动多个文件到目标目录
git mv a.js b.js c.js src/utils/

# 移动整个目录到目标路径
git mv components/ src/components/
```

### 示例 3：强制覆盖与容错处理

```bash
# 强制重命名，目标文件已存在时直接覆盖
git mv -f temp.js main.js

# 跳过错误操作，仅执行有效的移动
# 比如多个源文件中部分不存在，不会终止整个命令
git mv -k a.js b.js c.js src/utils/
```

### 示例 4：预览与详细输出

```bash
# 预览重命名结果，不实际执行
git mv -n old.js new.js

# 预览批量移动结果
git mv -n *.js src/scripts/

# 执行移动并输出详细日志
git mv -v *.js src/scripts/
```

### 示例 5：子模块移动

```bash
# 移动子模块到新目录，自动更新.gitmodules配置与工作树
git mv submodules/ui-kit src/components/ui-kit

# 提交子模块移动变更
git commit -m "refactor: move ui-kit submodule to components"
```

## 常见踩坑与注意事项

::: tip 核心区别：git mv 与系统 mv
- 用系统 `mv` 重命名后，Git 会识别为「删除旧文件+新增新文件」，丢失文件历史关联
- 用 `git mv` 重命名，Git 会标记为文件重命名，完整保留提交历史，可通过 `git log --follow <文件名>` 查看全量历史
- 若已用系统 `mv` 重命名，执行 `git add -A` 也能让 Git 识别重命名，但优先用 `git mv` 更规范
:::

::: warning 操作后必须提交才会永久生效
`git mv` 仅会更新工作区和暂存区，变更不会进入仓库历史，必须执行 `git commit` 才能完成最终的重命名/移动记录。
:::

::: warning 文件名大小写重命名的坑
Windows、macOS 默认文件系统不区分大小写，直接执行 `git mv file.txt File.txt` 会报错。
**正确写法**：
```bash
# 两步法完成大小写重命名
git mv file.txt file-temp.txt
git mv file-temp.txt File.txt

# 或强制重命名
git mv -f file.txt File.txt
```
:::

::: warning 已修改的文件重命名注意
如果文件有未暂存的修改，`git mv` 依然可以正常执行，修改会保留在重命名后的文件中，不会丢失；但如果文件有未提交的冲突，需要先解决冲突再执行重命名。
:::

::: warning 目标路径已存在的处理
目标路径已存在时，不加 `-f` 会直接报错终止；加 `-f` 会强制覆盖已有文件，且覆盖的文件若未被 Git 跟踪，会直接丢失且无法恢复，执行前务必用 `-n` 预览确认。
:::

::: tip 子模块移动的特殊说明
移动子模块必须用 `git mv`，不要用系统 `mv`，否则会导致子模块配置失效、工作树异常；移动后子模块的历史会完整保留，无需重新初始化。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/staging-and-commit/git-rm">git rm</a>
  <a href="/commands/scene-category/staging-and-commit/git-add">git add</a>
  <a href="/commands/scene-category/staging-and-commit/git-commit">git commit</a>
  <a href="/commands/scene-category/staging-and-commit/git-status">git status</a>
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
  <a href="/commands/scene-category/submodule-worktree/git-submodule">git submodule</a>
</div>