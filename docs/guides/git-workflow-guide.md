---
title: Git 日常开发工作流指南
---

<div class="agc-breadcrumb">
  <a href="/">首页</a>
  <span class="separator">/</span>
  <a href="/guides/">实用指南</a>
  <span class="separator">/</span>
  <span>日常开发工作流</span>
</div>

# Git 日常开发工作流指南

本文介绍四种主流 Git 工作流，帮助你选择适合团队的最佳实践。

## 集中式工作流（Centralized Workflow）

### 适用场景
小团队、简单项目、无需并行开发多个版本

### 核心流程

```bash
# 1. 克隆仓库
git clone <repo-url>

# 2. 拉取最新代码
git pull origin main

# 3. 在 main 分支上直接开发
# 编辑文件...

# 4. 提交并推送
git add .
git commit -m "feat: add new feature"
git push origin main
```

### 优缺点
- ✅ 简单直观，学习成本低
- ❌ 无法并行开发，容易冲突

---

## Git Flow

### 适用场景
中大型团队、有明确版本发布周期的项目

### 分支模型

| 分支类型 | 命名规范 | 用途 | 生命周期 |
|----------|----------|------|----------|
| `main` | main | 生产环境代码 | 永久 |
| `develop` | develop | 开发集成分支 | 永久 |
| `feature/*` | feature/user-login | 功能开发 | 临时 |
| `release/*` | release/v1.2.0 | 发布准备 | 临时 |
| `hotfix/*` | hotfix/fix-login-bug | 紧急修复 | 临时 |

### 核心流程

```bash
# 1. 从 develop 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/user-login

# 2. 开发并提交
git add .
git commit -m "feat: implement user login"

# 3. 合并回 develop
git checkout develop
git merge --no-ff feature/user-login
git push origin develop

# 4. 删除功能分支
git branch -d feature/user-login

# 5. 创建发布分支
git checkout -b release/v1.2.0 develop
# 修复 bug、更新版本号...
git commit -m "chore: bump version to 1.2.0"

# 6. 合并到 main 和 develop
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git checkout develop
git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0
```

---

## GitHub Flow

### 适用场景
持续部署的项目、小到中型团队、SaaS 产品

### 核心流程

```bash
# 1. 从 main 创建分支
git checkout main
git pull origin main
git checkout -b feature/add-search

# 2. 开发并提交
git add .
git commit -m "feat: add search functionality"
git push origin feature/add-search

# 3. 在 GitHub 上创建 Pull Request

# 4. 代码审查通过后，合并 PR

# 5. 合并后立即部署
git checkout main
git pull origin main
# 部署到生产环境
```

### 优缺点
- ✅ 简单、适合持续部署
- ❌ 没有明确的发布版本管理

---

## GitLab Flow

### 适用场景
需要多环境部署的团队（开发 → 预发布 → 生产）

### 核心流程

```bash
# 1. 功能开发（同 GitHub Flow）
git checkout -b feature/add-api main

# 2. 合并到 main（通过 MR）
# 3. 从 main 合并到 pre-production（预发布环境）
# 4. 从 pre-production 合并到 production（生产环境）

# 或使用环境分支 + CI/CD 自动部署
```

---

## 工作流选择建议

| 团队规模 | 项目特点 | 推荐工作流 |
|----------|----------|------------|
| 1-3 人 | 简单项目 | 集中式工作流 |
| 4-10 人 | SaaS / 持续部署 | GitHub Flow |
| 10+ 人 | 有版本发布周期 | Git Flow |
| 10+ 人 | 多环境部署 | GitLab Flow |

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/branch-management/git-branch">git branch</a>
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/remote-collaboration/git-pull">git pull</a>
  <a href="/commands/scene-category/remote-collaboration/git-push">git push</a>
</div>
