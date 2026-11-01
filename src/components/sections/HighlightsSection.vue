<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { highlights } from '../../data/content'
import { prefersReducedMotion } from '../../composables/useSiteMotion'
import HighlightGlyph from '../ui/HighlightGlyph.vue'

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
      const ring = card.querySelector<SVGElement>('.glyph__ring')
      const accents = card.querySelectorAll<SVGElement>('.glyph__accent')
      const scan = card.querySelector<SVGElement>('.glyph__scan')
      const glow = card.querySelector<HTMLElement>('.hl-card__glow')
      if (!art || !svg) return

      gsap.set(art, { scale: 1 })

      // 每张卡片常驻一种轻微动效：外环自转 / 扫描线往返
      let spin: gsap.core.Tween | null = null
      let pulse: gsap.core.Tween | null = null
      if (!reduce) {
        if (ring) {
          spin = gsap.to(ring, {
            rotation: i % 2 === 0 ? -360 : 360,
            svgOrigin: '60 60',
            duration: 70 + i * 9,
            ease: 'none',
            repeat: -1,
          })
        }
        if (scan) {
          gsap.fromTo(
            scan,
            { y: -20 },
            { y: 26, duration: 2.6, ease: 'sine.inOut', repeat: -1, yoyo: true },
          )
        }
      }

      const onEnter = () => {
        // 悬停：外环加速、图形放大、强调元素脉冲，全部由 GSAP 插值
        if (spin) gsap.to(spin, { timeScale: 3.6, duration: 1, ease: 'power2.out' })
        gsap.to(art, { scale: 1.06, duration: 0.8, ease: 'power3.out' })
        gsap.to(svg, { color: 'rgba(255,255,255,0.76)', duration: 0.7, ease: 'power2.out' })
        if (accents.length) {
          gsap.to(accents, { stroke: '#64d2ff', duration: 0.7, ease: 'power2.out' })
          pulse ??= gsap.to(accents, {
            scale: 1.22,
            transformOrigin: '50% 50%',
            duration: 1.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
          pulse.play()
        }
        if (scan) gsap.to(scan, { opacity: 1, duration: 0.4 })
        if (glow) gsap.to(glow, { opacity: 1, duration: 0.8, ease: 'power2.out' })
        gsap.to(card, { y: -6, duration: 0.6, ease: 'power2.out' })
      }

      const onLeave = () => {
        if (spin) gsap.to(spin, { timeScale: 1, duration: 1.4, ease: 'power2.inOut' })
        gsap.to(art, { scale: 1, duration: 1, ease: 'power3.inOut' })
        gsap.to(svg, { color: 'rgba(255,255,255,0.42)', duration: 0.9, ease: 'power2.inOut' })
        if (accents.length) {
          gsap.to(accents, { stroke: '#2997ff', duration: 1, ease: 'power2.inOut' })
          pulse?.pause()
          gsap.to(accents, { scale: 1, duration: 0.6, ease: 'power2.out' })
        }
        if (scan) gsap.to(scan, { opacity: 0.75, duration: 0.4 })
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
            <HighlightGlyph :name="item.glyph" />
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
  margin: 10px auto 0;
  width: 196px;
  color: rgba(255, 255, 255, 0.42);
  transform-origin: 50% 50%;
  will-change: transform;
}

.hl-card__art svg {
  width: 100%;
  height: auto;
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
  /* 固定两行高度，让各卡片标题在不同图注长度下仍能对齐 */
  min-height: 2.86em;
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
  .hl-card__art {
    width: 150px;
    margin-top: 8px;
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
