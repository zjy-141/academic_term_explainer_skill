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
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.compare__head,
.compare__row {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 0.9fr) minmax(0, 1.3fr);
  gap: 0;
  align-items: stretch;
}

.compare__head {
  background: #f5f5f7;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.compare__cell {
  padding: 20px 24px;
  font-size: 14px;
  line-height: 1.45;
  color: var(--glyph-light-secondary);
  border-left: 1px solid rgba(0, 0, 0, 0.06);
}

.compare__cell:first-child {
  border-left: 0;
}

.compare__cell--feature {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.022em;
  color: var(--glyph-light);
}

.compare__head .compare__cell {
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.011em;
}

.compare__head .is-current {
  color: #0071e3;
}

.compare__row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.compare__row:last-of-type {
  border-bottom: 0;
}

.compare__cell--old {
  color: var(--glyph-light-tertiary);
}

.compare__cell--new {
  color: var(--glyph-light);
  background: rgba(0, 113, 227, 0.045);
}

.compare__note {
  padding: 16px 24px;
  font-size: 12px;
  color: var(--glyph-light-tertiary);
  background: #fbfbfd;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
}

@media (max-width: 1068px) {
  .compare {
    margin-top: 40px;
  }
  .compare__cell {
    padding: 16px 18px;
    font-size: 13px;
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
    font-size: 13px;
  }
  .compare__cell--new {
    background: transparent;
    font-weight: 500;
  }
  .compare__cell--old::before {
    content: '旧版：';
    color: var(--glyph-light-tertiary);
  }
  .compare__cell--new::before {
    content: '新版：';
    color: #0071e3;
  }
  .compare__note {
    padding: 14px 18px;
  }
}
</style>
