---
title: git fsck
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/troubleshooting/">故障排查与恢复</a>
  <span class="separator">/</span>
  <span>git fsck</span>
</div>

<div class="agc-detail-header">

# git fsck

<div class="official-def">
  Verifies the connectivity and validity of the objects in the database. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-high">场景：仓库完整性校验</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-fsck" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-fsck</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git fsck [--tags] [--root] [--unreachable] [--cache] [--no-reflogs]
	 [--[no-]full] [--strict] [--verbose] [--lost-found]
	 [--[no-]dangling] [--[no-]progress] [--connectivity-only]
	 [--[no-]name-objects] [--[no-]references] [<object>…]
```

## 核心功能描述

`git fsck` 是 Git 仓库的完整性校验与故障诊断核心命令，用于验证 Git 对象数据库中所有对象的连通性、哈希完整性与格式有效性。

它会深度扫描仓库中的所有 commit（提交）、tree（目录树）、blob（文件内容）、tag（标签）对象，校验对象哈希是否匹配、内容格式是否合规、对象之间的引用关系是否完整，同时识别出不可达、悬空、缺失、损坏的对象，是 Git 仓库数据损坏、提交丢失、仓库异常等故障排查的核心工具。

**适用场景**：
- 校验 Git 仓库的完整性，排查对象损坏、哈希不匹配等数据问题
- 恢复意外删除、丢失的提交与文件内容
- 识别仓库中不可达的悬空对象，清理冗余数据
- 严格校验仓库对象格式，排查历史提交中的不规范内容
- 仓库拉取/推送失败、Git 命令异常时的故障诊断
- 迁移仓库前的完整性校验，确保数据无损坏

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<object>…` | 将指定对象作为不可达性追踪的头节点，不指定则默认使用索引、所有 refs 引用、reflog 记录作为头节点 | 无 |
| `--unreachable` | 打印存在于仓库中、但无法从任何引用节点到达的对象 | 关闭 |
| `--dangling/--no-dangling` | 控制是否打印存在但从未被直接使用的悬空对象，`--no-dangling` 可省略该部分输出 | 默认开启，打印悬空对象 |
| `--root` | 报告根节点提交（无父提交的初始提交） | 关闭 |
| `--tags` | 报告标签对象相关信息 | 关闭 |
| `--cache` | 将索引中记录的所有对象也作为不可达性追踪的头节点 | 关闭 |
| `--no-reflogs` | 不将仅被 reflog 引用的提交视为可达，用于查找曾在引用中、现已删除但仍保留在 reflog 中的提交 | 关闭 |
| `--full/--no-full` | 控制是否校验备用对象池、pack 压缩包中的所有对象，`--no-full` 仅校验主对象目录 | 默认开启 `--full` |
| `--connectivity-only` | 仅校验可达对象的连通性，确保可达对象引用的所有对象都存在，大幅提升校验速度；仅能检测 commit/tree 的损坏，无法检测 blob 内容损坏 | 关闭 |
| `--strict` | 启用更严格的格式校验，捕获旧版本 Git 创建的含 g+w 权限位的不规范文件模式，新项目推荐使用该标志 | 关闭 |
| `--verbose` | 输出详细的校验过程信息 | 关闭 |
| `--lost-found` | 将悬空对象写入 `.git/lost-found/` 目录，commit 类型放入 commit 子目录，blob 等其他类型放入 other 子目录；blob 对象会直接写入文件内容，而非仅保留对象名 | 关闭 |
| `--name-objects` | 显示可达对象名称时，同时输出对象的可达路径描述（兼容 git rev-parse 格式） | 关闭 |
| `--progress/--no-progress` | 控制是否在标准错误流输出校验进度，终端环境默认开启，`--progress` 可强制非终端环境也输出进度 | 终端环境默认开启 |
| `--references/--no-references` | 控制是否通过 `git refs verify` 校验引用数据库的一致性 | 默认开启校验 |

## 核心配置项说明

`git fsck` 的校验规则可通过 Git 配置项深度自定义，以下是核心配置项：

| 配置项 | 功能描述 |
|--------|----------|
| `fsck.<msg-id>` | 调整指定校验规则的严重级别，可选值 `error`/`warn`/`ignore`，可将特定错误转为警告或直接忽略 |
| `fsck.skipList` | 指定一个文件路径，文件中每行一个完整的对象 SHA-1，这些已知的非致命损坏对象会被校验忽略 |
| `receive.fsck.*` | 推送时的 fsck 校验规则，不会继承 `fsck.*` 的配置，需单独设置 |
| `fetch.fsck.*` | 拉取/克隆时的 fsck 校验规则，不会继承 `fsck.*` 的配置，需单独设置 |

## 实战示例

### 示例 1：基础仓库完整性校验（最常用）

```bash
# 基础校验，检查仓库所有对象的完整性与连通性，输出错误与悬空对象
git fsck

# 静默校验，仅输出错误信息，不输出悬空对象等非关键信息
git fsck --no-dangling

# 详细模式，输出完整的校验过程信息
git fsck --verbose
```

### 示例 2：进阶校验与问题排查

```bash
# 严格模式校验，检查不规范的历史对象格式
git fsck --strict

# 仅校验对象连通性，跳过 blob 内容全量校验，大幅提升大仓库校验速度
git fsck --connectivity-only

# 显示所有不可达对象，排查丢失的提交
git fsck --unreachable

# 同时将索引中的对象作为头节点，覆盖暂存区内容校验
git fsck --cache

# 忽略 reflog，查找已从分支中删除但仍在 reflog 中的提交
git fsck --no-reflogs --unreachable
```

### 示例 3：丢失对象/提交恢复

```bash
# 核心恢复命令：将悬空对象写入 lost-found 目录，用于恢复丢失的提交与文件
git fsck --lost-found

# 执行后查看恢复的内容
# 查看恢复的提交
ls .git/lost-found/commit/
# 查看恢复的文件内容
ls .git/lost-found/other/

# 查看恢复的提交内容
git show <恢复的提交SHA>

# 查看恢复的文件内容
cat .git/lost-found/other/<文件SHA>
```

### 示例 4：自定义校验范围与输出

```bash
# 仅校验指定的对象/提交，排查特定对象的问题
git fsck 7a9f3d2c8e4b1a0d5f6e8b9c0d1e2f3a4b5c6d7

# 报告根节点提交与标签信息
git fsck --root --tags

# 强制显示校验进度，即使在非终端脚本环境中
git fsck --progress

# 显示对象的可达路径描述，便于定位对象引用关系
git fsck --name-objects
```

### 示例 5：忽略已知问题的校验

```bash
# 忽略指定的校验错误，比如缺失邮箱的警告
git config fsck.missingEmail ignore

# 配置跳过列表，忽略已知的非致命损坏对象
echo "7a9f3d2c8e4b1a0d5f6e8b9c0d1e2f3a4b5c6d7" > .git/fsck-skip-list
git config fsck.skipList .git/fsck-skip-list

# 执行校验，自动跳过列表中的对象
git fsck
```

## 常见踩坑与注意事项

::: tip 核心术语区分
- **dangling（悬空对象）**：对象存在，但从未被任何其他对象直接引用，通常是废弃的提交、暂存的文件内容，大部分情况可安全清理
- **unreachable（不可达对象）**：对象存在，但无法从任何分支、标签、reflog 到达，可能是被删除的分支提交、重置丢弃的历史
- **missing（缺失对象）**：对象被其他对象引用，但在仓库中不存在，属于严重错误，会导致仓库无法正常使用
- **hash mismatch（哈希不匹配）**：对象内容哈希与文件名不匹配，属于严重的数据损坏，通常由磁盘故障、文件损坏导致
:::

::: warning 严重错误的处理方案
如果 `git fsck` 输出 `missing`、`hash mismatch` 等严重错误，按以下优先级处理：
1.  优先从其他协作者的仓库、备份中获取完整的对象，修复损坏
2.  执行 `git gc --prune=now` 清理无效对象，解决部分非关键损坏
3.  若仅缺失少量对象，可从上游仓库重新拉取：`git fetch origin --force`
4.  极端情况可通过 `git clone` 重新克隆仓库，恢复完整的对象数据库
:::

::: tip --lost-found 恢复技巧
1.  执行 `git fsck --lost-found` 后，所有悬空对象都会被写入 `.git/lost-found/`
2.  对于 commit 对象，可通过 `git log <SHA>`、`git show <SHA>` 查看提交内容，确认是否为丢失的提交
3.  确认需要恢复的提交后，可通过 `git merge <SHA>`、`git cherry-pick <SHA>` 恢复到当前分支
4.  对于 blob 文件对象，可直接打开 `.git/lost-found/other/` 下的文件查看内容，恢复误删的文件
:::

::: warning --strict 模式的使用注意
`--strict` 模式会对旧版本 Git 创建的历史对象抛出错误，Linux 内核、Git 官方仓库等老牌项目都存在这类历史对象。
- 新项目初始化时推荐使用 `--strict` 校验，保证仓库对象格式规范
- 已有老项目不建议强制开启，可通过 `fsck.<msg-id>` 配置单独忽略特定历史问题
:::

::: warning 忽略规则的安全边界
不建议通过 `fsck.<msg-id>` 大范围忽略校验错误，这会掩盖仓库的真实数据问题。
- 优先使用 `fsck.skipList` 忽略已知的特定历史对象，而非整类错误
- 推送/拉取时的校验规则（`receive.fsck.*`/`fetch.fsck.*`）不会继承全局 `fsck.*` 配置，需单独设置
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/repo-optimization/git-gc">git gc</a>
  <a href="/commands/scene-category/troubleshooting/git-reflog">git reflog</a>
  <a href="/commands/scene-category/repo-optimization/git-prune">git prune</a>
  <a href="/commands/scene-category/init-and-config/git-clone">git clone</a>
  <a href="/commands/scene-category/remote-collaboration/git-fetch">git fetch</a>
  <a href="/commands/scene-category/branch-management/git-reset">git reset</a>
</div>