<script setup lang="ts">
import { search } from '../../data/content'
import StorySection from '../ui/StorySection.vue'
</script>

<template>
  <StorySection
    section-id="search"
    ghost="M3"
    :eyebrow="search.eyebrow"
    :headline="search.headline"
    :intro="search.intro"
  >
    <div class="search" data-stagger>
      <ol class="ladder">
        <li
          v-for="(item, i) in search.levels"
          :key="item.level"
          class="rung"
          data-stagger-item
          :style="{ '--i': i }"
        >
          <div class="rung__badge mono">{{ item.level }}</div>
          <div class="rung__body">
            <p class="rung__name">{{ item.name }}</p>
            <p class="rung__query mono">{{ item.query }}</p>
          </div>
          <span class="rung__note">{{ item.note }}</span>
        </li>
      </ol>

      <div class="search__side">
        <div class="quality glass-card" data-stagger-item>
          <p class="quality__label mono">{{ search.qualityTitle }}</p>
          <ul class="quality__list">
            <li v-for="q in search.quality" :key="q.title" class="quality__item">
              <p class="quality__title">{{ q.title }}</p>
              <p class="quality__copy">{{ q.copy }}</p>
            </li>
          </ul>
        </div>

        <div class="counter glass-card" data-stagger-item>
          <p class="counter__value">
            <span data-count="2" data-count-decimals="0">2</span>
          </p>
          <p class="counter__label">每个术语最少检索次数</p>
          <p class="counter__note">L1 中文定义 + L3 英文交叉验证为默认组合</p>
        </div>
      </div>
    </div>
  </StorySection>
</template>

<style scoped>
.search {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
  gap: 20px;
  align-items: start;
}

.ladder {
  display: grid;
  gap: 12px;
  counter-reset: rung;
}

.rung {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto;
  align-items: center;
  gap: 20px;
  padding: 22px 24px;
  border-radius: var(--radius-card-small);
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09);
  position: relative;
  overflow: hidden;
}

.rung::after {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: linear-gradient(180deg, var(--link-dark), transparent);
  opacity: calc(1 - var(--i) * 0.18);
}

.rung__badge {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--glyph);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
}

.rung__name {
  font-family: var(--font-display);
  font-size: 19px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: 0.011em;
  color: var(--glyph);
  margin-bottom: 6px;
}

.rung__query {
  font-size: 12px;
  line-height: 1.5;
  color: var(--glyph-secondary);
  word-break: break-word;
}

.rung__note {
  font-size: 12px;
  color: var(--glyph-tertiary);
  white-space: nowrap;
}

.search__side {
  display: grid;
  gap: 20px;
}

.quality {
  padding: 28px;
  border-radius: var(--radius-card);
  display: grid;
  gap: 20px;
}

.quality__label {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--glyph-secondary);
}

.quality__list {
  display: grid;
  gap: 16px;
}

.quality__item {
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.quality__item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.quality__title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: var(--glyph);
  margin-bottom: 4px;
}

.quality__copy {
  font-size: 13px;
  line-height: 1.5;
  color: var(--glyph-secondary);
}

.counter {
  padding: 28px;
  border-radius: var(--radius-card);
  background: linear-gradient(160deg, rgba(41, 151, 255, 0.16), rgba(255, 255, 255, 0.02));
}

.counter__value {
  font-family: var(--font-display);
  font-size: 80px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--glyph);
}

.counter__value span::after {
  content: '×';
  font-size: 0.4em;
  vertical-align: 0.9em;
  color: var(--link-dark);
  margin-left: 0.12em;
}

.counter__label {
  margin-top: 10px;
  font-size: 14px;
  color: var(--glyph-alt);
}

.counter__note {
  margin-top: 6px;
  font-size: 12px;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .search {
    grid-template-columns: 1fr;
  }
  .search__side {
    grid-template-columns: 1fr 1fr;
  }
  .rung {
    grid-template-columns: 48px minmax(0, 1fr);
    padding: 18px 20px;
  }
  .rung__note {
    grid-column: 2;
    justify-self: start;
    margin-top: 6px;
  }
}

@media (max-width: 734px) {
  .search__side {
    grid-template-columns: 1fr;
  }
  .rung__badge {
    width: 38px;
    height: 38px;
  }
  .rung__name {
    font-size: 17px;
  }
  .counter__value {
    font-size: 56px;
  }
}
</style>
