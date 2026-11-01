<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import GlobalNav from './components/layout/GlobalNav.vue'
import LocalNav from './components/layout/LocalNav.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import HeroSection from './components/sections/HeroSection.vue'
import HighlightsSection from './components/sections/HighlightsSection.vue'
import DesignSection from './components/sections/DesignSection.vue'
import ExtractionSection from './components/sections/ExtractionSection.vue'
import RoutingSection from './components/sections/RoutingSection.vue'
import SearchSection from './components/sections/SearchSection.vue'
import AssemblySection from './components/sections/AssemblySection.vue'
import RecursionSection from './components/sections/RecursionSection.vue'
import ReliabilitySection from './components/sections/ReliabilitySection.vue'
import WorkflowsSection from './components/sections/WorkflowsSection.vue'
import MetricsSection from './components/sections/MetricsSection.vue'
import InterfacesSection from './components/sections/InterfacesSection.vue'
import TrustSection from './components/sections/TrustSection.vue'
import UpgradeSection from './components/sections/UpgradeSection.vue'
import TeamSection from './components/sections/TeamSection.vue'
import ValuesSection from './components/sections/ValuesSection.vue'
import IndexSection from './components/sections/IndexSection.vue'
import { initSiteMotion } from './composables/useSiteMotion'

let dispose: (() => void) | undefined

onMounted(() => {
  dispose = initSiteMotion()
})

onBeforeUnmount(() => dispose?.())
</script>

<template>
  <GlobalNav />
  <LocalNav />
  <main>
    <HeroSection />
    <HighlightsSection />
    <DesignSection />
    <ExtractionSection />
    <RoutingSection />
    <SearchSection />
    <AssemblySection />
    <RecursionSection />
    <ReliabilitySection />
    <WorkflowsSection />
    <MetricsSection />
    <InterfacesSection />
    <TrustSection />
    <UpgradeSection />
    <TeamSection />
    <ValuesSection />
    <IndexSection />
  </main>
  <SiteFooter />
</template>
