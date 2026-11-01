<script setup lang="ts">
import { computed, ref } from 'vue'
import { workflows } from '../../data/content'

const active = ref(0)
const current = computed(() => workflows.tabs[active.value])
</script>

<template>
  <section id="workflows" class="section workflows theme-dark" aria-label="专业场景">
    <div class="viewport-content">
      <div class="workflows__head" data-stagger>
        <p class="workflows__eyebrow type-eyebrow" data-stagger-item>{{ workflows.eyebrow }}</p>
        <h2 class="workflows__headline" data-stagger-item>
          <span v-for="(line, i) in workflows.headline" :key="i">{{ line }}</span>
        </h2>
        <p class="workflows__intro" data-stagger-item>{{ workflows.intro }}</p>
      </div>

      <div class="workflows__tabs" role="tablist" aria-label="学科场景" data-reveal>
        <button
          v-for="(tab, i) in workflows.tabs"
          :key="tab.key"
          type="button"
          role="tab"
          :aria-selected="active === i"
          class="workflows__tab"
          :class="{ 'is-active': active === i }"
          @click="active = i"
        >
          {{ tab.label }}
        </button>
      </div>

      <Transition name="wpanel" mode="out-in">
        <div :key="current.key" class="workflows__panel" role="tabpanel" :aria-label="current.label">
          <div class="wcopy">
            <p class="wcopy__app mono">{{ current.app }}</p>
            <h3 class="wcopy__title">{{ current.title }}</h3>
            <p class="wcopy__text">{{ current.copy }}</p>
            <p class="wcopy__terms-label mono">可能被提取到的术语</p>
            <div class="wcopy__terms">
              <span v-for="term in current.terms" :key="term" class="wterm">{{ term }}</span>
            </div>
          </div>

          <div class="wsources glass-card">
            <p class="wsources__label mono">检索路径</p>
            <ol class="wsources__list">
              <li v-for="(source, i) in current.sources" :key="source" class="wsource">
                <span class="wsource__index mono">0{{ i + 1 }}</span>
                <span class="wsource__name">{{ source }}</span>
                <span class="wsource__state">已接</span>
              </li>
            </ol>
            <p class="wsources__foot mono">多学科命中时并行检索，不串源</p>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.workflows {
  background: var(--bg-dark);
}

.workflows__head {
  display: grid;
  gap: 14px;
  max-width: 900px;
  margin-bottom: 44px;
}

.workflows__eyebrow {
  color: var(--glyph-secondary);
}

.workflows__headline {
  display: grid;
  font-family: var(--font-display);
  font-size: 64px;
  line-height: 1.0625;
  font-weight: 600;
  letter-spacing: -0.009em;
  color: var(--glyph);
}

.workflows__intro {
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1.381002381;
  font-weight: 600;
  letter-spacing: 0.011em;
  color: var(--glyph-secondary);
  max-width: 34ch;
}

.workflows__tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: none;
  margin-bottom: 28px;
}

.workflows__tabs::-webkit-scrollbar {
  display: none;
}

.workflows__tab {
  flex: 0 0 auto;
  font-size: 14px;
  letter-spacing: -0.016em;
  padding: 10px 18px;
  border-radius: var(--radius-pill);
  color: var(--glyph-secondary);
  background: rgba(255, 255, 255, 0.06);
  transition:
    background-color var(--dur-fast) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}

.workflows__tab:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.14);
}

.workflows__tab.is-active {
  background: #f5f5f7;
  color: #000;
}

.workflows__panel {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 20px;
  align-items: stretch;
}

/* 切换学科时的淡入上移 */
.wpanel-enter-active,
.wpanel-leave-active {
  transition:
    opacity 0.28s var(--ease-out),
    transform 0.28s var(--ease-out);
}

.wpanel-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.wpanel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.wcopy {
  padding: 40px;
  border-radius: var(--radius-card);
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.02) 60%);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  display: grid;
  gap: 16px;
  align-content: start;
  min-height: 340px;
}

.wcopy__app {
  font-size: 12px;
  letter-spacing: 0.1em;
  color: var(--link-dark);
}

.wcopy__title {
  font-family: var(--font-display);
  font-size: 40px;
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: 0;
  color: var(--glyph);
  max-width: 22ch;
}

.wcopy__text {
  font-size: 17px;
  line-height: 1.6;
  letter-spacing: -0.016em;
  color: var(--glyph-secondary);
  max-width: 52ch;
}

.wcopy__terms-label {
  margin-top: 8px;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--glyph-tertiary);
}

.wcopy__terms {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.wterm {
  font-size: 13px;
  padding: 7px 14px;
  border-radius: var(--radius-pill);
  color: var(--glyph-alt);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.wsources {
  padding: 32px;
  border-radius: var(--radius-card);
  display: grid;
  gap: 18px;
  align-content: start;
  background: linear-gradient(160deg, rgba(41, 151, 255, 0.14), rgba(255, 255, 255, 0.02));
}

.wsources__label {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--glyph-secondary);
}

.wsources__list {
  display: grid;
  gap: 0;
}

.wsource {
  display: grid;
  grid-template-columns: 32px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.wsource:last-child {
  border-bottom: 0;
}

.wsource__index {
  font-size: 11px;
  color: var(--glyph-tertiary);
}

.wsource__name {
  font-size: 15px;
  color: var(--glyph);
}

.wsource__state {
  font-size: 11px;
  color: #34c759;
}

.wsources__foot {
  font-size: 11px;
  color: var(--glyph-tertiary);
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

@media (max-width: 1068px) {
  .workflows__headline {
    font-size: 48px;
  }
  .workflows__intro {
    font-size: 21px;
  }
  .workflows__panel {
    grid-template-columns: 1fr;
  }
  .wcopy {
    padding: 28px;
    min-height: 0;
  }
  .wcopy__title {
    font-size: 32px;
  }
  .wsources {
    padding: 24px;
  }
}

@media (max-width: 734px) {
  .workflows__headline {
    font-size: 40px;
  }
  .wcopy__title {
    font-size: 28px;
  }
  .wcopy__text {
    font-size: 15px;
  }
}
</style>
