---
title: 底层命令（Low-level Plumbing Commands）
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <span>官方原生分类</span>
  <span class="separator">/</span>
  <span>底层命令</span>
</div>

# 底层命令（Low-level Plumbing Commands）

> 官方定义：底层命令，适用于脚本编写与高级操作，一般日常开发不需要直接使用。
>
> 内容来源：[Git 官方文档 - Low-level Plumbing Commands](https://git-scm.com/docs/git#_low_level_commands_plumbing)

## 操作类

| 命令 | 官方描述 |
|------|----------|
| git apply | Apply a patch to files and/or to the index |
| git checkout-index | Copy all files from the index to the working tree |
| git commit-graph | Write and verify Git commit-graph files |
| git commit-tree | Create a new commit object |
| git hash-object | Compute object ID and optionally creates a blob from a file |
| git index-pack | Build pack index file for an existing packed archive |
| git merge-file | Run a three-way file merge |
| git merge-index | Run a merge for files needing merging |
| git mktag | Creates a tag object |
| git mktree | Build a tree-object from ls-tree formatted text |
| git multi-pack-index | Write and verify multi-pack-indexes |
| git pack-objects | Create a packed archive of objects |
| git prune-packed | Remove extra objects that are already in pack files |
| git read-tree | Reads tree information into the index |
| git symbolic-ref | Read, modify and delete symbolic refs |
| git unpack-objects | Unpack objects from a packed archive |
| git update-index | Register file contents in the working tree to the index |
| git update-ref | Update the object name stored in a ref safely |
| git write-tree | Create a tree object from the current index |

## 查询类

| 命令 | 官方描述 |
|------|----------|
| git cat-file | Provide content or type and size information for repository objects |
| git cherry | Find commits yet to be applied to upstream |
| git diff-files | Compares files in the working tree and the index |
| git diff-index | Compare a tree to the working tree or index |
| git diff-tree | Compares the content and mode of blobs found via two tree objects |
| git for-each-ref | Output information on each ref |
| git for-each-repo | Run a Git command on a list of repositories |
| git get-tar-commit-id | Extract commit ID from an archive created using git-archive |
| git ls-files | Show information about files in the index and the working tree |
| git ls-remote | List references in a remote repository |
| git ls-tree | List the contents of a tree object |
| git merge-base | Find as good common ancestors as possible for a merge |
| git name-rev | Find symbolic names for given revs |
| git pack-redundant | Find redundant pack files |
| git rev-list | Lists commit objects in reverse chronological order |
| git rev-parse | Pick out and massage parameters |
| git show-index | Show packed archive index |
| git show-ref | List references in a local repository |
| git unpack-file | Creates a temporary file with a blob's contents |
| git var | Show a Git logical variable |
| git verify-pack | Validate packed Git archive files |

## 仓库同步类

| 命令 | 官方描述 |
|------|----------|
| git daemon | A really simple server for Git repositories |
| git fetch-pack | Receive missing objects from another repository |
| git http-backend | Server side implementation of Git over HTTP |
| git send-pack | Push objects over Git protocol to another repository |
| git update-server-info | Update auxiliary info file to help dumb servers |

## 内部辅助类

| 命令 | 官方描述 |
|------|----------|
| git check-attr | Display gitattributes information |
| git check-ignore | Debug gitignore / exclude files |
| git check-mailmap | Show canonical names and email addresses of contacts |
| git check-ref-format | Ensures that a reference name is well formed |
| git column | Display data in columns |
| git credential | Retrieve and store user credentials |
| git credential-cache | Helper to temporarily store passwords in memory |
| git credential-store | Helper to store credentials on disk |
| git fmt-merge-msg | Produce a merge commit message |
| git interpret-trailers | Add or parse structured information in commit messages |
| git mailinfo | Extracts patch and authorship from a single e-mail message |
| git mailsplit | Simple UNIX mbox splitter program |
| git merge-one-file | The standard helper program to use with git-merge-index |
| git patch-id | Compute unique ID for a patch |
| git sh-i18n | Git's i18n setup code for shell scripts |
| git sh-setup | Common Git shell script setup code |
| git stripspace | Remove unnecessary whitespace |
