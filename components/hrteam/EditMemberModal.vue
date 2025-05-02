<template>
  <BaseModal
    :is-open="isOpen"
    title="ویرایش عضو تیم"
    size="md"
    :show-cancel-button="false"
    :show-footer="false"
    @close="closeModal"
  >
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Full Name -->
      <div>
        <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
        <input
          type="text"
          id="fullName"
          v-model="formData.fullName"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          required
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          dir="ltr"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          required
        />
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">شماره تماس</label>
        <input
          type="tel"
          id="phone"
          v-model="formData.phone"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          required
        />
      </div>

      <!-- Role -->
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700 mb-1">نقش</label>
        <input
          type="text"
          id="role"
          v-model="formData.role"
          dir="ltr"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          required
        />
      </div>

      <!-- Error Message -->
      <div v-if="error" class="text-red-600 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
        {{ error }}
      </div>

      <div class="pt-2 flex gap-4">
        <button
          type="submit"
          class="flex-[2] flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
          :disabled="isLoading"
        >
          <span v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          <span v-else>ذخیره</span>
        </button>
        <button
          type="button"
          class="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          @click="closeModal"
        >
          انصراف
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import { useToast } from 'vue-toastification'
import { useNuxtApp } from '#app'

const { $api } = useNuxtApp()
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  member: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'success'])
const toast = useToast()
const isLoading = ref(false)
const error = ref(null)

const formData = ref({
  fullName: '',
  email: '',
  phone: '',
  role: 'employee'
})

watch(() => props.member, (newMember) => {
  if (newMember) {
    formData.value = {
      fullName: newMember.full_name,
      email: newMember.email,
      phone: newMember.phone,
      role: newMember.role
    }
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const handleSubmit = async () => {
  try {
    isLoading.value = true
    await $api.put(`/api/v1/admin/hr-team/${props.member.id}`, formData.value)

    toast.success('عضو تیم با موفقیت ویرایش شد')
    emit('success')
    closeModal()
  } catch (err) {
    toast.error('خطا در ویرایش عضو تیم')
    console.error('Error updating member:', err)
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script> 