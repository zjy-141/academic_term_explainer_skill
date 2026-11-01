<script setup lang="ts">
import { upgrade } from '../../data/content'
import TypeLockup from '../ui/TypeLockup.vue'
</script>

<template>
  <section id="upgrade" class="section upgrade theme-light" aria-label="版本对比">
    <div class="viewport-content">
      <TypeLockup
        :eyebrow="upgrade.eyebrow"
        :lines="upgrade.headline"
        :intro="upgrade.intro"
        align="left"
        size="l"
      />

      <div class="compare" data-reveal>
        <div class="compare__head">
          <span class="compare__cell compare__cell--feature">对比项</span>
          <span v-for="(col, i) in upgrade.columns" :key="col" class="compare__cell" :class="{ 'is-current': i === 1 }">
            {{ col }}
          </span>
        </div>

        <div v-for="row in upgrade.rows" :key="row.k" class="compare__row">
          <span class="compare__cell compare__cell--feature">{{ row.k }}</span>
          <span class="compare__cell compare__cell--old">{{ row.a }}</span>
          <span class="compare__cell compare__cell--new">{{ row.b }}</span>
        </div>

        <p class="compare__note">{{ upgrade.note }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.upgrade {
  background: var(--bg-light-alt);
}

.compare {
  margin-top: 56px;
  border-radius: var(--radius-card);
  background: #fff;
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.08),
    0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.compare__head,
.compare__row {
  display: grid;
  grid-template-columns: minmax(0, 0.72fr) minmax(0, 0.86fr) minmax(0, 1.42fr);
  gap: 0;
  align-items: stretch;
}

/* 表头比页面底色更深一档，才不会和背景糊在一起 */
.compare__head {
  background: #ececed;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.compare__cell {
  padding: 20px 26px;
  font-size: 15px;
  line-height: 1.5;
  color: var(--glyph-light-secondary);
  border-left: 1px solid rgba(0, 0, 0, 0.08);
}

.compare__cell:first-child {
  border-left: 0;
}

.compare__cell--feature {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: var(--glyph-light);
}

.compare__head .compare__cell {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.011em;
  color: var(--glyph-light);
}

.compare__head .compare__cell--old {
  color: var(--glyph-light-secondary);
}

.compare__head .is-current {
  color: #0071e3;
}

.compare__row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.compare__row:last-of-type {
  border-bottom: 0;
}

/* 旧版：灰但可读；新版：实色 + 淡蓝底，一眼能分出哪列是当前版本 */
.compare__cell--old {
  color: #6e6e73;
}

.compare__cell--new {
  color: var(--glyph-light);
  font-weight: 500;
  background: rgba(0, 113, 227, 0.07);
  box-shadow:
    inset 1px 0 0 rgba(0, 113, 227, 0.16),
    inset -1px 0 0 rgba(0, 113, 227, 0.16);
}

.compare__note {
  padding: 16px 26px;
  font-size: 13px;
  color: var(--glyph-light-secondary);
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

@media (max-width: 1068px) {
  .compare {
    margin-top: 40px;
  }
  .compare__cell {
    padding: 16px 18px;
    font-size: 14px;
  }
}

@media (max-width: 734px) {
  .compare__head {
    display: none;
  }
  .compare__row {
    grid-template-columns: 1fr;
    padding: 16px 18px;
    gap: 6px;
  }
  .compare__cell {
    padding: 2px 0;
    border-left: 0;
    font-size: 14px;
  }
  .compare__cell--new {
    background: transparent;
    box-shadow: none;
    font-weight: 500;
  }
  .compare__cell--old::before {
    content: '旧版：';
    color: var(--glyph-light-secondary);
  }
  .compare__cell--new::before {
    content: '新版：';
    color: #0071e3;
  }
  .compare__note {
    padding: 14px 18px;
    font-size: 12px;
  }
}
</style>
