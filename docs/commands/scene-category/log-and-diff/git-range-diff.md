---
title: git range-diff
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/log-and-diff/">日志查询与差异对比</a>
  <span class="separator">/</span>
  <span>git range-diff</span>
</div>

# git range-diff

比较两个提交范围（常用于变基前后对比）。

<a class="official-link" href="https://git-scm.com/docs/git-range-diff" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-range-diff</a>

## 实战示例

```bash
# 比较变基前后的差异
git range-diff main@{1} main
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/log-and-diff/git-diff">git diff</a>
  <a href="/commands/scene-category/merge-and-rebase/git-rebase">git rebase</a>
</div>
