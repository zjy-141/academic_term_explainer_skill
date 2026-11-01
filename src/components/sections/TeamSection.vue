<script setup lang="ts">
import { team } from '../../data/content'
import TypeLockup from '../ui/TypeLockup.vue'
</script>

<template>
  <section id="team" class="section team theme-light" aria-label="参赛信息">
    <div class="viewport-content">
      <TypeLockup :eyebrow="team.eyebrow" :lines="team.headline" :intro="team.intro" size="l" />

      <ul class="team__grid" data-stagger>
        <li v-for="card in team.cards" :key="card.title" class="tcard" data-stagger-item>
          <span class="tcard__tag mono">{{ card.tag }}</span>
          <div class="tcard__body">
            <p class="tcard__title">{{ card.title }}</p>
            <p class="tcard__copy">{{ card.copy }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.team {
  background: var(--bg-light);
}

.team__grid {
  margin-top: 56px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.tcard {
  position: relative;
  min-height: 232px;
  border-radius: var(--radius-card);
  padding: 26px;
  background: var(--bg-light-alt);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
  overflow: hidden;
  transition:
    transform var(--dur-base) var(--ease-out),
    box-shadow var(--dur-base) var(--ease-out);
}

.tcard::after {
  content: '';
  position: absolute;
  inset: auto -20% -40% -20%;
  height: 60%;
  background: radial-gradient(circle at 50% 100%, rgba(0, 113, 227, 0.14), transparent 70%);
  opacity: 0;
  transition: opacity var(--dur-slow) var(--ease-out);
}

.tcard:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 50px -34px rgba(0, 0, 0, 0.4);
}

.tcard:hover::after {
  opacity: 1;
}

.tcard__tag {
  align-self: flex-start;
  font-size: 11px;
  letter-spacing: 0.1em;
  padding: 5px 10px;
  border-radius: var(--radius-pill);
  background: rgba(0, 0, 0, 0.05);
  color: var(--glyph-light-secondary);
}

.tcard__title {
  font-family: var(--font-display);
  font-size: 24px;
  line-height: 1.1666666667;
  font-weight: 600;
  letter-spacing: 0.009em;
  color: var(--glyph-light);
  margin-bottom: 10px;
}

.tcard__copy {
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: -0.016em;
  color: var(--glyph-light-secondary);
  min-height: 3em;
}

@media (max-width: 1068px) {
  .team__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 40px;
  }
  .tcard {
    min-height: 240px;
    padding: 24px;
  }
  .tcard__title {
    font-size: 21px;
  }
}

@media (max-width: 734px) {
  .team__grid {
    grid-template-columns: 1fr;
  }
  .tcard {
    min-height: 200px;
  }
}
</style>
