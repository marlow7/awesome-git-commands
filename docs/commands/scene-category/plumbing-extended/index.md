---
title: 底层扩展命令
---

<div class="agc-breadcrumb">
  <a href="../../">命令大全</a>
  <span class="separator">/</span>
  <span>场景化分类</span>
  <span class="separator">/</span>
  <span>底层扩展命令</span>
</div>

# 底层扩展命令

Git 底层命令（Plumbing Commands），适用于脚本编写与高级操作。一般日常开发不需要直接使用，但在自动化脚本、CI/CD 管道和高级 Git 工具开发中非常有用。

::: tip 提示
底层命令的输出格式稳定，适合脚本解析。如需编写 Git 相关自动化工具，建议优先使用底层命令。
:::

## 常用底层命令

| 命令 | 官方描述 |
|------|----------|
| git rev-parse | Pick out and massage parameters |
| git hash-object | Compute object ID and optionally creates a blob from a file |
| git cat-file | Provide content or type and size information for repository objects |
| git write-tree | Create a tree object from the current index |
| git read-tree | Reads tree information into the index |
| git commit-tree | Create a new commit object |
| git update-ref | Update the object name stored in a ref safely |
| git symbolic-ref | Read, modify and delete symbolic refs |
| git for-each-ref | Output information on each ref |
| git ls-files | Show information about files in the index and the working tree |
| git ls-tree | List the contents of a tree object |
| git update-index | Register file contents in the working tree to the index |
| git diff-files | Compares files in the working tree and the index |
| git diff-index | Compare a tree to the working tree or index |
| git diff-tree | Compares the content and mode of blobs found via two tree objects |
| git rev-list | Lists commit objects in reverse chronological order |
| git merge-base | Find as good common ancestors as possible for a merge |
| git ls-remote | List references in a remote repository |
| git pack-objects | Create a packed archive of objects |
| git unpack-objects | Unpack objects from a packed archive |
