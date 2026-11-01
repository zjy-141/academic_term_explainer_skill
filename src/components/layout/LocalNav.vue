<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { nav, site } from '../../data/content'

const stuck = ref(false)
const isLight = ref(false)

let lightStart: HTMLElement | null = null
let raf = 0

const measure = () => {
  raf = 0
  stuck.value = window.scrollY > 44
  if (lightStart) {
    isLight.value = lightStart.getBoundingClientRect().top <= 120
  }
}

const onScroll = () => {
  if (raf) return
  raf = requestAnimationFrame(measure)
}

onMounted(() => {
  lightStart = document.querySelector('#upgrade')
  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="localnav" :class="{ 'is-stuck': stuck, 'is-light': isLight }">
    <div class="localnav__inner">
      <a class="localnav__title" href="#hero">
        {{ site.brand }}
        <span class="localnav__badge mono">{{ site.version }}</span>
      </a>

      <nav class="localnav__links" aria-label="页面导航">
        <a v-for="item in nav.local" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <a class="localnav__cta" :href="nav.cta.href">{{ nav.cta.label }}</a>
    </div>
  </div>
</template>

<style scoped>
.localnav {
  position: sticky;
  top: var(--globalnav-height);
  z-index: 8000;
  height: var(--localnav-height);
  background: rgba(22, 22, 23, 0.72);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  color: var(--glyph);
  transition:
    background-color var(--dur-base) var(--ease-out),
    color var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out);
}

.localnav.is-stuck {
  background: rgba(22, 22, 23, 0.9);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.1);
}

.localnav.is-light {
  background: rgba(250, 250, 252, 0.82);
  color: var(--glyph-light);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

.localnav__inner {
  width: var(--content-width);
  max-width: var(--content-max-width);
  margin-inline: auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
}

.localnav__title {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0.011em;
  white-space: nowrap;
}

.localnav__badge {
  font-size: 11px;
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.12);
  color: var(--glyph-alt);
  letter-spacing: 0.02em;
}

.is-light .localnav__badge {
  background: rgba(0, 0, 0, 0.06);
  color: var(--glyph-light-secondary);
}

.localnav__links {
  display: flex;
  align-items: center;
  gap: 26px;
  margin-left: auto;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.72);
}

.is-light .localnav__links {
  color: rgba(0, 0, 0, 0.7);
}

.localnav__links a {
  transition: color var(--dur-fast) var(--ease-out);
}

.localnav__links a:hover {
  color: #fff;
}

.is-light .localnav__links a:hover {
  color: #000;
}

.localnav__cta {
  font-size: 12px;
  line-height: 1;
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  background: var(--button-bg);
  color: #fff;
  transition: background-color var(--dur-fast) var(--ease-out);
}

.localnav__cta:hover {
  background: var(--button-bg-hover);
}

@media (max-width: 1068px) {
  .localnav__title {
    font-size: 19px;
  }
  .localnav__links {
    gap: 18px;
  }
}

@media (max-width: 734px) {
  .localnav__title {
    font-size: 17px;
  }
  .localnav__links {
    display: none;
  }
  .localnav__cta {
    margin-left: auto;
  }
}
</style>
