---
title: 辅助命令（Ancillary Commands）
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <span>官方原生分类</span>
  <span class="separator">/</span>
  <span>辅助命令</span>
</div>

# 辅助命令（Ancillary Commands）

> 官方定义：辅助性命令，用于操控和查询 Git 仓库的元数据与配置，不直接修改工作区内容。
>
> 内容来源：[Git 官方文档 - Ancillary Commands](https://git-scm.com/docs/git#_ancillary_commands)

## 操作类

| 命令 | 官方描述 | 标签 |
|------|----------|------|
| git config | Get and set repository or global options | <span class="agc-tag agc-tag-high">高频</span> |
| git fast-export | Export data exporter | <span class="agc-tag agc-tag-low">底层</span> |
| git fast-import | Backend for fast Git data importers | <span class="agc-tag agc-tag-low">底层</span> |
| git filter-branch | Rewrite branches | <span class="agc-tag agc-tag-deprecated">废弃</span> |
| git mergetool | Run merge conflict resolution tools to resolve merge conflicts | <span class="agc-tag agc-tag-common">常用</span> |
| git pack-refs | Pack heads and tags for efficient repository access | <span class="agc-tag agc-tag-low">底层</span> |
| git prune | Prune all unreachable objects from the object database | <span class="agc-tag agc-tag-low">底层</span> |
| git reflog | Manage reflog information | <span class="agc-tag agc-tag-common">常用</span> |
| git remote | Manage set of tracked repositories | <span class="agc-tag agc-tag-high">高频</span> |
| git repack | Pack unpacked objects in a repository | <span class="agc-tag agc-tag-low">底层</span> |
| git replace | Create, list, delete refs to replace objects | <span class="agc-tag agc-tag-low">底层</span> |

## 查询类

| 命令 | 官方描述 | 标签 |
|------|----------|------|
| git annotate | Annotate file lines with commit information | <span class="agc-tag agc-tag-common">常用</span> |
| git blame | Show what revision and author last modified each line of a file | <span class="agc-tag agc-tag-high">高频</span> |
| git bugreport | Collect information for user to file a bug report | <span class="agc-tag agc-tag-low">底层</span> |
| git count-objects | Count unpacked number of objects and their disk consumption | <span class="agc-tag agc-tag-low">底层</span> |
| git difftool | Show changes using common diff tools | <span class="agc-tag agc-tag-common">常用</span> |
| git fsck | Verifies the connectivity and validity of the objects in the database | <span class="agc-tag agc-tag-common">常用</span> |
| git help | Display help information about Git | <span class="agc-tag agc-tag-common">常用</span> |
| git instaweb | Instantly browse your working repository in gitweb | <span class="agc-tag agc-tag-low">底层</span> |
| git merge-tree | Show three-way merge without touching index | <span class="agc-tag agc-tag-low">底层</span> |
| git rerere | Reuse recorded resolution of previously resolved merge conflicts | <span class="agc-tag agc-tag-low">底层</span> |
| git show-branch | Show branches and their commits | <span class="agc-tag agc-tag-common">常用</span> |
| git verify-commit | Check the GPG signature of commits | <span class="agc-tag agc-tag-low">底层</span> |
| git verify-tag | Check the GPG signature of tags | <span class="agc-tag agc-tag-low">底层</span> |
| git whatchanged | Show logs with difference each commit introduces | <span class="agc-tag agc-tag-deprecated">废弃</span> |
