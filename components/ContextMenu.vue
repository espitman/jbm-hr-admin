<template>
  <div
    v-if="isOpen"
    class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
  >
    <div class="py-1" role="menu" aria-orientation="vertical">
      <NuxtLink
        to="/profile"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
        @click="closeMenu"
      >
        پروفایل
      </NuxtLink>
      <button
        class="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem"
        @click="handleLogout"
      >
        خروج
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close' | 'logout'): void
}>()

const closeMenu = () => {
  emit('close')
}

const handleLogout = () => {
  emit('logout')
}

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.context-menu-trigger') && !target.closest('.context-menu')) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.absolute {
  position: absolute;
}
</style> 