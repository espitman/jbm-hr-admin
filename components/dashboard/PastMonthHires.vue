<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">همکاران شروع به کار کرده در ماه گذشته</h2>
      <button 
        v-if="users.length > 5"
        @click="showModal = true"
        class="text-sm text-purple-600 hover:text-purple-700 font-medium"
      >
        نمایش همه
      </button>
    </div>
    
    <div v-if="loading" class="flex justify-center items-center h-32">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
    </div>

    <div v-else-if="error" class="text-red-600 text-sm">
      {{ error }}
    </div>

    <div v-else>
      <div v-if="users.length === 0" class="text-gray-500 text-sm text-center py-4">
        هیچ همکاری در ماه گذشته شروع به کار نکرده است.
      </div>
      
      <div v-else>
        <div class="space-y-4">
          <div v-for="user in displayedUsers" :key="user.id" class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
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
              <NuxtLink 
                :to="`/users/${user.id}`"
                class="text-sm font-medium text-gray-900 truncate flex items-center gap-2 hover:text-purple-600 transition-colors"
              >
                {{ user.first_name }} {{ user.last_name }}
                <span v-if="isDateToday(user.cooperation_start_date)" class="text-purple-600 inline-flex" title="شروع همکاری امروز">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>
              </NuxtLink>
              <p class="text-xs text-gray-500">
                {{ user.department?.title }}
              </p>
            </div>
            
            <div class="text-sm text-gray-500">
              {{ $formatDateOnly(user.cooperation_start_date) }}
            </div>
            <div class="text-sm text-gray-500">
              {{ user.cooperation_duration }} سال
            </div>
          </div>
        </div>
      </div>
    </div>

    <BaseModal
      :is-open="showModal"
      title="همکاران شروع به کار کرده در ماه گذشته"
      size="lg"
      @close="showModal = false"
    >
      <div class="space-y-4 max-h-[60vh] overflow-y-auto">
        <div v-for="user in sortedUsers" :key="user.id" class="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
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
            <NuxtLink 
              :to="`/users/${user.id}`"
              class="text-sm font-medium text-gray-900 truncate flex items-center gap-2 hover:text-purple-600 transition-colors"
            >
              {{ user.first_name }} {{ user.last_name }}
              <span v-if="isDateToday(user.cooperation_start_date)" class="text-purple-600 inline-flex" title="شروع همکاری امروز">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </NuxtLink>
            <p class="text-xs text-gray-500">
              {{ user.department?.title }}
            </p>
          </div>
          
          <div class="text-sm text-gray-500">
            {{ $formatDateOnly(user.cooperation_start_date) }}
          </div>
          <div class="text-sm text-gray-500">
            {{ user.cooperation_duration }} سال
          </div>
        </div>
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BaseModal from '~/components/BaseModal.vue'

const { $api, $formatDateOnly } = useNuxtApp()

const users = ref([])
const loading = ref(true)
const error = ref(null)
const showModal = ref(false)

const isDateToday = (date) => {
  const today = new Date()
  const checkDate = new Date(date)
  return today.getDate() === checkDate.getDate() && 
         today.getMonth() === checkDate.getMonth()
}

const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get('/api/v1/admin/users/jalali-month-cooperation-start-date')
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

const sortedUsers = computed(() => {
  return [...users.value].sort((a, b) => {
    const dateA = new Date(a.cooperation_start_date)
    const dateB = new Date(b.cooperation_start_date)
    
    // Get month and day as numbers
    const monthA = dateA.getMonth() + 1
    const monthB = dateB.getMonth() + 1
    const dayA = dateA.getDate()
    const dayB = dateB.getDate()
    
    // Compare months first
    if (monthA !== monthB) {
      return monthA - monthB
    }
    
    // If months are the same, compare days
    return dayA - dayB
  })
})

const displayedUsers = computed(() => {
  return sortedUsers.value.slice(0, 5)
})

onMounted(() => {
  fetchUsers()
})
</script> 