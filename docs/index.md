---
layout: home

hero:
  name: awesome-git-commands
  text: Git 全量命令权威手册
  tagline: 基于 Git 官方原生文档打造，覆盖全量命令，补充实战示例，开箱即用的速查工具
  actions:
    - theme: brand
      text: 查看全量命令
      link: /commands/
    - theme: alt
      text: 高频命令速查
      link: /commands/#高频命令速查

features:
  - icon: 📋
    title: 全量命令覆盖
    details: 覆盖 Git 全部核心高层命令、辅助命令、交互命令与底层命令，双分类体系
  - icon: 💡
    title: 实战示例补充
    details: 每个核心命令提供可直接复制运行的实战示例，补充官方文档缺失的使用场景
  - icon: 🔍
    title: 极速全局搜索
    details: 支持 Ctrl+K 快捷键唤起，模糊搜索覆盖命令名、描述、参数、示例，响应延迟 &lt;200ms
  - icon: 📱
    title: 全终端响应式适配
    details: 完美适配桌面端、平板端、移动端，随时随地查阅 Git 命令
---

<style>
.VPHero .name.clip {
  font-family: Consolas, 'Courier New', monospace;
  background: linear-gradient(135deg, #0ea5e9, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

<div class="agc-section" style="margin-top: 48px;">

## 高频命令速查

覆盖开发者 80% 日常使用场景的核心命令，无需进入分类页即可快速查看：

<div class="agc-grid-3">

<div class="agc-command-card">
  <div class="card-title">git add</div>
  <div class="card-desc">将文件变更添加到暂存区</div>
  <a class="card-copy-btn" href="/commands/scene-category/staging-and-commit/git-add">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git commit</div>
  <div class="card-desc">将暂存区内容提交到本地仓库</div>
  <a class="card-copy-btn" href="/commands/scene-category/staging-and-commit/git-commit">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git push</div>
  <div class="card-desc">将本地提交推送到远程仓库</div>
  <a class="card-copy-btn" href="/commands/scene-category/remote-collaboration/git-push">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git pull</div>
  <div class="card-desc">从远程仓库拉取并合并到当前分支</div>
  <a class="card-copy-btn" href="/commands/scene-category/remote-collaboration/git-pull">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git branch</div>
  <div class="card-desc">列出、创建或删除分支</div>
  <a class="card-copy-btn" href="/commands/scene-category/branch-management/git-branch">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git checkout</div>
  <div class="card-desc">切换分支或恢复工作区文件</div>
  <a class="card-copy-btn" href="/commands/scene-category/branch-management/git-checkout">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git switch</div>
  <div class="card-desc">切换分支（checkout 的更安全替代）</div>
  <a class="card-copy-btn" href="/commands/scene-category/branch-management/git-switch">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git merge</div>
  <div class="card-desc">合并指定分支到当前分支</div>
  <a class="card-copy-btn" href="/commands/scene-category/merge-and-rebase/git-merge">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git rebase</div>
  <div class="card-desc">在另一个分支基础上重新应用提交</div>
  <a class="card-copy-btn" href="/commands/scene-category/merge-and-rebase/git-rebase">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git reset</div>
  <div class="card-desc">重置当前 HEAD 到指定状态</div>
  <a class="card-copy-btn" href="/commands/scene-category/rollback-and-restore/git-reset">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git restore</div>
  <div class="card-desc">恢复工作区或暂存区文件</div>
  <a class="card-copy-btn" href="/commands/scene-category/rollback-and-restore/git-restore">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git revert</div>
  <div class="card-desc">创建新提交来撤销指定提交</div>
  <a class="card-copy-btn" href="/commands/scene-category/rollback-and-restore/git-revert">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git status</div>
  <div class="card-desc">显示工作区和暂存区状态</div>
  <a class="card-copy-btn" href="/commands/scene-category/staging-and-commit/git-status">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git log</div>
  <div class="card-desc">查看提交历史记录</div>
  <a class="card-copy-btn" href="/commands/scene-category/log-and-diff/git-log">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git clone</div>
  <div class="card-desc">克隆远程仓库到本地</div>
  <a class="card-copy-btn" href="/commands/scene-category/remote-collaboration/git-clone">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git config</div>
  <div class="card-desc">获取和设置仓库或全局配置</div>
  <a class="card-copy-btn" href="/commands/scene-category/init-and-config/git-config">查看详情</a>
</div>

<div class="agc-command-card">
  <div class="card-title">git remote</div>
  <div class="card-desc">管理远程仓库连接</div>
  <a class="card-copy-btn" href="/commands/scene-category/remote-collaboration/git-remote">查看详情</a>
</div>

</div>
</div>

<div class="agc-section">

## 场景化分类入口

按开发者日常工作流分类，替代官方偏底层的技术分类，降低新手使用门槛：

<div class="agc-grid-3">

<a class="agc-category-card" href="/commands/scene-category/init-and-config/">
  <div class="category-name">📦 仓库初始化与基础配置</div>
  <div class="category-count">覆盖 5+ 核心命令</div>
  <div class="category-desc">从零开始创建仓库、配置用户信息与全局设置</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/staging-and-commit/">
  <div class="category-name">📝 文件暂存与提交管理</div>
  <div class="category-count">覆盖 6+ 核心命令</div>
  <div class="category-desc">文件暂存、提交、状态查看等日常操作</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/branch-management/">
  <div class="category-name">🌿 分支管理与切换</div>
  <div class="category-count">覆盖 5+ 核心命令</div>
  <div class="category-desc">创建、切换、删除分支等分支管理操作</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/merge-and-rebase/">
  <div class="category-name">🔀 代码合并与变基</div>
  <div class="category-count">覆盖 4+ 核心命令</div>
  <div class="category-desc">分支合并、变基、冲突处理等集成操作</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/rollback-and-restore/">
  <div class="category-name">⏪ 提交回滚与版本恢复</div>
  <div class="category-count">覆盖 5+ 核心命令</div>
  <div class="category-desc">撤销提交、恢复文件、重置版本等回退操作</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/remote-collaboration/">
  <div class="category-name">🌐 远程仓库协作</div>
  <div class="category-count">覆盖 6+ 核心命令</div>
  <div class="category-desc">远程仓库管理、推送拉取、协作同步</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/log-and-diff/">
  <div class="category-name">📊 日志查询与差异对比</div>
  <div class="category-count">覆盖 4+ 核心命令</div>
  <div class="category-desc">提交历史、文件差异、 blame 追踪等查询操作</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/troubleshooting/">
  <div class="category-name">🔧 故障排查与数据恢复</div>
  <div class="category-count">覆盖 4+ 核心命令</div>
  <div class="category-desc">错误恢复、数据找回、仓库修复等应急操作</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/maintenance/">
  <div class="category-name">🧹 仓库优化与维护</div>
  <div class="category-count">覆盖 3+ 核心命令</div>
  <div class="category-desc">垃圾回收、仓库清理、性能优化等维护操作</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/submodule-and-worktree/">
  <div class="category-name">📂 子模块与多工作树管理</div>
  <div class="category-count">覆盖 3+ 核心命令</div>
  <div class="category-desc">子模块管理、多工作树操作等高级功能</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/patch-and-email/">
  <div class="category-name">✉️ 补丁与邮件协作</div>
  <div class="category-count">覆盖 3+ 核心命令</div>
  <div class="category-desc">补丁生成与应用、邮件式协作工作流</div>
</a>

<a class="agc-category-card" href="/commands/scene-category/plumbing-extended/">
  <div class="category-name">⚙️ 底层扩展命令</div>
  <div class="category-count">覆盖 10+ 底层命令</div>
  <div class="category-desc">Git 底层命令，适用于脚本编写与高级操作</div>
</a>

</div>
</div>
