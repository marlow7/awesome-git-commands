---
title: git describe
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/maintenance/">仓库优化与维护</a>
  <span class="separator">/</span>
  <span>git describe</span>
</div>

# git describe

基于标签显示人类可读的提交名称。

<a class="official-link" href="https://git-scm.com/docs/git-describe" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-describe</a>

## 实战示例

```bash
# 显示当前提交的可读名称
git describe

# 包含所有标签
git describe --tags

# 显示完整的哈希
git describe --long
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/init-and-config/git-tag">git tag</a>
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
</div>
