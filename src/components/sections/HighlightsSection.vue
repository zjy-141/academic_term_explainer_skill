<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { highlights } from '../../data/content'
import { prefersReducedMotion } from '../../composables/useSiteMotion'

const root = ref<HTMLElement | null>(null)
const rail = ref<HTMLElement | null>(null)
const atStart = ref(true)
const atEnd = ref(false)

const scrollByCard = (dir: 1 | -1) => {
  const el = rail.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.hl-card')
  const step = card ? card.offsetWidth + 20 : 360
  el.scrollBy({ left: step * dir, behavior: 'smooth' })
}

let railRaf = 0
const syncRailState = () => {
  railRaf = 0
  const el = rail.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}
const onRailScroll = () => {
  if (railRaf) return
  railRaf = requestAnimationFrame(syncRailState)
}

let ctx: gsap.Context | null = null
let cleanups: (() => void)[] = []

const teardown = () => {
  cleanups.forEach((fn) => fn())
  cleanups = []
  ctx?.revert()
  ctx = null
}

const setupMotion = () => {
  teardown()
  if (!root.value) return
  const reduce = prefersReducedMotion()

  ctx = gsap.context(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.hl-card')

    cards.forEach((card, i) => {
      const art = card.querySelector<HTMLElement>('.hl-card__art')
      const svg = card.querySelector<SVGSVGElement>('.hl-card__art svg')
      const rings = card.querySelectorAll<SVGElement>('.hl-card__art circle')
      const accent = card.querySelector<SVGElement>('.hl-card__art .accent')
      const ticks = card.querySelector<SVGElement>('.hl-card__art path')
      const glow = card.querySelector<HTMLElement>('.hl-card__glow')
      if (!art || !svg) return

      const base = i * 24
      gsap.set(art, { rotation: base, scale: 1, transformOrigin: '50% 50%' })

      // 常驻的缓慢自转：让卡片“活着”，不是静止占位
      let spin: gsap.core.Tween | null = null
      let pulse: gsap.core.Tween | null = null
      if (!reduce) {
        spin = gsap.to(art, {
          rotation: base + 360,
          duration: 64 + i * 6,
          ease: 'none',
          repeat: -1,
        })
        // 虚线环反向微转，形成两层错位
        gsap.to(rings[0] ?? art, {
          rotation: -360,
          transformOrigin: '50% 50%',
          duration: 120,
          ease: 'none',
          repeat: -1,
        })
      }

      const onEnter = () => {
        // 悬停：旋转加速 + 放大 + 高亮 + 核心脉冲，全部由 GSAP 插值
        if (spin) gsap.to(spin, { timeScale: 3.4, duration: 1, ease: 'power2.out' })
        gsap.to(art, { scale: 1.07, duration: 0.8, ease: 'power3.out' })
        gsap.to(svg, { color: 'rgba(255,255,255,0.72)', duration: 0.7, ease: 'power2.out' })
        if (accent) {
          gsap.to(accent, { stroke: '#64d2ff', duration: 0.7, ease: 'power2.out' })
          pulse ??= gsap.to(accent, {
            scale: 1.28,
            transformOrigin: '50% 50%',
            duration: 1.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
          pulse.play()
        }
        if (ticks) gsap.to(ticks, { scale: 1.1, transformOrigin: '50% 50%', duration: 0.8, ease: 'power2.out' })
        if (glow) gsap.to(glow, { opacity: 1, duration: 0.8, ease: 'power2.out' })
        gsap.to(card, { y: -6, duration: 0.6, ease: 'power2.out' })
      }

      const onLeave = () => {
        if (spin) gsap.to(spin, { timeScale: 1, duration: 1.4, ease: 'power2.inOut' })
        gsap.to(art, { scale: 1, duration: 1, ease: 'power3.inOut' })
        gsap.to(svg, { color: 'rgba(255,255,255,0.4)', duration: 0.9, ease: 'power2.inOut' })
        if (accent) {
          gsap.to(accent, { stroke: '#2997ff', duration: 1, ease: 'power2.inOut' })
          pulse?.pause()
          gsap.to(accent, { scale: 1, duration: 0.6, ease: 'power2.out' })
        }
        if (ticks) gsap.to(ticks, { scale: 1, duration: 1, ease: 'power2.inOut' })
        if (glow) gsap.to(glow, { opacity: 0.7, duration: 1, ease: 'power2.inOut' })
        gsap.to(card, { y: 0, duration: 0.8, ease: 'power2.inOut' })
      }

      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointerleave', onLeave)
      card.addEventListener('focusin', onEnter)
      card.addEventListener('focusout', onLeave)
      cleanups.push(() => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointerleave', onLeave)
        card.removeEventListener('focusin', onEnter)
        card.removeEventListener('focusout', onLeave)
      })
    })
  }, root.value)
}

onMounted(() => {
  syncRailState()
  rail.value?.addEventListener('scroll', onRailScroll, { passive: true })
  window.addEventListener('resize', onRailScroll, { passive: true })
  window.addEventListener('atm:motion', setupMotion)
  setupMotion()
})

onBeforeUnmount(() => {
  teardown()
  rail.value?.removeEventListener('scroll', onRailScroll)
  window.removeEventListener('resize', onRailScroll)
  window.removeEventListener('atm:motion', setupMotion)
  if (railRaf) cancelAnimationFrame(railRaf)
})
</script>

<template>
  <section ref="root" id="highlights" class="section highlights theme-dark" aria-labelledby="highlights-title">
    <div class="viewport-content">
      <header class="highlights__head" data-stagger>
        <h2 id="highlights-title" class="highlights__headline type-headline" data-stagger-item>
          {{ highlights.eyebrow }}
        </h2>

        <div class="highlights__controls" data-stagger-item>
          <a class="link-inline" href="#design">
            {{ highlights.film }}
            <span class="chevron" aria-hidden="true">›</span>
          </a>
        </div>
      </header>
    </div>

    <div class="highlights__rail-wrap">
      <ul ref="rail" class="highlights__rail" tabindex="0" aria-label="能力卡片，可横向滚动">
        <li v-for="item in highlights.items" :key="item.title" class="hl-card glass-card">
          <span class="hl-card__index mono">{{ item.index }}</span>
          <div class="hl-card__glow" aria-hidden="true"></div>
          <div class="hl-card__art" aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="46" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="3 7" />
              <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" stroke-width="1" />
              <circle cx="60" cy="60" r="13" fill="none" stroke="currentColor" stroke-width="1.4" class="accent" />
              <path d="M60 2v14M60 104v14M2 60h14M104 60h14" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
            </svg>
          </div>
          <div class="hl-card__body">
            <h3 class="hl-card__title">{{ item.title }}</h3>
            <p class="hl-card__line">{{ item.line }}</p>
            <p class="hl-card__detail">{{ item.detail }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="viewport-content highlights__foot">
      <p class="highlights__footnote">
        七张卡片对应七个能力，点开 <a class="link-inline" href="#extraction">引擎</a> 一节可以逐条看实现。
      </p>

      <div class="highlights__nav">
        <button type="button" aria-label="上一张" :disabled="atStart" @click="scrollByCard(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.5 5 7.5 12l7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button type="button" aria-label="下一张" :disabled="atEnd" @click="scrollByCard(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.5 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.highlights {
  background: var(--bg-dark);
}

/* 区块头：标题左、演示链接右 */
.highlights__head {
  display: flex;
  flex-wrap: wrap;
  align-items: last baseline;
  justify-content: space-between;
  column-gap: 48px;
  row-gap: 16px;
  margin-bottom: 48px;
}

.highlights__headline {
  margin: 0;
}

.highlights__controls {
  display: flex;
  align-items: center;
  gap: 22px;
  font-size: 17px;
  line-height: 1.2353641176;
}

/* 画廊下方一行：左侧说明，右侧翻页按钮 */
.highlights__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 4px;
}

.highlights__nav {
  display: flex;
  gap: 10px;
  flex: none;
}

.highlights__nav button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.82);
  transition:
    background-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out),
    transform var(--dur-fast) var(--ease-out);
}

.highlights__nav button:hover {
  background: rgba(255, 255, 255, 0.24);
  color: #fff;
}

.highlights__nav button:disabled {
  opacity: 0.28;
  cursor: default;
  pointer-events: none;
}

.highlights__nav button:active {
  transform: scale(0.94);
}

.highlights__nav svg {
  width: 18px;
  height: 18px;
}

.highlights__rail-wrap {
  position: relative;
}

.highlights__rail {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  /* proximity 而非 mandatory：避免平滑滚动与强制吸附互相拉扯 */
  scroll-snap-type: x proximity;
  scroll-behavior: smooth;
  padding: 8px max(6.25vw, calc((100vw - var(--content-max-width)) / 2)) 32px;
  scrollbar-width: none;
}

.highlights__rail::-webkit-scrollbar {
  display: none;
}

.hl-card {
  flex: 0 0 auto;
  width: 400px;
  height: 520px;
  scroll-snap-align: center;
  border-radius: var(--radius-card);
  padding: 34px;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
}

.hl-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.5;
  mask-image: linear-gradient(180deg, #000 0%, transparent 72%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 72%);
}

/* 动效由 GSAP 接管：这里只给初始状态，避免 CSS 过渡与 GSAP 抢同一属性 */
.hl-card__art {
  margin-top: 26px;
  color: rgba(255, 255, 255, 0.4);
  transform-origin: 50% 50%;
  will-change: transform;
}

.hl-card__art svg {
  width: 148px;
  height: 148px;
  display: block;
}

.hl-card__art .accent {
  stroke: var(--link-dark);
}

.hl-card__glow {
  position: absolute;
  inset: auto -30% -40% -30%;
  height: 70%;
  background: radial-gradient(circle at 50% 100%, rgba(41, 151, 255, 0.32), transparent 70%);
  filter: blur(30px);
  opacity: 0.7;
  z-index: -1;
  transition: opacity var(--dur-slow) var(--ease-out);
}

.hl-card:nth-child(3n + 2) .hl-card__glow {
  background: radial-gradient(circle at 50% 100%, rgba(147, 90, 255, 0.3), transparent 70%);
}

.hl-card:nth-child(3n + 3) .hl-card__glow {
  background: radial-gradient(circle at 50% 100%, rgba(0, 210, 190, 0.24), transparent 70%);
}

.hl-card__index {
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--glyph-tertiary);
}

.hl-card__body {
  margin-top: auto;
  display: grid;
  gap: 12px;
}

.hl-card__title {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1.1428571429;
  font-weight: 600;
  letter-spacing: 0.007em;
}

.hl-card__line {
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1.381002381;
  font-weight: 600;
  letter-spacing: 0.011em;
  color: var(--glyph-alt);
}

.hl-card__detail {
  font-size: 14px;
  line-height: 1.42859;
  letter-spacing: -0.016em;
  color: var(--glyph-secondary);
}

.highlights__footnote {
  font-size: 12px;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .highlights__head {
    margin-bottom: 40px;
  }
  .hl-card {
    width: 320px;
    height: 440px;
    padding: 26px;
  }
  .hl-card__art svg {
    width: 120px;
    height: 120px;
  }
  .hl-card__title {
    font-size: 24px;
  }
  .hl-card__line {
    font-size: 19px;
  }
}

@media (max-width: 734px) {
  .highlights__controls {
    font-size: 14px;
    gap: 16px;
  }
  .highlights__foot {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }
  .highlights__nav {
    align-self: flex-end;
  }
  .hl-card {
    width: 78vw;
    height: 400px;
    padding: 22px;
  }
  .hl-card__title {
    font-size: 21px;
  }
  .hl-card__line {
    font-size: 17px;
  }
}
</style>
