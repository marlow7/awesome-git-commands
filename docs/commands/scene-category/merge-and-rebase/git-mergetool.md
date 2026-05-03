---
title: git mergetool
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/merge-and-rebase/">代码合并与变基</a>
  <span class="separator">/</span>
  <span>git mergetool</span>
</div>

<div class="agc-detail-header">

# git mergetool

<div class="official-def">
  Run merge conflict resolution tools to resolve merge conflicts. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-common">常用</span>
  <span class="agc-tag agc-tag-high">场景：合并冲突可视化解决</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-mergetool" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-mergetool</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git mergetool [--tool=<tool>] [-y | --[no-]prompt] [<file>…]
```

## 核心功能描述

`git mergetool` 是 Git 合并冲突解决的辅助工具，用于在 `git merge`、`git rebase` 等操作产生冲突后，调用第三方可视化/命令行合并工具，直观地处理三方合并冲突。

它会自动为冲突文件加载四个核心版本：**BASE（两个分支的共同祖先版本）**、**LOCAL（当前分支的版本）**、**REMOTE（待合入分支的版本）**、**MERGED（带冲突标记的最终合并文件）**，通过专业的合并工具大幅降低复杂冲突的解决难度，是处理多分支合并冲突的核心工具。

**核心支持的工具**：内置兼容 `vimdiff`、`nvimdiff`、`gvimdiff`、`meld`、`kdiff3`、`tortoisemerge`、`emerge` 等主流合并工具，也支持自定义任意第三方合并程序。

**适用场景**：
- 解决 `git merge`/`git rebase` 产生的复杂代码冲突
- 可视化对比冲突文件的多个版本，精准处理合并差异
- 批量处理多个冲突文件，提升冲突解决效率
- 自定义合并流程，适配团队统一的冲突处理规范

## 全量参数详解

| 参数 | 描述 | 默认值 |
|------|------|--------|
| `-t <tool>, --tool=<tool>` | 指定使用的合并工具，有效值可通过 `--tool-help` 查看 | 未指定时读取 `merge.tool` 配置，无配置则自动选择默认工具 |
| `--tool-help` | 列出当前系统所有支持的合并工具列表 | 关闭 |
| `-y, --no-prompt` | 调用每个文件的合并工具前不弹出确认提示，直接启动工具 | 显式指定工具时默认开启，未指定工具时默认关闭 |
| `--prompt` | 调用每个合并工具前弹出确认提示，允许用户跳过指定文件 | 未指定工具时默认开启 |
| `-g, --gui` | 使用 GUI 合并工具，读取 `merge.guitool` 配置而非 `merge.tool` | 关闭 |
| `--no-gui` | 覆盖 `--gui` 参数，强制使用 `merge.tool` 配置的工具 | 关闭 |
| `-O <orderfile>` | 按照指定文件中的规则排序冲突文件的处理顺序 | 关闭，默认按文件路径排序 |
| `<file>…` | 指定要处理的冲突文件/目录，指定目录会处理该路径下所有冲突文件 | 无，默认处理所有存在合并冲突的文件 |

## 实战示例

### 示例1：基础冲突解决（最常用）
```bash
# 1. 合并分支产生冲突后，直接启动默认合并工具处理所有冲突
git merge dev
# 出现冲突后，执行
git mergetool

# 2. 工具中解决完冲突，保存退出后，提交合并结果
git commit -m "merge: resolve merge conflicts from dev"
```

### 示例2：指定合并工具与处理指定文件
```bash
# 使用vimdiff处理冲突
git mergetool --tool=vimdiff

# 使用meld可视化工具处理冲突
git mergetool --tool=meld

# 仅处理指定文件的冲突
git mergetool src/main.js src/router/index.js

# 处理指定目录下的所有冲突文件
git mergetool src/components/
```

### 示例3：配置默认合并工具（一劳永逸）
```bash
# 全局配置默认合并工具为meld
git config --global merge.tool meld

# 配置工具的绝对路径（工具不在PATH中时使用）
git config --global mergetool.meld.path /usr/bin/meld

# 配置是否信任工具的退出码
git config --global mergetool.meld.trustExitCode true

# 关闭合并后的.orig备份文件
git config --global mergetool.keepBackup false

# 查看所有支持的合并工具
git mergetool --tool-help
```

### 示例4：高级用法
```bash
# 无提示直接处理所有冲突文件，无需逐次确认
git mergetool --no-prompt

# 使用GUI工具处理冲突
git mergetool --gui

# 按指定顺序处理冲突文件
git mergetool -O conflict-order.txt
```

## 常见踩坑与注意事项

::: tip 解决完冲突务必检查文件内容
合并工具仅提供可视化能力，不会自动判断正确的合并逻辑；保存退出前务必检查最终合并结果，避免错误代码合入仓库。
:::

::: warning 合并后会自动生成.orig备份文件
`git mergetool` 默认会为冲突文件生成带 `.orig` 后缀的原始备份文件，解决完所有冲突后可安全删除；也可通过 `git config --global mergetool.keepBackup false` 永久关闭备份生成。
:::

::: warning 工具必须提前安装才能使用
Git 仅提供调用能力，不会自带合并工具，`--tool` 指定的工具必须提前在系统中安装并正确配置路径，否则会启动失败。
:::

::: tip vimdiff 是全平台内置的默认工具
`vimdiff`/`nvimdiff` 无需额外安装，几乎所有 Git 环境都原生支持，是服务器、无GUI环境下的最佳选择，无需额外配置即可直接使用。
:::

::: danger 自定义工具需正确配置cmd与环境变量
自定义合并工具时，必须正确配置 `mergetool.<tool>.cmd` 启动命令，同时正确传递 `BASE`、`LOCAL`、`REMOTE`、`MERGED` 四个核心变量，否则工具无法正常加载冲突文件。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/merge-and-rebase/git-merge">git merge</a>
  <a href="/commands/scene-category/merge-and-rebase/git-rebase">git rebase</a>
  <a href="/commands/scene-category/log-and-diff/git-diff">git diff</a>
  <a href="/commands/scene-category/log-and-diff/git-difftool">git difftool</a>
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
  <a href="/commands/scene-category/branch-management/git-cherry-pick">git cherry-pick</a>
</div>