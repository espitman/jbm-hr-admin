<template>
  <BaseModal
    :is-open="isOpen"
    title="افزودن دپارتمان جدید"
    size="lg"
    :show-cancel-button="false"
    :show-footer="false"
    @close="closeModal"
  >
    <div class="space-y-6">
      <!-- Tabs -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Specifications Tab -->
        <div v-if="activeTab === 'specifications'" class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">عنوان</label>
            <input
              v-model="formData.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">توضیحات</label>
            <textarea
              v-model="formData.description"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="3"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">نام کوتاه</label>
              <input
                v-model="formData.short_name"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">رنگ</label>
              <div class="flex items-center space-x-2">
                <input
                  v-model="formData.color"
                  type="text"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="#000000"
                />
                <div 
                  class="w-8 h-8 rounded border border-gray-300" 
                  :style="{ backgroundColor: formData.color }"
                ></div>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">ترتیب نمایش</label>
            <input
              v-model="formData.display_order"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <!-- Icons Tab -->
        <div v-if="activeTab === 'icons'" class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">آیکون</label>
            <input
              v-model="formData.icon"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <!-- Current Icon Preview -->
          <div v-if="formData.icon" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">آیکون فعلی</label>
            <div class="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img :src="formData.icon" class="max-h-32" alt="Current Icon" />
            </div>
          </div>
          <ImageUpload
            dir="departments/icons"
            @uploaded="(url) => formData.icon = url"
          />
        </div>

        <!-- Images Tab -->
        <div v-if="activeTab === 'images'" class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">تصویر</label>
            <input
              v-model="formData.image"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <!-- Current Image Preview -->
          <div v-if="formData.image" class="space-y-2">
            <label class="block text-sm font-medium text-gray-700">تصویر فعلی</label>
            <div class="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <img :src="formData.image" class="max-h-48" alt="Current Image" />
            </div>
          </div>
          <ImageUpload
            dir="departments/images"
            @uploaded="(url) => formData.image = url"
          />
        </div>

        <div v-if="error" class="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
          {{ error }}
        </div>

        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            انصراف
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              در حال ذخیره...
            </span>
            <span v-else>ذخیره</span>
          </button>
        </div>
      </form>
    </div>
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
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const toast = useToast()
const loading = ref(false)
const error = ref(null)
const activeTab = ref('specifications')

const tabs = [
  { id: 'specifications', name: 'مشخصات' },
  { id: 'icons', name: 'آیکون‌ها' },
  { id: 'images', name: 'تصاویر' }
]

const formData = ref({
  title: '',
  description: '',
  short_name: '',
  color: '',
  icon: '',
  image: '',
  display_order: 0
})

const closeModal = () => {
  emit('close')
}

const handleSubmit = async () => {
  try {
    loading.value = true
    console.log('Submitting data:', formData.value)
    await $api.post('/api/v1/admin/departments', formData.value)

    toast.success('دپارتمان با موفقیت افزوده شد')
    emit('success')
    closeModal()
  } catch (err) {
    toast.error('خطا در افزودن دپارتمان')
    console.error('Error adding department:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script> 