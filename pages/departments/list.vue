<template>
  <div class="container mx-auto p-1">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-purple-700">دپارتمان‌ها</h1>
      <button
        @click="openAddModal"
        class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
      >
        افزودن دپارتمان جدید
      </button>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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
                عنوان
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                نام کوتاه
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                رنگ
              </th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ترتیب نمایش
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="department in departments" :key="department.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <img :src="department.icon" :alt="department.title" class="h-8 w-8 rounded-full ml-3" />
                  <div class="text-sm text-gray-900">{{ department.title }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ department.short_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ department.color }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="text-sm text-gray-900">{{ department.display_order }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  @click="openEditModal(department)"
                  class="text-purple-600 hover:text-purple-900 ml-4 cursor-pointer"
                >
                  <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </button>
                <button
                  @click="openDeleteModal(department)"
                  class="text-red-600 hover:text-red-900 cursor-pointer"
                >
                  <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Modal -->
    <AddDepartmentModal
      :is-open="isAddModalOpen"
      @close="closeAddModal"
      @success="fetchDepartments"
    />

    <!-- Edit Modal -->
    <EditDepartmentModal
      :is-open="isEditModalOpen"
      :department="selectedDepartment"
      @close="closeEditModal"
      @success="fetchDepartments"
    />

    <!-- Delete Modal -->
    <DeleteDepartmentModal
      :is-open="isDeleteModalOpen"
      :department="selectedDepartment"
      @close="closeDeleteModal"
      @success="fetchDepartments"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EditDepartmentModal from '@/components/departments/EditDepartmentModal.vue'
import DeleteDepartmentModal from '@/components/departments/DeleteDepartmentModal.vue'
import AddDepartmentModal from '@/components/departments/AddDepartmentModal.vue'

const { $api } = useNuxtApp()
const departments = ref([])
const loading = ref(true)
const error = ref(null)
const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedDepartment = ref(null)

const fetchDepartments = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get('/api/v1/departments')
    departments.value = response.data.departments || []
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات دپارتمان‌ها'
  } finally {
    loading.value = false
  }
}

const openEditModal = (department) => {
  selectedDepartment.value = department
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  selectedDepartment.value = null
}

const openDeleteModal = (department) => {
  selectedDepartment.value = department
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  selectedDepartment.value = null
}

const openAddModal = () => {
  isAddModalOpen.value = true
}

const closeAddModal = () => {
  isAddModalOpen.value = false
}

onMounted(() => {
  fetchDepartments()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 