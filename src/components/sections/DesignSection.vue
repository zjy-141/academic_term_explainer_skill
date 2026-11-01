<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { design } from '../../data/content'
import TypeLockup from '../ui/TypeLockup.vue'

const active = ref(0)
const panels = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

const setPanel = (el: Element | null, index: number) => {
  if (el instanceof HTMLElement) panels.value[index] = el
}

const jumpTo = (index: number) => {
  panels.value[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number((entry.target as HTMLElement).dataset.index || 0)
          active.value = idx
        }
      })
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
  )
  panels.value.forEach((el) => el && observer?.observe(el))
})

onBeforeUnmount(() => observer?.disconnect())

const steps = [
  { k: 'M1', name: '术语提取', note: '五维评分' },
  { k: 'M2', name: '学科路由', note: '9 组消歧' },
  { k: 'M3', name: '联网检索', note: '≥ 2 次' },
  { k: 'M4', name: '模块拼装', note: 'A–F' },
]
</script>

<template>
  <section id="workflow" class="section design theme-dark" aria-label="工作流">
    <div class="viewport-content">
      <TypeLockup :eyebrow="design.eyebrow" :lines="design.headline" :intro="design.intro" size="xl" />
    </div>

    <div class="viewport-content design__viewer">
      <div class="design__stage" aria-hidden="true">
        <div class="stage">
          <div class="stage__glow"></div>

          <!-- 输入 -->
          <div class="stage__pane" :class="{ 'is-active': active === 0 }">
            <div class="pane-head">
              <span class="pane-head__label mono">输入</span>
              <span class="pane-head__meta">纯文本 / Markdown / 术语列表</span>
            </div>
            <div class="composer">
              <p class="composer__text">
                在临床决策支持系统（CDSS）的部署过程中，<span class="mark">算法透明度</span>成为医患双方关注的焦点。然而，过度披露模型细节可能引发<span class="mark">认知过载</span>，反而削弱患者对算法决策的信任。
              </p>
              <div class="composer__bar">
                <span class="composer__caret"></span>
                <span>帮我解释这段里的专业术语</span>
              </div>
              <div class="composer__chips">
                <span class="chip">输出 PDF</span>
                <span class="chip">只解释最重要的 3 个</span>
                <span class="chip chip--ghost">连带解释子概念</span>
              </div>
            </div>
          </div>

          <!-- 处理 -->
          <div class="stage__pane" :class="{ 'is-active': active === 1 }">
            <div class="pane-head">
              <span class="pane-head__label mono">处理中</span>
              <span class="pane-head__meta">算法透明度 · 2 个术语</span>
            </div>
            <ul class="pipeline">
              <li v-for="(step, i) in steps" :key="step.k" class="pipeline__item" :style="{ '--d': i * 0.12 + 's' }">
                <span class="pipeline__k mono">{{ step.k }}</span>
                <span class="pipeline__name">{{ step.name }}</span>
                <span class="pipeline__note">{{ step.note }}</span>
                <span class="pipeline__check" aria-hidden="true">✓</span>
              </li>
            </ul>
            <div class="pipeline__log mono">
              <span>[INFO] 学科路由 “算法透明度” → 计算机/AI (IEEE)</span>
              <span>[INFO] 搜索 L1 完成（termonline.cn）</span>
              <span>[INFO] 搜索 L3 完成（ieeexplore.ieee.org）</span>
            </div>
          </div>

          <!-- 输出 -->
          <div class="stage__pane is-center" :class="{ 'is-active': active === 2 }">
            <div class="pane-head">
              <span class="pane-head__label mono">输出</span>
              <span class="pane-head__meta">academic_terms_ai-medical-ethics_20261015-1430.md</span>
            </div>
            <div class="doc">
              <h4 class="doc__title">学术术语解释</h4>
              <p class="doc__meta">原文摘要：讨论临床决策支持系统在部署中面临的伦理挑战 · 共 2 个术语</p>
              <div class="doc__entry">
                <p class="doc__h">【1】Algorithmic Transparency（算法透明度）</p>
                <p class="doc__p"><strong>通俗定义</strong> 算法透明度是指 AI 系统的决策过程可以被人类理解和追溯的程度。</p>
                <p class="doc__p"><strong>相关概念</strong> 可解释人工智能（XAI）· 知情同意（Informed Consent）</p>
              </div>
              <div class="doc__entry">
                <p class="doc__h">【2】Cognitive Overload（认知过载）</p>
                <p class="doc__p"><strong>通俗定义</strong> 人脑接收的信息量超过处理能力，导致无法有效理解与决策。</p>
              </div>
              <div class="doc__files">
                <span class="file"><i>MD</i>.md</span>
                <span class="file"><i>PDF</i>.pdf · L1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="design__panels">
        <article
          v-for="(scene, i) in design.scenes"
          :key="scene.label"
          :ref="(el) => setPanel(el as Element | null, i)"
          :data-index="i"
          class="panel"
          :class="{ 'is-active': active === i }"
        >
          <button type="button" class="panel__label mono" @click="jumpTo(i)">
            0{{ i + 1 }} · {{ scene.label }}
          </button>
          <h3 class="panel__title type-subhead">{{ scene.title }}</h3>
          <p class="panel__copy">{{ scene.copy }}</p>
          <button class="panel__dot" type="button" :aria-label="`跳到${scene.label}`" @click="jumpTo(i)"></button>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.design {
  background: linear-gradient(180deg, #000 0%, #050506 40%, #000 100%);
}

.design__viewer {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  gap: 64px;
  align-items: start;
  margin-top: 72px;
}

.design__stage {
  position: sticky;
  top: calc(var(--localnav-height) + 40px);
  height: min(72vh, 640px);
}

.stage {
  position: relative;
  height: 100%;
  border-radius: var(--radius-card);
  background: linear-gradient(165deg, #1b1b1e 0%, #101012 45%, #08080a 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    0 50px 100px -60px rgba(0, 0, 0, 0.95);
  overflow: hidden;
}

.stage__glow {
  position: absolute;
  inset: -30% -10% auto;
  height: 60%;
  background: radial-gradient(circle at 30% 10%, rgba(41, 151, 255, 0.35), transparent 65%),
    radial-gradient(circle at 80% 0%, rgba(147, 90, 255, 0.28), transparent 60%);
  filter: blur(40px);
  pointer-events: none;
}

.stage__pane {
  position: absolute;
  inset: 0;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  opacity: 0;
  transform: translateY(14px) scale(0.99);
  transition:
    opacity 0.55s var(--ease-out),
    transform 0.55s var(--ease-out);
  pointer-events: none;
}

.stage__pane.is-active {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.stage__pane.is-center {
  justify-content: center;
}

.pane-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.pane-head__label {
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--glyph-secondary);
}

.pane-head__meta {
  font-size: 11px;
  color: var(--glyph-tertiary);
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 输入 */
.composer {
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
}

.composer__text {
  font-size: 17px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.86);
}

.mark {
  color: #fff;
  background: linear-gradient(180deg, transparent 62%, rgba(41, 151, 255, 0.5) 62%);
  border-radius: 2px;
  padding: 0 1px;
}

.composer__bar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: auto;
  padding: 14px 16px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.composer__caret {
  width: 1.5px;
  height: 16px;
  background: var(--link-dark);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.composer__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  font-size: 12px;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.82);
}

.chip--ghost {
  background: transparent;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  color: var(--glyph-secondary);
}

/* 处理 */
.pipeline {
  display: grid;
  gap: 10px;
}

.pipeline__item {
  display: grid;
  grid-template-columns: 46px 1fr auto 20px;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  font-size: 14px;
}

.pipeline__item:nth-child(2) {
  background: rgba(41, 151, 255, 0.16);
  box-shadow: inset 0 0 0 1px rgba(41, 151, 255, 0.4);
}

.pipeline__k {
  font-size: 11px;
  color: var(--glyph-secondary);
}

.pipeline__name {
  color: #fff;
}

.pipeline__note {
  font-size: 12px;
  color: var(--glyph-secondary);
}

.pipeline__check {
  color: #34c759;
  font-size: 12px;
}

.pipeline__log {
  margin-top: auto;
  display: grid;
  gap: 6px;
  font-size: 11px;
  line-height: 1.5;
  color: var(--glyph-tertiary);
}

/* 输出 */
.doc {
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.96);
  color: #1d1d1f;
  padding: 22px 24px;
  display: grid;
  gap: 12px;
  overflow: hidden;
}

.doc__title {
  font-family: var(--font-display);
  font-size: 21px;
  font-weight: 600;
  letter-spacing: 0.011em;
}

.doc__meta {
  font-size: 11px;
  color: #6e6e73;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.doc__entry {
  display: grid;
  gap: 6px;
}

.doc__h {
  font-size: 13px;
  font-weight: 600;
}

.doc__p {
  font-size: 12px;
  line-height: 1.5;
  color: #424245;
}

.doc__p strong {
  color: #1d1d1f;
  font-weight: 600;
}

.doc__files {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.file {
  font-size: 11px;
  font-family: var(--font-mono);
  padding: 5px 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.06);
  color: #424245;
}

.file i {
  font-style: normal;
  font-weight: 600;
  margin-right: 4px;
  color: #0071e3;
}

/* 右侧文案 */
.design__panels {
  display: grid;
  gap: 0;
}

.panel {
  min-height: 62vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  padding: 40px 0;
  opacity: 0.48;
  transition: opacity 0.5s var(--ease-out);
  position: relative;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.panel:first-child {
  border-top: 0;
}

.panel.is-active {
  opacity: 1;
}

.panel__label {
  align-self: flex-start;
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--glyph-secondary);
  text-transform: uppercase;
}

.panel__title {
  color: var(--glyph);
}

.panel__copy {
  font-size: 17px;
  line-height: 1.6;
  letter-spacing: -0.016em;
  color: var(--glyph-secondary);
  max-width: 46ch;
}

.panel__dot {
  position: absolute;
  left: -34px;
  top: 50%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.24);
  transition: background-color var(--dur-base) var(--ease-out);
}

.panel.is-active .panel__dot {
  background: var(--link-dark);
  box-shadow: 0 0 0 4px rgba(41, 151, 255, 0.2);
}

@media (max-width: 1068px) {
  .design__viewer {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-top: 48px;
  }
  .design__stage {
    position: sticky;
    top: 12px;
    height: 56vh;
    z-index: 2;
  }
  .stage__pane {
    padding: 20px;
  }
  .panel {
    min-height: 56vh;
    padding: 28px 0;
  }
  .panel__dot {
    display: none;
  }
}

@media (max-width: 734px) {
  .design__stage {
    height: 58vh;
  }
  .panel {
    min-height: 48vh;
  }
  .composer__text {
    font-size: 15px;
  }
  .pipeline__item {
    grid-template-columns: 38px 1fr auto;
    font-size: 13px;
  }
  .pipeline__check {
    display: none;
  }
  .pipeline__log {
    display: none;
  }
}
</style>
