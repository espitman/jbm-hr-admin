<template>
  <div class="max-w-xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
    <h1 class="text-2xl font-bold mb-6">جزئیات کاربر</h1>
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
    </div>
    <div v-else-if="error" class="text-red-600 text-center py-8">
      {{ error }}
    </div>
    <div v-else-if="user">
      <div class="mb-4">
        <span class="font-medium">نام و نام خانوادگی:</span>
        <span class="ml-2">{{ user.first_name }} {{ user.last_name }}</span>
      </div>
      <div class="mb-4">
        <span class="font-medium">ایمیل:</span>
        <span class="ml-2">{{ user.email }}</span>
      </div>
      <div class="mb-4">
        <span class="font-medium">شماره موبایل:</span>
        <span class="ml-2">{{ user.phone }}</span>
      </div>
      <div class="mb-4">
        <span class="font-medium">نقش:</span>
        <span class="ml-2">{{ user.role === 'admin' ? 'مدیر' : 'کارمند' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { $api } = useNuxtApp()

const user = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchUser = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get(`/api/v1/admin/users/${route.params.id}`)
    user.value = response.data
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات کاربر'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUser()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 