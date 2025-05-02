<template>
  <div class="p-1">
    <h1 class="text-xl font-bold text-purple-700 mb-6">تیم منابع انسانی</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-red-600 text-center py-8">
        {{ error }}
      </div>

      <!-- HR Team table -->
      <div v-else>
        <div class="overflow-x-auto">
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
                  شماره موبایل
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
              <tr v-for="member in hrTeam" :key="member.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ member.full_name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ member.email }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ member.phone }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  {{ member.role }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                  <div class="flex items-center justify-center space-x-4">
                    <button 
                      @click="openEditModal(member)"
                      class="text-purple-600 hover:text-purple-900"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-2.828 0L9 13zm-6 6h12" />
                      </svg>
                    </button>
                    <button 
                      @click="openDeleteModal(member)"
                      class="text-red-600 hover:text-red-900"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-lg font-bold mb-4">ویرایش عضو تیم</h2>
        <form @submit.prevent="handleEditSubmit">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
              <input
                v-model="editForm.fullName"
                type="text"
                class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
              <input
                v-model="editForm.email"
                type="email"
                dir="ltr"
                class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
              <input
                v-model="editForm.phone"
                type="tel"
                class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">نقش</label>
              <select
                v-model="editForm.role"
                class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="admin">مدیر</option>
                <option value="employee">کارمند</option>
              </select>
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              @click="closeEditModal"
            >
              انصراف
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              :disabled="editLoading"
            >
              <span v-if="editLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2" />
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 class="text-lg font-bold mb-4">حذف عضو تیم</h2>
        <p class="text-gray-600 mb-6">آیا از حذف این عضو تیم اطمینان دارید؟</p>
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            @click="closeDeleteModal"
          >
            انصراف
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            @click="handleDelete"
            :disabled="deleteLoading"
          >
            <span v-if="deleteLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2" />
            حذف
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useToast } from 'vue-toastification'

const { $api } = useNuxtApp()
const toast = useToast()

const hrTeam = ref([])
const loading = ref(true)
const error = ref(null)

// Edit Modal
const showEditModal = ref(false)
const editLoading = ref(false)
const editForm = ref({
  id: null,
  email: '',
  fullName: '',
  phone: '',
  role: ''
})

// Delete Modal
const showDeleteModal = ref(false)
const deleteLoading = ref(false)
const memberToDelete = ref(null)

const fetchHRTeam = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get('/api/v1/hr-team')
    hrTeam.value = response.data || []
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات تیم منابع انسانی'
  } finally {
    loading.value = false
  }
}

const openEditModal = (member) => {
  editForm.value = {
    id: member.id,
    email: member.email,
    fullName: member.full_name,
    phone: member.phone,
    role: member.role
  }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editForm.value = {
    id: null,
    email: '',
    fullName: '',
    phone: '',
    role: ''
  }
}

const handleEditSubmit = async () => {
  try {
    editLoading.value = true
    await $api.put(`/api/v1/admin/hr-team/${editForm.value.id}`, {
      email: editForm.value.email,
      fullName: editForm.value.fullName,
      phone: editForm.value.phone,
      role: editForm.value.role
    })
    toast.success('عضو تیم با موفقیت ویرایش شد')
    closeEditModal()
    fetchHRTeam()
  } catch (err) {
    toast.error(err.message || 'خطا در ویرایش عضو تیم')
  } finally {
    editLoading.value = false
  }
}

const openDeleteModal = (member) => {
  memberToDelete.value = member
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
  memberToDelete.value = null
}

const handleDelete = async () => {
  try {
    deleteLoading.value = true
    await $api.delete(`/api/v1/admin/hr-team/${memberToDelete.value.id}`)
    toast.success('عضو تیم با موفقیت حذف شد')
    closeDeleteModal()
    fetchHRTeam()
  } catch (err) {
    toast.error(err.message || 'خطا در حذف عضو تیم')
  } finally {
    deleteLoading.value = false
  }
}

// Add keyboard event listeners
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    if (showEditModal.value) {
      closeEditModal()
    }
    if (showDeleteModal.value) {
      closeDeleteModal()
    }
  }
}

onMounted(() => {
  fetchHRTeam()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 