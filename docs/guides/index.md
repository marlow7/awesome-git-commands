---
title: 实用指南
---

<div class="agc-breadcrumb">
  <a href="/">首页</a>
  <span class="separator">/</span>
  <span>实用指南</span>
</div>

# 实用指南

补充官方文档未系统化整理的实战内容，解决开发者实际工作中的高频问题。

## 核心命令对比

<div class="agc-guide-grid">

<a href="/guides/reset-vs-restore-vs-revert" class="agc-guide-card">
  <div class="agc-guide-card-title">Git 核心命令对比：reset / restore / revert</div>
  <div class="agc-guide-card-desc">详解 reset、restore、revert 三个最易混淆命令的核心区别、适用场景与决策流程</div>
  <div class="agc-guide-card-tags"><span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span></div>
</a>

</div>

## 工作流指南

<div class="agc-guide-grid">

<a href="/guides/git-workflow-guide" class="agc-guide-card">
  <div class="agc-guide-card-title">Git 日常开发工作流指南</div>
  <div class="agc-guide-card-desc">集中式工作流、Git Flow、GitHub Flow、GitLab Flow 四种主流工作流对比与选择建议</div>
  <div class="agc-guide-card-tags"><span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span></div>
</a>

</div>

## 故障排查

<div class="agc-guide-grid">

<a href="/guides/git-troubleshooting-guide" class="agc-guide-card">
  <div class="agc-guide-card-title">Git 常见错误与故障排查指南</div>
  <div class="agc-guide-card-desc">合并冲突、detached HEAD、误提交、误删分支、推送被拒绝等高频问题解决方案</div>
  <div class="agc-guide-card-tags"><span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-medium">进阶</span></div>
</a>

</div>

## 配置与实践

<div class="agc-guide-grid">

<a href="/guides/git-config-best-practices" class="agc-guide-card">
  <div class="agc-guide-card-title">Git 配置最佳实践</div>
  <div class="agc-guide-card-desc">全局配置、仓库配置、SSH 密钥配置、代理配置、别名配置的完整指南</div>
  <div class="agc-guide-card-tags"><span class="agc-tag agc-tag-common">常用</span> <span class="agc-tag agc-tag-easy">入门</span></div>
</a>

<a href="/guides/git-best-practices" class="agc-guide-card">
  <div class="agc-guide-card-title">Git 高频使用最佳实践</div>
  <div class="agc-guide-card-desc">提交信息规范（Conventional Commits）、分支命名规范、代码合并规范、.gitignore 最佳实践</div>
  <div class="agc-guide-card-tags"><span class="agc-tag agc-tag-high">高频</span> <span class="agc-tag agc-tag-easy">入门</span></div>
</a>

</div>

## 进阶用法

<div class="agc-guide-grid">

<a href="/guides/git-advanced-usage" class="agc-guide-card">
  <div class="agc-guide-card-title">Git 进阶用法指南</div>
  <div class="agc-guide-card-desc">交互式变基（Interactive Rebase）、stash 高级用法、submodule 子模块管理</div>
  <div class="agc-guide-card-tags"><span class="agc-tag agc-tag-common">常用</span> <span class="agc-tag agc-tag-medium">进阶</span></div>
</a>

</div>

<style>
.agc-guide-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}
.agc-guide-card {
  display: block;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  transition: all 0.15s ease-in-out;
  text-decoration: none !important;
}
.agc-guide-card:hover {
  border-color: var(--agc-brand);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
}
.agc-guide-card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 8px;
}
.agc-guide-card-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 12px;
}
.agc-guide-card-tags .agc-tag {
  margin-right: 6px;
}
</style>
