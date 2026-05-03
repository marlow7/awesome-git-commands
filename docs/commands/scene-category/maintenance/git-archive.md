---
title: git archive
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/tag-and-release/">标签与版本管理</a>
  <span class="separator">/</span>
  <span>git archive</span>
</div>

<div class="agc-detail-header">

# git archive

<div class="official-def">
  Create an archive of files from a named tree. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-high">场景：版本发布/代码打包</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-archive" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-archive</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git archive [--format=<fmt>] [--list] [--prefix=<prefix>/] [<extra>]
	      [-o <file> | --output=<file>] [--worktree-attributes]
	      [--remote=<repo> [--exec=<git-upload-archive>]] <tree-ish>
	      [<path>…]
```

## 核心功能描述

`git archive` 是 Git 官方的代码归档打包命令，用于从指定的 Git 树对象（分支、提交、标签）创建标准化的归档文件，支持 tar、zip、tar.gz 等主流格式，是软件版本发布、代码分发的核心工具。

它与系统原生打包命令的核心优势是：**仅打包 Git 已跟踪的文件**，自动忽略 `.gitignore` 规则匹配的文件、未跟踪的临时文件、以及 `.git` 仓库目录，无需手动清理冗余内容，打包产物干净规范。同时会根据归档的对象类型自动设置文件修改时间：使用提交/标签ID时，采用提交记录中的时间；使用树ID时，采用当前系统时间。tar 格式会在扩展头中记录提交ID，zip 格式会将提交ID写入文件注释，便于归档包的版本溯源。

**核心适用场景**：
- 软件正式版本发布包的标准化打包
- CI/CD 流水线中构建产物的代码归档
- 导出指定版本/指定目录的代码，无需完整克隆仓库
- 跨环境分发干净的代码快照，排除本地开发冗余文件

## 核心参数详解

| 参数 | 核心描述 | 默认值 |
|------|----------|--------|
| `--format=<fmt>` | 指定归档格式，支持 `tar`、`zip`、`tar.gz`、`tgz`，也支持自定义格式 | 未指定输出文件时默认 `tar`，指定输出文件时自动根据后缀推断 |
| `-l, --list` | 列出所有支持的归档格式 | 关闭 |
| `-v, --verbose` | 详细模式，向标准错误流输出打包进度 | 关闭 |
| `--prefix=<prefix>/` | 为归档内的所有文件路径添加前缀，必须以 `/` 结尾 | 无，默认无路径前缀 |
| `-o <file>, --output=<file>` | 指定归档输出的文件路径，而非输出到标准输出 | 无，默认输出到 stdout |
| `--add-file=<file>` | 向归档中添加未被 Git 跟踪的文件，可重复使用 | 关闭 |
| `--add-virtual-file=<path>:<content>` | 向归档中添加指定内容的虚拟文件，无需本地存在实体文件 | 关闭 |
| `--worktree-attributes` | 同时读取工作区 `.gitattributes` 文件中的归档规则 | 关闭，默认仅读取归档树中的 `.gitattributes` |
| `--mtime=<time>` | 强制设置归档内文件的修改时间 | 提交/标签ID使用提交时间，树ID使用当前系统时间 |
| `--remote=<repo>` | 从远程仓库拉取归档，而非本地仓库 | 关闭，默认使用本地仓库 |
| `<tree-ish>` | 要归档的 Git 对象，必填项，支持分支名、标签名、提交ID、树ID | 无（必填项） |
| `<path>…` | 仅归档指定的路径/文件，可指定多个 | 无，默认归档整个树的所有文件 |
| `-<digit>` | 压缩级别，zip 格式支持 0-9（0为仅存储，9为最高压缩），tar 格式透传给对应压缩命令 | zip 格式默认 6，tar 格式依压缩工具而定 |

## 实战示例

### 示例1：版本发布标准打包（最常用）
```bash
# 为v1.0.0标签创建tar.gz格式发布包，添加目录前缀，自动推断格式
git archive --prefix=my-project-v1.0.0/ -o my-project-v1.0.0.tar.gz v1.0.0

# 等价写法，显式指定格式
git archive --format=tar.gz --prefix=my-project-v1.0.0/ v1.0.0 > my-project-v1.0.0.tar.gz
```

### 示例2：ZIP格式打包与压缩级别控制
```bash
# 创建zip格式归档，最高压缩级别
git archive --format=zip -9 --prefix=my-project/ -o my-project-latest.zip HEAD

# 仅打包当前HEAD的src和docs目录
git archive --format=zip -o my-project-src.zip HEAD src docs
```

### 示例3：添加额外文件到归档
```bash
# 打包主代码，同时添加未跟踪的README.md和LICENSE文件
git archive --prefix=my-project/ -o my-project.tar.gz HEAD --add-file=README.md --add-file=LICENSE

# 向归档中添加虚拟版本信息文件
git archive --prefix=my-project/ -o my-project.tar.gz HEAD --add-virtual-file=VERSION:1.0.0
```

### 示例4：远程仓库归档与高级配置
```bash
# 从远程仓库直接拉取指定标签的归档包
git archive --remote=https://github.com/your-org/your-repo.git --format=tar.gz v1.0.0 > my-project-v1.0.0.tar.gz

# 查看所有支持的归档格式
git archive --list
```

## 常见踩坑与注意事项

::: warning 仅打包 Git 已跟踪的文件
`git archive` 只会包含已被 Git 跟踪的文件，未执行 `git add` 的新文件、`.gitignore` 忽略的文件不会被打包；需要包含未跟踪文件时，必须使用 `--add-file` 参数显式添加。
:::

::: warning --prefix 必须以 / 结尾
前缀参数 `--prefix` 必须以 `/` 结尾，否则会将前缀作为文件名的开头拼接，而非创建独立目录；比如 `--prefix=my-project` 会生成 `my-projectREADME.md`，而非 `my-project/README.md`。
:::

::: tip 提交ID与树ID的归档区别
使用标签/提交ID归档时，会用提交时间作为文件修改时间，同时在归档中记录提交ID，便于版本溯源，是发布打包的最佳实践；使用树ID归档时，会用当前系统时间作为修改时间，且不记录提交信息。
:::

::: warning 压缩级别参数仅对对应格式生效
`-0` 到 `-9` 的压缩级别参数，必须放在格式参数之后，且仅对指定的格式生效；zip 格式原生支持，tar 格式仅对带压缩的格式（tar.gz、tgz）生效。
:::

::: tip 通过 export-ignore 配置永久排除文件
可在 `.gitattributes` 中通过 `export-ignore` 属性，永久排除指定文件/目录被打包进归档，比如 `tests/ export-ignore`、`*.log export-ignore`，无需每次打包手动指定排除路径。
:::

::: warning 远程归档有权限限制
`--remote` 远程归档功能，受远程仓库的配置限制，大多数公共 Git 平台（GitHub、GitLab）会禁用该功能，避免仓库内容被未授权拉取，该参数仅适用于私有自建 Git 服务。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/tag-and-release/git-tag">git tag</a>
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
  <a href="/commands/scene-category/staging-and-commit/git-ls-files">git ls-files</a>
  <a href="/commands/scene-category/ignore-config/gitattributes">.gitattributes 配置</a>
  <a href="/commands/scene-category/remote-collaboration/git-clone">git clone</a>
</div>