<template>
  <div
    v-if="isOpen"
    class="absolute left-0 mt-2 w-64 rounded-lg shadow-lg bg-white ring-1 ring-gray-200 ring-opacity-5 z-50 py-2"
  >
    <!-- User Info Section -->
    <div class="px-4 py-3 border-b border-gray-100">
      <div class="text-base font-medium text-gray-800">{{ userName }}</div>
      <div class="text-sm text-gray-500">{{ userRole }}</div>
    </div>

    <!-- Menu Items -->
    <div class="py-1" role="menu">
      <NuxtLink
        to="/profile"
        class="flex items-center px-4 py-2 text-xs font-light text-gray-500 hover:bg-gray-100"
        role="menuitem"
        @click="closeMenu"
      >
        <svg class="ml-3 h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        پروفایل
      </NuxtLink>

      <NuxtLink
        to="/settings"
        class="flex items-center px-4 py-2 text-xs font-light text-gray-500 hover:bg-gray-100"
        role="menuitem"
        @click="closeMenu"
      >
        <svg class="ml-3 h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        تنظیمات
      </NuxtLink>

      <NuxtLink
        to="/messages"
        class="flex items-center px-4 py-2 text-xs font-light text-gray-500 hover:bg-gray-100"
        role="menuitem"
        @click="closeMenu"
      >
        <svg class="ml-3 h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        پیام‌ها
      </NuxtLink>

      <div class="border-t border-gray-100 my-1"></div>

      <button
        class="flex w-full items-center px-4 py-2 text-xs font-light text-gray-500 hover:bg-gray-100"
        role="menuitem"
        @click="handleLogout"
      >
        <svg class="ml-3 h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        خروج
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { useAuth } from '~/composables/useAuth'

const _props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'logout'])

const { user } = useAuth()

const userName = computed(() => user.value?.name || '')
const userRole = computed(() => 'Admin')

const closeMenu = () => {
  emit('close')
}

const handleLogout = () => {
  emit('logout')
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
  const target = event.target
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