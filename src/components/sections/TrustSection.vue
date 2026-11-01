<script setup lang="ts">
import { trust } from '../../data/content'
import TypeLockup from '../ui/TypeLockup.vue'
</script>

<template>
  <section id="trust" class="section trust theme-dark" aria-label="可信性">
    <div class="viewport-content trust__inner">
      <div class="trust__left">
        <TypeLockup
          :eyebrow="trust.eyebrow"
          :lines="trust.headline"
          :intro="trust.intro"
          align="left"
          size="xl"
        />
      </div>

      <ul class="trust__items" data-stagger>
        <li v-for="(item, i) in trust.items" :key="item.title" class="titem" data-stagger-item>
          <span class="titem__index mono">0{{ i + 1 }}</span>
          <div>
            <p class="titem__title">{{ item.title }}</p>
            <p class="titem__copy">{{ item.copy }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.trust {
  background: radial-gradient(120% 70% at 20% 0%, #14141a 0%, #000 62%);
}

.trust__inner {
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 80px;
  align-items: start;
}

.trust__left {
  position: sticky;
  top: calc(var(--globalnav-height) + var(--localnav-height) + 60px);
}

.trust__items {
  display: grid;
  gap: 0;
}

.titem {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 20px;
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.titem:first-child {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.titem__index {
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--glyph-tertiary);
  padding-top: 6px;
}

.titem__title {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1.1428571429;
  font-weight: 600;
  letter-spacing: 0.007em;
  color: var(--glyph);
  margin-bottom: 10px;
}

.titem__copy {
  font-size: 17px;
  line-height: 1.6;
  letter-spacing: -0.016em;
  color: var(--glyph-secondary);
  max-width: 46ch;
}

@media (max-width: 1068px) {
  .trust__inner {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .trust__left {
    position: static;
  }
  .titem__title {
    font-size: 24px;
  }
}

@media (max-width: 734px) {
  .titem {
    grid-template-columns: 32px 1fr;
    gap: 12px;
    padding: 24px 0;
  }
  .titem__title {
    font-size: 21px;
  }
  .titem__copy {
    font-size: 15px;
  }
}
</style>
