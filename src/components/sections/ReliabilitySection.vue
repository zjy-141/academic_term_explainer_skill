<script setup lang="ts">
import { reliability } from '../../data/content'
import StorySection from '../ui/StorySection.vue'
</script>

<template>
  <StorySection
    section-id="reliability"
    ghost="M7"
    :eyebrow="reliability.eyebrow"
    :headline="reliability.headline"
    :intro="reliability.intro"
  >
    <p class="reliability__modules mono" data-reveal>
      <span v-for="tag in reliability.moduleTags" :key="tag" class="reliability__module">{{ tag }}</span>
    </p>

    <ol id="chain" class="chain" data-stagger>
      <li v-for="(link, i) in reliability.chain" :key="link.level" class="chain__item">
        <div class="chain__card" :class="{ 'is-first': i === 0 }" data-stagger-item>
          <div class="chain__top">
            <span class="chain__level mono">{{ link.level }}</span>
            <span class="chain__formula">{{ link.formula }}</span>
          </div>
          <p class="chain__name">{{ link.name }}</p>
          <p class="chain__note">{{ link.note }}</p>
        </div>
        <span v-if="i < reliability.chain.length - 1" class="chain__arrow" aria-hidden="true">→</span>
      </li>
    </ol>

    <div class="reliability" data-stagger>
      <div class="bypass" data-stagger-item>
        <span class="bypass__level mono">{{ reliability.bypass.level }}</span>
        <div>
          <p class="bypass__name">{{ reliability.bypass.name }}</p>
          <p class="bypass__note">{{ reliability.bypass.note }}</p>
          <div class="bypass__triggers">
            <span v-for="t in reliability.bypass.triggers" :key="t" class="bypass__trigger">{{ t }}</span>
          </div>
        </div>
      </div>

      <div id="probe" class="probe glass-card" data-stagger-item>
        <p class="probe__label mono">环境探测</p>
        <dl class="probe__list">
          <div v-for="item in reliability.probe" :key="item.k">
            <dt>{{ item.k }}</dt>
            <dd>{{ item.v }}</dd>
          </div>
        </dl>
        <p class="probe__cleanup">{{ reliability.cleanup }}</p>
      </div>
    </div>
  </StorySection>
</template>

<style scoped>
.reliability__modules {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
  margin-bottom: 26px;
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--glyph-secondary);
}

.reliability__module {
  position: relative;
  padding-right: 18px;
}

.reliability__module::after {
  content: '·';
  position: absolute;
  right: 6px;
  color: var(--glyph-tertiary);
}

.reliability__module:last-child {
  padding-right: 0;
}

.reliability__module:last-child::after {
  content: none;
}

.chain {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  align-items: stretch;
}

.chain__item {
  display: flex;
  align-items: stretch;
  gap: 0;
}

.chain__card {
  flex: 1;
  padding: 26px 24px;
  border-radius: var(--radius-card-small);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09);
  display: grid;
  gap: 10px;
  align-content: start;
  min-height: 190px;
}

.chain__card.is-first {
  background: linear-gradient(160deg, rgba(41, 151, 255, 0.22), rgba(255, 255, 255, 0.02));
  box-shadow: inset 0 0 0 1px rgba(41, 151, 255, 0.4);
}

.chain__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.chain__level {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--link-dark);
}

.chain__formula {
  font-size: 11px;
  color: var(--glyph-tertiary);
}

.chain__name {
  font-family: var(--font-display);
  font-size: 17px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: var(--glyph);
}

.chain__note {
  font-size: 12px;
  line-height: 1.5;
  color: var(--glyph-secondary);
}

.chain__arrow {
  align-self: center;
  padding: 0 10px;
  color: var(--glyph-tertiary);
  font-size: 14px;
}

.reliability {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 20px;
  margin-top: 20px;
}

.bypass {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-radius: var(--radius-card);
  border: 1px dashed rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.02);
}

.bypass__triggers {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.bypass__trigger {
  font-size: 11px;
  padding: 5px 10px;
  border-radius: var(--radius-pill);
  color: var(--glyph-secondary);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.bypass__level {
  font-size: 12px;
  color: var(--glyph-tertiary);
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
}

.bypass__name {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: var(--glyph-alt);
  margin-bottom: 6px;
}

.bypass__note {
  font-size: 12px;
  line-height: 1.5;
  color: var(--glyph-secondary);
}

.probe {
  padding: 24px 26px;
  border-radius: var(--radius-card);
  display: grid;
  gap: 14px;
}

.probe__label {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--glyph-secondary);
}

.probe__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
}

.probe__list dt {
  font-size: 11px;
  color: var(--glyph-tertiary);
  margin-bottom: 3px;
}

.probe__list dd {
  margin: 0;
  font-size: 13px;
  color: var(--glyph-alt);
}

.probe__cleanup {
  font-size: 11px;
  color: var(--glyph-tertiary);
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 1068px) {
  .chain {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .chain__arrow {
    display: none;
  }
  .reliability {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 734px) {
  .chain {
    grid-template-columns: 1fr;
  }
  .chain__card {
    min-height: 0;
  }
  .probe__list {
    grid-template-columns: 1fr;
  }
}
</style>
