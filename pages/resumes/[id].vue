<template>
  <div class="container mx-auto p-0">
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
              <div v-if="resume.introduced_avatar" class="w-16 h-16">
                <img
                  :src="resume.introduced_avatar"
                  :alt="resume.introduced_name"
                  class="w-full h-full rounded-full object-cover"
                />
              </div>
              <div v-else class="w-16 h-16">
                <img
                  :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(resume.introduced_name)}&background=amber-500&color=fff`"
                  :alt="resume.introduced_name"
                  class="w-full h-full rounded-full object-cover"
                />
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
                <div v-if="loadingPdf" class="flex flex-col items-center">
                  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p class="text-gray-500">در حال بارگذاری رزومه...</p>
                </div>
                <iframe
                  v-else-if="pdfUrl"
                  :src="`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`"
                  class="w-full h-full"
                  frameborder="0"
                ></iframe>
                <button
                  v-else
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
          <ContentBox title="معرفی شده توسط">
            <div class="flex items-center space-x-4 space-x">
              <div v-if="resume.user.avatar" class="w-12 h-12">
                <img
                  :src="resume.user.avatar"
                  :alt="resume.user.first_name + ' ' + resume.user.last_name"
                  class="w-full h-full rounded-full object-cover"
                />
              </div>
              <div v-else class="w-12 h-12">
                <img
                  :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(resume.user.first_name + ' ' + resume.user.last_name)}&background=amber-500&color=fff`"
                  :alt="resume.user.first_name + ' ' + resume.user.last_name"
                  class="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ resume.user.first_name }} {{ resume.user.last_name }}
                </p>
                <p class="text-xs text-gray-500">{{ resume.user.email }}</p>
              </div>
            </div>
          </ContentBox>

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
import { useNuxtApp } from '#app'

const { $api, $formatDate } = useNuxtApp()
const route = useRoute()
const resume = ref(null)
const loading = ref(true)
const error = ref(null)
const pdfUrl = ref(null)
const loadingPdf = ref(false)

const fetchResume = async () => {
  try {
    loading.value = true
    error.value = null
    const res = await $api.get(`/api/v1/admin/resumes/${route.params.id}`)
    resume.value = res.data
  } catch (e) {
    error.value = e.message || 'خطا در دریافت اطلاعات رزومه'
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
  return $formatDate(date)
}

const viewResume = async () => {
  try {
    loadingPdf.value = true
    // Get presigned URL
    const response = await $api.get(`/api/v1/upload/presigned/${resume.value.file}`)
    pdfUrl.value = response.data.url
  } catch (error) {
    console.error('Error loading PDF:', error)
    alert('خطا در مشاهده فایل')
  } finally {
    loadingPdf.value = false
  }
}

const downloadResume = async () => {
  try {
    // Get presigned URL
    const response = await $api.get(`/api/v1/upload/presigned/${resume.value.file}`)
    const presignedUrl = response.data.url

    // Download the file using the presigned URL
    const link = document.createElement('a')
    link.href = presignedUrl
    link.download = `resume-${resume.value.introduced_name}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading file:', error)
    alert('خطا در دانلود فایل')
  }
}

onMounted(() => fetchResume())
</script>

<style>
@import "~/assets/css/main.css";
</style> 