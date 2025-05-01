<template>
  <nav class="fixed top-0 right-0 left-0 z-40 bg-white border-b border-gray-200">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <button
            @click="$emit('toggle-sidebar')"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div class="flex items-center space-x-4">
          <button
            class="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
            @click="toggleFullscreen"
          >
            <svg v-if="!isFullscreen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4v4H4m0 0l5-5m-5 5h4m8 0h-4v4m4-4l-5-5m5 5v4m-8 8v-4H4m0 0l5 5m-5-5h4m8 0h-4v-4m4 4l-5 5m5-5h-4" />
            </svg>
          </button>
          <button class="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div class="relative context-menu-trigger ml-4">
            <button
              @click="toggleProfileMenu"
              class="flex items-center text-sm rounded-full focus:ring-4 focus:ring-gray-300"
              type="button"
            >
              <span class="sr-only">Open user menu</span>
              <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <span class="text-white font-medium">{{ userInitials }}</span>
              </div>
            </button>
            <ContextMenu
              :is-open="isProfileMenuOpen"
              class="context-menu"
              @close="closeProfileMenu"
              @logout="$emit('logout')"
            />
          </div>
          <button class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'

const { user } = useAuth()
const isProfileMenuOpen = ref(false)
const isFullscreen = ref(false)

const updateFullscreenStatus = () => {
  isFullscreen.value = !!document.fullscreenElement
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
}

const userInitials = computed(() => {
  if (!user.value?.name) return '?'
  return user.value.name
    .split(' ')
    .map((word: string) => word[0])
    .join('')
    .toUpperCase()
})

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value
}

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false
}

onMounted(() => {
  document.addEventListener('fullscreenchange', updateFullscreenStatus)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', updateFullscreenStatus)
})
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style> 