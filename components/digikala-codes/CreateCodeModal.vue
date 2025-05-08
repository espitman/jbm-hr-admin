<template>
  <BaseModal
    :is-open="isOpen"
    title="ایجاد کد جدید"
    :show-cancel-button="false"
    :show-footer="false"
    @close="closeModal"
  >
    <form @submit.prevent="createCode" class="space-y-4">
      <div>
        <label for="code" class="block text-sm font-medium text-gray-700 mb-1">کد</label>
        <input
          id="code"
          v-model="newCode.code"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300"
          required
        />
      </div>
      <div class="flex justify-end space-x-3">
        <button
          type="button"
          @click="closeModal"
          class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
        >
          انصراف
        </button>
        <button
          type="submit"
          :disabled="isCreating"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50"
        >
          {{ isCreating ? 'در حال ایجاد...' : 'ایجاد' }}
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import { useToast } from 'vue-toastification'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close', 'created'])

const { $api } = useNuxtApp()
const toast = useToast()
const isCreating = ref(false)
const newCode = ref({ code: '' })

const closeModal = () => {
  emit('close')
}

const createCode = async () => {
  try {
    isCreating.value = true
    await $api.post('/api/v1/admin/digikala-codes', newCode.value)
    toast.success('کد با موفقیت ایجاد شد')
    closeModal()
    emit('created')
    newCode.value = { code: '' }
  } catch (e) {
    toast.error('خطا در ایجاد کد')
    console.error(e)
  } finally {
    isCreating.value = false
  }
}
</script> 