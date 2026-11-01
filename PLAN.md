# 学术术语解释器 · 产品官网（Apple 风格复刻）实现规划

> 参考页：<https://www.apple.com.cn/macbook-pro/proled-xdr-display/>
> 目标：**版式、布局、字号、间距、配色、滚动节奏与参考页一致**，文案 100% 换成「学术术语解释器」的内容。
> 技术：Vue 3 + TypeScript + Vite + GSAP（ScrollTrigger）。

---

## 一、从参考页提取到的设计规范（实测值）

| 项目 | 实测值（来自参考页 CSS） |
| --- | --- |
| 内容宽度 | `width: 87.5%; max-width: 1260px`，水平居中（hero 可至 1680px） |
| 屏幕断点 | Large ≥ 1069px / Medium 735–1068px / Small ≤ 734px |
| 区块上下留白 | 144px（L）/ 120px（M）/ 112px（S） |
| 区块背景 | 深色 `#000`；浅色 `#f5f5f7`；深色块用 `#1d1d1f`（`background-alt`） |
| 字色 | 深色区块 `#f5f5f7`，次级 `#86868b`；浅色区块 `#1d1d1f`，次级 `#6e6e73` |
| 链接蓝 | 浅色 `#0066cc`，深色 `#2997ff`；按钮 `#0071e3` |
| 正文字号 | 17px / 行高 1.4706 / 字距 -0.022em（`SF Pro Text`） |
| Hero 主标题 | 80 / 64 / 40px，行高 1.05 / 1.0625 / 1.1，字重 600，字距 -0.015em |
| Hero 眉标 | 32 / 28 / 24px，行高 1.125，字重 600 |
| 区块大标题 | 48 / 40 / 32px，行高 1.0835，字重 600（区块头） |
| 故事标题（type-lockup） | 64 / 48 / 40px，行高 1.0625，字重 600，字距 -0.009em |
| 故事眉标 / 导语 | 21 / 21 / 19px，行高 1.38，字重 600 |
| 段落导语（intro） | 21px，行高 1.38，字重 600 |
| 卡片小标（caption） | 12px / 行高 1.333 |
| 区块头布局 | `display:flex; justify-content:space-between; align-items:last baseline; column-gap:80px; margin-bottom:48px` |
| 圆角 | 卡片 28px，按钮 980px（胶囊），小控件 12px |
| 动效 | 逐行/逐词淡入上移（stagger 0.06–0.12s）、粘性字标、滚动驱动横向画廊、`prefers-reduced-motion` 降级 |

字体栈：`SF Pro Display / SF Pro Text / PingFang SC`（macOS 原生），Windows 回退 `Microsoft YaHei UI`。

---

## 二、章节映射（参考页 → 本站）

参考页共 19 个 section，本站按同一节奏排布，保证「排版结构一模一样」：

| # | 参考页 section | 本站对应 | 内容要点 |
| --- | --- | --- | --- |
| 1 | Global nav | 全局导航 | 品牌 + 概览 / 能力 / 技术规格 / 团队 + 搜索、行动按钮 |
| 2 | Local nav | 局部导航 | 概览 · 技术规格 · 机型比较 → 概览 · 工作流 · 指标 · 对比；右侧「立即体验」 |
| 3 | Media hero | Hero | 眉标 `学术术语解释器 Academic Term Explainer` + 主标题「术语之墙，一读即通」+ v1.4.2 + CTA |
| 4 | Highlights（先刷重点） | 先刷重点 | 7 张横向卡片：提取 / 路由 / 联网 / 拼装 / 递归 / 输出 / 指标 |
| 5 | Product viewer（设计） | 设计 · 一屏看懂 | 粘性产品视窗：输入 → 输出 Markdown / PDF 三种形态切换 |
| 6 | Display（PROLED XDR 显示屏） | 引擎一 · 术语提取 M1 | 大字标题「重点，一眼拎清」+ 评分规则可视化 |
| 7 | Touch（屏幕触控） | 引擎二 · 学科路由 M2 | 「9 组歧义，指哪打哪」+ 歧义消解交互 |
| 8 | Dynamic Island（灵动岛） | 引擎三 · 联网搜索 M3 | 「实时检索，顶上见」+ L1–L4 搜索阶梯 |
| 9 | Performance（M5 Pro/Max） | 引擎四 · 模块拼装 M4 | 两张芯片式卡片 + 耗时基准条形图（≤30s / ≤8min…） |
| 10 | AI | 引擎五 · 递归澄清 M5 | 「AI 递归，界绝世高手」+ 两层递归树 |
| 11 | Battery（续航） | 输出可靠性 M6–M8 | 「从 L1 到 L5，一直有输出」降级链 |
| 12 | Workflows（专业工作流） | 专业场景 | 9 类学科场景 Tab：医学 / 法学 / 金融 / 教育 / 工程 / 哲学 / 新闻 / 艺术 / 通用 |
| 13 | Audio & camera | 指标 | 音质的对应物：数据网格（准确率、成功率、覆盖率、时效性） |
| 14 | Ports（端口） | 跨学科接口 | 「一接上，全学科联通」17 学科映射 |
| 15 | Security（安全性） | 可信性 | 四项承诺：引用必标注 / 禁止编造 URL / 临时文件清理 / 降级说明 |
| 16 | Upgrader（升级） | 版本对比 | v1.0.0 → v1.4.2 对比表 |
| 17 | Incentive（选购 8 卡） | 参赛团队 | 8 张卡片：赛题 / 团队 / 技术栈 / 周期 / 文档 / 演示 / 开源 / 致谢 |
| 18 | Values（价值观 3 卡） | 价值观 | 学术诚信 / 可复现 / 可解释 |
| 19 | Index + footnotes + footer | 结尾 / 脚注 / 页脚 | 「学术阅读，本该如此。」+ 站点索引 + 脚注 + 页脚 |

---

## 三、工程结构

```
web/
├── index.html
├── package.json / vite.config.ts / tsconfig.json
├── PLAN.md / README.md
└── src/
    ├── main.ts / App.vue
    ├── styles/          tokens.css · base.css · utilities.css
    ├── composables/     useReveal.ts · useStickyScene.ts · useMediaQuery.ts
    ├── data/            content.ts（全部文案与指标集中管理）
    └── components/
        ├── layout/      GlobalNav · LocalNav · SiteFooter · Footnotes
        ├── ui/          TypeLockup · SectionHeader · ActionButton · GlassCard · Bar
        └── sections/    Hero · Highlights · Design · Extraction · Routing · Search
                         · Assembly · Recursion · Reliability · Workflows · Metrics
                         · Interfaces · Trust · Upgrade · Team · Values · Index
```

## 四、实施步骤（每步一个 git 提交）

1. `feat: 初始化 Vue3 + TS + Vite + GSAP 工程骨架`
2. `feat: 建立 Apple 设计令牌与全局样式`
3. `feat: 全局导航与局部导航`
4. `feat: Hero 首屏与入场动画`
5. `feat: 先刷重点卡片画廊`
6. `feat: 设计（粘性产品视窗）`
7. `feat: 术语提取引擎区块`
8. `feat: 学科路由区块`
9. `feat: 联网搜索区块`
10. `feat: 模块拼装与性能基准`
11. `feat: 递归澄清区块`
12. `feat: 输出降级链区块`
13. `feat: 专业场景 Tab 画廊`
14. `feat: 指标与跨学科接口`
15. `feat: 可信性、版本对比、团队与价值观`
16. `feat: 结尾索引、脚注与页脚`
17. `fix: 响应式与动效收尾`
18. `feat: README 与交付说明`

## 五、验收标准

- [ ] 内容宽度、断点、区块留白、字号阶梯与参考页逐项一致
- [ ] 深色/浅色区块交替节奏与参考页一致
- [ ] 粘性字标、滚动淡入、横向画廊、条形图增长等动效存在且可降级
- [ ] 三档断点（1440 / 1024 / 390）下排版不塌陷
- [ ] `pnpm build` 通过，无 TS 报错
