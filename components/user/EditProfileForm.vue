<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-bold mb-4">ویرایش پروفایل</h2>
    <form class="space-y-6" @submit.prevent="handleSubmit">
      <!-- First Name -->
      <div>
        <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">نام</label>
        <input
          id="first_name"
          v-model="form.first_name"
          type="text"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <!-- Last Name -->
      <div>
        <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">نام خانوادگی</label>
        <input
          id="last_name"
          v-model="form.last_name"
          type="text"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          dir="ltr"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
        <input
          id="phone"
          v-model="form.phone"
          type="tel"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <!-- Role -->
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">نقش</label>
        <select
          id="role"
          v-model="form.role"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        >
          <option value="admin">مدیر</option>
          <option value="employee">کارمند</option>
        </select>
      </div>

      <!-- Department -->
      <div>
        <label for="department_id" class="block text-sm font-medium text-gray-700 mb-1">دپارتمان</label>
        <select
          id="department_id"
          v-model="form.department_id"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        >
          <option value="">انتخاب دپارتمان</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.title }}
          </option>
        </select>
      </div>

      <!-- Personnel Number -->
      <div>
        <label for="personnel_number" class="block text-sm font-medium text-gray-700 mb-1">شماره پرسنلی</label>
        <input
          id="personnel_number"
          v-model="form.personnel_number"
          type="text"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <!-- National Code -->
      <div>
        <label for="national_code" class="block text-sm font-medium text-gray-700 mb-1">کد ملی</label>
        <input
          id="national_code"
          v-model="form.national_code"
          type="text"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <div class="pt-2">
        <button 
          type="submit" 
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors cursor-pointer"
          :disabled="loading"
        >
          <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          <span v-else>بروزرسانی</span>
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="error" class="text-red-600 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useNuxtApp } from '#app'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      id: null,
      email: '',
      phone: '',
      role: 'employee',
      first_name: '',
      last_name: '',
      department_id: '',
      personnel_number: '',
      national_code: ''
    })
  }
})

const { $api } = useNuxtApp()
const toast = useToast()

const form = ref({
  email: '',
  phone: '',
  role: 'employee',
  first_name: '',
  last_name: '',
  department_id: '',
  personnel_number: '',
  national_code: ''
})

const loading = ref(false)
const error = ref(null)
const departments = ref([])

const emit = defineEmits(['updated'])

// Update form when user prop changes
watch(() => props.user, (newUser) => {
  if (newUser) {
    form.value = {
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      department_id: newUser.department?.id || '',
      personnel_number: newUser.personnel_number || '',
      national_code: newUser.national_code || ''
    }
  }
}, { immediate: true })

const fetchDepartments = async () => {
  try {
    loading.value = true
    const response = await $api.get('/api/v1/departments')
    departments.value = response.data.departments || []
  } catch {
    toast.error('خطا در دریافت لیست دپارتمان‌ها')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    
    await $api.put(`/api/v1/admin/users/${props.user.id}`, form.value)
    
    // Show success toast
    toast.success('پروفایل با موفقیت بروزرسانی شد')
    // Emit event to parent
    emit('updated')
  } catch (err) {
    error.value = err.message || 'خطا در بروزرسانی پروفایل'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDepartments()
})
</script> 