<script setup lang="ts">
import { assembly } from '../../data/content'
import StorySection from '../ui/StorySection.vue'
</script>

<template>
  <StorySection
    section-id="assembly"
    ghost="M4"
    :eyebrow="assembly.eyebrow"
    :headline="assembly.headline"
    :intro="assembly.intro"
  >
    <ul class="modules" data-stagger="fade">
      <li v-for="m in assembly.modules" :key="m.key" class="module" data-stagger-item>
        <span class="module__key">{{ m.key }}</span>
        <div class="module__body">
          <p class="module__name">{{ m.name }}</p>
          <p class="module__copy">{{ m.copy }}</p>
        </div>
        <span class="module__req" :class="{ 'is-required': m.required === '必选' }">{{ m.required }}</span>
      </li>
    </ul>

    <div class="engines" data-stagger>
      <article v-for="engine in assembly.engines" :key="engine.name" class="engine glass-card" data-stagger-item>
        <div class="engine__visual" aria-hidden="true">
          <svg viewBox="0 0 240 200" class="engine__chip">
            <defs>
              <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#2b2b30" />
                <stop offset="100%" stop-color="#0b0b0d" />
              </linearGradient>
            </defs>
            <rect x="30" y="26" width="180" height="148" rx="18" fill="url(#chipGrad)" stroke="rgba(255,255,255,0.16)" />
            <rect x="58" y="54" width="124" height="92" rx="10" fill="none" stroke="rgba(255,255,255,0.12)" />
            <g stroke="rgba(41,151,255,0.55)" stroke-width="1.4">
              <path d="M58 74h-28M58 100h-28M58 126h-28M182 74h28M182 100h28M182 126h28" />
              <path d="M86 54V26M120 54V26M154 54V26M86 146v28M120 146v28M154 146v28" />
            </g>
            <circle cx="120" cy="100" r="18" fill="none" stroke="rgba(255,255,255,0.28)" />
            <circle cx="120" cy="100" r="7" fill="rgba(41,151,255,0.8)" />
          </svg>
        </div>
        <p class="engine__label mono">{{ engine.label }}</p>
        <h3 class="engine__name">{{ engine.name }}</h3>
        <p class="engine__headline">{{ engine.headline }}</p>
        <p class="engine__copy">{{ engine.copy }}</p>
        <dl class="engine__metrics">
          <div v-for="metric in engine.metrics" :key="metric.label">
            <dt>{{ metric.label }}</dt>
            <dd>{{ metric.value }}</dd>
          </div>
        </dl>
      </article>
    </div>

    <section class="bench-section" aria-label="耗时基准">
      <header class="bench-head">
        <h3 class="bench-head__title type-subhead">{{ assembly.benchmarkTitle }}</h3>
        <p class="bench-head__note">{{ assembly.benchmarkNote }}</p>
      </header>
      <ul class="benchmarks">
        <li v-for="b in assembly.benchmarks" :key="b.label" class="bench">
          <div class="bench__row">
            <span class="bench__label">{{ b.label }}</span>
            <span class="bench__value mono">{{ b.display }}</span>
          </div>
          <div class="bench__track">
            <span class="bench__fill" :style="{ '--bar-width': b.ratio + '%' }" :data-bar="b.ratio + '%'"></span>
          </div>
        </li>
      </ul>
    </section>
  </StorySection>
</template>

<style scoped>
.modules {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.module {
  padding: 24px;
  border-radius: var(--radius-card-small);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09);
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 14px;
  will-change: transform;
  transition:
    transform var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out);
}

.module:hover {
  transform: translateY(-4px);
  box-shadow:
    inset 0 0 0 1px rgba(41, 151, 255, 0.4),
    0 20px 40px -30px rgba(41, 151, 255, 0.6);
}

.module__key {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0.007em;
  color: var(--link-dark);
}

.module__name {
  font-family: var(--font-display);
  font-size: 19px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: 0.011em;
  color: var(--glyph);
  margin-bottom: 8px;
}

.module__copy {
  font-size: 13px;
  line-height: 1.5;
  color: var(--glyph-secondary);
}

.module__req {
  justify-self: start;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: var(--radius-pill);
  color: var(--glyph-secondary);
  background: rgba(255, 255, 255, 0.07);
}

.module__req.is-required {
  color: #0a84ff;
  background: rgba(41, 151, 255, 0.16);
}

/* 芯片式双卡 */
.engines {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.engine {
  padding: 32px;
  border-radius: var(--radius-card);
  display: grid;
  gap: 12px;
}

.engine__visual {
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
}

.engine__chip {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.engine__label {
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--glyph-tertiary);
}

.engine__name {
  font-family: var(--font-display);
  font-size: 32px;
  line-height: 1.125;
  font-weight: 600;
  letter-spacing: 0.004em;
  color: var(--glyph);
}

.engine__headline {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: var(--link-dark);
}

.engine__copy {
  font-size: 14px;
  line-height: 1.55;
  color: var(--glyph-secondary);
}

.engine__metrics {
  display: grid;
  gap: 10px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.engine__metrics div {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.engine__metrics dt {
  font-size: 12px;
  color: var(--glyph-secondary);
}

.engine__metrics dd {
  margin: 0;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  color: var(--glyph);
}

/* 基准 */
.bench-section {
  margin-top: 72px;
}

.bench-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.bench-head__title {
  color: var(--glyph);
}

.bench-head__note {
  font-size: 12px;
  color: var(--glyph-tertiary);
}

.benchmarks {
  display: grid;
  gap: 22px;
}

.bench__row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.bench__label {
  font-size: 14px;
  color: var(--glyph-alt);
}

.bench__value {
  font-size: 13px;
  color: var(--link-dark);
}

.bench__track {
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.bench__fill {
  display: block;
  height: 100%;
  width: var(--bar-width, 50%);
  transform-origin: left center;
  border-radius: 3px;
  background: linear-gradient(90deg, #0a84ff, #64d2ff);
}

@media (max-width: 1068px) {
  .modules {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .engines {
    grid-template-columns: 1fr;
  }
  .engine {
    padding: 26px;
  }
  .bench-section {
    margin-top: 48px;
  }
}

@media (max-width: 734px) {
  .modules {
    grid-template-columns: 1fr;
  }
  .module {
    padding: 20px;
  }
  .engine__name {
    font-size: 24px;
  }
}
</style>
