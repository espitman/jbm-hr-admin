<template>
  <BaseModal
    :is-open="isOpen"
    title="ایجاد کد جدید"
    @close="$emit('close')"
    :show-cancel-button="false"
    :show-footer="false"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="code" class="block text-sm font-medium text-gray-700 mb-1">کد</label>
        <input
          id="code"
          v-model="form.code"
          type="text"
          class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          required
        />
      </div>

      <div>
        <label for="type" class="block text-sm font-medium text-gray-700 mb-1">نوع</label>
        <select
          id="type"
          v-model="form.type"
          class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          required
        >
          <option value="1m">۱ میلیونی</option>
          <option value="3m">۳ میلیونی</option>
          <option value="6m">۶ میلیونی</option>
          <option value="12m">۱۲ میلیونی</option>
          <option value="25m">۲۵ میلیونی</option>
        </select>
      </div>

      <div class="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          انصراف
        </button>
        <button
          type="submit"
          :disabled="isSubmitting"
          class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting" class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            در حال ثبت...
          </span>
          <span v-else>ثبت</span>
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '~/components/BaseModal.vue'
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
const isSubmitting = ref(false)
const form = ref({
  code: '',
  type: '1m'
})

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    await $api.post('/api/v1/admin/alibaba-codes', form.value)
    toast.success('کد با موفقیت ایجاد شد')
    emit('created')
    emit('close')
    form.value = {
      code: '',
      type: '1m'
    }
  } catch (error) {
    console.error('Error creating code:', error)
    toast.error(error.message || 'خطا در ایجاد کد')
  } finally {
    isSubmitting.value = false
  }
}
</script> 