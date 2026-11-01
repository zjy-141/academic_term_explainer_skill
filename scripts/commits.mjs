/**
 * 按步骤提交（避免 PowerShell 中文编码问题）
 * 用法: node scripts/commits.mjs
 */
import { execFileSync } from 'node:child_process'

const run = (args) => {
  try {
    const out = execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
    return out.trim()
  } catch (err) {
    const msg = (err.stdout || '') + (err.stderr || '')
    if (msg.includes('nothing to commit') || msg.includes('no changes added')) return 'SKIP'
    throw new Error(`git ${args.join(' ')} failed:\n${msg}`)
  }
}

const steps = [
  {
    msg: 'feat: 初始化 Vue3 + TS + Vite + GSAP 工程骨架',
    files: [
      'package.json',
      'pnpm-workspace.yaml',
      'pnpm-lock.yaml',
      'vite.config.ts',
      'tsconfig.json',
      '.gitignore',
      'scripts/shot.mjs',
      'scripts/shots-sections.mjs',
      'scripts/commits.mjs',
    ],
  },
  {
    msg: 'feat: 建立仿参考页的设计令牌与全局排版样式',
    files: ['src/styles/tokens.css', 'src/styles/base.css', 'src/styles/utilities.css'],
  },
  {
    msg: 'feat: 集中管理全站文案与产品数据',
    files: ['src/data/content.ts'],
  },
  {
    msg: 'feat: 注册 GSAP 滚动动效与粘性场景组合式函数',
    files: ['src/composables/useSiteMotion.ts', 'src/composables/useSceneProgress.ts'],
  },
  {
    msg: 'feat: 全局导航、局部导航与页面骨架',
    files: ['index.html', 'src/main.ts', 'src/components/layout/GlobalNav.vue', 'src/App.vue'],
  },
  {
    msg: 'feat: 局部导航随浅色区块切换主题，并补充页脚',
    files: ['src/components/layout/LocalNav.vue', 'src/components/layout/SiteFooter.vue'],
  },
  {
    msg: 'feat: Hero 首屏、产品视窗场景与字标组件',
    files: [
      'src/components/sections/HeroSection.vue',
      'src/components/sections/HeroScene.vue',
      'src/components/ui/TypeLockup.vue',
      'src/components/ui/SectionHeader.vue',
    ],
  },
  {
    msg: 'feat: 先刷重点横向卡片画廊',
    files: ['src/components/sections/HighlightsSection.vue'],
  },
  {
    msg: 'feat: 设计区块的粘性产品视窗',
    files: ['src/components/sections/DesignSection.vue', 'src/components/ui/StorySection.vue'],
  },
  {
    msg: 'feat: 术语提取与学科路由区块',
    files: ['src/components/sections/ExtractionSection.vue', 'src/components/sections/RoutingSection.vue'],
  },
  {
    msg: 'feat: 联网搜索与模块拼装区块',
    files: ['src/components/sections/SearchSection.vue', 'src/components/sections/AssemblySection.vue'],
  },
  {
    msg: 'feat: 递归澄清与输出降级链区块',
    files: ['src/components/sections/RecursionSection.vue', 'src/components/sections/ReliabilitySection.vue'],
  },
  {
    msg: 'feat: 专业场景画廊与指标区块',
    files: ['src/components/sections/WorkflowsSection.vue', 'src/components/sections/MetricsSection.vue'],
  },
  {
    msg: 'feat: 学科接口与可信性区块',
    files: ['src/components/sections/InterfacesSection.vue', 'src/components/sections/TrustSection.vue'],
  },
  {
    msg: 'feat: 版本对比、参赛团队、价值观与结尾索引区块',
    files: [
      'src/components/sections/UpgradeSection.vue',
      'src/components/sections/TeamSection.vue',
      'src/components/sections/ValuesSection.vue',
      'src/components/sections/IndexSection.vue',
    ],
  },
  {
    msg: 'feat: 提交实施规划文档',
    files: ['PLAN.md'],
  },
]

run(['add', '-A'])

for (const step of steps) {
  const addable = step.files.filter((f) => {
    try {
      run(['add', '--', f])
      return true
    } catch {
      return false
    }
  })
  if (!addable.length) continue
  // 只提交本步骤涉及的文件
  const staged = run(['diff', '--cached', '--name-only']).split('\n').filter(Boolean)
  const keep = staged.filter((f) => step.files.includes(f))
  if (!keep.length) {
    console.log('skip (already committed):', step.msg)
    continue
  }
  const res = execFileSync('git', ['commit', '-F', '-', '--', ...keep], {
    input: step.msg,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  })
  console.log('✓', step.msg.trim(), '|', keep.length, 'file(s)')
}

const status = run(['status', '--short'])
console.log(status ? 'REMAINING:\n' + status : 'working tree clean')
const log = run(['log', '--oneline'])
console.log('\n' + log)
