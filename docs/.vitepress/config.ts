import { defineConfig } from 'vitepress'

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isGitHubPages ? '/awesome-git-commands/' : '/',
  title: 'awesome-git-commands',
  description: 'Git 全量命令权威手册 | 开发者专属 Git 命令速查工具',

  appearance: 'dark',

  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#0ea5e9' }],
    ['meta', { name: 'author', content: 'awesome-git-commands' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '命令大全', link: '/commands/' },
      { text: '实用指南', link: '/guides/' },
      { text: '官方文档', link: 'https://git-scm.com/docs/git' },
      { text: 'GitHub 仓库', link: 'https://github.com/marlow7/awesome-git-commands' },
    ],

    sidebar: {
      '/commands/': [
        {
          text: '官方原生分类',
          collapsed: false,
          items: [
            { text: '核心高层命令', link: '/commands/official-category/main-porcelain/' },
            { text: '辅助命令', link: '/commands/official-category/ancillary/' },
            { text: '第三方交互命令', link: '/commands/official-category/interacting-with-others/' },
            { text: '底层命令', link: '/commands/official-category/plumbing/' },
          ],
        },
        {
          text: '场景化开发分类',
          collapsed: false,
          items: [
            { text: '仓库初始化与基础配置', link: '/commands/scene-category/init-and-config/' },
            { text: '文件暂存与提交管理', link: '/commands/scene-category/staging-and-commit/' },
            { text: '分支管理与切换', link: '/commands/scene-category/branch-management/' },
            { text: '代码合并与变基', link: '/commands/scene-category/merge-and-rebase/' },
            { text: '提交回滚与版本恢复', link: '/commands/scene-category/rollback-and-restore/' },
            { text: '远程仓库协作', link: '/commands/scene-category/remote-collaboration/' },
            { text: '日志查询与差异对比', link: '/commands/scene-category/log-and-diff/' },
            { text: '仓库优化与维护', link: '/commands/scene-category/maintenance/' },
            { text: '故障排查与数据恢复', link: '/commands/scene-category/troubleshooting/' },
            { text: '子模块与多工作树管理', link: '/commands/scene-category/submodule-and-worktree/' },
            { text: '补丁与邮件协作', link: '/commands/scene-category/patch-and-email/' },
            { text: '底层扩展命令', link: '/commands/scene-category/plumbing-extended/' },
          ],
        },
      ],
      '/guides/': [
        {
          text: '实用指南专题',
          items: [
            { text: '日常开发工作流', link: '/guides/git-workflow-guide' },
            { text: '常见错误与故障排查', link: '/guides/git-troubleshooting-guide' },
            { text: '配置最佳实践', link: '/guides/git-config-best-practices' },
            { text: '高频使用最佳实践', link: '/guides/git-best-practices' },
            { text: '核心命令对比', link: '/guides/reset-vs-restore-vs-revert' },
            { text: '进阶用法指南', link: '/guides/git-advanced-usage' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索命令',
                buttonAriaLabel: '搜索命令',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },

    editLink: {
      pattern: 'https://github.com/marlow7/awesome-git-commands/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: 'Content derived from the official Git documentation',
      copyright: '© 2026 Git Command Chinese Reference Manual | <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0 License</a>'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/marlow7/awesome-git-commands' },
    ],

    lastUpdated: {
      text: '最后更新于',
    },
  },

  markdown: {
    theme: {
      dark: 'dracula',
      light: 'github-light',
    },
    lineNumbers: true,
  },
})
