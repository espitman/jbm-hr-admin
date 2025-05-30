<template>
  <div class="p-0">
    <h1 class="text-xl font-bold text-purple-700 mb-6">مدیریت کاربران</h1>
    
    <!-- Filters -->
    <UserFilters
      :departments="departments"
      :initial-filters="filters"
      @search="handleSearch"
      @clear="handleClear"
    />

    <div class="bg-white rounded-lg shadow p-6">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-red-600 text-center py-8">
        {{ error }}
      </div>

      <!-- Users table -->
      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  آواتار
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نام و نام خانوادگی
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ایمیل
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  شماره موبایل
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  نقش
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  دپارتمان
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  وضعیت
                </th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                      <img 
                        v-if="user.avatar" 
                        :src="user.avatar" 
                        :alt="`${user.first_name} ${user.last_name}`"
                        class="h-full w-full object-cover"
                      />
                      <div v-else class="h-full w-full flex items-center justify-center bg-gray-200">
                        <span class="text-gray-500 text-lg">{{ user.first_name[0] }}{{ user.last_name[0] }}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.first_name }} {{ user.last_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.phone }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                  :class="[
                    'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  ]">
                    {{ user.role === 'admin' ? 'مدیر' : 'کارمند' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ user.department?.title || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ user.active ? 'فعال' : 'غیرفعال' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <NuxtLink :to="`/users/${user.id}`">
                    <button class="text-purple-600 hover:text-purple-900">
                      <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6h12" />
                        </svg>
                      </div>
                    </button>
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex items-center justify-between">
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          :disabled="currentPage === 1"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          @click="prevPage"
        >
          قبلی
        </button>
        <button
          :disabled="currentPage === totalPages"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          @click="nextPage"
        >
          بعدی
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            نمایش
            <span class="font-medium">{{ (currentPage - 1) * limit + 1 }}</span>
            تا
            <span class="font-medium">{{ Math.min(currentPage * limit, totalItems) }}</span>
            از
            <span class="font-medium">{{ totalItems }}</span>
            نتیجه
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              @click="prevPage"
            >
              <span class="sr-only">قبلی</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              :class="[
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                page === currentPage
                  ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
              ]"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
            <button
              :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              @click="nextPage"
            >
              <span class="sr-only">بعدی</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserFilters from '~/components/user/UserFilters.vue'

const { $api } = useNuxtApp()
const route = useRoute()
const router = useRouter()

// State
const users = ref([])
const loading = ref(true)
const error = ref(null)
const currentPage = ref(1)
const limit = ref(10)
const totalItems = ref(0)
const totalPages = ref(0)
const departments = ref([])

// Filters
const filters = ref({
  full_name: '',
  personnel_number: '',
  national_code: '',
  phone: '',
  role: '',
  department_id: ''
})

// Methods
const fetchUsers = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get('/api/v1/admin/users', {
      page: currentPage.value,
      limit: limit.value,
      ...filters.value
    })
    users.value = response.data.users
    totalItems.value = response.data.total
    totalPages.value = Math.ceil(totalItems.value / limit.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const fetchDepartments = async () => {
  try {
    const response = await $api.get('/api/v1/departments')
    departments.value = response.data.departments || []
  } catch (err) {
    console.error('Error fetching departments:', err)
  }
}

const updatePage = (page) => {
  currentPage.value = page
  // Update URL query parameter
  router.push({
    query: { 
      ...route.query,
      page: page,
      ...filters.value
    }
  })
  // Fetch data immediately
  fetchUsers()
}

const handleSearch = (newFilters) => {
  // Update filters
  filters.value = { ...newFilters }
  // Reset to first page
  currentPage.value = 1
  
  // Filter out empty values
  const queryParams = Object.entries(newFilters).reduce((acc, [key, value]) => {
    if (value !== '') {
      acc[key] = value
    }
    return acc
  }, { page: 1, _fromButton: true })

  // Update URL with non-empty filters
  router.push({ query: queryParams })
  
  // Fetch data with new filters
  fetchUsers()
}

const handleClear = () => {
  // Clear filters
  filters.value = {
    full_name: '',
    personnel_number: '',
    national_code: '',
    phone: '',
    role: '',
    department_id: ''
  }
  // Reset to first page
  currentPage.value = 1
  // Update URL to remove filters
  router.push({
    query: { 
      page: 1,
      _fromButton: true
    }
  })
  // Fetch data without filters
  fetchUsers()
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    updatePage(currentPage.value + 1)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    updatePage(currentPage.value - 1)
  }
}

const goToPage = (page) => {
  updatePage(page)
}

// Watch for route query changes
watch(
  () => route.query,
  (newQuery) => {
    // Update filters from URL, only including non-empty values
    filters.value = {
      full_name: newQuery.full_name || '',
      personnel_number: newQuery.personnel_number || '',
      national_code: newQuery.national_code || '',
      phone: newQuery.phone || '',
      role: newQuery.role || '',
      department_id: newQuery.department_id || ''
    }
    
    // Update page
    const page = parseInt(newQuery.page) || 1
    if (page !== currentPage.value) {
      currentPage.value = page
    }
    
    // Always fetch data on route change or page refresh
    fetchUsers()
  },
  { immediate: true, deep: true }
)

// Lifecycle
onMounted(() => {
  fetchDepartments()
})
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style> 