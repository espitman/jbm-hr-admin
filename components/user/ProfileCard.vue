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
        <span class="text-gray-900">{{ formatDate(birthdate) }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-500">تاریخ شروع همکاری:</span>
        <span class="text-gray-900">{{ formatDate(cooperation_start_date) }}</span>
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
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import { useToast } from 'vue-toastification'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()
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

const emit = defineEmits(['update:avatar', 'success'])
const toast = useToast()
const isUploadModalOpen = ref(false)

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('fa-IR')
}

const openUploadModal = () => {
  isUploadModalOpen.value = true
}

const closeUploadModal = () => {
  isUploadModalOpen.value = false
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