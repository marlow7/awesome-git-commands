---
title: Git 高频使用最佳实践
---

<div class="agc-breadcrumb">
  <a href="/">首页</a>
  <span class="separator">/</span>
  <a href="/guides/">实用指南</a>
  <span class="separator">/</span>
  <span>高频使用最佳实践</span>
</div>

# Git 高频使用最佳实践

本文整理了 Git 日常开发中的规范与最佳实践，帮助团队建立统一的开发习惯。

## 1. 提交信息规范

### Conventional Commits 规范

```bash
# 格式
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型（type）

| 类型 | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(auth): add login page` |
| `fix` | 修复 Bug | `fix(api): fix null pointer in user query` |
| `docs` | 文档变更 | `docs: update API documentation` |
| `style` | 代码格式（不影响逻辑） | `style: fix indentation` |
| `refactor` | 重构（不新增功能、不修复 Bug） | `refactor(utils): extract date formatter` |
| `perf` | 性能优化 | `perf(list): virtual scroll for large datasets` |
| `test` | 测试相关 | `test(auth): add login unit tests` |
| `chore` | 构建工具、依赖变更 | `chore: upgrade webpack to v5` |
| `ci` | CI/CD 变更 | `ci: add GitHub Actions workflow` |
| `revert` | 回退提交 | `revert: revert feat(auth): add login page` |

### 良好 vs 不良示例

```bash
# ✅ 良好示例
feat(search): add fuzzy search for commands
fix(login): resolve session timeout on slow networks
docs: add contribution guide for new developers

# ❌ 不良示例
update
fix bug
修改了搜索功能
WIP
```

## 2. 分支命名规范

### 命名格式

```
<type>/<short-description>
```

### 常见命名

| 分支类型 | 命名示例 | 说明 |
|----------|----------|------|
| 功能分支 | `feature/user-login` | 新功能开发 |
| 修复分支 | `fix/login-timeout` | Bug 修复 |
| 热修复 | `hotfix/critical-auth-bug` | 紧急修复 |
| 发布分支 | `release/v1.2.0` | 版本发布 |
| 实验分支 | `experiment/new-search-algo` | 实验性功能 |

### 规范要点

- 使用小写字母和连字符
- 描述简洁明确，不超过 50 字符
- 包含 type 前缀，便于识别分支类型

## 3. 代码合并规范

### Merge vs Rebase 选择

| 场景 | 推荐方式 | 原因 |
|------|----------|------|
| 合并功能分支到 main | `--no-ff merge` | 保留分支历史 |
| 同步 main 到功能分支 | `rebase` | 保持线性历史 |
| 合并到共享分支 | `merge` | 安全，不改写历史 |
| 个人分支整理提交 | `rebase -i` | 清理提交历史 |

### 合并操作示例

```bash
# 合并功能分支（推荐 --no-ff）
git checkout main
git merge --no-ff feature/user-login

# 同步主分支到功能分支（使用 rebase）
git checkout feature/user-login
git rebase main

# 交互式变基整理提交
git rebase -i HEAD~3
```

### 处理合并冲突的原则

1. **及时同步**：开发过程中定期从主分支拉取更新
2. **小步提交**：减少大规模合并的冲突概率
3. **沟通优先**：涉及同一文件的变更，先与团队沟通
4. **完整测试**：冲突解决后运行完整测试

## 4. .gitignore 最佳实践

### 基础模板

```bash
# 依赖
node_modules/
vendor/
.venv/

# 构建产物
dist/
build/
*.pyc
__pycache__/

# 环境配置（包含敏感信息）
.env
.env.local
config/secrets.yml

# IDE
.vscode/settings.json
.idea/
*.swp

# 系统文件
.DS_Store
Thumbs.db

# 日志
*.log
logs/
```

### 全局 .gitignore

```bash
# 设置全局 gitignore
git config --global core.excludesfile ~/.gitignore_global

# ~/.gitignore_global 内容
.DS_Store
Thumbs.db
*.swp
.idea/
```

## 5. 提交习惯

### 原子提交

每个提交只做一件事，便于 code review 和回滚。

```bash
# ✅ 原子提交
git add src/login.js
git commit -m "feat(auth): add login form component"
git add src/login.test.js
git commit -m "test(auth): add login form unit tests"

# ❌ 混合提交
git add .
git commit -m "add login and fix search and update readme"
```

### 频繁提交

```bash
# 开发过程中频繁提交，不要攒一大堆才提交
# 使用 WIP 提交保存进度
git commit -m "wip: login form layout"

# 完成后用 amend 或 interactive rebase 整理
git add .
git commit --amend -m "feat(auth): add login form component"
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/staging-and-commit/git-commit">git commit</a>
  <a href="/commands/scene-category/branch-management/git-branch">git branch</a>
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/merge-and-rebase/git-rebase">git rebase</a>
</div>
