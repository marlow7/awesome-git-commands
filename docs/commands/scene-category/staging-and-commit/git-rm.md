---
title: git rm
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/staging-and-commit/">文件暂存与提交管理</a>
  <span class="separator">/</span>
  <span>git rm</span>
</div>

<div class="agc-detail-header">

# git rm

<div class="official-def">
  Remove files from the working tree and from the index. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：文件删除</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-rm" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-rm</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git rm [-f | --force] [-n] [-r] [--cached] [--ignore-unmatch]
       [--quiet] [--pathspec-from-file=<file> [--pathspec-file-nul]]
       [--] [<pathspec>…]
```

## 核心功能描述

`git rm` 是 Git 文件删除的核心命令，用于同时从**工作区**和**Git 暂存区（索引）**中删除指定的文件/目录，同步完成文件删除与暂存操作，删除动作会随下一次提交永久记录到仓库历史中。

它与系统原生 `rm` 命令的核心区别是：`git rm` 不仅删除本地文件，还会自动将删除状态同步到 Git 暂存区，无需额外执行 `git add` 操作；而系统 `rm` 仅删除本地文件，需手动执行 `git add -u` 才能同步删除状态到暂存区。

**核心特性**：
- 默认仅删除已被 Git 跟踪的文件，无法删除未纳入版本控制的文件
- 默认仅允许删除与当前分支最新提交完全一致、暂存区无修改的文件，强制删除需加 `-f` 参数
- 支持 `--cached` 参数，实现仅从暂存区删除、保留本地文件，核心用于取消文件跟踪
- 支持通配符匹配、递归目录删除、批量文件处理等能力

**适用场景**：
- 从仓库中删除不再需要的已跟踪文件，同步更新版本控制
- 取消已纳入 Git 跟踪的文件，配合 `.gitignore` 实现忽略提交
- 批量删除目录下的指定类型文件，同步更新暂存区
- 清理仓库中废弃的目录、冗余文件，同步记录到版本历史

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<pathspec>…` | 要删除的文件/目录路径，支持通配符匹配；指定目录时需配合 `-r` 递归参数 | 无 |
| `-f, --force` | 强制覆盖安全校验，删除与最新提交不一致、或暂存区有修改的文件 | 关闭，默认执行文件一致性校验 |
| `-n, --dry-run` | 干运行模式，不实际删除文件，仅输出会被删除的文件列表 | 关闭 |
| `-r` | 允许递归删除目录及其子目录下的所有文件，指定目录路径时必须显式添加 | 关闭，默认不允许直接删除目录 |
| `--` | 分隔符，用于区分命令选项和文件路径，解决文件名与选项冲突的问题 | 无 |
| `--cached` | 仅从 Git 暂存区删除文件，**保留本地工作区文件不变**，核心用于取消文件跟踪 | 关闭，默认同时删除工作区和暂存区 |
| `--ignore-unmatch` | 即使没有匹配到任何文件，也以 0 状态码正常退出，不抛出错误 | 关闭，无匹配文件时会报错退出 |
| `--sparse` | 允许删除稀疏检出范围外的索引条目，默认会拒绝删除稀疏检出锥外的路径 | 关闭 |
| `-q, --quiet` | 静默模式，抑制删除操作的输出信息 | 关闭，默认输出每个被删除的文件 |
| `--pathspec-from-file=<file>` | 从指定文件中读取要删除的路径列表，`-` 代表从标准输入读取 | 关闭 |
| `--pathspec-file-nul` | 配合 `--pathspec-from-file` 使用，路径列表以 NUL 字符分隔 | 关闭 |

## 实战示例

### 示例1：基础文件删除（最常用）
```bash
# 删除单个已跟踪文件，同时更新工作区和暂存区
git rm src/utils.js

# 删除多个文件
git rm src/router.js src/assets/logo.png

# 提交删除操作到仓库
git commit -m "chore: remove unused files"
```

### 示例2：核心场景 - 取消文件跟踪（不删除本地文件）
```bash
# 仅从暂存区删除，保留本地文件，取消Git跟踪
git rm --cached .env.local

# 批量取消目录下所有文件的跟踪
git rm --cached -r dist/

# 配合.gitignore的标准流程
git rm --cached .env.local
echo ".env.local" >> .gitignore
git add .gitignore
git commit -m "chore: ignore local env file"
```

### 示例3：目录递归删除
```bash
# 递归删除整个目录及其所有子文件
git rm -r src/components/legacy-ui/

# 预览目录删除结果，不实际执行
git rm -r -n src/components/legacy-ui/
```

### 示例4：强制删除与批量处理
```bash
# 强制删除已修改、与最新提交不一致的文件
git rm -f src/modified-file.js

# 递归删除所有.log后缀的日志文件
git rm "**/*.log"

# 忽略无匹配文件的错误，适配脚本执行
git rm --ignore-unmatch temp/*.tmp
```

## 常见踩坑与注意事项

::: tip git rm 与系统 rm 的核心区别
`git rm` 会自动同步删除状态到暂存区，而系统 `rm` 仅删除本地文件，需额外执行 `git add -u` 同步状态；需要从 Git 仓库中删除文件时，优先使用 `git rm`。
:::

::: warning --cached 是取消文件跟踪的唯一正确姿势
直接将已跟踪的文件加入 `.gitignore` 不会生效，必须先执行 `git rm --cached <文件>` 取消跟踪，再添加到 `.gitignore` 中，才能让忽略规则生效。
:::

::: warning 已修改的文件必须加 -f 才能删除
如果文件内容与当前分支最新提交不一致，或暂存区有修改，直接执行 `git rm` 会报错，必须加 `-f` 强制删除，避免误丢修改内容。
:::

::: danger 递归删除前务必用 -n 预览
`git rm -r` 会递归删除整个目录，执行前务必先用 `-n` 预览删除范围，确认无误后再执行，避免误删重要文件。
:::

::: warning 通配符匹配必须加引号
通配符匹配时，`git rm "*.txt"` 会由 Git 递归匹配所有子目录，而 `git rm *.txt` 仅由 shell 匹配当前目录，需要递归匹配时必须给通配符加上引号。
:::

::: warning 子模块删除必须用 git rm
删除子模块必须用 `git rm`，它会自动更新 `.gitmodules` 配置、保护子模块历史；直接用系统 `rm` 会导致子模块配置残留、仓库状态异常。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/staging-and-commit/git-add">git add</a>
  <a href="/commands/scene-category/staging-and-commit/git-commit">git commit</a>
  <a href="/commands/scene-category/staging-and-commit/git-mv">git mv</a>
  <a href="/commands/scene-category/staging-and-commit/git-restore">git restore</a>
  <a href="/commands/scene-category/branch-management/git-reset">git reset</a>
  <a href="/commands/scene-category/ignore-config/gitignore">.gitignore 配置</a>
  <a href="/commands/scene-category/submodule-worktree/git-submodule">git submodule</a>
</div>