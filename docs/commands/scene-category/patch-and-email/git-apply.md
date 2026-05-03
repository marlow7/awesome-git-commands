---
title: git apply
---

# git apply

将补丁应用到文件和/或索引。

<a class="official-link" href="https://git-scm.com/docs/git-apply" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-apply</a>

## 实战示例

```bash
# 应用补丁
git apply fix.patch

# 检查补丁是否可以应用
git apply --check fix.patch

# 应用补丁到索引（不修改工作区）
git apply --index fix.patch
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/patch-and-email/git-am">git am</a>
  <a href="/commands/scene-category/patch-and-email/git-format-patch">git format-patch</a>
</div>
