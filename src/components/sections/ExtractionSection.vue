<script setup lang="ts">
import { extraction } from '../../data/content'
import StorySection from '../ui/StorySection.vue'
</script>

<template>
  <StorySection
    section-id="extraction"
    ghost="M1"
    :eyebrow="extraction.eyebrow"
    :headline="extraction.headline"
    :intro="extraction.intro"
  >
    <div class="ext__grid" data-stagger>
      <article class="ext__card glass-card" data-stagger-item>
        <header class="ext__card-head">
          <p class="ext__card-label mono">{{ extraction.weightTitle }}</p>
          <p class="ext__card-note">总分 ≥ 3 分进入解释队列</p>
        </header>
        <ul class="weights">
          <li v-for="w in extraction.weights" :key="w.label" class="weight">
            <span class="weight__score mono">{{ w.score }}</span>
            <span class="weight__label">{{ w.label }}</span>
            <span class="weight__note">{{ w.note }}</span>
          </li>
        </ul>
      </article>

      <article class="ext__card glass-card" data-stagger-item>
        <header class="ext__card-head">
          <p class="ext__card-label mono">{{ extraction.rulesTitle }}</p>
          <p class="ext__card-note">候选不足时降阈值，仍不足就全部提取</p>
        </header>
        <dl class="rules">
          <div v-for="rule in extraction.rules" :key="rule.k" class="rules__row">
            <dt>{{ rule.k }}</dt>
            <dd>{{ rule.v }}</dd>
          </div>
        </dl>
      </article>
    </div>

    <article class="ext__sample glass-card" data-reveal>
      <p class="ext__card-label mono">{{ extraction.sampleTitle }}</p>
      <p class="sample__text">{{ extraction.sampleText }}</p>
      <div class="sample__terms">
        <span v-for="term in extraction.sampleTerms" :key="term.name" class="sample__term">
          {{ term.name }}
          <i class="mono">{{ term.score }}</i>
        </span>
        <span class="sample__hint">→ 进入解释队列</span>
      </div>
    </article>
  </StorySection>
</template>

<style scoped>
.ext__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.ext__card {
  padding: 34px;
  border-radius: var(--radius-card);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.ext__card-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.ext__card-label {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--glyph-secondary);
}

.ext__card-note {
  font-size: 12px;
  letter-spacing: -0.01em;
  color: var(--glyph-tertiary);
}

.weights {
  display: grid;
  gap: 2px;
}

.weight {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.weight:last-child {
  border-bottom: 0;
}

.weight__score {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 0.007em;
  color: var(--link-dark);
}

.weight__label {
  font-size: 17px;
  letter-spacing: -0.022em;
  color: var(--glyph);
}

.weight__note {
  font-size: 12px;
  color: var(--glyph-tertiary);
  white-space: nowrap;
}

.rules {
  display: grid;
  gap: 0;
}

.rules__row {
  display: grid;
  grid-template-columns: 130px 1fr;
  gap: 16px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  font-size: 14px;
  line-height: 1.45;
}

.rules__row:last-child {
  border-bottom: 0;
}

.rules__row dt {
  color: var(--glyph-secondary);
}

.rules__row dd {
  margin: 0;
  color: var(--glyph);
}

.ext__sample {
  margin-top: 20px;
  padding: 34px;
  border-radius: var(--radius-card);
  display: grid;
  gap: 18px;
}

.sample__text {
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1.5;
  font-weight: 600;
  letter-spacing: 0.011em;
  color: var(--glyph-alt);
  max-width: 60ch;
}

.sample__terms {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.sample__term {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 9px 16px;
  border-radius: var(--radius-pill);
  background: rgba(41, 151, 255, 0.14);
  box-shadow: inset 0 0 0 1px rgba(41, 151, 255, 0.35);
  font-size: 14px;
  color: #fff;
}

.sample__term i {
  font-style: normal;
  font-size: 12px;
  color: var(--link-dark);
}

.sample__hint {
  font-size: 12px;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .ext__grid {
    grid-template-columns: 1fr;
  }
  .ext__card,
  .ext__sample {
    padding: 26px;
  }
  .sample__text {
    font-size: 19px;
  }
}

@media (max-width: 734px) {
  .weight {
    grid-template-columns: 40px 1fr;
    gap: 12px;
  }
  .weight__note {
    display: none;
  }
  .rules__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  .ext__card-head {
    flex-direction: column;
    gap: 6px;
  }
}
</style>
