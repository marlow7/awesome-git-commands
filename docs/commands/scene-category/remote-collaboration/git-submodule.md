---
title: git submodule
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/submodule-worktree/">子模块与工作树管理</a>
  <span class="separator">/</span>
  <span>git submodule</span>
</div>

<div class="agc-detail-header">

# git submodule

<div class="official-def">
  Initialize, update or inspect submodules. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-medium">进阶</span>
  <span class="agc-tag agc-tag-high">场景：子模块依赖管理</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-submodule" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-submodule</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git submodule [--quiet] [--cached]
git submodule [--quiet] add [options] [--] <repository> [<path>]
git submodule [--quiet] status [--cached] [--recursive] [--] [<path>…]
git submodule [--quiet] init [--] [<path>…]
git submodule [--quiet] deinit [-f | --force] (--all | [--] <path>…)
git submodule [--quiet] update [options] [--] [<path>…]
git submodule [--quiet] set-branch [options] [--] <path>
git submodule [--quiet] set-url [--] <path> <newurl>
git submodule [--quiet] summary [options] [--] [<path>…]
git submodule [--quiet] foreach [--recursive] <command>
git submodule [--quiet] sync [--recursive] [--] [<path>…]
git submodule [--quiet] absorbgitdirs [--] [<path>…]
```

## 核心功能描述

`git submodule` 是 Git 用于管理嵌套仓库的核心命令集，允许你将一个独立的 Git 仓库作为子目录嵌入到另一个 Git 主仓库（超级项目）中，同时保持两个仓库的提交历史完全独立。

它通过 `.gitmodules` 配置文件记录子模块的名称、路径、远程仓库地址等信息，主仓库仅记录子模块对应的提交哈希，不存储子模块的完整文件内容，完美解决「项目依赖公共组件库、第三方开源库，同时需要保留依赖仓库完整版本控制能力」的需求。

**适用场景**：
- 主项目依赖多个独立开发的公共组件库/工具库
- 将大型项目拆分为多个独立子仓库，同时保持主项目的集成能力
- 引入第三方开源仓库作为项目依赖，需要跟踪上游仓库的更新
- 团队协作中，拆分不同模块的权限与开发流程，主项目仅集成稳定版本
- 跨项目复用通用代码，同时保留代码的版本控制与更新能力

## 核心子命令详解

`git submodule` 采用子命令设计，不同功能通过独立子命令实现，以下是核心子命令的完整说明：

### 子命令 1：add - 添加子模块
**功能**：将指定的远程仓库添加为当前主项目的子模块，自动克隆仓库到指定路径，并更新 `.gitmodules` 配置文件。
**常用选项**：
| 选项 | 描述 |
|------|------|
| `-b <branch>, --branch=<branch>` | 指定子模块要跟踪的远程分支，特殊值 `.` 表示与主项目当前分支同名 |
| `--name <name>` | 自定义子模块的逻辑名称，默认使用子模块路径 |
| `--depth <depth>` | 浅克隆子模块，仅拉取指定层数的提交历史 |
| `-f, --force` | 强制添加子模块，绕过路径忽略、名称冲突等检查 |
| `--reference <repository>` | 克隆子模块时使用本地参考仓库，减少网络传输与磁盘占用 |

---

### 子命令 2：status - 查看子模块状态
**功能**：查看所有子模块的当前状态，包括是否初始化、当前检出的提交是否与主仓库记录的哈希匹配、是否存在合并冲突等。
**常用选项**：
| 选项 | 描述 |
|------|------|
| `--cached` | 显示主仓库索引中记录的子模块提交哈希，而非当前检出的版本 |
| `--recursive` | 递归查看嵌套子模块的状态 |

**状态标记说明**：
- `-`：子模块未初始化
- `+`：子模块当前检出的提交与主仓库记录的哈希不匹配
- `U`：子模块存在合并冲突

---

### 子命令 3：init - 初始化子模块
**功能**：初始化子模块，将 `.gitmodules` 中的子模块配置写入主仓库的 `.git/config` 文件，为后续更新做准备。不会自动克隆子模块内容，仅完成本地配置初始化。
**常用说明**：
- 可指定路径限制仅初始化特定子模块，不指定则初始化所有子模块
- 不会覆盖 `.git/config` 中已存在的子模块配置
- 仅需执行一次，后续子模块更新无需重复初始化

---

### 子命令 4：deinit - 反注册子模块
**功能**：取消注册指定的子模块，从 `.git/config` 中移除对应配置，并删除子模块的工作目录。不会删除 `.gitmodules` 中的配置，也不会从主仓库提交历史中移除子模块记录。
**常用选项**：
| 选项 | 描述 |
|------|------|
| `-f, --force` | 强制移除，即使子模块工作目录存在本地修改 |
| `--all` | 反注册当前仓库的所有子模块 |

---

### 子命令 5：update - 更新子模块
**功能**：核心子命令，用于克隆缺失的子模块、拉取子模块的缺失提交、更新子模块工作目录到主仓库记录的指定提交版本。
**核心更新模式**：
| 模式 | 描述 |
|------|------|
| `--checkout`（默认） | 将子模块检出到主仓库记录的提交哈希，处于 detached HEAD 状态 |
| `--rebase` | 将子模块当前分支变基到主仓库记录的提交 |
| `--merge` | 将主仓库记录的提交合并到子模块的当前分支 |
**常用选项**：
| 选项 | 描述 |
|------|------|
| `--init` | 更新前自动初始化未初始化的子模块，无需单独执行 init 命令 |
| `--remote` | 使用子模块远程跟踪分支的最新提交更新，而非主仓库记录的哈希 |
| `--recursive` | 递归更新所有嵌套子模块 |
| `--force` | 强制检出，即使会覆盖子模块的本地修改 |
| `--jobs <n>, -j <n>` | 并行拉取多个子模块，指定并发数，提升大项目更新速度 |
| `--no-fetch, -N` | 更新时不执行 fetch 操作，仅使用本地已有的提交 |

---

### 子命令 6：foreach - 批量执行子模块命令
**功能**：在所有已检出的子模块中执行指定的 shell 命令，支持批量操作。
**内置环境变量**：
- `$name`：子模块在 `.gitmodules` 中定义的名称
- `$sm_path`：子模块在主项目中的路径
- `$sha1`：主仓库记录的子模块提交哈希
- `$toplevel`：主项目的绝对路径
**常用选项**：
| 选项 | 描述 |
|------|------|
| `--recursive` | 递归执行命令，包括所有嵌套子模块 |

---

### 子命令 7：其他常用子命令
| 子命令 | 核心功能 |
|--------|----------|
| `set-branch` | 修改子模块的默认远程跟踪分支 |
| `set-url` | 修改子模块的远程仓库 URL，自动同步本地配置 |
| `summary` | 显示子模块的提交变更摘要，对比主仓库记录与当前子模块的提交差异 |
| `sync` | 将 `.gitmodules` 中的子模块 URL 同步到本地 `.git/config` 配置，适用于子模块上游 URL 变更的场景 |
| `absorbgitdirs` | 将子模块的 `.git` 目录迁移到主仓库的 `.git/modules` 路径下，统一管理子仓库元数据 |

## 全量全局参数详解
| 参数 | 描述 | 适用子命令 |
|------|------|------------|
| `-q, --quiet` | 静默模式，仅输出错误信息 | 所有子命令 |
| `--progress` | 强制显示拉取进度，即使标准错误流未连接终端 | add、update |
| `--cached` | 使用索引中的记录，而非当前工作区的检出状态 | status、summary |
| `--files` | 对比子模块索引与 HEAD 的提交差异 | summary |
| `--recursive` | 递归操作所有嵌套子模块 | status、update、foreach、sync |

## 实战示例

### 示例 1：子模块基础添加与配置（最常用）

```bash
# 添加远程仓库为子模块，放在 ./components/ui 路径下
git submodule add https://github.com/your-org/ui-components.git components/ui

# 添加子模块并指定跟踪 main 分支
git submodule add -b main https://github.com/your-org/ui-components.git components/ui

# 浅克隆子模块，仅拉取最近1条提交，加速克隆
git submodule add --depth 1 https://github.com/your-org/ui-components.git components/ui

# 自定义子模块名称
git submodule add --name ui-kit https://github.com/your-org/ui-components.git components/ui
```

执行后会自动：
1.  克隆子模块仓库到指定路径
2.  生成/更新根目录的 `.gitmodules` 配置文件
3.  将子模块路径添加到主仓库的暂存区

### 示例 2：克隆带子模块的仓库（新手必看）

```bash
# 方法1：一步到位，克隆主仓库并自动初始化+更新所有子模块（含嵌套）
git clone --recurse-submodules https://github.com/your-org/main-project.git

# 方法2：已克隆主仓库，子模块目录为空时执行
# 1. 初始化所有子模块
git submodule init
# 2. 更新所有子模块，递归处理嵌套子模块
git submodule update --recursive

# 方法3：init+update 一步完成（最常用）
git submodule update --init --recursive
```

### 示例 3：子模块更新与同步

```bash
# 将所有子模块更新到主仓库记录的提交版本
git submodule update

# 初始化+更新一步完成
git submodule update --init

# 递归更新所有嵌套子模块
git submodule update --init --recursive

# 拉取子模块上游仓库的最新提交并更新
git submodule update --remote

# 仅更新指定的单个子模块
git submodule update --init components/ui

# 并行更新8个子模块，提升大项目更新速度
git submodule update --init --recursive -j 8
```

### 示例 4：子模块批量操作

```bash
# 查看所有子模块的当前分支与状态
git submodule foreach 'echo $sm_path && git status'

# 为所有子模块拉取最新的上游代码
git submodule foreach 'git fetch origin'

# 切换所有子模块到 main 分支
git submodule foreach 'git checkout main'

# 递归执行命令，处理嵌套子模块
git submodule foreach --recursive 'git pull origin main'

# 忽略命令执行错误，继续执行后续子模块（末尾加 || :）
git submodule foreach 'git pull origin main || :'
```

### 示例 5：子模块 URL 变更与同步

```bash
# 修改指定子模块的远程 URL
git submodule set-url components/ui https://github.com/your-org/new-ui-components.git

# 同步 .gitmodules 中的 URL 到本地配置（上游URL变更时使用）
git submodule sync

# 递归同步所有嵌套子模块的 URL
git submodule sync --recursive

# 同步指定子模块的 URL
git submodule sync components/ui
```

### 示例 6：子模块状态查看

```bash
# 查看所有子模块的基础状态
git submodule status

# 查看主仓库索引中记录的子模块提交
git submodule status --cached

# 递归查看所有嵌套子模块的状态
git submodule status --recursive

# 查看子模块的提交变更摘要
git submodule summary

# 限制摘要显示的提交数量
git submodule summary -n 10
```

### 示例 7：子模块的完整移除步骤
```bash
# 1. 反注册子模块，删除工作目录
git submodule deinit -f components/ui

# 2. 从 .gitmodules 中移除子模块配置
git rm -f components/ui

# 3. 删除子模块的元数据目录
rm -rf .git/modules/components/ui

# 4. 提交修改到主仓库
git commit -m "chore: remove ui submodule"
```

## 常见踩坑与注意事项

::: warning 子模块 detached HEAD 核心问题
子模块默认检出后处于 **detached HEAD（游离头）** 状态，直接在子模块中修改并提交，切换分支/更新后会丢失提交！
**正确操作步骤**：
1.  进入子模块目录，先切换到对应分支：`git checkout main`
2.  进行修改并提交：`git commit -m "fix: xxx"`
3.  推送子模块的修改到远程：`git push origin main`
4.  回到主项目目录，更新主仓库记录的子模块哈希：`git add components/ui`
5.  提交主仓库的修改：`git commit -m "chore: update ui submodule"`
:::

::: danger 克隆后主仓库子模块目录为空
这是新手最常见的问题，原因是 `git clone` 默认不会自动克隆子模块内容。
**解决方案**：
- 克隆时添加 `--recurse-submodules` 参数，一步完成
- 已克隆的仓库执行 `git submodule update --init --recursive`
:::

::: warning 子模块修改未推送，主仓库先提交的风险
如果只在主仓库提交了子模块的哈希更新，但没有推送子模块的修改到远程，其他协作者拉取后会出现「子模块提交哈希不存在」的错误，导致无法更新子模块。
**铁则**：永远先推送子模块的修改，再推送主仓库的修改。
:::

::: tip 子模块上游更新同步最佳实践
```bash
# 方法1：使用 update --remote 一键更新
git submodule update --remote components/ui

# 方法2：手动进入子模块拉取更新（可控性更高）
cd components/ui
git checkout main
git pull origin main
cd ../..
git add components/ui
git commit -m "chore: update ui submodule to latest version"
```
:::

::: warning 不要手动修改 .gitmodules 文件
不推荐直接手动编辑 `.gitmodules` 文件，修改后不会自动同步到本地 `.git/config` 配置，容易出现配置不一致的问题。
**正确做法**：使用 `git submodule set-url`、`git submodule set-branch` 等命令修改配置，Git 会自动同步文件与本地配置。
:::

::: warning 合并冲突时的子模块处理
主项目合并分支时，如果出现子模块哈希冲突，不要手动编辑冲突标记，正确步骤：
1.  确认子模块要使用的正确提交哈希
2.  进入子模块目录，检出正确的提交/分支
3.  回到主项目目录，执行 `git add <子模块路径>` 标记冲突已解决
4.  完成合并提交
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/init-and-config/git-clone">git clone</a>
  <a href="/commands/scene-category/init-and-config/git-init">git init</a>
  <a href="/commands/scene-category/remote-collaboration/git-fetch">git fetch</a>
  <a href="/commands/scene-category/remote-collaboration/git-pull">git pull</a>
  <a href="/commands/scene-category/remote-collaboration/git-push">git push</a>
  <a href="/commands/scene-category/submodule-worktree/git-worktree">git worktree</a>
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
</div>