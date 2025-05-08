<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <div 
      class="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow cursor-pointer"
      @click="openUploadModal"
    >
      <img
        v-if="avatar"
        class="w-full h-full object-cover"
        :src="avatar"
        alt="User Avatar"
      />
      <div v-else class="h-full w-full flex items-center justify-center bg-gray-200">
        <span class="text-gray-500 text-4xl">{{ getInitials(name) }}</span>
      </div>
    </div>
    <div class="text-lg font-semibold mt-4">{{ name }}</div>
    <div class="text-sm text-gray-500">{{ role }}</div>
    
    <!-- User Info -->
    <div class="w-full mt-6 space-y-2 text-sm">
      <div class="flex justify-between items-center">
        <span class="text-gray-500">تاریخ تولد:</span>
        <div class="flex items-center gap-2">
          <span class="text-gray-900">{{ $formatDateOnly(birthdate) }}</span>
          <button @click="openDateModal('birthdate')" class="text-purple-600 hover:text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-500">تاریخ شروع همکاری:</span>
        <div class="flex items-center gap-2">
          <span class="text-gray-900">{{ $formatDateOnly(cooperation_start_date) }}</span>
          <button @click="openDateModal('cooperation_start_date')" class="text-purple-600 hover:text-purple-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Upload Modal -->
  <BaseModal
    :is-open="isUploadModalOpen"
    title="تغییر تصویر پروفایل"
    size="md"
    :show-cancel-button="false"
    :show-footer="false"
    @close="closeUploadModal"
  >
    <ImageUpload
      dir="avatars"
      @uploaded="handleAvatarUploaded"
    />
  </BaseModal>

  <!-- Date Edit Modal -->
  <BaseModal
    :is-open="isDateModalOpen"
    :title="dateModalTitle"
    size="sm"
    @close="closeDateModal"
  >
    <div class="p-4">
      <date-picker
        v-model="selectedDate"
        format="YYYY-MM-DD"
        display-format="jYYYY-jMM-jDD"
        :editable="false"
        :auto-submit="false"
        input-class="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>
    <template #footer>
      <div class="flex justify-end gap-2">
        <button
          @click="closeDateModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          :disabled="isDateUpdating"
        >
          انصراف
        </button>
        <button
          @click="handleDateUpdate"
          class="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isDateUpdating"
        >
          <span v-if="isDateUpdating" class="flex items-center gap-2">
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            در حال ذخیره...
          </span>
          <span v-else>ذخیره</span>
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import { useToast } from 'vue-toastification'
import { useNuxtApp } from '#app'
import DatePicker from 'vue3-persian-datetime-picker'

const { $api, $formatDateOnly } = useNuxtApp()
const props = defineProps({
  avatar: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    default: 'کاربر'
  },
  role: {
    type: String,
    default: 'کارمند'
  },
  userId: {
    type: String,
    required: true
  },
  birthdate: {
    type: String,
    default: undefined
  },
  cooperation_start_date: {
    type: String,
    default: undefined
  }
})

const emit = defineEmits(['update:avatar', 'success', 'update:birthdate', 'update:cooperation_start_date'])
const toast = useToast()
const isUploadModalOpen = ref(false)
const isDateModalOpen = ref(false)
const selectedDate = ref(null)
const editingField = ref(null)
const isDateUpdating = ref(false)

const dateModalTitle = computed(() => {
  return editingField.value === 'birthdate' ? 'تغییر تاریخ تولد' : 'تغییر تاریخ شروع همکاری'
})

const openUploadModal = () => {
  isUploadModalOpen.value = true
}

const closeUploadModal = () => {
  isUploadModalOpen.value = false
}

const openDateModal = (field) => {
  editingField.value = field
  selectedDate.value = props[field] || ''
  isDateModalOpen.value = true
}

const closeDateModal = () => {
  isDateModalOpen.value = false
  editingField.value = null
  selectedDate.value = null
}

const handleDateUpdate = async () => {
  try {
    isDateUpdating.value = true
    const endpoint = editingField.value === 'birthdate' 
      ? `/api/v1/admin/users/${props.userId}/birthdate`
      : `/api/v1/admin/users/${props.userId}/cooperation-start-date`
    
    await $api.put(endpoint, {
      [editingField.value]: selectedDate.value
    })
    emit(`update:${editingField.value}`, selectedDate.value)
    emit('success')
    closeDateModal()
    toast.success('تاریخ با موفقیت بروزرسانی شد')
  } catch {
    toast.error('خطا در بروزرسانی تاریخ')
  } finally {
    isDateUpdating.value = false
  }
}

const handleAvatarUploaded = async (url) => {
  try {
    await $api.put(`/api/v1/admin/users/${props.userId}/avatar`, { avatar: url })
    emit('update:avatar', url)
    emit('success')
    closeUploadModal()
  } catch {
    toast.error('خطا در بروزرسانی تصویر پروفایل')
  }
}

const getInitials = (name) => {
  const parts = name.split(' ')
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`
  }
  return name[0]
}
</script> 