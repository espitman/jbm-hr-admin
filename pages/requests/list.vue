<template>
  <div class="container mx-auto p-1">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-purple-700">درخواست‌ها</h1>
    </div>

    <Filters
      :kind="filters.kind"
      :status="filters.status"
      :user-id="filters.userId"
      :kinds="$request.getRequestKinds()"
      @update:kind="val => filters.kind = val"
      @update:status="val => filters.status = val"
      @update:userId="val => filters.userId = val"
      @clear="clearFilters"
      :default-user-id="defaultUserId"
    />

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
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Filters from '~/components/requests/Filters.vue'

const route = useRoute()
const router = useRouter()
const { $request, $api } = useNuxtApp()
const requests = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const perPage = ref(10)
const totalCount = ref(0)

const filters = ref({
  kind: '',
  status: '',
  userId: ''
})

const defaultUserId = computed(() => route.query.user_id || '')

const fetchRequests = async () => {
  try {
    loading.value = true
    error.value = null
    const params = {
      page: currentPage.value,
      page_size: perPage.value
    }

    if (filters.value.kind) params.kind = filters.value.kind
    if (filters.value.status) params.status = filters.value.status
    if (filters.value.userId) params.user_id = filters.value.userId

    const response = await $api.get('/api/v1/admin/requests', params)
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

// Watch for filter changes
watch(
  () => filters.value.kind,
  async (newKind) => {
    const query = { ...route.query, page: 1 }
    if (newKind) query.kind = newKind
    else delete query.kind
    await router.push({ query })
    await fetchRequests()
  }
)

watch(
  () => filters.value.status,
  async (newStatus) => {
    const query = { ...route.query, page: 1 }
    if (newStatus) query.status = newStatus
    else delete query.status
    await router.push({ query })
    await fetchRequests()
  }
)

watch(
  () => filters.value.userId,
  async (newUserId) => {
    const query = { ...route.query, page: 1 }
    if (newUserId) query.user_id = newUserId
    else delete query.user_id
    await router.push({ query })
    await fetchRequests()
  }
)

// Watch for route query changes
watch(
  () => route.query,
  async (newQuery) => {
    if (newQuery.page) {
      const page = parseInt(newQuery.page)
      if (page !== currentPage.value) {
        currentPage.value = page
      }
    }
    filters.value.kind = newQuery.kind || ''
    filters.value.status = newQuery.status || ''
    filters.value.userId = newQuery.user_id || ''
    await fetchRequests()
  },
  { deep: true }
)

// Watch for currentPage changes
watch(
  () => currentPage.value,
  async (newPage) => {
    const query = { ...route.query, page: newPage }
    await router.push({ query })
    await fetchRequests()
  }
)

const clearFilters = () => {
  filters.value.kind = ''
  filters.value.status = ''
  filters.value.userId = ''
}

onMounted(async () => {
  // Initialize filters and page from URL if available
  if (route.query.page) {
    currentPage.value = parseInt(route.query.page)
  }
  if (route.query.kind) filters.value.kind = route.query.kind
  if (route.query.status) filters.value.status = route.query.status
  if (route.query.user_id) filters.value.userId = route.query.user_id
  await fetchRequests()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 