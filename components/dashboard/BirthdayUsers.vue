<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-4">تولدهای این ماه</h2>
    
    <div v-if="loading" class="flex justify-center items-center h-32">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
    </div>

    <div v-else-if="error" class="text-red-600 text-sm">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="users.length === 0" class="text-gray-500 text-sm text-center py-4">
        هیچ کاربری در این ماه تولد ندارد.
      </div>
      
      <div v-else class="space-y-4">
        <div v-for="user in users" :key="user.id" class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div class="w-10 h-10 rounded-full overflow-hidden">
            <img
              v-if="user.avatar"
              :src="user.avatar"
              :alt="user.first_name + ' ' + user.last_name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-gray-200 flex items-center justify-center">
              <span class="text-gray-500 text-sm">{{ getInitials(user.first_name + ' ' + user.last_name) }}</span>
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ user.first_name }} {{ user.last_name }}
            </p>
            <p class="text-xs text-gray-500">
              {{ user.department?.title }}
            </p>
          </div>
          
          <div class="text-sm text-gray-500">
            {{ $formatDateOnly(user.birthdate) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { $api, $formatDateOnly } = useNuxtApp()

const users = ref([])
const loading = ref(true)
const error = ref(null)

const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get('/api/v1/admin/users/jalali-month-birthdate')
    users.value = response.data.users || []
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات'
  } finally {
    loading.value = false
  }
}

const getInitials = (name) => {
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`
  }
  return name[0]
}

onMounted(() => {
  fetchUsers()
})
</script> 