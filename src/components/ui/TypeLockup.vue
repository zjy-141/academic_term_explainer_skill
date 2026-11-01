<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    lines: string[]
    intro?: string
    note?: string
    align?: 'center' | 'left'
    size?: 'xl' | 'l'
  }>(),
  { align: 'center', size: 'xl' },
)
</script>

<template>
  <div class="lockup" :class="[`lockup--${align}`, `lockup--${size}`]" data-stagger>
    <p v-if="eyebrow" class="lockup__eyebrow type-eyebrow" data-stagger-item>{{ eyebrow }}</p>
    <h2 class="lockup__headline" data-stagger-item>
      <span v-for="(line, i) in lines" :key="i" class="lockup__line">{{ line }}</span>
    </h2>
    <div v-if="intro || $slots.default" class="lockup__copy" data-stagger-item>
      <p v-if="intro" class="lockup__intro">{{ intro }}</p>
      <slot />
    </div>
    <p v-if="note" class="lockup__note" data-stagger-item>{{ note }}</p>
  </div>
</template>

<style scoped>
.lockup {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.lockup--center {
  align-items: center;
  text-align: center;
}

.lockup--left {
  align-items: flex-start;
  text-align: left;
}

.lockup__eyebrow {
  margin-bottom: 0.5em;
  color: var(--text-secondary);
}

.lockup__headline {
  display: flex;
  flex-direction: column;
  font-family: var(--font-display);
  font-weight: 600;
  color: var(--text-primary);
}

.lockup--xl .lockup__headline {
  font-size: 64px;
  line-height: 1.0625;
  letter-spacing: -0.009em;
}

.lockup--l .lockup__headline {
  font-size: 48px;
  line-height: 1.0834933333;
  letter-spacing: -0.003em;
}

.lockup__line {
  display: block;
}

.lockup__copy {
  margin-top: 1.4em;
  max-width: 780px;
}

.lockup--center .lockup__copy {
  margin-inline: auto;
}

.lockup__intro {
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1.381002381;
  font-weight: 600;
  letter-spacing: 0.011em;
  color: var(--text-secondary);
}

.lockup__note {
  margin-top: 0.9em;
  font-size: 12px;
  line-height: 1.3333733333;
  letter-spacing: -0.01em;
  color: var(--text-secondary);
}

@media (max-width: 1068px) {
  .lockup--xl .lockup__headline {
    font-size: 48px;
    line-height: 1.0834933333;
    letter-spacing: -0.003em;
  }
  .lockup--l .lockup__headline {
    font-size: 40px;
    line-height: 1.1;
    letter-spacing: 0;
  }
  .lockup__copy {
    margin-top: 1.1em;
  }
  .lockup__intro {
    font-size: 21px;
  }
}

@media (max-width: 734px) {
  .lockup--xl .lockup__headline,
  .lockup--l .lockup__headline {
    font-size: 40px;
    line-height: 1.1;
    letter-spacing: 0;
  }
  .lockup__intro {
    font-size: 19px;
    line-height: 1.4211026316;
    letter-spacing: 0.012em;
  }
  .lockup__copy {
    margin-top: 0.9em;
  }
}
</style>
