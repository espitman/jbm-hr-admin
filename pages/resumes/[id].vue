<template>
  <div class="container mx-auto p-1">
    <div class="mb-6">
      <h1 class="text-xl font-bold text-purple-700">جزئیات رزومه</h1>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <div v-else class="space-y-6">
      <!-- Introduced Person Card -->
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4 space-x">
              <div class="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-900">{{ resume.introduced_name }}</h2>
                <p class="text-sm text-gray-500">{{ resume.introduced_phone }}</p>
                <p class="text-sm text-gray-700 mt-1">موقعیت شغلی: {{ resume.position }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <span :class="getStatusClass(resume.status)" class="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full">
                {{ getStatusText(resume.status) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-4 gap-6">
        <!-- Left Side (3/4) -->
        <div class="col-span-3">
          <div class="bg-white shadow-md rounded-lg overflow-hidden h-full">
            <div class="p-6">
              <div class="h-[calc(100vh-400px)] flex items-center justify-center bg-gray-50 rounded-lg">
                <button
                  @click="viewResume"
                  class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  مشاهده رزومه
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side (1/4) -->
        <div class="space-y-6">
          <!-- Download Button -->
          <button
            @click="downloadResume"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            دانلود رزومه
          </button>

          <!-- Introduced By Card -->
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="p-6">
              <h3 class="text-sm font-medium text-gray-500 mb-4">معرفی شده توسط</h3>
              <div class="flex items-center space-x-4 space-x">
                <img
                  :src="resume.user.avatar"
                  :alt="resume.user.first_name + ' ' + resume.user.last_name"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p class="text-sm font-medium text-gray-900">
                    {{ resume.user.first_name }} {{ resume.user.last_name }}
                  </p>
                  <p class="text-xs text-gray-500">{{ resume.user.email }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeline Card -->
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <div class="p-6">
              <h3 class="text-sm font-medium text-gray-500 mb-4">تاریخچه</h3>
              <div class="space-y-4">
                <div>
                  <p class="text-xs text-gray-500">تاریخ ثبت</p>
                  <p class="text-sm text-gray-900">{{ formatDate(resume.created_at) }}</p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">آخرین بروزرسانی</p>
                  <p class="text-sm text-gray-900">{{ formatDate(resume.updated_at) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const resume = ref(null)
const loading = ref(true)
const error = ref(null)
const { $api } = useNuxtApp()

const fetchResume = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get(`/api/v1/admin/resumes/${route.params.id}`)
    resume.value = response.data
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات رزومه'
  } finally {
    loading.value = false
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'reviewed':
      return 'bg-blue-100 text-blue-800'
    case 'accepted':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'در انتظار بررسی'
    case 'reviewed':
      return 'بررسی شده'
    case 'accepted':
      return 'تایید شده'
    case 'rejected':
      return 'رد شده'
    default:
      return status
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const viewResume = () => {
  window.open(resume.value.file, '_blank')
}

const downloadResume = () => {
  const link = document.createElement('a')
  link.href = resume.value.file
  link.download = `resume-${resume.value.introduced_name}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  fetchResume()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 