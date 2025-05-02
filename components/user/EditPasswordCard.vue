<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 border-4 border-white shadow">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
    <div class="text-sm font-medium mb-4">تغییر رمز عبور</div>
    <form class="w-full space-y-3" :class="{ 'opacity-50 pointer-events-none': role !== 'admin' }" @submit.prevent="handleSubmit">
      <input 
        v-model="form.password" 
        type="password" 
        placeholder="رمز عبور جدید" 
        class="w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder:text-right" 
        :disabled="role !== 'admin'"
        dir="ltr"
      />
      <input 
        v-model="form.password_confirmation" 
        type="password" 
        placeholder="تکرار رمز عبور جدید" 
        class="w-full border border-gray-300 rounded px-3 py-2 text-sm placeholder:text-right" 
        :disabled="role !== 'admin'"
        dir="ltr"
      />
      <div class="flex gap-2 mt-2">
        <button 
          type="submit" 
          class="flex-1 bg-green-500 text-white py-2 rounded cursor-pointer" 
          :disabled="role !== 'admin' || loading"
        >
          <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          <span v-else>بروزرسانی</span>
        </button>
        <button 
          type="button" 
          class="flex-1 bg-red-400 text-white py-2 rounded cursor-pointer" 
          :disabled="role !== 'admin' || loading"
          @click="resetForm"
        >
          انصراف
        </button>
      </div>
      <p v-if="role !== 'admin'" class="text-xs text-gray-500 text-center mt-2">امکان ست کردن رمز عبور فقط برای رول ادمین است.</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
  role: {
    type: String,
    default: 'employee'
  },
  userId: {
    type: [String, Number],
    required: true
  }
})

const emit = defineEmits(['updated'])

const { $api } = useNuxtApp()
const toast = useToast()

const form = ref({
  password: '',
  password_confirmation: ''
})

const loading = ref(false)
const error = ref(null)

const resetForm = () => {
  form.value = {
    password: '',
    password_confirmation: ''
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    error.value = null
    
    await $api.put(`/api/v1/admin/users/${props.userId}/password`, form.value)
    
    // Show success toast
    toast.success('رمز عبور با موفقیت بروزرسانی شد')
    // Reset form
    resetForm()
    // Emit event to parent
    emit('updated')
  } catch (err) {
    error.value = err.message || 'خطا در بروزرسانی رمز عبور'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}
</script> 