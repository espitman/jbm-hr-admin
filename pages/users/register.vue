<template>
  <div class="p-1">
    <h1 class="text-xl font-bold text-purple-700 mb-6">ثبت کاربر جدید</h1>
    <div class="bg-white rounded-lg shadow p-6">
      <form
        class="space-y-6"
        @submit.prevent="handleSubmit"
      >
        <!-- First Row: First Name and Last Name -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- First Name -->
          <div>
            <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">نام</label>
            <input
              id="first_name"
              v-model="form.first_name"
              type="text"
              class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              required
            >
          </div>

          <!-- Last Name -->
          <div>
            <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">نام خانوادگی</label>
            <input
              id="last_name"
              v-model="form.last_name"
              type="text"
              class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              required
            >
          </div>
        </div>

        <!-- Second Row: Email and Phone -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              dir="ltr"
              class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              required
            >
          </div>

          <!-- Phone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              required
            >
          </div>
        </div>

        <!-- Third Row: National Code and Personnel Number -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- National Code -->
          <div>
            <label for="national_code" class="block text-sm font-medium text-gray-700 mb-1">کد ملی</label>
            <input
              id="national_code"
              v-model="form.national_code"
              type="text"
              class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              required
            >
          </div>

          <!-- Personnel Number -->
          <div>
            <label for="personnel_number" class="block text-sm font-medium text-gray-700 mb-1">شماره پرسنلی</label>
            <input
              id="personnel_number"
              v-model="form.personnel_number"
              type="text"
              class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
              required
            >
          </div>
        </div>

        <!-- Role -->
        <div>
          <label for="role" class="block text-sm font-medium text-gray-700 mb-1">نقش</label>
          <select
            id="role"
            v-model="form.role"
            class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            required
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
            required
          >
            <option value="">انتخاب دپارتمان</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.title }}
            </option>
          </select>
        </div>

        <!-- Birthdate and Cooperation Start Date -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Birthdate -->
          <div>
            <label for="birthdate" class="block text-sm font-medium text-gray-700 mb-1">تاریخ تولد</label>
            <date-picker
              id="birthdate"
              v-model="form.birthdate"
              format="YYYY-MM-DD"
              display-format="jYYYY-jMM-jDD"
              :editable="false"
              :auto-submit="false"
              input-class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>

          <!-- Cooperation Start Date -->
          <div>
            <label for="cooperation_start_date" class="block text-sm font-medium text-gray-700 mb-1">تاریخ شروع همکاری</label>
            <date-picker
              id="cooperation_start_date"
              v-model="form.cooperation_start_date"
              format="YYYY-MM-DD"
              display-format="jYYYY-jMM-jDD"
              :editable="false"
              :auto-submit="false"
              input-class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="pt-2">
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            :disabled="loading"
          >
            <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            <span v-else>ثبت کاربر</span>
          </button>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="text-red-600 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import DatePicker from 'vue3-persian-datetime-picker'

const { $api } = useNuxtApp()
const toast = useToast()

const form = ref({
  email: '',
  phone: '',
  role: 'employee',
  first_name: '',
  last_name: '',
  department_id: '',
  birthdate: '',
  cooperation_start_date: '',
  national_code: '',
  personnel_number: ''
})

const departments = ref([])
const loading = ref(false)
const error = ref(null)

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
    
    await $api.post('/api/v1/admin/users/register', form.value)
    
    // Reset form
    form.value = {
      email: '',
      phone: '',
      role: 'employee',
      first_name: '',
      last_name: '',
      department_id: '',
      birthdate: '',
      cooperation_start_date: '',
      national_code: '',
      personnel_number: ''
    }
    
    // Show success toast
    toast.success('کاربر با موفقیت ثبت شد')
  } catch (err) {
    error.value = err.message || 'خطا در ثبت کاربر'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDepartments()
})
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style> 