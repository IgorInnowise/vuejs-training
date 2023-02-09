<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-todo-black">
    <SiteNavigation></SiteNavigation>
    <RouterView></RouterView>
  </div>
</template>
<script setup lang="ts">
import SiteNavigation from './pages/SiteNavigaton.vue';
</script>
