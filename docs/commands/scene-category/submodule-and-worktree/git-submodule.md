---
title: git submodule
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/submodule-and-worktree/">子模块与多工作树管理</a>
  <span class="separator">/</span>
  <span>git submodule</span>
</div>

# git submodule

初始化、更新或检查子模块。

<a class="official-link" href="https://git-scm.com/docs/git-submodule" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-submodule</a>

## 实战示例

```bash
# 添加子模块
git submodule add https://github.com/user/repo.git path/to/sub

# 初始化并更新子模块
git submodule update --init --recursive

# 更新子模块到最新
git submodule update --remote

# 查看子模块状态
git submodule status
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/submodule-and-worktree/git-worktree">git worktree</a>
  <a href="/commands/scene-category/remote-collaboration/git-clone">git clone</a>
</div>
