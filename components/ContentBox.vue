<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <div class="border-b border-gray-200 px-6 py-4">
      <h2 class="text-m font-semibold text-gray-500">{{ title }}</h2>
    </div>
    <div class="p-6">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 