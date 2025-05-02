<template>
  <div class="p-1">
    <h1 class="text-xl font-bold text-purple-700 mb-6">تیم منابع انسانی</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-red-600 text-center py-8">
        {{ error }}
      </div>

      <!-- HR Team table -->
      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نام و نام خانوادگی
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ایمیل
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  شماره موبایل
                </th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نقش
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="member in hrTeam" :key="member.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ member.full_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ member.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ member.phone }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {{ member.role }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <NuxtLink 
                    :to="`/users/${member.id}`" 
                    class="text-purple-600 hover:text-purple-900"
                  >
                    ویرایش
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { $api } = useNuxtApp()

const hrTeam = ref([])
const loading = ref(true)
const error = ref(null)

const fetchHRTeam = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get('/api/v1/hr-team')
    hrTeam.value = response.data || []
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات تیم منابع انسانی'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchHRTeam()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 