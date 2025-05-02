<template>
  <BaseModal
    :is-open="isOpen"
    title="ویرایش عضو تیم"
    size="md"
    @close="closeModal"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="full_name" class="block text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
        <input
          type="text"
          id="full_name"
          v-model="formData.full_name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">ایمیل</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">شماره تماس</label>
        <input
          type="tel"
          id="phone"
          v-model="formData.phone"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label for="role" class="block text-sm font-medium text-gray-700">نقش</label>
        <select
          id="role"
          v-model="formData.role"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="admin">مدیر</option>
          <option value="employee">کارمند</option>
        </select>
      </div>
    </form>

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
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        @click="handleSubmit"
        :disabled="isLoading"
      >
        <span v-if="isLoading">در حال ذخیره...</span>
        <span v-else>ذخیره</span>
      </button>
    </template>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import { useToast } from 'vue-toastification'

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

const formData = ref({
  full_name: '',
  email: '',
  phone: '',
  role: 'employee'
})

watch(() => props.member, (newMember) => {
  if (newMember) {
    formData.value = {
      full_name: newMember.full_name,
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
    const response = await fetch(`/api/v1/admin/hr-team/${props.member.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    })

    if (!response.ok) {
      throw new Error('Failed to update member')
    }

    toast.success('عضو تیم با موفقیت ویرایش شد')
    emit('success')
    closeModal()
  } catch (error) {
    toast.error('خطا در ویرایش عضو تیم')
    console.error('Error updating member:', error)
  } finally {
    isLoading.value = false
  }
}
</script> 