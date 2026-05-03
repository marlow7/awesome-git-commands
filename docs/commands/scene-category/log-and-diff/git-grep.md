---
title: git grep
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/log-and-diff/">日志查询与差异对比</a>
  <span class="separator">/</span>
  <span>git grep</span>
</div>

# git grep

在仓库中搜索文本模式。

<a class="official-link" href="https://git-scm.com/docs/git-grep" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-grep</a>

## 实战示例

```bash
# 在工作区搜索
git grep "search-term"

# 在指定提交中搜索
git grep "search-term" v1.0.0

# 只显示文件名
git grep -l "search-term"

# 显示行号
git grep -n "search-term"
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
  <a href="/commands/scene-category/log-and-diff/git-diff">git diff</a>
</div>
