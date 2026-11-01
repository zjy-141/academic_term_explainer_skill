<script setup lang="ts">
import { hero, site } from '../../data/content'
import HeroScene from './HeroScene.vue'
import { useSkillDownload } from '../../composables/useSkillDownload'

const { href: downloadHref, filename: downloadName, started, onDownload } = useSkillDownload()
</script>

<template>
  <section id="hero" class="hero theme-dark" aria-labelledby="hero-title">
    <div class="viewport-content">
      <div class="hero__copy">
        <h1 id="hero-title" class="hero__eyebrow type-eyebrow-super">
          <span>{{ hero.eyebrow[0] }}</span>
          <span>{{ hero.eyebrow[1] }}</span>
        </h1>
        <p class="hero__headline type-hero">{{ hero.headline }}</p>

        <p class="hero__release type-body-tight">
          <span class="hero__release-value">{{ hero.releaseValue }}</span>
          {{ hero.releaseLabel }}
          <sup class="hero__star">*</sup>
        </p>

        <p class="hero__price">{{ hero.price }}</p>

        <div class="hero__actions">
          <a
            class="pill-button hero__download"
            :href="downloadHref"
            :download="downloadName"
            :aria-label="started ? `已开始下载 ${downloadName}` : `${hero.primaryCta.label}，下载技能包 ${downloadName}`"
            @click="onDownload"
          >
            <svg class="hero__download-icon" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 2v8m0 0 3-3M8 10 5 7M3 13h10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>{{ started ? '已开始下载' : hero.primaryCta.label }}</span>
          </a>
          <a class="hero__link link-inline" :href="hero.secondaryCta.href">
            {{ hero.secondaryCta.label }}
            <span class="chevron" aria-hidden="true">›</span>
          </a>
        </div>
      </div>
    </div>

    <div class="hero__media">
      <HeroScene />
    </div>

    <p class="hero__sosumi viewport-content">
      面向跨学科的术语解读工具 · {{ site.team }} · {{ site.version }}
    </p>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding-top: calc(var(--localnav-height) + 88px);
  padding-bottom: 0;
  background: radial-gradient(120% 80% at 50% -10%, #16161a 0%, #000 58%);
  overflow: hidden;
}

.hero__copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0;
}

.hero__eyebrow {
  display: flex;
  flex-direction: column;
  color: var(--glyph);
  margin-bottom: 22px;
}

.hero__headline {
  margin: 0 0 30px;
  color: var(--glyph);
}

.hero__release {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--glyph-secondary);
  margin-bottom: 10px;
}

.hero__release-value {
  color: var(--glyph);
  font-weight: 600;
}

.hero__star {
  color: var(--glyph-tertiary);
  font-size: 0.75em;
}

.hero__price {
  font-size: 14px;
  line-height: 1.2857742857;
  letter-spacing: -0.016em;
  color: var(--glyph-secondary);
  margin-bottom: 26px;
}

.hero__actions {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.hero__download {
  min-width: 132px;
}

.hero__download-icon {
  width: 16px;
  height: 16px;
  flex: none;
}

.hero__link {
  font-size: 17px;
  letter-spacing: -0.022em;
}

.hero__media {
  margin-top: 64px;
}

.hero__sosumi {
  display: block;
  margin-top: 56px;
  text-align: center;
  font-size: 12px;
  line-height: 1.3333733333;
  letter-spacing: -0.01em;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .hero {
    padding-top: calc(var(--localnav-height) + 64px);
  }
  .hero__headline {
    margin-bottom: 24px;
  }
  .hero__media {
    margin-top: 48px;
  }
  .hero__sosumi {
    margin-top: 40px;
  }
}

@media (max-width: 734px) {
  .hero {
    padding-top: calc(var(--localnav-height) + 48px);
  }
  .hero__eyebrow {
    margin-bottom: 16px;
  }
  .hero__headline {
    margin-bottom: 20px;
  }
  .hero__actions {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
