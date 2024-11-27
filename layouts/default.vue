<template>
  <div class="main-layout">
    <Header />
    <div class="docs-main">
      <ClientOnly>
        <NuxtPage />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
</script>

<style>
.main-layout {
  height: 100vh;
}
</style>
