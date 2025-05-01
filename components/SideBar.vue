<template>
  <div 
    :class="[
      'bg-white border-l border-gray-200 fixed top-16 right-0 overflow-y-auto h-[calc(100vh-4rem)] transition-all duration-300',
      isCollapsed ? 'w-16' : 'w-64'
    ]" 
    dir="rtl"
  >
    <div :class="['p-4', isCollapsed ? 'px-2' : '']">
      <div class="space-y-6">
        <div class="space-y-2">
          <div v-if="!isCollapsed" class="text-xs font-regular text-gray-400 uppercase">منو</div>
          <NuxtLink to="/" class="flex items-center space-x-2 px-3 py-2 text-purple-600 bg-purple-50 rounded-lg">
            <svg :class="['fill-none', isCollapsed ? 'h-6 w-6' : 'h-5 w-5']" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span v-if="!isCollapsed" class="font-regular">داشبورد</span>
          </NuxtLink>
          <div class="space-y-1">
            <button 
              class="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              @click="isUsersOpen = !isUsersOpen"
            >
              <div class="flex items-center space-x-2">
                <svg :class="['fill-none', isCollapsed ? 'h-6 w-6' : 'h-5 w-5']" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span v-if="!isCollapsed" class="font-regular">کاربران</span>
              </div>
              <svg 
                v-if="!isCollapsed"
                :class="['h-4 w-4 transition-transform duration-200', isUsersOpen ? '-rotate-0' : 'rotate-90']"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div v-if="isUsersOpen && !isCollapsed" class="pr-4 space-y-1">
              <NuxtLink to="/users/list" class="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                مدیریت کاربران
              </NuxtLink>
              <NuxtLink to="/users/register" class="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg">
                ثبت کاربر جدید
              </NuxtLink>
            </div>
          </div>
          <a href="#" class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <svg :class="['fill-none', isCollapsed ? 'h-6 w-6' : 'h-5 w-5']" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="!isCollapsed" class="font-regular">تیم HR</span>
          </a>
          <a href="#" class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <svg :class="['fill-none', isCollapsed ? 'h-6 w-6' : 'h-5 w-5']" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span v-if="!isCollapsed" class="font-regular">دپارتمان‌ها</span>
          </a>
          <a href="#" class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <svg :class="['fill-none', isCollapsed ? 'h-6 w-6' : 'h-5 w-5']" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span v-if="!isCollapsed" class="font-regular">درخواست‌ها</span>
          </a>
          <a href="#" class="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <svg :class="['fill-none', isCollapsed ? 'h-6 w-6' : 'h-5 w-5']" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span v-if="!isCollapsed" class="font-regular">رزومه‌ها</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  isCollapsed: {
    type: Boolean,
    default: false
  }
})

const isUsersOpen = ref(false)
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style>