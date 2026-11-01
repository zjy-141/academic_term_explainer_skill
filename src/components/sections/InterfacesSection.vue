<script setup lang="ts">
import { interfaces } from '../../data/content'
import TypeLockup from '../ui/TypeLockup.vue'
</script>

<template>
  <section id="interfaces" class="section interfaces theme-dark" aria-label="学科接口">
    <div class="viewport-content">
      <TypeLockup
        :eyebrow="interfaces.eyebrow"
        :lines="interfaces.headline"
        :intro="interfaces.intro"
        size="xl"
      />

      <ul class="ports" data-stagger>
        <li v-for="port in interfaces.ports" :key="port.name" class="port" data-stagger-item>
          <div class="port__socket" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>
          <p class="port__name">{{ port.name }}</p>
          <p class="port__role mono">{{ port.role }}</p>
          <p class="port__desc">{{ port.desc }}</p>
        </li>
      </ul>

      <div class="fields" data-reveal>
        <p class="fields__label mono">{{ interfaces.fieldsTitle }}</p>
        <ul class="fields__list">
          <li v-for="field in interfaces.fields" :key="field" class="field">{{ field }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.interfaces {
  background: var(--bg-dark);
}

.ports {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 64px;
}

.port {
  padding: 28px 24px 30px;
  border-radius: var(--radius-card-small);
  background: linear-gradient(165deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.015));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09);
  display: grid;
  gap: 10px;
  align-content: start;
  transition: box-shadow var(--dur-base) var(--ease-out);
}

.port:hover {
  box-shadow:
    inset 0 0 0 1px rgba(41, 151, 255, 0.45),
    0 24px 60px -40px rgba(41, 151, 255, 0.8);
}

.port__socket {
  display: flex;
  gap: 5px;
  margin-bottom: 14px;
}

.port__socket span {
  width: 26px;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.22);
}

.port__socket span:nth-child(2) {
  background: rgba(41, 151, 255, 0.7);
}

.port__name {
  font-family: var(--font-display);
  font-size: 21px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.011em;
  color: var(--glyph);
}

.port__role {
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--link-dark);
}

.port__desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--glyph-secondary);
}

.fields {
  margin-top: 40px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.fields__label {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--glyph-secondary);
  margin-bottom: 18px;
}

.fields__list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.field {
  font-size: 13px;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  color: var(--glyph-secondary);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.07);
  transition:
    color var(--dur-fast) var(--ease-out),
    background-color var(--dur-fast) var(--ease-out);
}

.field:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

@media (max-width: 1068px) {
  .ports {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-top: 44px;
  }
}

@media (max-width: 734px) {
  .ports {
    grid-template-columns: 1fr;
  }
  .field {
    font-size: 12px;
    padding: 6px 11px;
  }
}
</style>
