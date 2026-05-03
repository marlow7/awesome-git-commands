---
title: git tag
---

<div class="agc-breadcrumb">
  <a href="../../">命令大全</a>
  <span class="separator">/</span>
  <a href="./">标签与版本管理</a>
  <span class="separator">/</span>
  <span>git tag</span>
</div>

<div class="agc-detail-header">

# git tag

<div class="official-def">
  Create, list, delete or verify tags. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：版本发布/里程碑标记</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-tag" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-tag</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git tag [-a | -s | -u <key-id>] [-f] [-m <msg> | -F <file>] [-e]
	[(--trailer <token>[(=|:)<value>])…]
	<tagname> [<commit> | <object>]
git tag -d <tagname>…
git tag [-n[<num>]] -l [--contains <commit>] [--no-contains <commit>]
	[--points-at <object>] [--column[=<options>] | --no-column]
	[--create-reflog] [--sort=<key>] [--format=<format>]
	[--merged <commit>] [--no-merged <commit>] [<pattern>…]
git tag -v [--format=<format>] <tagname>…
```

## 核心功能描述

`git tag` 是 Git 标签管理的核心命令，用于创建、列出、删除和验证 Git 标签对象。标签是对 Git 仓库历史中某一个特定提交的永久标记，最常用于标记软件发布版本（如 `v1.0.0`、`v2.3.5`），为开发里程碑提供一个固定、易读的引用名称，替代冗长难记的提交哈希。

Git 标签分为两种核心类型，适用场景完全不同：
- **附注标签（Annotated Tag）**：通过 `-a`/`-s`/`-u` 参数创建，是完整的 Git 对象，包含创建时间、标签人信息、标签说明、可选的加密签名，不可篡改，**正式版本发布必须使用附注标签**。
- **轻量标签（Lightweight Tag）**：不加任何参数直接创建，仅是提交的一个固定别名，不包含额外信息，仅用于本地临时标记，不适合正式发布场景。

**适用场景**：
- 标记软件正式发布版本，构建版本管理体系
- 标记开发里程碑、测试版本、修复补丁节点
- 为生产环境回滚、问题复现提供固定的版本锚点
- 为开源项目提供可验证的加密签名发布包
- 批量筛选、管理仓库的历史版本标记

## 全量参数详解

### 核心创建参数
| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<tagname>` | 要创建/删除/验证的标签名称，需符合 Git 引用命名规范 | 无（必填项） |
| `<commit>` | `<object>` | 标签要指向的提交/对象，不指定时默认指向当前 `HEAD` | 当前 `HEAD` |
| `-a, --annotate` | 创建一个无签名的附注标签 | 关闭，默认创建轻量标签 |
| `-s, --sign` | 使用默认签名密钥创建加密签名的附注标签，签名方式由 `gpg.format` 配置决定 | 关闭 |
| `--no-sign` | 强制关闭标签签名，覆盖 `tag.gpgSign` 全局强制签名配置 | 关闭 |
| `-u <key-id>, --local-user=<key-id>` | 使用指定的密钥创建加密签名的附注标签 | 关闭 |
| `-f, --force` | 强制覆盖已存在的同名标签（重打标签） | 关闭，同名标签创建会直接失败 |
| `-m <msg>, --message=<msg>` | 指定标签说明信息，多个 `-m` 参数会拼接为独立段落，隐含 `-a` 自动创建附注标签 | 关闭，未指定时会自动打开编辑器输入 |
| `-F <file>, --file=<file>` | 从指定文件中读取标签说明信息，`-` 代表从标准输入读取，隐含 `-a` | 关闭 |
| `-e, --edit` | 编辑从 `-m`/`-F` 获取的标签信息，打开编辑器二次修改 | 关闭 |
| `--trailer <token>[(=\|:)<value>]` | 为标签信息添加自定义尾部字段，如 `--trailer "Release-Type: Stable"` | 关闭 |

### 列表与筛选参数
| 参数 | 描述 | 默认值 |
|------|------|--------|
| `-l, --list` | 列出标签，支持通配符模式筛选（如 `v-*`），无参数执行 `git tag` 等价于 `git tag -l` | 关闭 |
| `-n <num>` | 列出标签时，显示标签说明的前 `<num>` 行，不指定数字时默认显示第一行 | 关闭，默认不显示标签说明 |
| `--sort=<key>` | 按指定规则排序标签，前缀 `-` 代表倒序，支持 `version:refname` 按版本号语义排序 | 字典序排序，可通过 `tag.sort` 配置修改默认规则 |
| `-i, --ignore-case` | 标签筛选和排序时忽略大小写 | 关闭 |
| `--column[=<options>], --no-column` | 以多列形式展示标签列表/关闭多列展示 | 关闭 |
| `--contains <commit>` | 仅列出包含指定提交的标签，不指定提交时默认 `HEAD` | 关闭 |
| `--no-contains <commit>` | 仅列出不包含指定提交的标签 | 关闭 |
| `--merged <commit>` | 仅列出提交可从指定提交到达的标签（已合入当前分支的标签） | 关闭 |
| `--no-merged <commit>` | 仅列出提交无法从指定提交到达的标签（未合入当前分支的标签） | 关闭 |
| `--points-at <object>` | 仅列出指向指定对象的标签 | 关闭 |
| `--format=<format>` | 自定义标签列表的输出格式，与 `git for-each-ref` 格式兼容 | 默认仅输出标签名 |

### 管理与验证参数
| 参数 | 描述 | 默认值 |
|------|------|--------|
| `-d, --delete` | 删除指定名称的一个或多个标签 | 关闭 |
| `-v, --verify` | 验证指定标签的加密签名，验证签名有效性与发布者身份 | 关闭 |
| `--create-reflog` | 为标签创建 reflog 记录 | 关闭，默认不记录标签的 reflog |
| `--cleanup=<mode>` | 设置标签信息的清理模式，可选 `verbatim`/`whitespace`/`strip` | `strip`，默认去除空白和注释 |

## 实战示例

### 示例 1：基础标签创建（最常用）

```bash
# 创建轻量标签（仅本地临时使用，不推荐正式发布）
git tag v1.0.0

# 创建附注标签（带说明，正式版本发布推荐）
git tag -a v1.0.0 -m "chore: release stable version 1.0.0"

# 为指定的历史提交打标签
git tag -a v0.9.0 -m "chore: beta version 0.9.0" 7a9f3d2c

# 创建带加密签名的附注标签（开源项目发布推荐）
git tag -s v1.0.0 -m "chore: signed release version 1.0.0"

# 创建带自定义密钥的签名标签
git tag -u your-key-id@example.com v1.0.0 -m "chore: custom signed release"

# 强制重打已存在的标签（覆盖旧标签）
git tag -f -a v1.0.0 -m "chore: re-release version 1.0.0"
```

### 示例 2：标签查看与筛选

```bash
# 列出所有标签（默认按字典序排序）
git tag

# 列出标签并显示标签说明的第一行
git tag -n

# 列出标签并显示完整的标签说明（前20行）
git tag -n20

# 按通配符筛选标签（仅显示v1开头的版本）
git tag -l "v1.*"

# 按语义版本号排序（正确处理v1.10.0在v1.2.0之后）
git tag -l --sort=version:refname

# 按版本号倒序排序（最新版本在前）
git tag -l --sort=-version:refname

# 仅列出已合入当前分支的标签
git tag -l --merged HEAD

# 仅列出未合入当前分支的标签
git tag -l --no-merged HEAD

# 仅列出包含指定提交的标签
git tag -l --contains 7a9f3d2c

# 仅列出指向当前HEAD的标签
git tag -l --points-at HEAD

# 自定义格式化输出标签信息
git tag -l --format="%(refname:strip=2) | %(creatordate:short) | %(subject)"
```

### 示例 3：标签推送与拉取

```bash
# 推送单个标签到远程仓库
git push origin v1.0.0

# 一次性推送所有本地新增的标签到远程仓库
git push origin --tags

# 拉取远程仓库的所有标签到本地
git fetch origin --tags

# 拉取远程标签并合并到当前分支
git pull origin --tags
```

### 示例 4：标签删除

```bash
# 删除本地标签
git tag -d v1.0.0

# 批量删除多个本地标签
git tag -d v0.9.0 v0.9.1 v0.9.2

# 删除远程仓库的标签（两步法）
# 1. 先删除本地标签
git tag -d v1.0.0
# 2. 推送空引用到远程，删除远程标签
git push origin :refs/tags/v1.0.0

# 删除远程标签的简化写法
git push origin --delete v1.0.0

# 同时删除本地和远程的标签
git tag -d v1.0.0 && git push origin --delete v1.0.0
```

### 示例 5：标签签名与验证

```bash
# 验证单个标签的签名
git tag -v v1.0.0

# 验证多个标签的签名
git tag -v v1.0.0 v1.1.0 v1.2.0

# 全局配置默认签名密钥
git config --global user.signingKey "your-key-id"
git config --global gpg.format openpgp

# 全局强制所有标签都必须签名
git config --global tag.gpgSign true
```

### 示例 6：标签检出与使用

```bash
# 检出标签，进入 detached HEAD 状态，用于版本复现、编译打包
git checkout v1.0.0

# 从标签创建新分支，用于旧版本修复
git checkout -b hotfix/v1.0.0 v1.0.0

# 查看标签对应的提交详情
git show v1.0.0
```

## 常见踩坑与注意事项

::: warning 标签不会自动推送到远程仓库
这是新手最常见的坑：**本地创建的标签，不会随着 `git push` 自动推送到远程仓库**。
必须手动执行 `git push origin <tagname>` 推送单个标签，或 `git push origin --tags` 批量推送所有标签，否则其他协作者和远程仓库看不到你创建的标签。
:::

::: danger 已推送的标签重打风险极高
已经推送到远程仓库的标签，不建议强制重打（`-f` 参数）。
- 其他协作者已经拉取了旧标签，Git 不会自动覆盖他们本地的旧标签，会导致同一个标签名在不同人本地对应不同的提交，出现严重的版本混乱
- 若必须重打已推送的标签，需要公开公告，让所有协作者执行 `git tag -d <tagname> && git fetch --tags` 重新拉取
- 最佳实践：版本号迭代（如 `v1.0.0` 改为 `v1.0.1`），而非重打同名标签
:::

::: tip 附注标签 vs 轻量标签 核心选择标准
| 场景 | 推荐标签类型 | 原因 |
|------|--------------|------|
| 正式版本发布 | 附注标签（`-a`/`-s`） | 包含完整的发布人、时间、说明信息，可签名验证，不可篡改，符合版本发布规范 |
| 本地临时标记、测试快照 | 轻量标签 | 无需额外信息，仅作为提交别名，快速创建 |
| 开源项目对外发布 | 签名附注标签（`-s`） | 可验证发布者身份，防止篡改，保障供应链安全 |

`git describe` 命令默认会忽略轻量标签，仅识别附注标签，用于生成版本号字符串。
:::

::: warning 标签和分支的本质区别
- **标签**：是对**单个提交**的永久固定引用，不会随着新的提交移动，永远指向同一个提交
- **分支**：是对提交线的动态引用，会随着新的提交自动向前移动
- 永远不要在标签上直接开发，检出标签后如果需要修改，必须从标签创建新分支
:::

::: tip 标签命名最佳实践
1.  统一使用语义化版本格式：`v<主版本>.<次版本>.<补丁版本>`，如 `v1.2.3`
2.  预发布版本添加后缀：`v1.0.0-beta.1`、`v1.0.0-rc.2`
3.  避免使用特殊字符、空格、中文，仅使用字母、数字、`.`、`-`、`_`
4.  不要以 `/` 结尾，不要使用连续的 `.`，避免与 Git 引用规则冲突
:::

::: warning 拉取标签时的冲突处理
如果远程仓库的标签和本地标签同名但指向不同提交，`git fetch --tags` 不会覆盖本地标签。
解决方案：
```bash
# 先删除本地冲突标签
git tag -d v1.0.0
# 再重新拉取远程标签
git fetch origin --tags
```
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
  <a href="/commands/scene-category/remote-collaboration/git-push">git push</a>
  <a href="/commands/scene-category/remote-collaboration/git-fetch">git fetch</a>
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
  <a href="/commands/scene-category/log-and-diff/git-show">git show</a>
  <a href="/commands/scene-category/merge-and-rebase/git-describe">git describe</a>
  <a href="/commands/scene-category/branch-management/git-switch">git switch</a>
</div>