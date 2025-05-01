<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-0 w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
      <!-- Right Side - Purple Section -->
      <div class="bg-purple-600 p-12 text-white flex flex-col justify-between order-2 md:order-1">
        <div>
          <img src="~/public/images/jabama.svg" alt="Logo" class="h-8 mb-8" />
          <h2 class="text-2xl font-bold mb-4">خوش آمدید!</h2>
          <p class="text-purple-100">
            به سامانه مدیریت منابع انسانی جاباما خوش آمدید. لطفا وارد حساب کاربری خود شوید.
          </p>
        </div>
      </div>

      <!-- Left Side - Form Section -->
      <div class="p-12 order-1 md:order-2">
        <div class="max-w-md mx-auto">
          <h1 class="text-2xl font-bold text-gray-900 mb-8">ورود به سیستم</h1>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Input -->
            <div>
              <label for="email" class="block text-sm font-regular text-gray-700 mb-1">
                ایمیل
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  dir="ltr"
                  class="block w-full pr-10 pl-3 py-2.5 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <!-- Password Input -->
            <div>
              <label for="password" class="block text-sm font-regular text-gray-700 mb-1">
                رمز عبور
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  dir="ltr"
                  class="block w-full pr-10 pl-3 py-2.5 text-gray-900 placeholder-gray-500 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <template v-if="showPassword">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                    </template>
                    <template v-else>
                      <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </template>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Forgot Password -->
            <div class="flex items-center justify-end">
              <NuxtLink to="/forgot-password" class="text-sm font-regular text-purple-600 hover:text-purple-500">
                فراموشی رمز عبور؟
              </NuxtLink>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-regular text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              <span v-else>ورود به سیستم</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuth } from '~/composables/useAuth'

definePageMeta({
  layout: 'empty'
})

const { $api } = useNuxtApp()
const toast = useToast()
const { login } = useAuth()

const form = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const showPassword = ref(false)

const handleSubmit = async () => {
  try {
    loading.value = true
    
    const response = await $api.post('/api/v1/admin/login', {
      email: form.value.email,
      password: form.value.password
    })
    
    if (response.data?.token && response.data?.user) {
      const success = await login(response.data.token, response.data.user)
      if (success) {
        toast.success('ورود موفقیت‌آمیز')
        // Use window.location for a full page reload to ensure auth state is properly set
        window.location.href = '/'
      } else {
        toast.error('خطا در ورود به سیستم')
      }
    } else {
      toast.error('خطا در ورود به سیستم')
    }
  } catch (err) {
    toast.error(err.message || 'خطا در ورود به سیستم')
  } finally {
    loading.value = false
  }
}
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style> 