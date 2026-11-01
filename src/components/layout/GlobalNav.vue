<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { nav, site } from '../../data/content'

const menuOpen = ref(false)
const scrolled = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const closeMenu = () => (menuOpen.value = false)
</script>

<template>
  <header class="globalnav" :class="{ 'is-scrolled': scrolled }">
    <div class="globalnav__inner">
      <a class="globalnav__brand" href="#hero" @click="closeMenu">
        <svg class="globalnav__glyph" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="6" fill="none" stroke="currentColor" stroke-width="1.2" />
          <path d="M7 8.6h10M7 12h6.6M7 15.4h8.4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
        <span class="globalnav__brand-text">{{ site.brand }}</span>
      </a>

      <nav class="globalnav__links" aria-label="全站导航">
        <a v-for="item in nav.global" :key="item.href" :href="item.href" class="globalnav__link">
          {{ item.label }}
        </a>
      </nav>

      <div class="globalnav__actions">
        <span class="globalnav__version mono">{{ site.version }}</span>
        <a class="globalnav__cta" :href="nav.cta.href">{{ nav.cta.label }}</a>
        <button
          class="globalnav__burger"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="globalnav-drawer"
          aria-label="打开导航菜单"
          @click="menuOpen = !menuOpen"
        >
          <span></span><span></span>
        </button>
      </div>
    </div>

    <div id="globalnav-drawer" class="globalnav__drawer" :class="{ 'is-open': menuOpen }">
      <a v-for="item in nav.global" :key="item.href" :href="item.href" @click="closeMenu">
        {{ item.label }}
      </a>
    </div>
  </header>
</template>

<style scoped>
.globalnav {
  position: fixed;
  inset: 0 0 auto;
  z-index: 9000;
  height: var(--globalnav-height);
  background: rgba(0, 0, 0, 0.48);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  color: rgba(255, 255, 255, 0.8);
  transition: background-color var(--dur-base) var(--ease-out);
}

.globalnav.is-scrolled {
  background: rgba(0, 0, 0, 0.72);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08);
}

.globalnav__inner {
  width: var(--content-width);
  max-width: var(--content-max-width);
  margin-inline: auto;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 28px;
}

.globalnav__brand {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

.globalnav__glyph {
  width: 18px;
  height: 18px;
  flex: none;
}

.globalnav__brand-text {
  font-weight: 500;
}

.globalnav__links {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-left: auto;
  margin-right: auto;
}

.globalnav__link {
  font-size: 12px;
  line-height: 1;
  letter-spacing: 0.01em;
  color: rgba(255, 255, 255, 0.8);
  transition: color var(--dur-fast) var(--ease-out);
}

.globalnav__link:hover {
  color: #fff;
}

.globalnav__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.globalnav__version {
  font-size: 11px;
  color: var(--glyph-secondary);
  letter-spacing: 0.02em;
}

.globalnav__cta {
  font-size: 12px;
  line-height: 1;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  transition: background-color var(--dur-fast) var(--ease-out);
}

.globalnav__cta:hover {
  background: rgba(255, 255, 255, 0.24);
}

.globalnav__burger {
  display: none;
  width: 28px;
  height: 28px;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.globalnav__burger span {
  display: block;
  height: 1px;
  width: 18px;
  background: currentColor;
}

.globalnav__drawer {
  display: none;
}

@media (max-width: 1068px) {
  .globalnav__links {
    gap: 22px;
  }
  .globalnav__version {
    display: none;
  }
}

@media (max-width: 734px) {
  .globalnav {
    height: var(--globalnav-height);
  }
  .globalnav__inner {
    gap: 12px;
  }
  .globalnav__links,
  .globalnav__cta {
    display: none;
  }
  .globalnav__burger {
    display: flex;
  }
  .globalnav__actions {
    margin-left: auto;
  }
  .globalnav__drawer {
    display: grid;
    gap: 0;
    overflow: hidden;
    max-height: 0;
    background: rgba(0, 0, 0, 0.94);
    backdrop-filter: blur(20px);
    transition: max-height var(--dur-base) var(--ease-out);
  }
  .globalnav__drawer.is-open {
    max-height: 320px;
  }
  .globalnav__drawer a {
    padding: 14px 6.25vw;
    font-size: 17px;
    color: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
}
</style>
