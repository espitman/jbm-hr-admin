<template>
  <div class="container mx-auto p-0">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-purple-700">رزومه‌ها</h1>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <div v-else>
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                معرفی شده
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                شماره تماس معرفی شده
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                موقعیت شغلی
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                وضعیت
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                تاریخ ثبت
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="resume in resumes" :key="resume.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ resume.introduced_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ resume.introduced_phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ resume.position }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="getStatusClass(resume.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ getStatusText(resume.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(resume.created_at) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <NuxtLink
                  :to="`/resumes/${resume.id}`"
                  class="text-purple-600 hover:text-purple-900 ml-4 cursor-pointer"
                >
                  <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </NuxtLink>
                <button
                  class="text-green-600 hover:text-green-900 cursor-pointer"
                  @click="downloadResume(resume)"
                >
                  <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { $api, $formatDate } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const resumes = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const perPage = ref(10)
const totalCount = ref(0)

const filters = ref({
  status: '',
  userId: ''
})

const fetchResumes = async () => {
  try {
    loading.value = true
    error.value = null
    const params = {
      page: currentPage.value,
      page_size: perPage.value
    }

    if (filters.value.status) params.status = filters.value.status
    if (filters.value.userId) params.user_id = filters.value.userId

    const response = await $api.get('/api/v1/admin/resumes', params)
    resumes.value = response.data.items
    totalCount.value = response.data.total
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات رزومه‌ها'
  } finally {
    loading.value = false
  }
}

// Watch for route query changes
watch(
  () => route.query,
  async (newQuery) => {
    // Update filters from query
    filters.value.status = newQuery.status || ''
    filters.value.userId = newQuery.user_id || ''
    if (newQuery.page) {
      currentPage.value = parseInt(newQuery.page)
    } else {
      currentPage.value = 1
    }
    await fetchResumes()
  },
  { immediate: true }
)

// When filters change, update the route query (do not call fetchResumes directly)
watch(
  () => [filters.value.status, filters.value.userId],
  ([status, userId]) => {
    const query = { ...route.query, page: 1 }
    if (status) query.status = status; else delete query.status
    if (userId) query.user_id = userId; else delete query.user_id
    router.push({ query })
  }
)

// When currentPage changes, update the route query (do not call fetchResumes directly)
watch(
  () => currentPage.value,
  (newPage) => {
    const query = { ...route.query, page: newPage }
    router.push({ query })
  }
)

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
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
    case 'approved':
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

const downloadResume = async (resume) => {
  try {
    // Get presigned URL
    const response = await $api.get(`/api/v1/upload/presigned/${resume.file}`)
    const presignedUrl = response.data.url

    // Download the file using the presigned URL
    const link = document.createElement('a')
    link.href = presignedUrl
    link.download = `resume-${resume.introduced_name}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error downloading file:', error)
    alert('خطا در دانلود فایل')
  }
}

onMounted(() => {
  fetchResumes()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 