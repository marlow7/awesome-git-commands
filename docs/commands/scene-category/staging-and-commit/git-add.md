---
title: git add
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/staging-and-commit/">文件暂存与提交管理</a>
  <span class="separator">/</span>
  <span>git add</span>
</div>

<div class="agc-detail-header">

# git add

<div class="official-def">
  Add file contents to the index. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：暂存</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-add" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-add</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git add [--verbose | -v] [--dry-run | -n] [--force | -f] [--interactive | -i] [--patch | -p]
        [--edit | -e] [--[no-]all | --[no-]ignore-removal | [--update | -u]]
        [--intent-to-add | -N] [--refresh] [--ignore-errors] [--ignore-missing]
        [--renormalize] [--chmod=(+|-)x] [--pathspec-from-file=<file> [--pathspec-file-nul]]
        [--] [<pathspec>…​]
```

## 核心功能描述

`git add` 命令将工作目录中的文件变更添加到暂存区（索引，index）。暂存区是 Git 工作流中的关键中间层，它决定了下一次 `git commit` 将包含哪些内容。

**适用场景**：
- 新建文件后，将其纳入版本控制
- 修改已有文件后，将变更纳入下一次提交
- 解决合并冲突后，标记冲突已解决

**与其他命令的边界**：
- `git add` 只影响暂存区，不创建提交记录；`git commit` 才真正将暂存区内容记录为提交
- `git add` 的反向操作是 `git restore --staged`（从暂存区撤回）

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<pathspec>…​` | 要添加内容的文件或目录路径 | — |
| `-v, --verbose` | 显示详细信息 | 关闭 |
| `-n, --dry-run` | 试运行，不实际添加文件 | 关闭 |
| `-f, --force` | 允许添加被 .gitignore 忽略的文件 | 关闭 |
| `-i, --interactive` | 交互式选择要添加的内容 | 关闭 |
| `-p, --patch` | 交互式选择文件中的部分变更（hunk） | 关闭 |
| `-e, --edit` | 在编辑器中打开差异，手动选择要添加的内容 | 关闭 |
| `-u, --update` | 只添加已跟踪文件的修改和删除，不添加新文件 | 关闭 |
| `-A, --all` | 添加所有变更（新建、修改、删除） | 关闭 |
| `--no-all` | 只添加新建和修改的文件，不添加删除的文件 | — |
| `--ignore-removal` | 同 --no-all，忽略删除的文件 | — |
| `-N, --intent-to-add` | 记录将添加文件的意图（路径显示为未跟踪） | 关闭 |
| `--refresh` | 不添加文件，只刷新索引中的 stat 信息 | 关闭 |
| `--ignore-errors` | 遇到错误时继续添加其他文件 | 关闭 |
| `--ignore-missing` | 配合 --dry-run 使用，忽略不存在的路径 | 关闭 |
| `--renormalize` | 重新应用 clean 过滤器后再添加 | 关闭 |
| `--chmod=(+\|-)x` | 设置或取消文件的可执行权限 | — |
| `--pathspec-from-file=<file>` | 从文件读取 pathspec | — |
| `--pathspec-file-nul` | pathspec 文件使用 NUL 字符分隔 | 关闭 |

## 实战示例

### 示例 1：添加指定文件到暂存区

**场景**：修改了 `main.py` 和 `utils.py` 两个文件，只想暂存 `main.py`

```bash
# 添加单个文件
git add main.py

# 同时添加多个文件
git add main.py utils.py

# 添加整个目录
git add src/
```

**执行效果**：只有指定的文件变更会被添加到暂存区，其他文件变更仍保留在工作区。

### 示例 2：交互式暂存文件的部分变更

**场景**：修改了 `config.js` 中的多处内容，只想暂存其中一部分变更

```bash
git add -p config.js
```

**执行效果**：Git 会逐个显示变更块（hunk），并提供选项：
- `y` - 暂存此块
- `n` - 不暂存此块
- `s` - 拆分更小的块
- `q` - 退出
- `a` - 暂存此块及后续所有块

### 示例 3：添加所有已跟踪文件的修改

**场景**：项目中有新文件和修改文件，只想暂存已跟踪文件的修改

```bash
# 只暂存已跟踪文件的修改和删除
git add -u

# 暂存所有变更（包括新文件）
git add -A
# 或简写
git add .
```

**注意事项**：`git add .` 会添加当前目录下的所有变更；`git add -A` 会添加整个仓库的变更，两者在项目根目录下效果相同。

## 常见踩坑与注意事项

::: warning 误添加了 .gitignore 中的文件
使用 `git add -f` 可以强制添加被 .gitignore 忽略的文件，但通常不应这么做。如果需要添加被忽略的文件，应先检查 .gitignore 规则是否合理。
:::

::: danger 暂存后修改了同一文件
如果 `git add` 后又修改了同一文件，暂存区中的内容是 `git add` 时的快照，而非最新修改。需要再次 `git add` 才能将最新修改纳入暂存区。
:::

::: tip 撤销暂存
如果误用了 `git add`，可以使用 `git restore --staged <file>` 将文件从暂存区撤回到工作区（Git 2.23+），或使用 `git reset HEAD <file>`（传统方式）。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/staging-and-commit/git-commit">git commit</a>
  <a href="/commands/scene-category/staging-and-commit/git-status">git status</a>
  <a href="/commands/scene-category/rollback-and-restore/git-restore">git restore</a>
  <a href="/commands/scene-category/rollback-and-restore/git-reset">git reset</a>
  <a href="/commands/scene-category/staging-and-commit/git-rm">git rm</a>
</div>
