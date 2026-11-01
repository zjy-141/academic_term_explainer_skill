<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { footnotes, footer } from '../../data/content'

const MOTION_KEY = 'atm-motion'
const motionOn = ref(true)

const readMotion = () => !document.documentElement.classList.contains('reduced-motion')

onMounted(() => {
  motionOn.value = readMotion()
})

const toggleMotion = () => {
  const next = !motionOn.value
  motionOn.value = next
  document.documentElement.classList.toggle('reduced-motion', !next)
  try {
    localStorage.setItem(MOTION_KEY, next ? 'full' : 'reduced')
  } catch {
    /* 隐私模式下忽略 */
  }
  window.dispatchEvent(new CustomEvent('atm:motion'))
}

onBeforeUnmount(() => {})
</script>

<template>
  <footer class="footnote-area theme-light">
    <div class="viewport-content">
      <ol class="footnotes">
        <li v-for="(note, i) in footnotes" :key="i" class="footnote">
          <span class="footnote__num mono">{{ i + 1 }}</span>
          <span class="footnote__text">{{ note }}</span>
        </li>
      </ol>

      <div class="sitefooter">
        <p class="sitefooter__note">{{ footer.note }}</p>

        <div class="sitefooter__columns">
          <div v-for="col in footer.columns" :key="col.title" class="fcol">
            <p class="fcol__title">{{ col.title }}</p>
            <ul class="fcol__list">
              <li v-for="item in col.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>

        <div class="sitefooter__legal">
          <p v-for="line in footer.legal" :key="line">{{ line }}</p>
          <button
            class="motion-toggle"
            type="button"
            :aria-pressed="motionOn"
            @click="toggleMotion"
          >
            <span class="motion-toggle__dot" :class="{ 'is-on': motionOn }" aria-hidden="true"></span>
            动效：{{ motionOn ? '完整' : '精简' }}
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footnote-area {
  background: var(--bg-light-alt);
  padding-top: 40px;
}

.footnotes {
  display: grid;
  gap: 12px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.footnote {
  display: grid;
  grid-template-columns: 22px 1fr;
  gap: 8px;
  font-size: 12px;
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: var(--glyph-light-tertiary);
}

.footnote__num {
  color: var(--glyph-light-tertiary);
}

.sitefooter {
  padding: 40px 0 60px;
}

.sitefooter__note {
  font-size: 12px;
  color: var(--glyph-light-tertiary);
  margin-bottom: 28px;
}

.sitefooter__columns {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.fcol__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--glyph-light);
  margin-bottom: 10px;
}

.fcol__list {
  display: grid;
  gap: 8px;
  font-size: 12px;
  color: var(--glyph-light-secondary);
}

.fcol__list li {
  transition: color var(--dur-fast) var(--ease-out);
  cursor: default;
}

.fcol__list li:hover {
  color: var(--glyph-light);
}

.sitefooter__legal {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 24px;
  padding-top: 24px;
  font-size: 12px;
  color: var(--glyph-light-tertiary);
}

.motion-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: var(--radius-pill);
  font-size: 12px;
  color: var(--glyph-light-secondary);
  background: rgba(0, 0, 0, 0.05);
  transition:
    background-color 0.2s var(--ease-out),
    color 0.2s var(--ease-out);
}

.motion-toggle:hover {
  background: rgba(0, 0, 0, 0.09);
  color: var(--glyph-light);
}

.motion-toggle__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #b0b0b5;
  transition: background-color 0.2s var(--ease-out);
}

.motion-toggle__dot.is-on {
  background: #0071e3;
  box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.16);
}

@media (max-width: 734px) {
  .sitefooter__columns {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .sitefooter__legal {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
