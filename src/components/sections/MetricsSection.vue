<script setup lang="ts">
import { metrics } from '../../data/content'
import TypeLockup from '../ui/TypeLockup.vue'
</script>

<template>
  <section id="metrics" class="section metrics theme-dark" aria-label="技术指标">
    <div class="viewport-content">
      <TypeLockup
        eyebrow="技术指标"
        :lines="metrics.headline"
        :intro="metrics.intro"
        size="xl"
      />

      <ul class="metrics__grid" data-stagger>
        <li v-for="stat in metrics.stats" :key="stat.label" class="metric" data-stagger-item>
          <p class="metric__value">
            {{ stat.value }}<span class="metric__unit">{{ stat.unit }}</span>
          </p>
          <p class="metric__label">{{ stat.label }}</p>
          <p class="metric__code mono">{{ stat.code }}</p>
        </li>
      </ul>

      <p class="metrics__note" data-reveal>
        目标值口径与测量方式详见《产品技术文档 v2.0》第 7 章；<a class="link-inline" href="#upgrade">对比上一版本</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.metrics {
  background: linear-gradient(180deg, #000 0%, #08080a 50%, #000 100%);
}

/* 不做卡片、也不画分隔线：数字直接排在区块背景上，只靠留白分组 */
.metrics__grid {
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 32px;
  row-gap: 56px;
}

.metric {
  display: grid;
  gap: 6px;
  align-content: start;
  justify-items: center;
  text-align: center;
}

.metric__value {
  font-family: var(--font-display);
  font-size: 56px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--glyph);
}

.metric__unit {
  font-size: 20px;
  margin-left: 4px;
  color: var(--glyph-secondary);
  letter-spacing: 0;
}

.metric__label {
  margin-top: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: var(--glyph-alt);
}

.metric__code {
  margin-top: 14px;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--glyph-tertiary);
}

.metrics__note {
  margin-top: 64px;
  text-align: center;
  font-size: 12px;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .metrics__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 40px;
    column-gap: 24px;
    row-gap: 40px;
  }
  .metric__value {
    font-size: 44px;
  }
}

@media (max-width: 734px) {
  .metrics__grid {
    column-gap: 16px;
    row-gap: 32px;
  }
  .metric__value {
    font-size: 34px;
  }
  .metric__unit {
    font-size: 14px;
  }
}
</style>
