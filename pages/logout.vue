<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
      <p class="text-gray-600">در حال خروج از سیستم...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'empty'
})

const { logout } = useAuth()

onMounted(() => {
  logout()
})
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style> 