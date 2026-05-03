---
title: Git 配置最佳实践
---

<div class="agc-breadcrumb">
  <a href="/">首页</a>
  <span class="separator">/</span>
  <a href="/guides/">实用指南</a>
  <span class="separator">/</span>
  <span>配置最佳实践</span>
</div>

# Git 配置最佳实践

本文涵盖 Git 日常配置的核心最佳实践，帮你打造高效、安全的 Git 工作环境。

## 1. 全局基础配置

```bash
# 用户身份（必须配置）
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# 默认分支名
git config --global init.defaultBranch main

# 默认编辑器
git config --global core.editor vim
# 或使用 VS Code
git config --global core.editor "code --wait"

# 启用颜色输出
git config --global color.ui auto

# 设置换行符处理（Windows 推荐）
git config --global core.autocrlf true
# Linux/macOS
git config --global core.autocrlf input
```

## 2. 仓库级配置

### 不同项目使用不同身份

```bash
# 在项目目录下设置仓库级配置
cd /path/to/work-project
git config --local user.name "Work Name"
git config --local user.email "work@company.com"

# 查看当前生效的配置
git config --list --show-origin --show-scope
```

### 使用条件包含（conditional includes）

```bash
# 在 ~/.gitconfig 中按目录设置不同身份
# ~/.gitconfig
[includeIf "gitdir:~/work/"]
  path = ~/work/.gitconfig
[includeIf "gitdir:~/personal/"]
  path = ~/personal/.gitconfig

# ~/work/.gitconfig
[user]
  name = Work Name
  email = work@company.com

# ~/personal/.gitconfig
[user]
  name = Personal Name
  email = personal@gmail.com
```

## 3. SSH 密钥配置

### 生成 SSH 密钥

```bash
# 生成新的 SSH 密钥（推荐 ed25519）
ssh-keygen -t ed25519 -C "you@example.com"

# 如果需要兼容旧系统，使用 RSA
ssh-keygen -t rsa -b 4096 -C "you@example.com"

# 启动 SSH Agent
eval "$(ssh-agent -s)"

# 添加密钥到 Agent
ssh-add ~/.ssh/id_ed25519
```

### 配置多个 SSH 密钥

```bash
# ~/.ssh/config
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal

Host github-work
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_work

# 使用时
git remote set-url origin git@github-work:company/repo.git
```

### 测试 SSH 连接

```bash
ssh -T git@github.com
# Hi username! You've successfully authenticated...
```

## 4. 代理配置

### HTTP/HTTPS 代理

```bash
# 设置代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890

# 仅对特定域名设置代理
git config --global http.https://github.com.proxy http://127.0.0.1:7890

# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

### SSH 代理

```bash
# ~/.ssh/config
Host github.com
  HostName github.com
  User git
  ProxyCommand nc -X 5 -x 127.0.0.1:7890 %h %p
```

## 5. 实用别名配置

```bash
# 查看类
git config --global alias.st status
git config --global alias.br branch
git config --global alias.co checkout
git config --global alias.sw switch

# 日志类
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.ll "log --pretty=format:'%C(yellow)%h%Creset %s %C(cyan)(%cr)%Creset' --no-merges"

# 操作类
git config --global alias.ci commit
git config --global alias.unstage "restore --staged"
git config --global alias.last "log -1 HEAD --stat"
git config --global alias.amend "commit --amend --no-edit"
```

## 6. 安全配置

```bash
# 禁用推送时自动凭据存储（推荐手动管理）
git config --global credential.helper cache --timeout=3600

# 启用 GPG 签名（可选）
git config --global commit.gpgSign true
git config --global user.signingKey YOUR_GPG_KEY_ID

# 设置文件权限变更不追踪（适用于 Windows）
git config --global core.fileMode false
```

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/init-and-config/git-config">git config</a>
  <a href="/commands/scene-category/init-and-config/git-init">git init</a>
  <a href="/commands/scene-category/remote-collaboration/git-remote">git remote</a>
</div>
