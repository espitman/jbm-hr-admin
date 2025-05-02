<template>
  <BaseModal
    :is-open="isOpen"
    title="حذف عضو تیم"
    size="sm"
    @close="closeModal"
  >
    <div class="text-center">
      <p class="text-gray-700 mb-4">آیا از حذف عضو تیم "{{ member.full_name }}" اطمینان دارید؟</p>
      <p class="text-sm text-gray-500">این عمل قابل بازگشت نیست.</p>
    </div>

    <template #footer>
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        @click="closeModal"
      >
        انصراف
      </button>
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
        @click="handleDelete"
        :disabled="isLoading"
      >
        <span v-if="isLoading">در حال حذف...</span>
        <span v-else>حذف</span>
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  member: {
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
    const response = await fetch(`/api/v1/admin/hr-team/${props.member.id}`, {
      method: 'DELETE'
    })

    if (!response.ok) {
      throw new Error('Failed to delete member')
    }

    toast.success('عضو تیم با موفقیت حذف شد')
    emit('success')
    closeModal()
  } catch (error) {
    toast.error('خطا در حذف عضو تیم')
    console.error('Error deleting member:', error)
  } finally {
    isLoading.value = false
  }
}
</script> 