<script setup lang="ts">
import TypeLockup from '../ui/TypeLockup.vue'

withDefaults(
  defineProps<{
    sectionId: string
    /** 背景巨型水印（如 M1），营造参考页那种“大字压在标题后”的层次 */
    ghost?: string
    eyebrow: string
    headline: string[]
    intro?: string
    align?: 'center' | 'left'
    size?: 'xl' | 'l'
    label?: string
  }>(),
  { align: 'center', size: 'xl' },
)
</script>

<template>
  <section :id="sectionId" class="section story theme-dark" :aria-label="label || eyebrow">
    <div class="viewport-content">
      <p v-if="ghost" class="story__ghost" aria-hidden="true">{{ ghost }}</p>
      <div class="story__content">
        <TypeLockup :eyebrow="eyebrow" :lines="headline" :intro="intro" :align="align" :size="size" />
        <div class="story__body">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story {
  background: var(--bg-dark);
  position: relative;
}

.story__content {
  position: relative;
  z-index: 1;
}

.story__ghost {
  position: absolute;
  top: -0.2em;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-family: var(--font-display);
  font-size: 300px;
  line-height: 0.8;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: transparent;
  background: linear-gradient(180deg, rgba(245, 245, 247, 0.16), rgba(245, 245, 247, 0.01) 82%);
  -webkit-background-clip: text;
  background-clip: text;
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

.story__body {
  margin-top: 64px;
}

@media (max-width: 1068px) {
  .story__ghost {
    font-size: 240px;
    top: -0.36em;
  }
  .story__body {
    margin-top: 48px;
  }
}

@media (max-width: 734px) {
  .story__ghost {
    font-size: 150px;
    top: -0.3em;
  }
  .story__body {
    margin-top: 32px;
  }
}
</style>
