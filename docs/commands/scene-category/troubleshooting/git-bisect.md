---
title: git bisect
---

<div class="agc-breadcrumb">
  <a href="/commands/">命令大全</a>
  <span class="separator">/</span>
  <a href="/commands/scene-category/troubleshooting/">故障排查与恢复</a>
  <span class="separator">/</span>
  <span>git bisect</span>
</div>

<div class="agc-detail-header">

# git bisect

<div class="official-def">
  Use binary search to find the commit that introduced a bug. — <em>Git 官方文档</em>
</div>

<div class="tags-bar">
  <span class="agc-tag agc-tag-normal">中高频</span>
  <span class="agc-tag agc-tag-normal">进阶</span>
  <span class="agc-tag agc-tag-normal">场景：bug定位/二分查找问题提交</span>
</div>

<a class="official-link" href="https://git-scm.com/docs/git-bisect" target="_blank" rel="noopener noreferrer">Git 官方文档 → git-bisect</a>

</div>

## 语法格式（SYNOPSIS）

```bash
git bisect start [--term-(bad|new)=<term-new> --term-(good|old)=<term-old>]
		   [--no-checkout] [--first-parent] [<bad> [<good>…]] [--] [<pathspec>…]
git bisect (bad|new|<term-new>) [<rev>]
git bisect (good|old|<term-old>) [<rev>…]
git bisect terms [--term-(good|old) | --term-(bad|new)]
git bisect skip [(<rev>|<range>)…]
git bisect next
git bisect reset [<commit>]
git bisect (visualize|view)
git bisect replay <logfile>
git bisect log
git bisect run <cmd> [<arg>…]
git bisect help
```

## 核心功能描述

`git bisect` 是 Git 内置的二分查找工具，核心作用是通过二分法快速定位项目历史中**引入特定变更的首个提交**，最常用于定位引入bug的提交，也可用于查找性能回归、功能修复、代码规范变更等任何可复现的属性变化。

它的核心原理是：先指定一个已知存在问题的「坏提交」，和一个已知无问题的「好提交」，Git 会自动选中两个端点中间的提交，让用户标记该提交的好坏状态，不断缩小排查范围，最终精准定位到首个引入问题的提交，将原本线性排查的O(n)复杂度降为O(logn)，大幅提升复杂历史的问题定位效率。

**核心适用场景**：
- 定位线上bug的引入提交，快速定位根因
- 查找性能回归、内存泄漏等非功能性问题的引入节点
- 定位功能修复的首个提交，追溯修复方案
- 排查代码规范、依赖版本等变更的引入节点
- 自动化测试场景下，批量定位问题提交

## 核心子命令速览

| 子命令 | 核心作用 |
|--------|----------|
| `start` | 启动二分查找会话，可配置自定义术语、排查范围、路径限定等 |
| `bad/new` | 标记指定提交为「坏/新状态」（存在目标变更），不指定提交时默认标记当前HEAD |
| `good/old` | 标记指定提交为「好/旧状态」（无目标变更），可同时标记多个提交 |
| `terms` | 查看当前会话使用的状态术语，或查询自定义术语的用法 |
| `skip` | 跳过无法测试的提交（如构建失败、与目标问题无关的提交） |
| `reset` | 结束二分查找会话，将仓库重置到会话启动前的状态，是会话结束的必执行命令 |
| `visualize/view` | 可视化当前待排查的提交范围，图形环境打开gitk，终端环境使用git log |
| `log` | 导出当前会话的所有标记操作日志，用于纠错、重放 |
| `replay` | 从日志文件重放二分标记操作，修正错误标记后快速恢复会话 |
| `run` | 通过脚本自动化执行二分查找，无需人工逐次标记提交状态 |
| `help` | 查看bisect命令的完整帮助信息 |

## 核心参数详解

| 参数 | 核心描述 | 默认值 |
|------|----------|--------|
| `--term-(bad\|new)=<term>` | 自定义「坏/新状态」的术语，用于非bug排查的通用场景 | 默认 bad/new |
| `--term-(good\|old)=<term>` | 自定义「好/旧状态」的术语，需与新状态术语配对使用 | 默认 good/old |
| `--no-checkout` | 每轮迭代不自动检出提交，仅更新 `BISECT_HEAD` 引用，适用于裸仓库或无需检出的测试场景 | 关闭，默认自动检出待测试提交 |
| `--first-parent` | 仅跟踪合并提交的第一个父提交，忽略合入的分支历史，避免合入分支中的无效提交干扰排查 | 关闭，默认遍历所有父提交 |
| `<pathspec>…` | 限定仅排查指定路径/文件相关的提交，大幅缩小排查范围，提升定位效率 | 无，默认排查全量提交 |

## 实战示例

### 示例1：手动二分查找bug引入提交（最常用）
```bash
# 1. 启动二分查找会话
git bisect start

# 2. 标记当前HEAD为坏提交（存在bug）
git bisect bad

# 3. 标记已知无bug的好提交（如v1.0.0标签、历史稳定提交）
git bisect good v1.0.0

# 4. Git自动检出中间提交，编译测试后标记状态
# 测试后无bug，标记为good
git bisect good
# 测试后存在bug，标记为bad
git bisect bad

# 5. 重复步骤4，直到Git输出首个坏提交的详细信息

# 6. 排查结束，重置仓库到初始状态（必执行）
git bisect reset
```

### 示例2：自动化二分查找（脚本化执行）
```bash
# 1. 启动会话，指定坏提交和好提交
git bisect start HEAD v1.0.0

# 2. 执行自动化脚本，Git自动完成全量二分查找
# 脚本规则：退出码0=good，1-124=bad，125=skip当前提交
git bisect run ./test-bug.sh

# 3. 排查结束，重置仓库
git bisect reset
```

### 示例3：自定义术语，查找bug修复的提交
```bash
# 1. 启动会话，自定义术语：broken=有bug，fixed=已修复
git bisect start --term-old broken --term-new fixed

# 2. 标记当前HEAD为已修复状态
git bisect fixed

# 3. 标记已知存在bug的历史提交
git bisect broken HEAD~50

# 4. 逐次标记提交状态，最终定位首个修复bug的提交

# 5. 结束会话，重置仓库
git bisect reset
```

### 示例4：跳过无法测试的提交与路径限定
```bash
# 跳过当前无法测试的提交（如构建失败）
git bisect skip

# 跳过指定范围的所有提交
git bisect skip v2.0.0..v2.1.0

# 启动会话时限定仅排查src目录的提交，大幅缩小范围
git bisect start HEAD v1.0.0 -- src/
```

### 示例5：日志重放，修正错误标记
```bash
# 导出当前二分操作日志
git bisect log > bisect-log.txt

# 编辑日志文件，删除错误的标记行
vim bisect-log.txt

# 重置会话，重放修正后的日志
git bisect reset
git bisect replay bisect-log.txt
```

## 常见踩坑与注意事项

::: warning 排查结束必须执行 git bisect reset
二分查找过程中Git会频繁切换提交，会话结束后必须执行 `git bisect reset`，才能将仓库重置到会话启动前的分支和HEAD状态，否则会停留在最后一个测试的游离提交上，导致后续开发异常。
:::

::: warning 同一会话不能混用不同术语
启动会话后，不能混用 `good/bad` 和 `old/new`，也不能中途切换自定义术语，否则会导致Git状态混乱，排查结果错误。
:::

::: danger 自动化脚本必须严格遵守退出码规则
`bisect run` 对脚本退出码有严格要求：
- 退出码 0：当前提交为good/old状态
- 退出码 1~124：当前提交为bad/new状态
- 退出码 125：跳过当前提交
- 退出码 126/127：立即终止二分进程
不符合规则的退出码会导致定位结果完全错误，甚至中断排查流程。
:::

::: warning 尽量避免skip相邻的可疑提交
如果跳过了首个坏提交相邻的提交，Git无法精准定位到具体的问题提交，最终只会输出一个可疑的提交范围，无法得到精准结果。仅跳过与目标问题无关、无法测试的提交。
:::

::: tip 合入分支排查用--first-parent
如果问题是通过分支合并引入的，启动会话时添加 `--first-parent` 参数，仅跟踪主分支的合并提交，忽略合入分支内的无效提交，避免构建失败、无关变更干扰排查，大幅提升效率。
:::

::: tip 路径限定是提升效率的关键
如果明确问题出在特定目录/文件，启动会话时通过 `<pathspec>` 限定排查范围，Git会直接过滤掉无关提交，将排查范围压缩到最小，大幅减少测试轮次。
:::

## 相关命令

<div class="agc-related-commands">
  <a href="/commands/scene-category/log-and-diff/git-log">git log</a>
  <a href="/commands/scene-category/branch-management/git-checkout">git checkout</a>
  <a href="/commands/scene-category/branch-management/git-reset">git reset</a>
  <a href="/commands/scene-category/log-and-diff/git-show">git show</a>
  <a href="/commands/scene-category/branch-management/git-switch">git switch</a>
  <a href="/commands/scene-category/troubleshooting/git-reflog">git reflog</a>
</div>