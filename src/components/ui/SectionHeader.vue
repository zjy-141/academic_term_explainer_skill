<script setup lang="ts">
withDefaults(
  defineProps<{
    headline: string
    links?: { label: string; href: string }[]
  }>(),
  { links: () => [] },
)
</script>

<template>
  <header class="section-header" data-stagger>
    <h2 class="section-header__headline type-headline" data-stagger-item>{{ headline }}</h2>
    <ul v-if="links.length" class="section-header__links" data-stagger-item>
      <li v-for="link in links" :key="link.href + link.label">
        <a class="link-inline" :href="link.href">
          {{ link.label }}
          <span class="chevron" aria-hidden="true">›</span>
        </a>
      </li>
    </ul>
  </header>
</template>
