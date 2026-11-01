<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { hero, site } from '../../data/content'
import { prefersReducedMotion } from '../../composables/useSiteMotion'

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (prefersReducedMotion() || !root.value) return

  /**
   * 只做一次性入场，不做常驻浮动。
   * 这块视窗有 1100×700 的尺寸 + 多层阴影，一旦常驻逐帧位移，
   * 在集显机器上会持续占用合成/光栅化，鼠标操作就发涩。
   */
  ctx = gsap.context((self) => {
    const q = self.selector!
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(q('.scene__glow'), { opacity: 0, scale: 0.8, duration: 1.6, stagger: 0.12 }, 0)
      .from(q('.scene__frame'), { y: 70, autoAlpha: 0, duration: 1.1 }, 0.1)
      .from(q('.scene__text'), { y: 14, autoAlpha: 0, duration: 0.7 }, 0.45)
      .from(q('.scene__prompt'), { y: 14, autoAlpha: 0, duration: 0.7 }, 0.6)
      .from(q('.scene__mark'), { scaleX: 0, transformOrigin: 'left center', duration: 0.5, stagger: 0.1 }, 1.05)
      .from(q('.scene__term'), { y: 28, autoAlpha: 0, duration: 0.7, stagger: 0.14 }, 1.2)
      .from(q('.scene__meta'), { autoAlpha: 0, duration: 0.6 }, 1.7)
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="hero-scene" aria-hidden="true">
    <div class="scene">
      <span class="scene__glow scene__glow--blue"></span>
      <span class="scene__glow scene__glow--violet"></span>
      <span class="scene__glow scene__glow--cyan"></span>

      <div class="scene__frame">
        <div class="scene__chrome">
          <span class="scene__dots"><i></i><i></i><i></i></span>
          <span class="scene__path mono">academic_terms_ai-medical-ethics_{{ site.year }}1015-1430.md</span>
          <span class="scene__badge mono">{{ site.version }}</span>
        </div>

        <div class="scene__body">
          <div class="scene__source">
            <p class="scene__source-label mono">原文输入</p>
            <p class="scene__text">
              在临床决策支持系统（CDSS）的部署过程中，<em class="scene__mark"><span>算法透明度</span></em>
              成为医患双方关注的焦点。然而，过度披露模型细节可能引发<em class="scene__mark"><span>认知过载</span></em>，反而削弱患者对算法决策的信任。
            </p>
            <div class="scene__prompt">
              <span class="scene__caret"></span>
              <span class="scene__prompt-text">帮我解释这段里的专业术语</span>
            </div>
          </div>

          <div class="scene__terms">
            <article v-for="term in hero.terms" :key="term.en" class="scene__term">
              <header>
                <span class="scene__term-index mono">§</span>
                <span class="scene__term-tag">{{ term.tag }}</span>
              </header>
              <h3 class="scene__term-cn">{{ term.cn }}</h3>
              <p class="scene__term-en">{{ term.en }}</p>
              <div class="scene__term-body">
                <span class="scene__bar"></span>
                <span class="scene__bar scene__bar--short"></span>
              </div>
              <div class="scene__term-body">
                <span class="scene__bar"></span>
                <span class="scene__bar"></span>
                <span class="scene__bar scene__bar--short"></span>
              </div>
            </article>
          </div>
        </div>

        <footer class="scene__meta mono">
          <span v-for="m in hero.output.meta" :key="m">{{ m }}</span>
          <span class="scene__meta-end">Markdown · UTF-8</span>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-scene {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 6.25vw;
}

.scene {
  position: relative;
  width: min(1120px, 100%);
  aspect-ratio: 16 / 10;
}

.scene__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.55;
  pointer-events: none;
}

.scene__glow--blue {
  width: 46%;
  aspect-ratio: 1;
  left: 4%;
  top: -6%;
  background: radial-gradient(circle, rgba(41, 151, 255, 0.65), transparent 68%);
}

.scene__glow--violet {
  width: 48%;
  aspect-ratio: 1;
  right: 0%;
  bottom: -10%;
  background: radial-gradient(circle, rgba(147, 90, 255, 0.5), transparent 70%);
}

.scene__glow--cyan {
  width: 34%;
  aspect-ratio: 1;
  left: 42%;
  bottom: 6%;
  background: radial-gradient(circle, rgba(0, 220, 200, 0.34), transparent 72%);
}

.scene__frame {
  position: absolute;
  inset: 6% 0;
  border-radius: 24px;
  background: linear-gradient(170deg, #1c1c1e 0%, #101011 42%, #0a0a0b 100%);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 60px 120px -50px rgba(0, 0, 0, 0.95),
    0 0 120px -30px rgba(41, 151, 255, 0.35);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.scene__chrome {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

.scene__dots {
  display: inline-flex;
  gap: 6px;
}

.scene__dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.22);
}

.scene__path {
  font-size: 11px;
  color: var(--glyph-secondary);
  letter-spacing: 0.01em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.scene__badge {
  margin-left: auto;
  font-size: 10px;
  color: var(--glyph-alt);
  background: rgba(255, 255, 255, 0.08);
  padding: 3px 8px;
  border-radius: 6px;
}

.scene__body {
  flex: 1;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  padding: 26px;
  min-height: 0;
}

.scene__source {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
}

.scene__source-label {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--glyph-tertiary);
  text-transform: uppercase;
}

.scene__text {
  font-size: 17px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.82);
  letter-spacing: -0.016em;
}

.scene__prompt {
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.66);
}

.scene__caret {
  width: 1.5px;
  height: 15px;
  background: var(--link-dark);
  animation: caret 1.1s steps(1) infinite;
}

@keyframes caret {
  50% {
    opacity: 0;
  }
}

.scene__mark {
  position: relative;
  font-style: normal;
  color: #fff;
  white-space: nowrap;
}

.scene__mark::after {
  content: '';
  position: absolute;
  left: -2px;
  right: -2px;
  bottom: -1px;
  height: 0.42em;
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(41, 151, 255, 0.55), rgba(147, 90, 255, 0.35));
  z-index: -1;
}

.scene__mark {
  z-index: 0;
}

.scene__terms {
  display: grid;
  gap: 14px;
  align-content: center;
}

.scene__term {
  border-radius: 16px;
  padding: 16px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.03));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  display: grid;
  gap: 9px;
}

.scene__term header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.scene__term-index {
  font-size: 11px;
  color: var(--glyph-tertiary);
}

.scene__term-tag {
  font-size: 11px;
  color: var(--glyph-alt);
  background: rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-pill);
  padding: 3px 9px;
}

.scene__term-cn {
  font-family: var(--font-display);
  font-size: 19px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.011em;
}

.scene__term-en {
  font-size: 11px;
  color: var(--glyph-secondary);
  letter-spacing: 0.02em;
}

.scene__term-body {
  display: flex;
  gap: 5px;
}

.scene__bar {
  height: 5px;
  border-radius: 3px;
  flex: 1;
  background: rgba(255, 255, 255, 0.16);
}

.scene__bar--short {
  flex: 0 0 34%;
  background: rgba(255, 255, 255, 0.09);
}

.scene__meta {
  display: flex;
  gap: 18px;
  padding: 12px 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 10.5px;
  color: var(--glyph-tertiary);
  letter-spacing: 0.02em;
}

.scene__meta-end {
  margin-left: auto;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .scene {
    aspect-ratio: auto;
  }
  .scene__frame {
    position: relative;
    inset: auto;
  }
  .scene__body {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 20px;
  }
  .scene__text {
    font-size: 15px;
  }
  .scene__terms {
    grid-template-columns: 1fr 1fr;
  }
  .scene__term {
    padding: 12px;
  }
  .scene__term-cn {
    font-size: 15px;
  }
}

@media (max-width: 734px) {
  .hero-scene {
    padding: 0;
  }
  .scene__glow {
    filter: blur(48px);
  }
  .scene__frame {
    border-radius: 20px;
  }
  .scene__text {
    font-size: 14px;
  }
  .scene__terms {
    grid-template-columns: 1fr;
  }
  .scene__meta {
    flex-wrap: wrap;
    gap: 8px 14px;
  }
  .scene__meta-end {
    margin-left: 0;
  }
}
</style>
