---
title: git remote
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/remote-collaboration/">远程仓库协作</a>
  <span class="separator">/</span>
  <span>git remote</span>
</div>

<div class="agc-detail-header">

# git remote

<div class="official-def">
  Manage set of tracked repositories. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：远程仓库管理</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-remote" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-remote</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git remote [-v | --verbose]
git remote add [-t <branch>] [-m <master>] [-f] [--[no-]tags] [--mirror=<fetch|push>] <name> <URL>
git remote rename [--[no-]progress] <old> <new>
git remote remove <name>
git remote rm <name>
git remote set-head <name> (-a | --auto | -d | --delete | <branch>)
git remote set-branches [--add] <name> <branch>…
git remote get-url [--push] [--all] <name>
git remote set-url [--push] <name> <newurl> [<oldurl>]
git remote set-url --add [--push] <name> <newurl>
git remote set-url --delete [--push] <name> <URL>
git remote [-v | --verbose] show [-n] <name>…
git remote prune [-n | --dry-run] <name>…
git remote [-v | --verbose] update [-p | --prune] [(<group> | <remote>)…]
```

## 核心功能描述

`git remote` 是 Git 远程仓库管理的核心命令集，用于管理本地仓库关联的所有远程仓库（remotes）。它提供了完整的远程仓库生命周期管理能力，包括添加、删除、重命名远程仓库，配置远程仓库的 URL、跟踪分支、默认分支，查看远程仓库详细信息，以及批量更新、清理远程仓库引用等功能。

`git remote` 是 `git clone`、`git fetch`、`git pull`、`git push` 等远程协作命令的基础，通过配置远程仓库，本地仓库才能与远程服务器进行代码同步与协作。

**适用场景**：
- 为本地初始化的仓库添加远程仓库地址
- 管理多个远程仓库（如 origin 主仓库、upstream 上游仓库）
- 修改远程仓库的 URL（如仓库迁移、协议切换）
- 配置仅跟踪远程仓库的特定分支
- 查看远程仓库的详细信息与状态
- 清理本地已失效的远程分支引用
- 批量更新所有关联的远程仓库

## 子命令详解

`git remote` 采用子命令设计，不同功能通过不同子命令实现，以下是核心子命令的详细说明：

### 子命令 1：查看远程仓库列表

```bash
# 仅显示远程仓库名称
git remote

# 显示远程仓库名称及对应的 URL（fetch 和 push）
git remote -v
git remote --verbose
```

**功能说明**：列出本地仓库当前关联的所有远程仓库名称，使用 `-v` 参数可同时显示每个远程仓库的 fetch（拉取）和 push（推送）URL。

---

### 子命令 2：添加远程仓库

```bash
git remote add [选项] <name> <URL>
```

**功能说明**：为本地仓库添加一个新的远程仓库，指定名称与 URL。添加后，可通过 `git fetch <name>` 拉取远程仓库的分支与提交。

**常用选项**：
| 选项 | 描述 |
|------|------|
| `-f` | 添加远程仓库后立即执行 `git fetch <name>` |
| `-t <branch>` | 仅跟踪远程仓库的指定分支，可多次使用指定多个分支 |
| `-m <master>` | 设置远程仓库的默认分支（`refs/remotes/<name>/HEAD`） |
| `--tags` | 拉取远程仓库的所有标签 |
| `--no-tags` | 不拉取远程仓库的标签 |
| `--mirror=fetch` | 创建 fetch 镜像，远程所有 refs 直接镜像到本地（仅裸仓库适用） |
| `--mirror=push` | 创建 push 镜像，后续 `git push` 会自动使用 `--mirror` 行为 |

---

### 子命令 3：重命名远程仓库

```bash
git remote rename <old-name> <new-name>
```

**功能说明**：将远程仓库从 `<old-name>` 重命名为 `<new-name>`，会自动更新所有相关的远程跟踪分支与配置。

---

### 子命令 4：删除远程仓库

```bash
git remote remove <name>
git remote rm <name>
```

**功能说明**：删除指定名称的远程仓库，会自动移除所有相关的远程跟踪分支与配置。

---

### 子命令 5：设置远程仓库默认分支

```bash
# 自动查询远程仓库并设置默认分支
git remote set-head <name> -a
git remote set-head <name> --auto

# 删除远程仓库的默认分支设置
git remote set-head <name> -d
git remote set-head <name> --delete

# 手动指定远程仓库的默认分支
git remote set-head <name> <branch>
```

**功能说明**：设置或删除远程仓库的默认分支（`refs/remotes/<name>/HEAD`）。设置默认分支后，可直接使用 `<name>` 替代 `<name>/<default-branch>`。

---

### 子命令 6：修改远程仓库跟踪的分支

```bash
# 替换远程仓库跟踪的分支列表
git remote set-branches <name> <branch>…

# 向远程仓库添加新的跟踪分支（不替换现有）
git remote set-branches --add <name> <branch>…
```

**功能说明**：修改指定远程仓库跟踪的分支列表，可用于仅跟踪远程仓库的特定分支，减少拉取体积。

---

### 子命令 7：获取/修改远程仓库 URL

```bash
# 获取远程仓库的 URL
git remote get-url [--push] [--all] <name>

# 修改远程仓库的 URL
git remote set-url [--push] <name> <newurl> [<oldurl>]

# 为远程仓库添加新的 URL
git remote set-url --add [--push] <name> <newurl>

# 删除远程仓库的指定 URL
git remote set-url --delete [--push] <name> <URL>
```

**功能说明**：
- `get-url`：获取远程仓库的 URL，`--push` 查询推送 URL，`--all` 列出所有 URL
- `set-url`：修改远程仓库的 URL，支持替换、添加、删除操作，`--push` 操作推送 URL

---

### 子命令 8：显示远程仓库详细信息

```bash
git remote show [-n] <name>…
```

**功能说明**：显示指定远程仓库的详细信息，包括 URL、跟踪分支、默认分支、本地分支与远程分支的对应关系等。使用 `-n` 参数可跳过查询远程仓库，直接使用本地缓存信息。

---

### 子命令 9：清理远程仓库已删除的分支引用

```bash
# 实际执行清理
git remote prune <name>…

# 仅预览会清理的内容，不实际执行
git remote prune -n <name>…
git remote prune --dry-run <name>…
```

**功能说明**：删除本地仓库中与远程仓库已删除分支对应的 stale 远程跟踪分支，等价于 `git fetch --prune <name>`，但不会拉取新的引用。

---

### 子命令 10：更新所有/指定远程仓库

```bash
# 更新所有远程仓库
git remote update

# 更新指定远程仓库/远程组
git remote update [<group> | <remote>…]

# 更新时同时清理 stale 分支
git remote update --prune
git remote update -p
```

**功能说明**：批量更新本地仓库关联的远程仓库，拉取最新的分支与提交。可指定更新特定远程仓库或远程组，使用 `--prune` 可同时清理已删除的分支引用。

## 实战示例

### 示例 1：基础远程仓库管理

```bash
# 查看当前远程仓库
git remote
git remote -v

# 为本地仓库添加远程仓库（最常用）
git remote add origin https://github.com/your-username/your-repo.git

# 添加远程仓库后立即拉取
git remote add -f origin https://github.com/your-username/your-repo.git

# 重命名远程仓库
git remote rename origin upstream

# 删除远程仓库
git remote remove upstream
```

### 示例 2：多远程仓库管理（Fork 工作流）

```bash
# 假设你 Fork 了上游仓库，先克隆你的 Fork
git clone https://github.com/your-username/your-fork.git
cd your-fork

# 添加上游仓库（原仓库）
git remote add upstream https://github.com/organization/original-repo.git

# 查看所有远程仓库
git remote -v
# origin    https://github.com/your-username/your-fork.git (fetch)
# origin    https://github.com/your-username/your-fork.git (push)
# upstream  https://github.com/organization/original-repo.git (fetch)
# upstream  https://github.com/organization/original-repo.git (push)

# 拉取上游仓库的最新更新
git fetch upstream

# 查看远程仓库详细信息
git remote show origin
git remote show upstream
```

### 示例 3：远程仓库 URL 管理

```bash
# 查看远程仓库 URL
git remote get-url origin

# 查看所有 URL（包括 push URL）
git remote get-url --all origin

# 修改远程仓库 URL（如仓库迁移、HTTPS 转 SSH）
git remote set-url origin git@github.com:your-username/your-repo.git

# 为远程仓库添加多个 URL（同时推送到多个仓库）
git remote set-url --add origin https://github.com/your-username/backup-repo.git

# 删除远程仓库的指定 URL
git remote set-url --delete origin https://github.com/your-username/old-repo.git
```

### 示例 4：仅跟踪远程仓库的特定分支

```bash
# 添加远程仓库时仅跟踪 main 分支
git remote add -t main origin https://github.com/your-username/your-repo.git

# 为已有远程仓库添加新的跟踪分支
git remote set-branches --add origin dev

# 替换远程仓库的跟踪分支列表
git remote set-branches origin main dev feature
```

### 示例 5：清理与更新远程仓库

```bash
# 预览会清理的 stale 分支
git remote prune -n origin

# 实际清理 stale 分支
git remote prune origin

# 更新所有远程仓库并清理 stale 分支
git remote update --prune

# 仅更新指定远程仓库
git remote update origin
```

## 常见踩坑与注意事项

::: tip 远程仓库命名规范
- 主仓库通常命名为 `origin`
- 上游仓库（Fork 的原仓库）通常命名为 `upstream`
- 避免使用特殊字符与空格，使用小写字母与连字符
:::

::: warning 远程仓库 URL 协议选择
- **HTTPS**：通用性强，无需配置 SSH 密钥，但每次推送需输入密码/Token（推荐配置 credential helper 缓存）
- **SSH**：更安全、更便捷，配置密钥后无需重复认证，但需要生成并配置 SSH 密钥
- 切换协议使用 `git remote set-url` 即可，无需重新添加远程仓库
:::

::: tip 推荐配置 credential helper 缓存密码
```bash
# 全局配置 credential helper，缓存密码 15 分钟
git config --global credential.helper cache

# 全局配置 credential helper，永久保存密码（仅在可信环境使用）
git config --global credential.helper store
```
:::

::: warning 不要随意删除远程仓库
删除远程仓库（`git remote remove`）会移除所有相关的远程跟踪分支与配置，若误删可重新添加远程仓库并执行 `git fetch` 恢复。
:::

::: danger --mirror 风险警告
`--mirror=fetch`/`--mirror=push` 会直接镜像远程仓库的所有 refs，可能覆盖本地提交，仅在裸仓库、仓库备份等特定场景下使用，普通开发仓库不推荐。
:::

::: tip 定期清理 stale 分支
远程仓库删除分支后，本地的远程跟踪分支不会自动删除，建议定期执行 `git remote prune origin` 或 `git fetch --prune` 清理，保持本地仓库整洁。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/init-and-config/git-clone">git clone</a>
  <a href="/commands/scene-category/remote-collaboration/git-fetch">git fetch</a>
  <a href="/commands/scene-category/remote-collaboration/git-pull">git pull</a>
  <a href="/commands/scene-category/remote-collaboration/git-push">git push</a>
  <a href="/commands/scene-category/branch-management/git-branch">git branch</a>
  <a href="/commands/scene-category/init-and-config/git-config">git config</a>
</div>