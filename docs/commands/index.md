---
title: 命令大全
---

# 命令大全

欢迎使用 Git 全量命令速查手册。本站提供 **双分类体系** 帮助你快速定位所需命令：

- **官方原生分类**：100% 对齐 Git 官方文档的分类逻辑，保证权威性
- **场景化开发分类**：按开发者日常工作流分类，更贴合日常开发使用习惯

::: tip 快捷搜索
使用 `Ctrl+K`（macOS: `Cmd+K`）可随时唤起全局搜索，快速定位命令
:::

## 官方原生分类体系

对齐 Git 官方文档（[git-scm.com/docs/git](https://git-scm.com/docs/git)）的分类逻辑：

| 分类 | 说明 | 命令数量 |
|------|------|----------|
| [核心高层命令（Main Porcelain Commands）](/commands/official-category/main-porcelain/) | 日常开发最常用的命令 | 30+ |
| [辅助命令（Ancillary Commands）](/commands/official-category/ancillary/) | 辅助操作与查询命令 | 20+ |
| [第三方交互命令（Interacting with Others）](/commands/official-category/interacting-with-others/) | 与外部系统交互的命令 | 5+ |
| [底层命令（Low-level Plumbing Commands）](/commands/official-category/plumbing/) | 底层操作命令，适用于脚本与高级场景 | 30+ |

## 场景化开发分类体系

按开发者日常工作流分类，更贴近实际使用场景：

| 分类 | 说明 | 详情 |
|------|------|------|
| 📦 仓库初始化与基础配置 | 创建仓库、配置用户信息与全局设置 | [查看详情](./commands/scene-category/init-and-config/) |
| 📝 文件暂存与提交管理 | 文件暂存、提交、状态查看等日常操作 | [查看详情](./commands/scene-category/staging-and-commit/) |
| 🌿 分支管理与切换 | 创建、切换、删除分支等分支管理操作 | [查看详情](./commands/scene-category/branch-management/) |
| 🔀 代码合并与变基 | 分支合并、变基、冲突处理等集成操作 | [查看详情](./commands/scene-category/merge-and-rebase/) |
| ⏪ 提交回滚与版本恢复 | 撤销提交、恢复文件、重置版本等回退操作 | [查看详情](./commands/scene-category/rollback-and-restore/) |
| 🌐 远程仓库协作 | 远程仓库管理、推送拉取、协作同步 | [查看详情](./commands/scene-category/remote-collaboration/) |
| 📊 日志查询与差异对比 | 提交历史、文件差异、blame 追踪等查询操作 | [查看详情](./commands/scene-category/log-and-diff/) |
| 🧹 仓库优化与维护 | 垃圾回收、仓库清理、性能优化等维护操作 | [查看详情](./commands/scene-category/maintenance/) |
| 🔧 故障排查与数据恢复 | 错误恢复、数据找回、仓库修复等应急操作 | [查看详情](.ommands/scene-category/troubleshooting/) |
| 📂 子模块与多工作树管理 | 子模块管理、多工作树操作等高级功能 | [查看详情](./commands/scene-category/submodule-and-worktree/) |
| ✉️ 补丁与邮件协作 | 补丁生成与应用、邮件式协作工作流 | [查看详情](./commands/scene-category/patch-and-email/) |
| ⚙️ 底层扩展命令 | Git 底层命令，适用于脚本编写与高级操作 | [查看详情](./commands/scene-category/plumbing-extended/) |

## 高频命令速查

覆盖开发者 80% 日常使用场景的核心命令：

<div class="agc-grid-3">

<div class="agc-command-card">
  <div class="card-title">git add</div>
  <div class="card-desc">将文件变更添加到暂存区</div>
  <a class="card-copy-btn" href="./commands/scene-category/staging-and-commit/git-add">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git commit</div>
  <div class="card-desc">将暂存区内容提交到本地仓库</div>
  <a class="card-copy-btn" href="./commands/scene-category/staging-and-commit/git-commit">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git push</div>
  <div class="card-desc">将本地提交推送到远程仓库</div>
  <a class="card-copy-btn" href="./commands/scene-category/remote-collaboration/git-push">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git pull</div>
  <div class="card-desc">从远程仓库拉取并合并到当前分支</div>
  <a class="card-copy-btn" href="./commands/scene-category/remote-collaboration/git-pull">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git branch</div>
  <div class="card-desc">列出、创建或删除分支</div>
  <a class="card-copy-btn" href="./commands/scene-category/branch-management/git-branch">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git checkout</div>
  <div class="card-desc">切换分支或恢复工作区文件</div>
  <a class="card-copy-btn" href="./commands/scene-category/branch-management/git-checkout">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git switch</div>
  <div class="card-desc">切换分支（checkout 的更安全替代）</div>
  <a class="card-copy-btn" href="./commands/scene-category/branch-management/git-switch">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git merge</div>
  <div class="card-desc">合并指定分支到当前分支</div>
  <a class="card-copy-btn" href="./commands/scene-category/merge-and-rebase/git-merge">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git rebase</div>
  <div class="card-desc">在另一个分支基础上重新应用提交</div>
  <a class="card-copy-btn" href="./commands/scene-category/merge-and-rebase/git-rebase">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git reset</div>
  <div class="card-desc">重置当前 HEAD 到指定状态</div>
  <a class="card-copy-btn" href="./commands/scene-category/rollback-and-restore/git-reset">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git restore</div>
  <div class="card-desc">恢复工作区或暂存区文件</div>
  <a class="card-copy-btn" href="./commands/scene-category/rollback-and-restore/git-restore">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git revert</div>
  <div class="card-desc">创建新提交来撤销指定提交</div>
  <a class="card-copy-btn" href="./commands/scene-category/rollback-and-restore/git-revert">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git status</div>
  <div class="card-desc">显示工作区和暂存区状态</div>
  <a class="card-copy-btn" href="./commands/scene-category/staging-and-commit/git-status">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git log</div>
  <div class="card-desc">查看提交历史记录</div>
  <a class="card-copy-btn" href="./commands/scene-category/log-and-diff/git-log">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git clone</div>
  <div class="card-desc">克隆远程仓库到本地</div>
  <a class="card-copy-btn" href="./commands/scene-category/remote-collaboration/git-clone">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git config</div>
  <div class="card-desc">获取和设置仓库或全局配置</div>
  <a class="card-copy-btn" href="./commands/scene-category/init-and-config/git-config">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git remote</div>
  <div class="card-desc">管理远程仓库连接</div>
  <a class="card-copy-btn" href="./commands/scene-category/remote-collaboration/git-remote">查看详情</a>
</div>

</div>
