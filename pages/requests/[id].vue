<template>
  <div class="container mx-auto p-4">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-xl font-bold text-purple-700">جزئیات درخواست</h1>
    </div>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      {{ error }}
    </div>

    <div v-else class="space-y-6">
      <div class="grid grid-cols-4 gap-6">
        <!-- Left Section (1/4) -->
        <div class="space-y-6">
          <!-- User Card -->
          <ContentBox title="اطلاعات کاربر">
            <div class="flex flex-col items-center space-y-4">
              <div v-if="request.user.avatar" class="w-24 h-24">
                <img
                  :src="request.user.avatar"
                  :alt="request.user.first_name + ' ' + request.user.last_name"
                  class="w-full h-full rounded-full object-cover"
                />
              </div>
              <div v-else class="w-24 h-24">
                <img
                  :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(request.user.first_name + ' ' + request.user.last_name)}&background=amber-500&color=fff`"
                  :alt="request.user.first_name + ' ' + request.user.last_name"
                  class="w-full h-full rounded-full object-cover"
                />
              </div>
              <div class="text-center">
                <h2 class="text-lg font-semibold text-gray-900">
                  {{ request.user.first_name }} {{ request.user.last_name }}
                </h2>
                <p class="text-sm text-gray-500">{{ request.user.email }}</p>
              </div>
            </div>
          </ContentBox>

          <!-- Status Update -->
          <ContentBox v-if="request.status === 'pending'" title="تغییر وضعیت">
            <div class="flex flex-col space-y-3">
              <button
                @click="updateStatus('accepted')"
                class="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>تایید</span>
              </button>
              <button
                @click="updateStatus('rejected')"
                class="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>رد</span>
              </button>
            </div>
          </ContentBox>
        </div>

        <!-- Right Section (3/4) -->
        <div class="col-span-3 space-y-6">
          <!-- Request Details -->
          <ContentBox title="اطلاعات درخواست">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-500">نام و نام خانوادگی</label>
                    <p class="mt-1 text-sm text-gray-900">{{ request.full_name }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500">نوع درخواست</label>
                    <p class="mt-1 text-sm text-gray-900">{{ getRequestTypeText(request.kind) }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500">وضعیت</label>
                    <span :class="getStatusClass(request.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ getStatusText(request.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBox>

          <!-- Description -->
          <ContentBox title="توضیحات">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-900 whitespace-pre-line leading-loose font-extralight text-justify">{{ request.description }}</p>
            </div>
          </ContentBox>

          <!-- Status History -->
          <ContentBox title="تاریخچه وضعیت">
            <div class="space-y-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <span class="h-8 w-8 rounded-full flex items-center justify-center bg-gray-100">
                    <svg class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
                <div class="mr-3">
                  <p class="text-sm font-medium text-gray-900">ایجاد درخواست</p>
                  <p class="text-sm text-gray-500">{{ formatDate(request.created_at) }}</p>
                </div>
              </div>
              <div v-for="(status, index) in request.status_history" :key="index" class="flex items-start">
                <div class="flex-shrink-0">
                  <span :class="[
                    'h-8 w-8 rounded-full flex items-center justify-center',
                    getStatusClass(status.status)
                  ]">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                </div>
                <div class="mr-3">
                  <p class="text-sm font-medium text-gray-900">{{ getStatusText(status.status) }}</p>
                  <p class="text-sm text-gray-500">{{ formatDate(status.created_at) }}</p>
                  <p v-if="status.comment" class="mt-1 text-sm text-gray-600">{{ status.comment }}</p>
                </div>
              </div>
            </div>
          </ContentBox>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const request = ref(null)
const loading = ref(true)
const error = ref(null)
const { $api } = useNuxtApp()

const fetchRequest = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get(`/api/v1/admin/requests/${route.params.id}`)
    request.value = response.data
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات درخواست'
  } finally {
    loading.value = false
  }
}

const getRequestTypeText = (kind) => {
  switch (kind) {
    case 'employment':
      return 'اشتغال به کار'
    case 'payroll_stamped':
      return 'فیش حقوقی مهر شده'
    case 'salary_deduction':
      return 'کسر از حقوق'
    case 'introduction_letter':
      return 'معرفی نامه'
    case 'good_conduct_letter':
      return 'نامه حسن انجام کار'
    case 'confirmation_letter':
      return 'نامه تاییدیه'
    case 'embassy_letter':
      return 'نامه سفارت'
    default:
      return kind
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'reviewed':
      return 'bg-blue-100 text-blue-800'
    case 'accepted':
      return 'bg-green-100 text-green-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status) => {
  switch (status) {
    case 'pending':
      return 'در انتظار بررسی'
    case 'reviewed':
      return 'بررسی شده'
    case 'accepted':
      return 'تایید شده'
    case 'rejected':
      return 'رد شده'
    default:
      return status
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const updateStatus = async (newStatus) => {
  try {
    loading.value = true
    await $api.patch(`/api/v1/admin/requests/${route.params.id}/status`, {
      status: newStatus
    })
    await fetchRequest()
  } catch (err) {
    error.value = err.message || 'خطا در بروزرسانی وضعیت'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRequest()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 