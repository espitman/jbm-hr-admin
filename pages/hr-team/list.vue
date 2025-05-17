<template>
  <div class="container mx-auto p-0">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-purple-700">تیم منابع انسانی</h1>
      <button
        @click="openAddModal"
        class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
      >
        افزودن عضو جدید
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
                نام و نام خانوادگی
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                ایمیل
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                شماره تماس
              </th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                نقش
              </th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="member in members" :key="member.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ member.full_name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ member.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ member.phone }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-center">
                <div class="text-sm text-gray-900">{{ member.role }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  @click="openEditModal(member)"
                  class="text-purple-600 hover:text-purple-900 ml-4 cursor-pointer"
                >
                  <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                </button>
                <button
                  @click="openDeleteModal(member)"
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
    <AddMemberModal
      :is-open="isAddModalOpen"
      @close="closeAddModal"
      @success="fetchMembers"
    />

    <!-- Edit Modal -->
    <EditMemberModal
      :is-open="isEditModalOpen"
      :member="selectedMember"
      @close="closeEditModal"
      @success="fetchMembers"
    />

    <!-- Delete Modal -->
    <DeleteMemberModal
      :is-open="isDeleteModalOpen"
      :member="selectedMember"
      @close="closeDeleteModal"
      @success="fetchMembers"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EditMemberModal from '@/components/hrteam/EditMemberModal.vue'
import DeleteMemberModal from '@/components/hrteam/DeleteMemberModal.vue'
import AddMemberModal from '@/components/hrteam/AddMemberModal.vue'

const { $api } = useNuxtApp()
const members = ref([])
const loading = ref(true)
const error = ref(null)
const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const selectedMember = ref(null)

const fetchMembers = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get('/api/v1/hr-team')
    members.value = response.data || []
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات تیم منابع انسانی'
  } finally {
    loading.value = false
  }
}

const openEditModal = (member) => {
  selectedMember.value = member
  isEditModalOpen.value = true
}

const closeEditModal = () => {
  isEditModalOpen.value = false
  selectedMember.value = null
}

const openDeleteModal = (member) => {
  selectedMember.value = member
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  selectedMember.value = null
}

const openAddModal = () => {
  isAddModalOpen.value = true
}

const closeAddModal = () => {
  isAddModalOpen.value = false
}

onMounted(() => {
  fetchMembers()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 