<script setup lang="ts">
import { values } from '../../data/content'
import TypeLockup from '../ui/TypeLockup.vue'
</script>

<template>
  <section id="values" class="section values theme-light" aria-label="价值观">
    <div class="viewport-content">
      <TypeLockup :eyebrow="values.eyebrow" :lines="values.headline" align="left" size="l" />

      <ul class="values__grid" data-stagger>
        <li v-for="item in values.items" :key="item.title" class="vcard" data-stagger-item>
          <div class="vcard__icon" aria-hidden="true">
            <svg viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" stroke-width="1.2" />
              <path d="M16 9v14M10.5 16h11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
          </div>
          <p class="vcard__title">{{ item.title }}</p>
          <p class="vcard__copy">{{ item.copy }}</p>
          <a class="link-inline vcard__link" :href="item.href">
            {{ item.link }}
            <span class="chevron" aria-hidden="true">›</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.values {
  background: var(--bg-light-alt);
}

.values__grid {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.vcard {
  padding: 34px;
  border-radius: var(--radius-card);
  background: #fff;
  display: grid;
  gap: 14px;
  align-content: start;
  min-height: 320px;
  transition: transform var(--dur-base) var(--ease-out);
}

.vcard:hover {
  transform: translateY(-4px);
}

.vcard__icon {
  width: 44px;
  height: 44px;
  color: #0071e3;
  margin-bottom: 8px;
}

.vcard__title {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1.1428571429;
  font-weight: 600;
  letter-spacing: 0.007em;
  color: var(--glyph-light);
}

.vcard__copy {
  font-size: 17px;
  line-height: 1.6;
  letter-spacing: -0.016em;
  color: var(--glyph-light-secondary);
}

.vcard__link {
  margin-top: auto;
  font-size: 15px;
}

@media (max-width: 1068px) {
  .values__grid {
    grid-template-columns: 1fr;
    margin-top: 40px;
  }
  .vcard {
    min-height: 0;
    padding: 28px;
  }
  .vcard__title {
    font-size: 24px;
  }
  .vcard__copy {
    font-size: 15px;
  }
}
</style>
