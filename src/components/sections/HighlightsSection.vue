<script setup lang="ts">
import { ref } from 'vue'
import { highlights } from '../../data/content'
import SectionHeader from '../ui/SectionHeader.vue'

const rail = ref<HTMLElement | null>(null)

const scrollByCard = (dir: 1 | -1) => {
  const el = rail.value
  if (!el) return
  const card = el.querySelector<HTMLElement>('.hl-card')
  const step = card ? card.offsetWidth + 20 : 360
  el.scrollBy({ left: step * dir, behavior: 'smooth' })
}
</script>

<template>
  <section id="highlights" class="section highlights theme-dark" aria-labelledby="highlights-title">
    <div class="viewport-content">
      <SectionHeader
        id="highlights-title"
        :headline="highlights.eyebrow"
        :links="[{ label: highlights.film, href: '#design' }]"
      />
    </div>

    <div class="highlights__rail-wrap">
      <ul ref="rail" class="highlights__rail" tabindex="0" aria-label="能力卡片，可横向滚动">
        <li v-for="(item, i) in highlights.items" :key="item.title" class="hl-card glass-card" :style="{ '--rot': i * 24 + 'deg' }">
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

      <div class="highlights__nav">
        <button type="button" aria-label="上一张" @click="scrollByCard(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M14.5 5 7.5 12l7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button type="button" aria-label="下一张" @click="scrollByCard(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9.5 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>

    <div class="viewport-content">
      <p class="highlights__footnote">
        七张卡片对应七个能力，点开 <a class="link-inline" href="#extraction">引擎</a> 一节可以逐条看实现。
      </p>
    </div>
  </section>
</template>

<style scoped>
.highlights {
  background: var(--bg-dark);
}

.highlights__rail-wrap {
  position: relative;
}

.highlights__rail {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
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

.hl-card__art {
  margin-top: 26px;
  color: rgba(255, 255, 255, 0.4);
  transform: rotate(var(--rot, 0deg));
  transition: transform var(--dur-slow) var(--ease-out);
}

.hl-card__art svg {
  width: 148px;
  height: 148px;
}

.hl-card__art .accent {
  color: var(--link-dark);
  stroke: var(--link-dark);
}

.hl-card:hover .hl-card__art {
  transform: rotate(calc(var(--rot, 0deg) + 30deg));
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

.hl-card:hover .hl-card__glow {
  opacity: 1;
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

.highlights__nav {
  position: absolute;
  right: max(6.25vw, calc((100vw - var(--content-max-width)) / 2));
  bottom: 44px;
  display: flex;
  gap: 10px;
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
    color var(--dur-fast) var(--ease-out);
}

.highlights__nav button:hover {
  background: rgba(255, 255, 255, 0.24);
  color: #fff;
}

.highlights__nav svg {
  width: 18px;
  height: 18px;
}

.highlights__footnote {
  margin-top: 8px;
  font-size: 12px;
  line-height: 1.4;
  letter-spacing: -0.01em;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .hl-card {
    width: 320px;
    height: 440px;
    padding: 26px;
  }
  .hl-card__title {
    font-size: 24px;
  }
  .hl-card__line {
    font-size: 19px;
  }
}

@media (max-width: 734px) {
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
  .highlights__nav {
    display: none;
  }
}
</style>
