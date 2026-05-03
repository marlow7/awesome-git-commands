---
title: git shortlog
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/log-and-diff/">日志查询与差异对比</a>
  <span class="separator">/</span>
  <span>git shortlog</span>
</div>

# git shortlog

按作者汇总 git log 输出。

<a class="official-link" href="https://git-scm.com/docs/git-shortlog" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-shortlog</a>

## 实战示例

```bash
# 按作者汇总提交数
git shortlog -s -n

# 按邮箱分组
git shortlog -s -n -e
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
</div>
