<template>
  <nav id="top-nav" class="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50" dir="rtl">
    <div id="nav-container" class="w-full">
      <div id="nav-content" class="flex h-16">
        <div id="nav-left-section" class="w-64 flex items-center justify-start pr-4" dir="rtl">
          <div id="logo-container" class="ml-4">
            <img src="~/public/images/jabama.svg" alt="Jabama" class="h-8" />
          </div>
          <span class="text-gray-700 font-medium">مدیریت منابع انسانی</span>
        </div>
        <div id="nav-right-section" class="flex-1 flex items-center space-x-4 pl-4 border-r border-gray-200">
          <button id="menu-toggle" class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer" @click="$emit('toggle-sidebar')">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div class="flex-1"></div>
          <button id="layout-toggle" class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer" @click="toggleFullscreen">
            <svg v-if="!isFullscreen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4v4H4m0 0l5-5m-5 5h4m8 0h-4v4m4-4l-5-5m5 5v4m-8 8v-4H4m0 0l5 5m-5-5h4m8 0h-4v-4m4 4l-5 5m5-5h-4" />
            </svg>
          </button>
          <div id="nav-actions" class="flex items-center space-x-4">
            <button id="notifications-btn" class="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button id="profile-btn" class="flex items-center space-x-2 cursor-pointer">
              <img class="h-8 w-8 rounded-full" src="~/public/images/avatar.jpg" alt="User avatar" />
            </button>
            <button id="settings-btn" class="p-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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