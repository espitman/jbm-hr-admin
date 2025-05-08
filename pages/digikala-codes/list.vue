<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-purple-700">کدهای دیجی‌کالا</h1>
      <button
        @click="showCreateModal = true"
        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
      >
        ایجاد کد جدید
      </button>
    </div>

    <CreateCodeModal
      :is-open="showCreateModal"
      @close="showCreateModal = false"
      @created="fetchCodes"
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
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">شناسه</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ ایجاد</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ تخصیص</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کاربر تخصیص داده شده</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="code in codes" :key="code.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ code.id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span :class="code.used ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                  {{ code.used ? 'استفاده شده' : 'فعال' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ $formatDate(code.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ code.assign_at ? $formatDate(code.assign_at) : '-' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ code.assigned_to_user?.full_name || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination
        v-model:current-page="currentPage"
        :total-items="total"
        :per-page="perPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import CreateCodeModal from '@/components/digikala-codes/CreateCodeModal.vue'
import Pagination from '@/components/Pagination.vue'

const { $api, $formatDate } = useNuxtApp()
const route = useRoute()
const router = useRouter()
const codes = ref([])
const loading = ref(true)
const error = ref(null)
const showCreateModal = ref(false)
const currentPage = ref(1)
const total = ref(0)
const perPage = 10

const fetchCodes = async (page = 1) => {
  try {
    loading.value = true
    error.value = null
    const res = await $api.get(`/api/v1/admin/digikala-codes?page=${page}`)
    codes.value = res.data.items || []
    total.value = res.data.total
    currentPage.value = page
  } catch (e) {
    error.value = e.message || 'خطا در دریافت کدها'
  } finally {
    loading.value = false
  }
}

// Watch for route query changes
watch(
  () => route.query,
  async (newQuery) => {
    if (newQuery.page) {
      currentPage.value = parseInt(newQuery.page)
    } else {
      currentPage.value = 1
    }
    await fetchCodes(currentPage.value)
  },
  { immediate: true }
)

// When currentPage changes, update the route query
watch(
  () => currentPage.value,
  (newPage) => {
    const query = { ...route.query, page: newPage }
    router.push({ query })
  }
)

onMounted(() => {
  // Initial page will be set by the route query watcher
})
</script> 