---
title: git clone
---

<div class="agc-breadcrumb">
  <a href="../../">命令大全</a>
  <span class="separator">/</span>
  <a href="./">仓库初始化与基础配置</a>
  <span class="separator">/</span>
  <span>git clone</span>
</div>

<div class="agc-detail-header">

# git clone

<div class="official-def">
  Clone a repository into a new directory. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
  <span class="agc-tag agc-tag-high">场景：克隆仓库</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-clone" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-clone</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git clone [--template=<template-directory>]
          [-l] [-s] [--no-hardlinks] [-q] [-n] [--bare] [--mirror]
          [-o <name>] [-b <name>] [-u <upload-pack>] [--reference <repository>]
          [--dissociate] [--separate-git-dir <git-dir>] [--depth <depth>]
          [--[no-]single-branch] [--no-tags] [--recurse-submodules[=<pathspec>]]
          [--[no-]shallow-submodules] [--[no-]remote-submodules] [--jobs <n>]
          [--sparse] [--filter=<filter>] [--] <repository> [<directory>]
```

## 核心功能描述

`git clone` 命令将远程仓库克隆到本地新目录中，创建远程跟踪分支和初始分支，并检出初始分支。

**适用场景**：
- 首次获取远程仓库的完整副本
- 参与已有项目的开发

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<repository>` | 仓库 URL 或路径（必填） | — |
| `<directory>` | 克隆到的本地目录名 | 仓库名 |
| `-o <name>, --origin <name>` | 设置远程名称 | origin |
| `-b <name>, --branch <name>` | 检出指定分支 | 默认分支 |
| `--depth <depth>` | 创建浅克隆 | 完整历史 |
| `--single-branch` | 只克隆指定分支 | 所有分支 |
| `--no-single-branch` | 克隆所有分支的历史 | — |
| `--bare` | 创建裸仓库（无工作区） | 关闭 |
| `--mirror` | 镜像克隆 | 关闭 |
| `--recurse-submodules` | 克隆后初始化子模块 | 关闭 |
| `--sparse` | 启用稀疏检出 | 关闭 |
| `--filter=<filter>` | 部分克隆过滤器 | — |
| `-q, --quiet` | 静默模式 | 关闭 |
| `-v, --verbose` | 详细输出 | 关闭 |
| `--no-tags` | 不克隆标签 | 关闭 |
| `--separate-git-dir <git-dir>` | 将 .git 目录放在指定位置 | — |
| `--reference <repository>` | 参考本地仓库减少网络传输 | — |
| `--dissociate` | 在克隆完成后解除与参考仓库的关联 | 关闭 |
| `-n, --no-checkout` | 克隆后不检出 HEAD | 关闭 |
| `--shallow-submodules` | 子模块也使用浅克隆 | 关闭 |
| `--jobs <n>` | 并行下载的子模块数量 | 1 |

## 实战示例

### 示例 1：基本克隆

```bash
# 克隆远程仓库
git clone https://github.com/user/repo.git

# 克隆到指定目录
git clone https://github.com/user/repo.git my-project

# 克隆指定分支
git clone -b develop https://github.com/user/repo.git
```

### 示例 2：浅克隆（节省时间和空间）

```bash
# 只克隆最近1次提交的历史
git clone --depth 1 https://github.com/user/repo.git

# 浅克隆 + 只克隆指定分支
git clone --depth 1 --single-branch -b main https://github.com/user/repo.git
```

**注意事项**：浅克隆的历史不完整，某些操作（如 blame、log 完整历史）可能受限。

## 常见踩坑与注意事项

::: warning 浅克隆的限制
浅克隆可能导致 `git push` 被拒绝、无法进行某些合并操作。如需完整历史，可通过 `git fetch --unshallow` 转换为完整克隆。
:::

::: tip 大型仓库建议使用部分克隆
```bash
# 只克隆元数据，按需下载文件内容
git clone --filter=blob:none https://github.com/user/large-repo.git
```
部分克隆比浅克隆更灵活，Git 会在需要时自动下载缺失的对象。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/remote-collaboration/git-fetch">git fetch</a>
  <a href="/commands/scene-category/remote-collaboration/git-pull">git pull</a>
  <a href="/commands/scene-category/remote-collaboration/git-remote">git remote</a>
  <a href="/commands/scene-category/init-and-config/git-init">git init</a>
</div>
