<template>
  <div class="container mx-auto p-1">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-purple-700">درخواست‌ها</h1>
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
                نام و نام خانوادگی
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                نوع درخواست
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
            <tr v-for="request in requests" :key="request.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ request.full_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ $request.getRequestTypeText(request.kind) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span :class="$request.getStatusClass(request.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ $request.getStatusText(request.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(request.created_at) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <NuxtLink
                  :to="`/requests/${request.id}`"
                  class="text-purple-600 hover:text-purple-900 ml-4 cursor-pointer"
                >
                  <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination
        v-model:current-page="currentPage"
        :total-items="totalCount"
        :per-page="perPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { $request, $api } = useNuxtApp()
const requests = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const perPage = ref(10)
const totalCount = ref(0)

const fetchRequests = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get('/api/v1/admin/requests', {
      page: currentPage.value,
      page_size: perPage.value
    })
    requests.value = response.data.items
    totalCount.value = response.data.total
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات درخواست‌ها'
  } finally {
    loading.value = false
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

// Watch for route query changes
watch(
  () => route.query.page,
  async (newPage) => {
    if (newPage) {
      const page = parseInt(newPage)
      if (page !== currentPage.value) {
        currentPage.value = page
        await fetchRequests()
      }
    }
  }
)

// Watch for currentPage changes
watch(
  () => currentPage.value,
  async (newPage) => {
    await router.push({ query: { ...route.query, page: newPage } })
    await fetchRequests()
  }
)

onMounted(async () => {
  // Initialize page from URL if available
  if (route.query.page) {
    currentPage.value = parseInt(route.query.page)
  }
  await fetchRequests()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 