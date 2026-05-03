---
title: git format-patch
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/patch-and-email/">补丁与邮件协作</a>
  <span class="separator">/</span>
  <span>git format-patch</span>
</div>

# git format-patch

为邮件提交准备补丁。

<a class="official-link" href="https://git-scm.com/docs/git-format-patch" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-format-patch</a>

## 实战示例

```bash
# 生成最近 3 个提交的补丁
git format-patch -3

# 生成指定范围的补丁
git format-patch main..feature

# 输出到标准输出
git format-patch -1 --stdout
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/patch-and-email/git-am">git am</a>
  <a href="/commands/scene-category/patch-and-email/git-apply">git apply</a>
</div>
