<script setup lang="ts">
import { indexSection, site } from '../../data/content'
</script>

<template>
  <section id="index" class="section index theme-light" aria-label="站点索引">
    <div class="viewport-content">
      <h2 class="index__headline" data-reveal>{{ indexSection.headline }}</h2>

      <div class="index__columns" data-stagger>
        <div v-for="col in indexSection.links" :key="col.title" class="icol" data-stagger-item>
          <p class="icol__title">{{ col.title }}</p>
          <ul class="icol__list">
            <li v-for="item in col.items" :key="item.href + item.label">
              <a class="icol__link" :href="item.href">{{ item.label }}</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="index__wordmark" data-reveal>
        <p class="index__wordmark-text">{{ site.brandEn }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.index {
  background: var(--bg-light);
  padding-bottom: var(--section-padding-reduced);
}

.index__headline {
  font-family: var(--font-display);
  font-size: 64px;
  line-height: 1.0625;
  font-weight: 600;
  letter-spacing: -0.009em;
  color: var(--glyph-light);
  text-align: center;
  max-width: 18ch;
  margin: 0 auto 72px;
}

.index__columns {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 40px;
  padding-top: 48px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.icol__title {
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.022em;
  color: var(--glyph-light);
  margin-bottom: 14px;
}

.icol__list {
  display: grid;
  gap: 10px;
}

.icol__link {
  font-size: 14px;
  color: var(--glyph-light-secondary);
  transition: color var(--dur-fast) var(--ease-out);
}

.icol__link:hover {
  color: #0071e3;
}

.index__wordmark {
  margin-top: 96px;
  padding-top: 48px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
}

.index__wordmark-text {
  font-family: var(--font-display);
  font-size: 96px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: rgba(0, 0, 0, 0.12);
}

@media (max-width: 1068px) {
  .index__headline {
    font-size: 48px;
    margin-bottom: 48px;
  }
  .index__columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px;
  }
  .index__wordmark-text {
    font-size: 56px;
  }
  .index__wordmark {
    margin-top: 64px;
  }
}

@media (max-width: 734px) {
  .index__headline {
    font-size: 32px;
  }
  .index__columns {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .index__wordmark-text {
    font-size: 32px;
  }
}
</style>
