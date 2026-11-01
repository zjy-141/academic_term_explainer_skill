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

/* 不做卡片：数字直接坐在区块背景上，只用细线分栏 */
.metrics__grid {
  margin-top: 64px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.metric {
  padding: 34px 28px 32px;
  display: grid;
  gap: 6px;
  align-content: start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  border-left: 1px solid rgba(255, 255, 255, 0.12);
}

.metric:nth-child(4n + 1) {
  border-left: 0;
  padding-left: 0;
}

.metric:nth-child(4n) {
  padding-right: 0;
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
  margin-top: 28px;
  text-align: center;
  font-size: 12px;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .metrics__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 40px;
  }
  .metric {
    padding: 26px 22px 26px;
  }
  .metric:nth-child(4n + 1),
  .metric:nth-child(4n) {
    padding-left: 22px;
    padding-right: 22px;
  }
  .metric:nth-child(odd) {
    border-left: 0;
    padding-left: 0;
  }
  .metric:nth-child(even) {
    padding-right: 0;
  }
  .metric__value {
    font-size: 44px;
  }
}

@media (max-width: 734px) {
  .metric {
    padding: 22px 16px 22px;
  }
  .metric:nth-child(4n + 1),
  .metric:nth-child(4n) {
    padding-left: 16px;
    padding-right: 16px;
  }
  .metric:nth-child(odd) {
    padding-left: 0;
  }
  .metric:nth-child(even) {
    padding-right: 0;
  }
  .metric__value {
    font-size: 34px;
  }
  .metric__unit {
    font-size: 14px;
  }
}
</style>
