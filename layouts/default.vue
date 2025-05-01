<template>
  <div class="min-h-screen bg-gray-100" dir="rtl">
    <TopNav />
    <div class="flex">
      <SideBar />
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
// No additional setup needed as components are auto-imported in Nuxt
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style> 