---
title: git revert
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/rollback-and-restore/">提交回滚与版本恢复</a>
  <span class="separator">/</span>
  <span>git revert</span>
</div>

<div class="agc-detail-header">

# git revert

<div class="official-def">
  Revert some existing commits. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-medium">进阶</span>
  <span class="agc-tag agc-tag-high">场景：安全撤销</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-revert" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-revert</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git revert [--[no-]edit] [-n] [-m <parent-number>] [-s] [-S[<keyid>]]
           [--[no-]gpg-sign] [--] <commit>…​
git revert (--continue | --skip | --abort | --quit)
```

## 核心功能描述

`git revert` 命令通过创建一个新提交来撤销指定提交引入的变更。它是**安全**的撤销方式，不会修改提交历史。

**适用场景**：
- 撤销已推送到远程的提交
- 在公共分支上回退变更
- 需要保留完整的变更历史

**与 git reset / git restore 的区别**：

| 命令 | 操作 | 修改历史 | 安全性 |
|------|------|----------|--------|
| `git revert` | 创建新提交撤销变更 | 否 | ✅ 安全 |
| `git reset` | 移动 HEAD 指针 | 是 | ⚠️ 危险 |
| `git restore` | 恢复文件内容 | 否 | 安全 |

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `<commit>…​` | 要撤销的提交（必填） | — |
| `-m <parent-number>, --mainline <parent-number>` | 指定合并提交的主父提交编号 | — |
| `-n, --no-commit` ⭐ | 不自动提交撤销结果 | 关闭 |
| `--edit, -e` | 编辑撤销提交的消息 | 默认 |
| `--no-edit` | 不编辑撤销提交的消息 | — |
| `-s, --signoff` | 添加 Signed-off-by 行 | 关闭 |
| `-S[<keyid>], --gpg-sign[=<keyid>]` | GPG 签名撤销提交 | 关闭 |
| `--continue` | 解决冲突后继续撤销 | — |
| `--skip` | 跳过当前提交 | — |
| `--abort` | 中止撤销操作 | — |
| `--quit` | 退出撤销但保留变更 | — |

## 实战示例

### 示例 1：撤销指定提交

```bash
# 撤销最近的提交
git revert HEAD

# 撤销指定提交
git revert abc1234

# 撤销多个提交
git revert abc1234 def5678
```

### 示例 2：撤销但不自动提交

```bash
# 撤销提交但不创建新的撤销提交
git revert -n abc1234

# 可以检查撤销结果后再手动提交
git commit -m "revert: undo feature-xyz changes"
```

### 示例 3：撤销合并提交

```bash
# 撤销合并提交，需要指定主父提交编号
git revert -m 1 abc1234
# 1 = 保留第一个父提交（通常是被合并到的分支）
# 2 = 保留第二个父提交（被合并的分支）
```

## 常见踩坑与注意事项

::: tip revert 是公共分支上最安全的撤销方式
`git revert` 不修改历史，只是创建一个"反提交"，对其他协作者没有影响。**对已推送的提交，始终优先使用 `git revert` 而非 `git reset`。**
:::

::: warning revert 后再次 merge 的问题
如果 `git revert` 了一个合并提交，后续再合并同一分支时，被撤销的变更不会自动重新应用。需要先 `git revert` 那个撤销提交，然后再 merge。
:::

::: danger 撤销合并提交的复杂性
撤销合并提交需要指定 `-m` 参数选择保留哪条父线。选择错误可能导致意外的代码丢失。建议仔细确认后再操作。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/rollback-and-restore/git-reset">git reset</a>
  <a href="/commands/scene-category/rollback-and-restore/git-restore">git restore</a>
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
</div>
