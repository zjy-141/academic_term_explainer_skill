<script setup lang="ts">
import { recursion } from '../../data/content'
import StorySection from '../ui/StorySection.vue'
</script>

<template>
  <StorySection
    section-id="recursion"
    ghost="M5"
    :eyebrow="recursion.eyebrow"
    :headline="recursion.headline"
    :intro="recursion.intro"
  >
    <div class="recursion" data-stagger>
      <div class="tree glass-card" data-stagger-item>
        <div class="tree__root">
          <p class="tree__label mono">主术语 · 第 1 层</p>
          <p class="tree__name">{{ recursion.tree.root.name }}</p>
          <p class="tree__en mono">{{ recursion.tree.root.en }}</p>
        </div>

        <div class="tree__connector" aria-hidden="true"><span></span></div>

        <div class="tree__children">
          <div v-for="child in recursion.tree.children" :key="child.name" class="branch">
            <div class="branch__node">
              <p class="tree__label mono">递归 · 第 2 层</p>
              <p class="branch__name">{{ child.name }}</p>
              <p class="tree__en mono">{{ child.en }}</p>
            </div>
            <div class="branch__leaves">
              <span v-for="leaf in child.leaves" :key="leaf" class="leaf">{{ leaf }}</span>
            </div>
          </div>
        </div>

        <p class="tree__stop mono">深度上限 = 2 · 递归层不再触发新递归</p>
      </div>

      <aside class="recursion__aside" data-stagger-item>
        <p class="aside__label mono">递归约束</p>
        <dl class="rrules">
          <div v-for="rule in recursion.rules" :key="rule.k" class="rrules__row">
            <dt>{{ rule.k }}</dt>
            <dd>{{ rule.v }}</dd>
          </div>
        </dl>
        <p class="aside__foot">
          已解释过的术语、普通词汇、不阻碍理解的词，不会被重复拉进递归队列。
        </p>
      </aside>
    </div>
  </StorySection>
</template>

<style scoped>
.recursion {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 0.65fr);
  gap: 20px;
  align-items: start;
}

.tree {
  padding: 34px;
  border-radius: var(--radius-card);
  display: grid;
  gap: 0;
}

.tree__root,
.branch__node {
  padding: 22px 24px;
  border-radius: var(--radius-card-small);
  background: linear-gradient(160deg, rgba(41, 151, 255, 0.2), rgba(255, 255, 255, 0.02));
  box-shadow: inset 0 0 0 1px rgba(41, 151, 255, 0.35);
}

.tree__label {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--glyph-secondary);
  margin-bottom: 8px;
}

.tree__name {
  font-family: var(--font-display);
  font-size: 28px;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.007em;
  color: var(--glyph);
}

.tree__en {
  margin-top: 6px;
  font-size: 12px;
  color: var(--glyph-secondary);
  letter-spacing: 0.02em;
}

.tree__connector {
  display: flex;
  justify-content: center;
  height: 34px;
}

.tree__connector span {
  width: 1px;
  height: 100%;
  background: linear-gradient(180deg, rgba(41, 151, 255, 0.6), rgba(255, 255, 255, 0.16));
}

.tree__children {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  position: relative;
}

.tree__children::before {
  content: '';
  position: absolute;
  top: -17px;
  left: 25%;
  right: 25%;
  height: 1px;
  background: rgba(255, 255, 255, 0.16);
}

.branch {
  display: grid;
  gap: 10px;
}

.branch__node {
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  padding: 18px 20px;
}

.branch__name {
  font-family: var(--font-display);
  font-size: 19px;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: 0.011em;
  color: var(--glyph);
}

.branch__leaves {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-left: 4px;
}

.leaf {
  font-size: 12px;
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  color: var(--glyph-secondary);
  background: rgba(255, 255, 255, 0.07);
}

.tree__stop {
  margin-top: 26px;
  padding-top: 18px;
  border-top: 1px dashed rgba(255, 255, 255, 0.14);
  font-size: 11px;
  color: var(--glyph-tertiary);
  letter-spacing: 0.04em;
}

.recursion__aside {
  padding: 30px;
  border-radius: var(--radius-card);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.09);
  display: grid;
  gap: 18px;
  align-content: start;
}

.aside__label {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--glyph-secondary);
}

.rrules {
  display: grid;
}

.rrules__row {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 13px;
  line-height: 1.45;
}

.rrules__row dt {
  color: var(--glyph-tertiary);
}

.rrules__row dd {
  margin: 0;
  color: var(--glyph-alt);
}

.aside__foot {
  font-size: 12px;
  line-height: 1.6;
  color: var(--glyph-tertiary);
}

@media (max-width: 1068px) {
  .recursion {
    grid-template-columns: 1fr;
  }
  .tree {
    padding: 24px;
  }
  .recursion__aside {
    padding: 24px;
  }
  .tree__name {
    font-size: 24px;
  }
}

@media (max-width: 734px) {
  .tree__children {
    grid-template-columns: 1fr;
  }
  .tree__children::before {
    display: none;
  }
  .rrules__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
