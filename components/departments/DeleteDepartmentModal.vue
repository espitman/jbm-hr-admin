<template>
  <BaseModal
    :is-open="isOpen"
    title="حذف دپارتمان"
    size="md"
    :show-cancel-button="false"
    :show-footer="false"
    @close="closeModal"
  >
    <div class="space-y-6">
      <p class="text-gray-700 text-center">
        آیا از حذف دپارتمان
        <span class="font-bold">{{ department.title }}</span>
        اطمینان دارید؟
      </p>

      <div class="pt-2 flex gap-4">
        <button
          @click="handleDelete"
          class="flex-[2] flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          <span v-else>حذف</span>
        </button>
        <button
          @click="closeModal"
          class="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          انصراف
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import { useToast } from 'vue-toastification'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  department: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'success'])
const toast = useToast()
const isLoading = ref(false)

const closeModal = () => {
  emit('close')
}

const handleDelete = async () => {
  try {
    isLoading.value = true
    await $api.delete(`/api/v1/admin/departments/${props.department.id}`)

    toast.success('دپارتمان با موفقیت حذف شد')
    emit('success')
    closeModal()
  } catch (err) {
    toast.error('خطا در حذف دپارتمان')
    console.error('Error deleting department:', err)
  } finally {
    isLoading.value = false
  }
}
</script> 