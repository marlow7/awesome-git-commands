---
title: git bundle
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/maintenance/">仓库优化与维护</a>
  <span class="separator">/</span>
  <span>git bundle</span>
</div>

# git bundle

通过归档文件移动对象和引用。

<a class="official-link" href="https://git-scm.com/docs/git-bundle" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-bundle</a>

## 实战示例

```bash
# 创建 bundle
git bundle create repo.bundle --all

# 从 bundle 克隆
git clone repo.bundle cloned-repo

# 验证 bundle
git bundle verify repo.bundle
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/maintenance/git-archive">git archive</a>
  <a href="/commands/scene-category/remote-collaboration/git-clone">git clone</a>
</div>
