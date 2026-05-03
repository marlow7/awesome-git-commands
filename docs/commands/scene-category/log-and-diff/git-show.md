---
title: git show
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/log-and-diff/">日志查询与差异对比</a>
  <span class="separator">/</span>
  <span>git show</span>
</div>

<div class="agc-detail-header">

# git show

<div class="official-def">
  Show various types of objects. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-show" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-show</a>

</div>

## 核心功能描述

`git show` 命令显示各种 Git 对象的详细信息，最常用于查看某个提交的完整内容。

## 实战示例

```bash
# 查看最新提交
git show

# 查看指定提交
git show abc1234

# 只显示提交消息和统计
git show --stat abc1234

# 查看标签指向的提交
git show v1.0.0
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
  <a href="/commands/scene-category/log-and-diff/git-diff">git diff</a>
</div>
