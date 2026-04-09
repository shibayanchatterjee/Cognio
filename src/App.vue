<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Activities', to: '/activities' },
  { label: 'Parents', to: '/parents' },
  { label: 'Account', to: '/auth' },
]
</script>

<template>
  <div class="app-shell">
    <header class="main-header">
      <div class="brand-block">
        <p class="brand-title">Cognio</p>
        <p class="brand-subtitle">STEM journeys for young learners</p>
      </div>
      <nav class="main-nav" aria-label="Primary">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="main-nav-link"
          active-class="main-nav-link-active"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
