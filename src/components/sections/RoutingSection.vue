<script setup lang="ts">
import { computed, ref } from 'vue'
import { routing } from '../../data/content'
import StorySection from '../ui/StorySection.vue'

const activeWord = ref(0)
const activeCase = ref(0)

const current = computed(() => routing.ambiguities[activeWord.value])

const selectWord = (i: number) => {
  activeWord.value = i
  activeCase.value = 0
}
</script>

<template>
  <StorySection
    section-id="routing"
    ghost="M2"
    :eyebrow="routing.eyebrow"
    :headline="routing.headline"
    :intro="routing.intro"
  >
    <div class="routing" data-stagger>
      <div class="routing__main glass-card" data-stagger-item>
        <div class="routing__tabs" role="tablist" aria-label="歧义词">
          <button
            v-for="(item, i) in routing.ambiguities"
            :key="item.word"
            type="button"
            role="tab"
            :aria-selected="activeWord === i"
            class="routing__tab"
            :class="{ 'is-active': activeWord === i }"
            @click="selectWord(i)"
          >
            {{ item.word }}
          </button>
        </div>

        <div class="routing__panel">
          <div class="routing__headline">
            <p class="routing__word">{{ current.word }}</p>
            <p class="routing__hint mono">按共现词判定学科 · 9 组规则</p>
          </div>

          <ul class="cases">
            <li
              v-for="(c, i) in current.cases"
              :key="c.field + i"
              class="case"
              :class="{ 'is-active': activeCase === i }"
              @mouseenter="activeCase = i"
              @focusin="activeCase = i"
            >
              <button type="button" class="case__inner" @click="activeCase = i">
                <span class="case__context">{{ c.context }}</span>
                <span class="case__arrow" aria-hidden="true">→</span>
                <span class="case__result">
                  <span class="case__field">{{ c.field }}</span>
                  <span class="case__source mono">{{ c.source }}</span>
                </span>
              </button>
            </li>
          </ul>

          <p class="routing__foot mono">
            共 9 组歧义词 · 此处展示 5 组 · 完整规则见技术文档 4.3 节
          </p>
        </div>
      </div>

      <aside class="routing__aside" data-stagger-item>
        <p class="aside__label mono">{{ routing.routeTitle }}</p>
        <ol class="steps">
          <li v-for="(step, i) in routing.routeSteps" :key="step" class="step">
            <span class="step__index mono">0{{ i + 1 }}</span>
            <span class="step__name">{{ step }}</span>
          </li>
        </ol>

        <div class="aside__stats">
          <div v-for="stat in routing.stats" :key="stat.label" class="stat">
            <p class="stat__value">
              {{ stat.value }}<span class="stat__unit">{{ stat.unit }}</span>
            </p>
            <p class="stat__label">{{ stat.label }}</p>
          </div>
        </div>
      </aside>
    </div>
  </StorySection>
</template>

<style scoped>
.routing {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: 20px;
}

.routing__main {
  border-radius: var(--radius-card);
  padding: 30px;
  display: grid;
  gap: 26px;
  align-content: start;
}

.routing__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.routing__tab {
  font-size: 14px;
  letter-spacing: -0.016em;
  padding: 10px 22px;
  min-width: 76px;
  text-align: center;
  border-radius: var(--radius-pill);
  color: var(--glyph-secondary);
  background: rgba(255, 255, 255, 0.06);
  transition:
    background-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}

.routing__tab:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
}

.routing__tab.is-active {
  background: #f5f5f7;
  color: #000;
}

.routing__panel {
  display: grid;
  gap: 20px;
}

.routing__headline {
  display: flex;
  align-items: baseline;
  gap: 16px;
  flex-wrap: wrap;
}

.routing__word {
  font-family: var(--font-display);
  font-size: 40px;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: 0;
  color: var(--glyph);
}

.routing__hint {
  font-size: 11px;
  color: var(--glyph-tertiary);
  letter-spacing: 0.06em;
}

.cases {
  display: grid;
  gap: 10px;
}

.case__inner {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 24px minmax(0, 0.9fr);
  align-items: center;
  gap: 18px;
  padding: 18px 20px;
  border-radius: 16px;
  text-align: left;
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transition:
    background-color var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out);
}

.case.is-active .case__inner {
  background: rgba(41, 151, 255, 0.14);
  box-shadow: inset 0 0 0 1px rgba(41, 151, 255, 0.45);
}

.case__context {
  font-size: 14px;
  line-height: 1.45;
  color: var(--glyph-secondary);
}

.case.is-active .case__context {
  color: var(--glyph-alt);
}

.case__arrow {
  color: var(--glyph-tertiary);
  font-size: 14px;
  text-align: center;
}

.case.is-active .case__arrow {
  color: var(--link-dark);
}

.case__result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.case__field {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: var(--glyph);
}

.case__source {
  font-size: 11px;
  color: var(--glyph-tertiary);
  white-space: nowrap;
}

.routing__aside {
  display: grid;
  gap: 22px;
  align-content: start;
  padding: 30px;
  border-radius: var(--radius-card);
  background: linear-gradient(165deg, rgba(41, 151, 255, 0.12), rgba(255, 255, 255, 0.02));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.aside__label {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--glyph-secondary);
}

.steps {
  display: grid;
  gap: 0;
}

.step {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.step:last-child {
  border-bottom: 0;
}

.step__index {
  font-size: 11px;
  color: var(--link-dark);
}

.step__name {
  font-size: 14px;
  color: var(--glyph);
}

.aside__stats {
  display: grid;
  gap: 14px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stat__value {
  font-family: var(--font-display);
  font-size: 32px;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: 0.004em;
  color: var(--glyph);
}

.stat__unit {
  font-size: 15px;
  margin-left: 2px;
  color: var(--glyph-secondary);
}

.stat__label {
  font-size: 12px;
  color: var(--glyph-tertiary);
}

.routing__foot {
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .routing {
    grid-template-columns: 1fr;
  }
  .routing__main,
  .routing__aside {
    padding: 24px;
  }
  .routing__word {
    font-size: 32px;
  }
  .routing__aside {
    grid-template-columns: 1fr 1fr;
    display: grid;
    align-items: start;
  }
  .aside__stats {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border-top: 0;
    padding-top: 0;
  }
}

@media (max-width: 734px) {
  .case__inner {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  .case__arrow {
    display: none;
  }
  .case__result {
    justify-content: flex-start;
    gap: 10px;
  }
  .routing__aside {
    grid-template-columns: 1fr;
  }
  .aside__stats {
    grid-template-columns: 1fr 1fr;
  }
  .routing__headline {
    gap: 8px;
  }
}
</style>
