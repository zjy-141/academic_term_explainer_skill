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
| 1 | Local nav | 页面导航 | 学术术语解释器 + v1.4.2 · 概览 / 工作流 / 技术规格 / 版本对比 · 右侧「立即体验」（全局导航按需求移除） |
| 2 | Media hero | Hero | 眉标「面向跨学科阅读 / 学术术语解释器」+ 主标题「看懂为止」+ v1.4.2 已发布 + CTA |
| 3 | Highlights（先刷重点） | 先刷重点 | 7 张横向卡片：提取 / 路由 / 检索 / 拼装 / 递归 / 降级 / 引用，各配专属 SVG |
| 4 | Product viewer（设计） | 工作流 | 粘性产品视窗：输入 → 处理 → 输出三态切换 |
| 5 | Display（PROLED XDR 显示屏） | 引擎一 · 术语提取 M1 | 「先挑出 / 真正难懂的词」+ 评分权重与阈值规则 |
| 6 | Touch（屏幕触控） | 引擎二 · 学科路由 M2 | 「再送进 / 对的那个学科」+ 歧义词消解交互 |
| 7 | Dynamic Island（灵动岛） | 引擎三 · 联网搜索 M3 | 「逐个去查 / 最新的定义」+ L1–L4 搜索阶梯 |
| 8 | Performance（M5 Pro/Max） | 引擎四 · 模块拼装 M4 | 「按复杂度 / 决定写多长」+ 两张链路卡片 + 耗时上限条形图 |
| 9 | AI | 引擎五 · 递归澄清 M5 | 「遇到新词，/ 就地补一层」+ 两层递归树 |
| 10 | Battery（续航） | 输出可靠性 M6–M8 | 「导出失败，/ 也还有文件」+ L1→L5 降级链 |
| 11 | Workflows（专业工作流） | 专业场景 | 9 类学科场景 Tab：医学 / 法学 / 金融 / 教育 / 计算机 / 哲学 / 新闻 / 环境 / 通用 |
| 12 | Audio & camera | 指标 | 8 项目标值，无卡片无分隔线，直接排在背景上 |
| 13 | Ports（端口） | 跨学科接口 | 「主源取不到，/ 就换备用源」+ 17 学科映射 |
| 14 | Security（安全性） | 可信性 | 四项承诺：引用必标注 / 禁止编造 URL / 降级说明 / 临时文件清理 |
| 15 | Upgrader（升级） | 版本对比 | v1.0.0 → v1.4.2 对比表 |
| 16 | Incentive（选购 8 卡） | 参赛团队 | 8 张卡片：作品 / 团队 / 技术栈 / 周期 / 文档 / 演示 / 交付 / 致谢 |
| 17 | Values（价值观 3 卡） | 价值观 | 三件不做的事：不编造来源 / 不复用过期缓存 / 不省略降级说明 |
| 18 | Index + footnotes + footer | 结尾 / 脚注 / 页脚 | 「术语讲清楚，阅读继续。」+ 站点索引 + 脚注 + 页脚 |

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
    ├── composables/     useSiteMotion.ts（IntersectionObserver + GSAP 入场动效）
    ├── data/            content.ts（全部文案与指标集中管理）
    └── components/
        ├── layout/      LocalNav · SiteFooter（脚注 + 页脚）
        ├── ui/          TypeLockup · SectionHeader · StorySection · HighlightGlyph
        └── sections/    Hero · Highlights · Design · Extraction · Routing · Search
                         · Assembly · Recursion · Reliability · Workflows · Metrics
                         · Interfaces · Trust · Upgrade · Team · Values · Index
```

## 四、实施步骤（每步一个 git 提交）

1. `feat: 初始化 Vue3 + TS + Vite + GSAP 工程骨架`
2. `feat: 建立 Apple 设计令牌与全局样式`
3. `feat: 局部导航与页脚`（全局导航后续按需求移除）
4. `feat: Hero 首屏与入场动画`
5. `feat: 先刷重点卡片画廊`
6. `feat: 工作流粘性产品视窗`
7. `feat: 术语提取引擎区块`
8. `feat: 学科路由区块`
9. `feat: 联网搜索区块`
10. `feat: 模块拼装与耗时上限`
11. `feat: 递归澄清区块`
12. `feat: 输出降级链区块`
13. `feat: 专业场景 Tab 画廊`
14. `feat: 指标与跨学科接口`
15. `feat: 可信性、版本对比、团队与价值观`
16. `feat: 结尾索引、脚注与页脚`
17. `fix: 响应式与动效收尾`
18. `feat: README 与交付说明`

## 五、验收标准

- [x] 内容宽度、断点、区块留白、字号阶梯与参考页逐项一致
- [x] 深色/浅色区块交替节奏与参考页一致
- [x] 滚动淡入、横向画廊、条形图增长、悬停位移等动效存在且可降级
- [x] 三档断点（1440 / 1024 / 390）下排版不塌陷
- [x] `pnpm build` 通过，无 TS 报错
