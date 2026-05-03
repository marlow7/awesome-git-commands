# README.md - awesome-git-commands

## 项目概览

awesome-git-commands 是一个基于 VitePress 1.x 的 Git 命令全量可视化 Web 站点，提供双分类体系（官方原生分类 + 场景化开发分类）、实用指南、全局搜索等功能。

## 构建和运行命令

```bash
# 安装依赖
pnpm install

# 构建站点
pnpm build

# 开发模式
pnpm dev
```

## 项目目录结构

```
docs/
├── .vitepress/
│   ├── config.ts          # VitePress 核心配置（导航、侧边栏、搜索、主题）
│   ├── theme/
│   │   ├── index.ts       # 主题入口，注册自定义组件
│   │   ├── style/
│   │   │   └── index.css  # 自定义样式（暗色优先配色、组件样式）
│   │   └── components/    # 自定义 Vue 组件
│   │       ├── CommandCard.vue      # 命令卡片组件
│   │       ├── FavoritesManager.vue # 收藏管理组件
│   │       ├── CopyButton.vue       # 复制按钮组件
│   │       └── BackToTop.vue        # 返回顶部组件
│   └── public/
│       └── logo.svg       # 项目 Logo
├── commands/
│   ├── index.md           # 命令大全总览
│   ├── official-category/ # 官方原生分类体系
│   │   ├── main-porcelain/
│   │   ├── ancillary/
│   │   ├── interacting-with-others/
│   │   └── plumbing/
│   └── scene-category/    # 场景化开发分类体系
│       ├── init-and-config/
│       ├── staging-and-commit/
│       ├── branch-management/
│       ├── merge-and-rebase/
│       ├── rollback-and-restore/
│       ├── remote-collaboration/
│       ├── log-and-diff/
│       ├── maintenance/
│       ├── troubleshooting/
│       ├── submodule-and-worktree/
│       ├── patch-and-email/
│       └── plumbing-extended/
├── guides/                 # 实用指南
│   ├── index.md
│   ├── reset-vs-restore-vs-revert.md
│   ├── git-workflow-guide.md
│   ├── git-troubleshooting-guide.md
│   ├── git-config-best-practices.md
│   ├── git-best-practices.md
│   └── git-advanced-usage.md
├── index.md                # 首页
└── about.md                # 关于页
```

## 合规要求

- 所有页面页脚必须包含 GPLv2 协议声明和 Git 官方文档来源标注
- 官方内容与项目原创内容必须明确区分
- 不得声称项目为 Git 官方出品
