<script setup lang="ts">
import { values } from '../../data/content'
import TypeLockup from '../ui/TypeLockup.vue'
</script>

<template>
  <section id="values" class="section values theme-light" aria-label="价值观">
    <div class="viewport-content">
      <TypeLockup :eyebrow="values.eyebrow" :lines="values.headline" align="left" size="l" />

      <ul class="values__grid" data-stagger="fade">
        <li v-for="(item, i) in values.items" :key="item.title" class="vcard" data-stagger-item>
          <div class="vcard__icon" aria-hidden="true">
            <!-- 不编造来源：盾牌 + 勾 -->
            <svg v-if="i === 0" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 3.5 26 7v9c0 6.2-4.3 10.6-10 12.5C10.3 26.6 6 22.2 6 16V7z" />
              <path d="M11.5 16.2l3.2 3.3 6-7" />
            </svg>
            <!-- 不复用过期缓存：环形刷新箭头 -->
            <svg v-else-if="i === 1" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M26.5 16a10.5 10.5 0 1 1-3.4-7.7" />
              <path d="M26.8 5.2v6.4h-6.4" />
              <circle cx="16" cy="16" r="2.4" />
            </svg>
            <!-- 不省略降级说明：文档 + 批注 -->
            <svg v-else viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 4.5h11l5 5v18H8z" />
              <path d="M19 4.5V10h5" />
              <path d="M12.5 16h7M12.5 20.5h4.5" />
              <path d="M23 21.5h4.6l-1.7 3.4" />
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
  min-height: 268px;
  will-change: transform;
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
