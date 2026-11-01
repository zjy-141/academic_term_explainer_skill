/**
 * 全站文案与数据：集中管理，便于逐字校对。
 * 数据取自《学术术语解释器 · 产品技术文档 v2.0》与《作品演示2.pptx》。
 */

export const site = {
  brand: '学术术语解释器',
  brandEn: 'Academic Term Explainer',
  team: '下次一定队',
  version: 'v1.4.2',
  docVersion: 'v2.0',
  year: '2026',
}

export const nav = {
  global: [
    { label: '概览', href: '#hero' },
    { label: '能力', href: '#highlights' },
    { label: '引擎', href: '#extraction' },
    { label: '指标', href: '#metrics' },
    { label: '对比', href: '#upgrade' },
    { label: '团队', href: '#team' },
  ],
  local: [
    { label: '概览', href: '#hero' },
    { label: '工作流', href: '#design' },
    { label: '技术规格', href: '#metrics' },
    { label: '版本对比', href: '#upgrade' },
  ],
  cta: { label: '立即体验', href: '#design' },
}

export const hero = {
  eyebrow: ['为跨学科阅读而生的', '学术术语解释器'],
  headline: '一读即通',
  releaseLabel: '现已可用',
  releaseValue: 'v1.4.2',
  price: '免费 · 开源 · 无需注册',
  note: '*',
  primaryCta: { label: '立即体验', href: '#design' },
  secondaryCta: { label: '查看技术规格', href: '#metrics' },
  source: {
    label: '原文',
    text: '在临床决策支持系统（CDSS）的部署过程中，算法透明度成为医患双方关注的焦点。然而，过度披露模型细节可能引发认知过载，反而削弱患者对算法决策的信任。',
    marks: ['算法透明度', '认知过载'],
  },
  terms: [
    { en: 'Algorithmic Transparency', cn: '算法透明度', tag: '计算机 / AI' },
    { en: 'Cognitive Overload', cn: '认知过载', tag: '心理学' },
  ],
  output: {
    title: '学术术语解释',
    meta: ['提取术语：2 个', '涉及学科：计算机/AI、心理学', '检索来源：6'],
  },
}

export const highlights = {
  eyebrow: '先刷重点',
  film: '观看演示',
  items: [
    {
      index: '01',
      title: '术语提取',
      line: '从一段话里，拎出真正难懂的词。',
      detail: '五维评分，阈值驱动，Top 10 封顶。',
    },
    {
      index: '02',
      title: '学科路由',
      line: '17 个学科、9 组歧义，指哪打哪。',
      detail: '信号词扫描 + 歧义消解，直连权威源。',
    },
    {
      index: '03',
      title: '强制联网',
      line: '每个术语至少两次检索。',
      detail: '定义不靠记忆，来源交叉验证。',
    },
    {
      index: '04',
      title: '模块拼装',
      line: '六块拼图，长文不长，短文不空。',
      detail: 'A–F 模块按复杂度决策树组装。',
    },
    {
      index: '05',
      title: '递归澄清',
      line: '子概念再讲一层，最多两层。',
      detail: '新术语独立成节，不打断主篇。',
    },
    {
      index: '06',
      title: '四级降级',
      line: 'L1 到 L5，任何环境都有产出。',
      detail: 'PDF 失败不阻塞 Markdown 交付。',
    },
    {
      index: '07',
      title: '引用可查',
      line: '标题 + 链接，一条不编。',
      detail: '搜不到就留空，绝不虚构来源。',
    },
  ],
}

export const design = {
  eyebrow: '设计',
  headline: ['一句话进去，', '一张知识卡片出来。'],
  intro:
    '不需要选模板，不需要填表单。把读不懂的那段论文贴进来，说一句“帮我解释”，剩下的提取、检索、拼装、排版，都由它一路做完。',
  scenes: [
    {
      label: '输入',
      title: '只贴原文就好',
      copy: '纯文本、Markdown、论文片段，甚至只报几个术语的名字。系统自动识别格式、解析参数，判断要不要联网、要不要出 PDF。',
      figure: 'input',
    },
    {
      label: '处理',
      title: '一路都在查证',
      copy: '每个术语独立走完提取、路由、检索、拼装四步，互不串源。搜索失败会降级标注，而不是编一个看起来很像的答案。',
      figure: 'process',
    },
    {
      label: '输出',
      title: 'Markdown 与 PDF',
      copy: '结构化 Markdown 落地即用，可选的 PDF 由四级降级链生成。文件名带主题与时间戳，不覆盖、不重名。',
      figure: 'output',
    },
  ],
}

export const extraction = {
  wordmark: '提取',
  eyebrow: 'M1 · 术语提取引擎',
  headline: ['重点，', '一眼拎清。'],
  intro:
    '一段一千字的论文摘要，真正的难点往往只有三五个词。提取引擎给每个候选词打分：出现频率、复合词根、作者是否加粗强调、是否领域专名、是否切题。总分跨过阈值才进入解释队列，剩下的交给“宁缺毋滥”。',
  weightTitle: '评分权重',
  weights: [
    { score: '+3', label: '出现频率 ≥ 3 次', note: '核心概念' },
    { score: '+2', label: '含 2 个以上词根', note: '复合概念' },
    { score: '+2', label: '被加粗、引号或斜体强调', note: '作者强调' },
    { score: '+2', label: '领域专用名词', note: '专业性' },
    { score: '+1', label: '与文本主题直接相关', note: '切题度' },
  ],
  rulesTitle: '阈值与兜底',
  rules: [
    { k: '默认阈值', v: '≥ 3 分' },
    { k: '候选不足 5 个', v: '阈值降至 2 分' },
    { k: '仍不足 5 个', v: '全部提取，不强行凑数' },
    { k: '数量上限', v: '默认前 10 个' },
    { k: '同分排序', v: '按首次出现顺序' },
    { k: '同义词', v: '合并为一条并在“相关概念”辨析' },
  ],
  sampleTitle: '示例',
  sampleText:
    '“在临床决策支持系统（CDSS）的部署过程中，算法透明度成为医患双方关注的焦点。然而，过度披露可能引发认知过载……”',
  sampleTerms: [
    { name: '算法透明度', score: '7 分' },
    { name: '认知过载', score: '6 分' },
  ],
}

export const routing = {
  eyebrow: 'M2 · 学科路由',
  headline: ['指哪，', '打哪。'],
  intro:
    '同一个词，换个学科就是另一件事。“推理”在 AI 论文里是模型延迟，在心理学论文里是判断偏误。路由模块先扫信号词，再用 9 组共现规则消歧，最后把术语送进最该去的数据源。',
  ambiguities: [
    {
      word: '推理',
      cases: [
        { context: '与「模型 / 引擎 / 延迟 / 部署」共现', field: '计算机 / AI', source: 'IEEE' },
        { context: '与「动机 / 判断 / 偏误」共现', field: '心理学', source: 'APA 词典' },
        { context: '以上都不命中', field: '全学科 / 通用', source: '术语在线' },
      ],
    },
    {
      word: '模型',
      cases: [
        { context: '与「语言 / 生成 / 扩散 / 预测」共现', field: '计算机 / AI', source: 'IEEE' },
        { context: '与「理论 / 数学 / 经济」共现', field: '数学 · 经济学', source: 'MathWorld' },
      ],
    },
    {
      word: '学习',
      cases: [
        { context: '与「机器 / 深度 / 强化 / 神经网络」共现', field: '计算机 / AI', source: 'IEEE' },
        { context: '与「教学 / 课程 / 评价」共现', field: '教育学', source: 'Oxford Reference' },
        { context: '与「记忆 / 认知 / 发展」共现', field: '心理学', source: 'APA 词典' },
      ],
    },
    {
      word: '决策',
      cases: [
        { context: '与「临床 / 诊断 / 治疗」共现', field: '医学', source: '人卫临床知识库' },
        { context: '与「组织 / 战略」共现', field: '管理学', source: 'MBA 智库' },
        { context: '与「认知 / 偏误」共现', field: '心理学', source: 'APA 词典' },
      ],
    },
    {
      word: '评估',
      cases: [
        { context: '与「形成性 / 终结性 / 课程」共现', field: '教育学', source: 'Oxford Reference' },
        { context: '与「风险 / 资产 / 投资」共现', field: '经济学 / 金融学', source: 'MBA 智库' },
      ],
    },
  ],
  routeTitle: '路由四步',
  routeSteps: ['信号词扫描', '歧义消解', '学科匹配', '配置输出'],
  stats: [
    { value: '17', unit: '个', label: '学科精准路由' },
    { value: '9', unit: '组', label: '歧义词消歧规则' },
    { value: '≥ 90', unit: '%', label: '路由准确率目标' },
  ],
}

export const search = {
  eyebrow: 'M3 · 联网搜索',
  headline: ['实时检索，', '顶上见。'],
  intro:
    '学术术语的语义一直在动。引擎不靠记忆答题，而是把每个术语至少送出去检索两次：中文定义打底，英文原词交叉验证，必要时再补一次领域限定，找最新进展。',
  levels: [
    { level: 'L1', name: '中文精确搜索', query: '「算法透明度」学术定义 研究', note: '默认首选' },
    { level: 'L2', name: '中文宽泛搜索', query: '「算法透明度」概念 含义', note: 'L1 结果不足时' },
    { level: 'L3', name: '英文精确搜索', query: '"Algorithmic Transparency" definition research', note: '交叉验证' },
    { level: 'L4', name: '领域限定搜索', query: '「算法透明度」计算机 AI 最新进展', note: '需要前沿动态' },
  ],
  qualityTitle: '结果质量控制',
  quality: [
    { title: '权威性', copy: '.edu / .org / 学术期刊 > 百科类 > 一般网站' },
    { title: '时效性', copy: '近 3 年文献优先，经典文献次之' },
    { title: '交叉验证', copy: '≥ 2 个不同来源定义一致' },
    { title: '超时处理', copy: '30 秒无果即切换策略并标注' },
  ],
}

export const assembly = {
  eyebrow: 'M4 · 模块拼装',
  headline: ['六块拼图，', '按需出场。'],
  intro:
    '解释不是越长越好。拼装引擎看术语复杂度决定出场阵容：核心概念全模块铺开，边缘术语只讲“是什么”，底线是 A + B 一定要有。',
  modules: [
    { key: 'A', name: '术语原词与译名', required: '必选', copy: '英文原词 + 中文译名，供对照引用。' },
    { key: 'B', name: '通俗定义', required: '必选', copy: '生活化类比，不引入未解释的新术语。' },
    { key: 'C', name: '学术语境', required: '条件必选', copy: '学科定位与研究意义，可含公式。' },
    { key: 'D', name: '原文含义', required: '条件必选', copy: '结合你原文中的具体指代。' },
    { key: 'E', name: '相关概念', required: '可选', copy: '1–2 个易混概念辨析。' },
    { key: 'F', name: '延伸阅读', required: '可选', copy: '1–2 条参考资料，搜不到就留空。' },
  ],
  engines: [
    {
      name: 'M1 + M2 + M3',
      label: '基本盘',
      headline: '提取、路由、检索',
      copy: '五维评分筛出真难点，信号词把它们送对地方，联网检索带回可核对的定义与研究进展。三者串成解释的地基。',
      metrics: [
        { label: '术语提取准确率', value: '≥ 90%' },
        { label: '搜索成功率', value: '≥ 98%' },
      ],
    },
    {
      name: 'M4 + M5 + M9',
      label: '进阶盘',
      headline: '拼装、递归、合并',
      copy: '复杂术语铺开六模块，子概念就地递归澄清，近义术语合并一条再辨析差异。读起来是一条线，不是一堆碎片。',
      metrics: [
        { label: '模块完整性', value: '100%' },
        { label: '知识网络完整度', value: '≥ 70%' },
      ],
    },
  ],
  benchmarkTitle: '耗时上限',
  benchmarkNote: '单位为秒，满格 = 30 秒。端到端（10 个术语）目标 ≤ 8 分钟，超出本图刻度。',
  benchmarks: [
    { label: 'PDF 生成与加载', display: '≤ 3 秒', ratio: 10 },
    { label: '术语提取（每千字）', display: '≤ 5 秒', ratio: 17 },
    { label: '单术语解释生成', display: '≤ 15 秒', ratio: 50 },
    { label: 'L3 副本导出', display: '≤ 20 秒', ratio: 67 },
    { label: '单术语联网检索', display: '≤ 30 秒', ratio: 100 },
    { label: '环境探测（真实试跑）', display: '≤ 30 秒', ratio: 100 },
  ],
}

export const recursion = {
  eyebrow: 'M5 · 递归澄清',
  headline: ['新词，', '就地讲清。'],
  intro:
    '解释里又冒出没见过的词，是最扫兴的事。引擎会回扫自己写下的每一句，把仍然挡路的概念挑出来再讲一遍，深度到两层就收手——既不半途而废，也不无限套娃。',
  tree: {
    root: { name: '脉冲时序依赖可塑性', en: 'STDP' },
    children: [
      { name: '突触', en: 'Synapse', leaves: ['神经元', '可塑性'] },
      { name: '长时程增强', en: 'LTP', leaves: ['赫布学习'] },
    ],
  },
  rules: [
    { k: '递归深度', v: '≤ 2 层' },
    { k: '次级词长度', v: '100–150 字' },
    { k: '输出位置', v: '独立成节「递归补充解释」' },
    { k: '递归层', v: '不再触发新递归' },
    { k: '联网要求', v: '可基于通用学术知识简述' },
  ],
}

export const reliability = {
  eyebrow: 'M6 – M8 · 输出',
  headline: ['从 L1 到 L5，', '一直有输出。'],
  intro:
    '办公电脑、评审的笔记本、一台干净的服务器，环境各不相同。输出前会真实试跑一遍导出链路，按 L1 → L2 → L3 → L5 命中第一个可用的方案；全部不可用时，Markdown 依然准时交付。',
  chain: [
    {
      level: 'L1',
      name: 'Pandoc + XeLaTeX',
      formula: '完整公式',
      note: '高质量排版，中文推荐',
    },
    {
      level: 'L2',
      name: 'Pandoc + WeasyPrint',
      formula: '降级公式',
      note: '无 LaTeX 时的通用排版',
    },
    {
      level: 'L3',
      name: 'ReportLab + matplotlib',
      formula: 'mathtext 子集',
      note: '复杂公式走副本机制',
    },
    {
      level: 'L5',
      name: '仅交付 Markdown',
      formula: '保留完整 LaTeX',
      note: '不阻塞主交付',
    },
  ],
  bypass: { level: 'L4', name: 'Marp 幻灯片旁路', note: '仅在你明确要演示稿时启用，不参与主链探测' },
  probe: [
    { k: '探测方式', v: '真实试跑，不猜环境' },
    { k: '总超时', v: '30 秒，超时按 L5 处理' },
    { k: '缓存', v: '同一会话内复用' },
    { k: '失效', v: '你声明环境变更即重新探测' },
  ],
  cleanup: '临时文件 _tmp_probe.md 与 _tmp_pdf_export.md 用后即删。',
}

export const workflows = {
  eyebrow: '专业场景',
  headline: ['跨的专业越多，', '越好用。'],
  intro: '17 个学科的数据源已经接好。选中一个领域，看看它会把术语送到哪里去求证。',
  tabs: [
    {
      key: 'med',
      label: '医学',
      app: '人卫临床知识库',
      title: '诊断之外，还得讲清依据。',
      copy: '临床、病理、影像、药理类术语，优先检索人卫临床知识库与 Emtree 词库；AI 医疗类术语会同时命中计算机与伦理学。',
      terms: ['算法透明度', '认知过载', '知情同意'],
      sources: ['人卫临床知识库', 'Emtree 词库', 'IEEE'],
    },
    {
      key: 'law',
      label: '法学',
      app: '北大法宝',
      title: '一个词，三段责任。',
      copy: '权利、义务、判例类术语走北大法宝与康奈尔法律信息中心；“算法问责”这类跨学科词会同时标注技术、伦理与法律责任边界。',
      terms: ['算法问责制', '产品责任', '知情同意'],
      sources: ['北大法宝', '康奈尔法律', 'SEP'],
    },
    {
      key: 'econ',
      label: '金融',
      app: 'MBA 智库百科',
      title: '指标背后的那套话术。',
      copy: '供给、需求、风险、博弈类术语优先 MBA 智库与新帕尔格雷夫；“评估”这类歧义词会按“风险 / 资产 / 投资”共现改道金融学。',
      terms: ['外部性', '契约', '风险溢价'],
      sources: ['MBA 智库百科', '新帕尔格雷夫', 'Oxford Reference'],
    },
    {
      key: 'edu',
      label: '教育学',
      app: 'Oxford Reference',
      title: '形成性，还是终结性？',
      copy: '教学论、评价、课程类术语直连 Oxford Reference 教育学与术语在线；“评估”“发展”等歧义词按共现词判定教育场景。',
      terms: ['形成性评价', '最近发展区', '素养'],
      sources: ['Oxford Reference', '术语在线', 'ELSST'],
    },
    {
      key: 'cs',
      label: '计算机',
      app: 'IEEE Xplore',
      title: '模型、架构、推理，都是老熟人。',
      copy: '算法、模型、训练、推理类术语直连 IEEE，配合英文原词交叉验证；新兴交叉术语会并行多个学科源。',
      terms: ['自注意力机制', '零样本学习', '对数量化'],
      sources: ['IEEE Xplore', '术语在线', 'Oxford Reference'],
    },
    {
      key: 'phil',
      label: '哲学',
      app: '斯坦福哲学百科全书',
      title: '概念的历史，比定义更重要。',
      copy: '存在、正义、意识、因果类术语优先 SEP 与 Oxford Reference 哲学；伦理学议题会连带检索法学源以厘清责任归属。',
      terms: ['具身认知', '因果涌现', '规范性'],
      sources: ['SEP', 'Oxford Reference', '北大法宝'],
    },
    {
      key: 'media',
      label: '新闻传播',
      app: 'Oxford Reference',
      title: '议程、框架、算法推荐。',
      copy: '传播、受众、平台、舆论类术语走 Oxford Reference 传播学与术语在线，算法推荐类术语改道计算机源。',
      terms: ['议程设置', '框架理论', '算法推荐'],
      sources: ['Oxford Reference', '术语在线', 'IEEE'],
    },
    {
      key: 'env',
      label: '环境科学',
      app: '术语在线',
      title: '气候、排放、碳汇。',
      copy: '气候、污染、可持续类术语优先术语在线与 Oxford Reference 环境；政策类术语会同时命中政治学与经济学源。',
      terms: ['碳中和', '生物多样性', '外部性'],
      sources: ['术语在线', 'Oxford Reference', 'ELSST'],
    },
    {
      key: 'general',
      label: '通用',
      app: '术语在线',
      title: '没命中，也不会掉地上。',
      copy: '信号词全不命中时走通用兜底：术语在线 + Oxford Reference，并在文中标明这是兜底来源。',
      terms: ['涌现', '自组织', '路径依赖'],
      sources: ['术语在线', 'Oxford Reference'],
    },
  ],
}

export const metrics = {
  eyebrow: '指标',
  headline: ['数字，', '说话。'],
  intro: '下列为目标值，全部对应产品技术文档中的指标编号，可在技术规格一节逐条核对。',
  stats: [
    { value: '≥ 90', unit: '%', label: '术语提取准确率', code: 'FI-01' },
    { value: '≥ 98', unit: '%', label: '搜索成功率', code: 'FI-03' },
    { value: '≥ 95', unit: '%', label: '术语覆盖率', code: 'FI-02' },
    { value: '100', unit: '%', label: '模块完整性', code: 'FI-05' },
    { value: '100', unit: '%', label: '引用标注率', code: 'FI-09' },
    { value: '≥ 60', unit: '%', label: '近 3 年文献占比', code: 'QI-05' },
    { value: '≥ 95', unit: '%', label: '解释准确性', code: 'QI-01' },
    { value: '4.0', unit: '/ 5', label: '通俗性评分', code: 'QI-02' },
  ],
}

export const interfaces = {
  eyebrow: '接口',
  headline: ['一接上，', '全学科联通。'],
  intro: '17 个学科各有一条主隧道和一条备用隧道。主源取不到权威定义时，立刻换道，不空着回来。',
  ports: [
    { name: '术语在线', role: '中文术语主源', desc: '全学科术语的国标译名与定义。' },
    { name: 'Oxford Reference', role: '英文权威释义', desc: '跨人文学科的快速权威释义。' },
    { name: 'IEEE Xplore', role: '计算机 / 工程', desc: '论文级定义与研究进展。' },
    { name: 'SEP', role: '哲学 / 伦理学', desc: '概念的源流与争论脉络。' },
  ],
  fieldsTitle: '已接学科',
  fields: [
    '全学科 / 通用',
    '计算机 / AI',
    '数学',
    '物理',
    '化学',
    '生物 / 生命科学',
    '医学 / 药学',
    '经济学 / 金融学',
    '管理学',
    '心理学',
    '社会学 / 人类学',
    '政治学 / 国际关系',
    '哲学 / 伦理学',
    '法学 / 法律',
    '教育学',
    '新闻传播学',
    '环境科学',
  ],
}

export const trust = {
  eyebrow: '可信性',
  headline: ['不编，', '不容有失。'],
  intro:
    '一个解释工具最危险的不是答不上来，而是答得很像。所以它宁可标“未验证”，也不肯补一个看起来合理的链接。',
  items: [
    { title: '引用必标注', copy: '每条外部信息都带标题与链接，方便你回头核对。' },
    { title: '禁止编造 URL', copy: '搜不到就留空，不虚构来源，不假装读过。' },
    { title: '降级必说明', copy: '切换策略、简化公式、退回 Markdown，都会写明原因。' },
    { title: '临时文件即删', copy: '探测与导出的中间文件用后即删，不留垃圾。' },
  ],
}

export const upgrade = {
  eyebrow: '版本对比',
  headline: ['想升级，', '时机正正好。'],
  intro: '从 v1.0.0 到 v1.4.2，改变的不是功能数量，而是每次交付的可信程度。',
  columns: ['v1.0.0', 'v1.4.2（当前）'],
  rows: [
    { k: '联网搜索', a: '按需搜索', b: '每术语 ≥ 2 次，交叉验证' },
    { k: 'PDF 输出', a: '单一方案', b: 'L1 / L2 / L3 / L5 四级降级 + L4 旁路' },
    { k: '环境探测', a: '无', b: '真实试跑，缓存可失效' },
    { k: '复杂公式', a: '可能丢失', b: 'L3 副本机制，Markdown 保留完整 LaTeX' },
    { k: '学科路由', a: '信号词匹配', b: '17 学科 + 9 组歧义消解' },
    { k: '术语数量', a: '固定 5–10', b: '阈值驱动，3–10 可调，同义词合并' },
    { k: '递归澄清', a: '无', b: '深度 ≤ 2 层，独立成节' },
    { k: '边界处理', a: '少量', b: '20+ 场景总表' },
  ],
  note: '技术冲突以 v1.4.2 为准。',
}

export const team = {
  eyebrow: '参赛信息',
  headline: ['下次一定队，', '这次一定做完。'],
  intro: '一支把“看不懂”当成工程问题来解决的队伍。',
  cards: [
    { title: '参赛作品', copy: '学术术语解释器 · Academic Term Explainer', tag: '作品' },
    { title: '参赛团队', copy: '下次一定队', tag: '团队' },
    { title: '技术栈', copy: 'Agent 技能 + 联网检索 + Markdown/PDF 渲染链', tag: '技术' },
    { title: '开发周期', copy: '2026 年 7 月立项，10 月发布 v1.4.2', tag: '周期' },
    { title: '产品文档', copy: '产品技术文档 v2.0，含 15 项测试用例', tag: '文档' },
    { title: '演示材料', copy: '12 页作品演示稿与四张架构流程图', tag: '演示' },
    { title: '交付形态', copy: 'Markdown 主交付，PDF 可选，命名带时间戳', tag: '交付' },
    { title: '致谢', copy: '感谢评审老师与所有被术语绊住过的人', tag: '致谢' },
  ],
}

export const values = {
  eyebrow: '我们的价值观',
  headline: ['解释的底线，', '比解释本身更重要。'],
  items: [
    {
      title: '学术诚信',
      copy: '所有外部信息必须可回溯。宁可标注“未联网验证”，也不虚构一条参考文献。',
      link: '查看可信性承诺',
      href: '#trust',
    },
    {
      title: '可复现',
      copy: '同一段文本、同一份配置，跑出来的结构与模块选择一致，便于复核与教学演示。',
      link: '查看技术规格',
      href: '#metrics',
    },
    {
      title: '可解释',
      copy: '它解释术语，也解释自己：为什么选这个词、为什么走这条路由、为什么降级。',
      link: '查看工作流',
      href: '#design',
    },
  ],
}

export const indexSection = {
  headline: '学术阅读，本该如此。',
  links: [
    { title: '概览', items: ['能力一览', '工作流', '专业场景'] },
    { title: '引擎', items: ['术语提取 M1', '学科路由 M2', '联网搜索 M3', '模块拼装 M4'] },
    { title: '输出', items: ['递归澄清 M5', 'Markdown M6', 'PDF 降级链 M7', '环境探测 M8'] },
    { title: '关于', items: ['技术规格', '版本对比', '参赛团队'] },
  ],
}

export const footnotes = [
  '本页所有指标均为《学术术语解释器 · 产品技术文档 v2.0》中定义的目标值（FI / PI / QI 编号），非实测结果，实际表现依网络与运行环境而有所差异。',
  '术语提取准确率 ≥ 90% 为人工评估目标值，评估口径见文档 7.1 节 FI-01。',
  'PDF 四级降级链为 L1 → L2 → L3 → L5；L4（Marp）为幻灯片旁路，不参与主链探测。',
  '页面设计版式参考 Apple 产品页的公开排版规范，仅用于竞赛展示，与 Apple Inc. 无隶属关系。',
]

export const footer = {
  note: '本站为「下次一定队」参赛作品的产品介绍页。',
  columns: [
    { title: '产品', items: ['能力', '工作流', '技术规格', '版本对比'] },
    { title: '文档', items: ['产品技术文档 v2.0', '作品演示稿', '架构图', '测试用例'] },
    { title: '团队', items: ['下次一定队', '参赛信息', '致谢', '联系'] },
  ],
  legal: [
    'Copyright © 2026 下次一定队. 保留所有权利。',
    '学术术语解释器 · Academic Term Explainer',
  ],
}
