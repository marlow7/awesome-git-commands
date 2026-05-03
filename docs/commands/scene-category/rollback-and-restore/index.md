---
title: 提交回滚与版本恢复
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <span>场景化分类</span>
  <span class="separator">/</span>
  <span>提交回滚与版本恢复</span>
</div>

# 提交回滚与版本恢复

撤销提交、恢复文件、重置版本等回退操作，需要特别注意操作的安全性和数据丢失风险。

::: danger 注意
此分类下的部分命令（特别是 `git reset --hard`）可能导致数据永久丢失，操作前请务必确认已备份重要变更。
:::

## 命令列表

<a class="agc-cmd-list-item" href="/commands/scene-category/rollback-and-restore/git-reset">
  <div>
    <span class="cmd-name">git reset</span>
    <span class="agc-tag agc-tag-high">高频</span>
    <span class="agc-tag agc-tag-medium">进阶</span>
  </div>
  <span class="cmd-desc">重置当前 HEAD 到指定状态</span>
</a>

<a class="agc-cmd-list-item" href="/commands/scene-category/rollback-and-restore/git-restore">
  <div>
    <span class="cmd-name">git restore</span>
    <span class="agc-tag agc-tag-high">高频</span>
    <span class="agc-tag agc-tag-easy">入门</span>
  </div>
  <span class="cmd-desc">恢复工作树文件</span>
</a>

<a class="agc-cmd-list-item" href="/commands/scene-category/rollback-and-restore/git-revert">
  <div>
    <span class="cmd-name">git revert</span>
    <span class="agc-tag agc-tag-high">高频</span>
    <span class="agc-tag agc-tag-medium">进阶</span>
  </div>
  <span class="cmd-desc">撤销某些已有提交</span>
</a>

<a class="agc-cmd-list-item" href="/commands/scene-category/rollback-and-restore/git-clean">
  <div>
    <span class="cmd-name">git clean</span>
    <span class="agc-tag agc-tag-common">常用</span>
    <span class="agc-tag agc-tag-medium">进阶</span>
  </div>
  <span class="cmd-desc">从工作树中删除未跟踪的文件</span>
</a>

<a class="agc-cmd-list-item" href="/commands/scene-category/rollback-and-restore/git-reflog">
  <div>
    <span class="cmd-name">git reflog</span>
    <span class="agc-tag agc-tag-common">常用</span>
    <span class="agc-tag agc-tag-medium">进阶</span>
  </div>
  <span class="cmd-desc">管理 reflog 信息，用于找回丢失的提交</span>
</a>
