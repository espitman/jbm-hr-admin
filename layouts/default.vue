<template>
  <div class="min-h-screen bg-gray-100" dir="rtl">
    <TopNav @toggle-sidebar="isSidebarCollapsed = !isSidebarCollapsed" @logout="handleLogout" />
    <div class="flex pt-16">
      <SideBar :is-collapsed="isSidebarCollapsed" />
      <main :class="['flex-1 p-6', isSidebarCollapsed ? 'mr-16' : 'mr-64']">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const isSidebarCollapsed = ref(false)
const { logout } = useAuth()

const handleLogout = () => {
  logout()
  navigateTo('/login')
}
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style> 