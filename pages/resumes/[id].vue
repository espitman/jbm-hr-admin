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

    <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <h3 class="text-sm font-medium text-gray-500">معرفی شده</h3>
              <p class="mt-1 text-sm text-gray-900">{{ resume.introduced_name }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">شماره تماس معرفی شده</h3>
              <p class="mt-1 text-sm text-gray-900">{{ resume.introduced_phone }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">موقعیت شغلی</h3>
              <p class="mt-1 text-sm text-gray-900">{{ resume.position }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">وضعیت</h3>
              <span :class="getStatusClass(resume.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                {{ getStatusText(resume.status) }}
              </span>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <h3 class="text-sm font-medium text-gray-500">تاریخ ثبت</h3>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(resume.created_at) }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">آخرین بروزرسانی</h3>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(resume.updated_at) }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-500">فایل رزومه</h3>
              <div class="mt-2 flex space-x-4">
                <button
                  @click="viewResume"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  مشاهده
                </button>
                <button
                  @click="downloadResume"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  دانلود
                </button>
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