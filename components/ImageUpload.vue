<template>
  <div class="space-y-4">
    <div
      v-if="!isLoading"
      class="relative border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        accept="image/*"
        @change="handleFileChange"
      />
      <div class="space-y-2">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <div class="flex flex-col items-center text-sm text-gray-600">
          <label class="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500">
            <span>آپلود تصویر</span>
          </label>
          <p class="mt-1">یا فایل را بکشید و رها کنید</p>
        </div>
        <p class="text-xs text-gray-500 text-center">PNG, JPG, GIF تا 10MB</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <!-- Preview -->
    <div v-if="previewUrl" class="mt-4">
      <img :src="previewUrl" class="max-h-48 rounded-lg mx-auto" alt="Preview" />
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-red-600 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNuxtApp } from '#app'
import { useToast } from 'vue-toastification'

const { $api } = useNuxtApp()
const toast = useToast()
const fileInput = ref(null)
const previewUrl = ref(null)
const error = ref(null)
const isLoading = ref(false)
const emit = defineEmits(['uploaded'])

const props = defineProps({
  dir: {
    type: String,
    required: true
  }
})

const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    handleFile(file)
  }
}

const handleDrop = (event) => {
  const file = event.dataTransfer.files[0]
  if (file) {
    handleFile(file)
  }
}

const handleFile = async (file) => {
  // Reset states
  error.value = null
  previewUrl.value = null
  isLoading.value = true

  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'لطفا یک فایل تصویر انتخاب کنید'
    isLoading.value = false
    return
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    error.value = 'حجم فایل نباید بیشتر از 10 مگابایت باشد'
    isLoading.value = false
    return
  }

  // Create preview
  previewUrl.value = URL.createObjectURL(file)

  try {
    const response = await $api.upload(`/api/v1/upload/image/public/${props.dir}`, file)

    if (response.data?.url) {
      emit('uploaded', response.data.url)
    } else {
      throw new Error('خطا در آپلود تصویر')
    }
  } catch (err) {
    error.value = err.message || 'خطا در آپلود تصویر'
    toast.error('خطا در آپلود تصویر')
  } finally {
    isLoading.value = false
  }
}
</script> 