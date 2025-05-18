<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
    <!-- Users Stats -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">تعداد کاربران</p>
          <p class="text-2xl font-regular mt-1">{{ $toPersianDigits(displayStats.users) }}</p>
        </div>
        <div class="p-3 bg-purple-50 rounded-full">
          <svg class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Requests Stats -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">تعداد درخواست‌ها</p>
          <p class="text-2xl font-regular mt-1">{{ $toPersianDigits(displayStats.requests) }}</p>
        </div>
        <div class="p-3 bg-blue-50 rounded-full">
          <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Resumes Stats -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">تعداد رزومه‌ها</p>
          <p class="text-2xl font-regular mt-1">{{ $toPersianDigits(displayStats.resumes) }}</p>
        </div>
        <div class="p-3 bg-green-50 rounded-full">
          <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Departments Stats -->
    <div class="bg-white rounded-lg shadow p-6">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm text-gray-500">تعداد دپارتمان‌ها</p>
          <p class="text-2xl font-regular mt-1">{{ $toPersianDigits(displayStats.departments) }}</p>
        </div>
        <div class="p-3 bg-yellow-50 rounded-full">
          <svg class="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const { $api, $toPersianDigits } = useNuxtApp()

const stats = ref({
  users: 0,
  requests: 0,
  resumes: 0,
  departments: 0
})

const displayStats = ref({
  users: 0,
  requests: 0,
  resumes: 0,
  departments: 0
})

const animateValue = (start, end, duration, key) => {
  const startTime = performance.now()
  const updateValue = (currentTime) => {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    displayStats.value[key] = Math.floor(start + (end - start) * progress)
    
    if (progress < 1) {
      requestAnimationFrame(updateValue)
    }
  }
  requestAnimationFrame(updateValue)
}

const fetchStats = async () => {
  try {
    const response = await $api.get('/api/v1/admin/info/dashboard')
    if (response.success) {
      stats.value = {
        users: response.data.users || 0,
        requests: response.data.requests || 0,
        resumes: response.data.resumes || 0,
        departments: response.data.departments || 0
      }
      
      // Animate each stat
      animateValue(0, stats.value.users, 1000, 'users')
      animateValue(0, stats.value.requests, 1000, 'requests')
      animateValue(0, stats.value.resumes, 1000, 'resumes')
      animateValue(0, stats.value.departments, 1000, 'departments')
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

onMounted(() => {
  fetchStats()
})
</script> 