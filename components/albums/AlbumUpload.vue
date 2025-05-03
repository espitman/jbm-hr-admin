<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">عنوان تصویر</label>
      <input 
        v-model="form.caption"
        type="text"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        required
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">تصویر</label>
      <ImageUpload
        dir="albums"
        @uploaded="handleImageUploaded"
      />
    </div>
    <div class="flex justify-end">
      <button 
        type="submit"
        class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        :disabled="isLoading"
      >
        <span v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block"></span>
        <span v-else>آپلود</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useNuxtApp } from '#app'
import ImageUpload from '@/components/ImageUpload.vue'

const { $api } = useNuxtApp()
const toast = useToast()
const isLoading = ref(false)

const form = ref({
  caption: '',
  url: null
})

const emit = defineEmits(['success'])

const handleImageUploaded = (url) => {
  form.value.url = url
}

const handleSubmit = async () => {
  if (!form.value.url || !form.value.caption) return
  
  try {
    isLoading.value = true
    
    await $api.post('/api/v1/admin/albums', {
      caption: form.value.caption,
      url: form.value.url
    })
    
    toast.success('تصویر با موفقیت آپلود شد')
    emit('success')
    resetForm()
  } catch (err) {
    toast.error('خطا در آپلود تصویر')
    console.error('Error uploading image:', err)
  } finally {
    isLoading.value = false
  }
}

const resetForm = () => {
  form.value = {
    caption: '',
    url: null
  }
}
</script> 