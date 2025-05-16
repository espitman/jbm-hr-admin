<template>
  <div class="bg-white rounded-lg shadow p-6 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Full Name -->
      <div>
        <label for="full_name" class="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
        <input
          id="full_name"
          v-model="tempFilters.full_name"
          type="text"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          placeholder="نام و نام خانوادگی را وارد کنید"
          @keyup.enter="handleSearch"
        >
      </div>

      <!-- Personnel Number -->
      <div>
        <label for="personnel_number" class="block text-sm font-medium text-gray-700 mb-1">شماره پرسنلی</label>
        <input
          id="personnel_number"
          v-model="tempFilters.personnel_number"
          type="text"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- National Code -->
      <div>
        <label for="national_code" class="block text-sm font-medium text-gray-700 mb-1">کد ملی</label>
        <input
          id="national_code"
          v-model="tempFilters.national_code"
          type="text"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
        <input
          id="phone"
          v-model="tempFilters.phone"
          type="text"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- Role -->
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">نقش</label>
        <select
          id="role"
          v-model="tempFilters.role"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          @keyup.enter="handleSearch"
        >
          <option value="">همه</option>
          <option value="admin">مدیر</option>
          <option value="employee">کارمند</option>
        </select>
      </div>

      <!-- Department -->
      <div>
        <label for="department_id" class="block text-sm font-medium text-gray-700 mb-1">دپارتمان</label>
        <select
          id="department_id"
          v-model="tempFilters.department_id"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          @keyup.enter="handleSearch"
        >
          <option value="">همه</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.title }}
          </option>
        </select>
      </div>

      <!-- Buttons -->
      <div class="flex items-end space-x-4 space-x">
        <button
          @click="handleSearch"
          class="flex-1 bg-purple-600 text-white px-4 py-2.5 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
        >
          جستجو
        </button>
        <button
          @click="handleClear"
          class="flex-1 bg-gray-100 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          پاک کردن
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  departments: {
    type: Array,
    default: () => []
  },
  initialFilters: {
    type: Object,
    default: () => ({
      full_name: '',
      personnel_number: '',
      national_code: '',
      phone: '',
      role: '',
      department_id: ''
    })
  }
})

const emit = defineEmits(['search', 'clear'])

// Temporary filters for form inputs
const tempFilters = ref({ ...props.initialFilters })

// Watch for initialFilters changes
watch(
  () => props.initialFilters,
  (newFilters) => {
    tempFilters.value = { ...newFilters }
  },
  { deep: true }
)

const handleSearch = () => {
  emit('search', { ...tempFilters.value })
}

const handleClear = () => {
  tempFilters.value = {
    full_name: '',
    personnel_number: '',
    national_code: '',
    phone: '',
    role: '',
    department_id: ''
  }
  emit('clear')
}
</script> 