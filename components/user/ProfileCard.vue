<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <img
      class="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow cursor-pointer"
      :src="avatar || 'https://randomuser.me/api/portraits/men/1.jpg'"
      alt="User Avatar"
      @click="openUploadModal"
    />
    <div class="text-lg font-semibold">{{ name }}</div>
    <div class="text-sm text-gray-500">{{ role }}</div>
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

const props = defineProps({
  avatar: {
    type: String,
    default: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  name: {
    type: String,
    default: 'کاربر'
  },
  role: {
    type: String,
    default: 'کارمند'
  }
})

const emit = defineEmits(['update:avatar'])
const toast = useToast()
const isUploadModalOpen = ref(false)

const openUploadModal = () => {
  isUploadModalOpen.value = true
}

const closeUploadModal = () => {
  isUploadModalOpen.value = false
}

const handleAvatarUploaded = (url) => {
  emit('update:avatar', url)
  toast.success('تصویر پروفایل با موفقیت بروزرسانی شد')
  closeUploadModal()
}
</script> 