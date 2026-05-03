---
title: git am
---

# git am

从邮箱格式的文件应用补丁。

<a class="official-link" href="https://git-scm.com/docs/git-am" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-am</a>

## 实战示例

```bash
# 从 mbox 文件应用补丁
git am < patch.mbox

# 从 format-patch 生成的文件应用
git am 0001-fix-bug.patch

# 中止应用
git am --abort
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/patch-and-email/git-format-patch">git format-patch</a>
  <a href="/commands/scene-category/patch-and-email/git-apply">git apply</a>
</div>
