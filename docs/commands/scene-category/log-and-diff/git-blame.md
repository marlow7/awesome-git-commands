---
title: git blame
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/log-and-diff/">日志查询与差异对比</a>
  <span class="separator">/</span>
  <span>git blame</span>
</div>

<div class="agc-detail-header">

# git blame

<div class="official-def">
  Show what revision and author last modified each line of a file. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-high">高频</span>
  <span class="agc-tag agc-tag-easy">入门</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-blame" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-blame</a>

</div>

## 核心功能描述

`git blame` 命令显示文件每一行最后修改的版本和作者，用于追踪代码变更的责任人。

## 实战示例

```bash
# 查看文件的每一行是谁在哪个提交修改的
git blame src/main.js

# 只查看指定行范围
git blame -L 10,30 src/main.js

# 只显示提交哈希和行号
git blame -s src/main.js
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
  <a href="/commands/scene-category/log-and-diff/git-show">git show</a>
</div>
