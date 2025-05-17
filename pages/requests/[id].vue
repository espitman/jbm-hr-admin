<template>
  <div class="container mx-auto p-0">
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
                @click="showApproveModal = true"
                class="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>تایید</span>
              </button>
              <button
                @click="showRejectModal = true"
                class="flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>رد</span>
              </button>
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
                  <p class="text-sm text-gray-500">{{ $formatDate(request.created_at) }}</p>
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
                  <p class="text-sm text-gray-500">{{ $formatDate(status.created_at) }}</p>
                  <p v-if="status.comment" class="mt-1 text-sm text-gray-600">{{ status.comment }}</p>
                </div>
              </div>
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
                    <p class="mt-1 text-sm text-gray-900">{{ $request.getRequestTypeText(request.kind) }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-500">وضعیت</label>
                    <span :class="$request.getStatusClass(request.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ $request.getStatusText(request.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ContentBox>

          <!-- Meta Information -->
          <ContentBox v-if="request.meta && request.meta.length > 0" title="اطلاعات تکمیلی">
            <DevelopmentLearningDocs
              v-if="request.kind === 'development_learning'"
              :meta="request.meta"
            />
            <TravelCreditDocs
              v-else-if="request.kind === 'travel_credit'"
              :meta="request.meta"
            />
            <SupplementaryInsuranceDocs
              v-else-if="request.kind === 'supplementary_insurance'"
              :meta="request.meta"
            />
            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کلید</th>
                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مقدار</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(item, index) in request.meta" :key="index">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.key }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ContentBox>

          <!-- Description -->
          <ContentBox v-if="request.description && request.description.trim()" title="توضیحات">
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-sm text-gray-900 whitespace-pre-line leading-loose font-extralight text-justify">{{ request.description }}</p>
            </div>
          </ContentBox>
        </div>
      </div>
    </div>

    <!-- Reject Modal -->
    <div v-if="showRejectModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg">
        <h2 class="text-xl font-bold mb-4">دلیل رد درخواست</h2>
        <textarea
          v-model="rejectReason"
          class="w-full h-32 p-2 border border-gray-300 rounded-lg"
          placeholder="دلیل رد درخواست را وارد کنید"
        ></textarea>
        <div class="mt-4 space-x-2">
          <button
            @click="showRejectModal = false"
            class="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg hover:bg-gray-300"
          >
            انصراف
          </button>
          <button
            @click="rejectRequest"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {{ isSubmitting ? 'در حال ثبت...' : 'تایید' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Approve Modal -->
    <div v-if="showApproveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-8 rounded-lg">
        <h2 class="text-xl font-bold mb-4">تایید درخواست</h2>
        <div class="mt-4 space-x-2">
          <button
            @click="showApproveModal = false"
            class="px-4 py-2 bg-gray-200 text-gray-500 rounded-lg hover:bg-gray-300"
          >
            انصراف
          </button>
          <button
            @click="approveRequest"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {{ isSubmitting ? 'در حال ثبت...' : 'تایید' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DevelopmentLearningDocs from '~/components/requests/DevelopmentLearningDocs.vue'
import TravelCreditDocs from '~/components/requests/TravelCreditDocs.vue'
import SupplementaryInsuranceDocs from '~/components/requests/SupplementaryInsuranceDocs.vue'

const { $request, $api, $formatDate } = useNuxtApp()
const route = useRoute()
const request = ref(null)
const loading = ref(true)
const error = ref(null)
const showRejectModal = ref(false)
const showApproveModal = ref(false)
const rejectReason = ref('')
const isSubmitting = ref(false)

const fetchRequest = async () => {
  try {
    loading.value = true
    error.value = null
    const res = await $api.get(`/api/v1/admin/requests/${route.params.id}`)
    request.value = res.data
  } catch (e) {
    error.value = e.message || 'خطا در دریافت اطلاعات درخواست'
  } finally {
    loading.value = false
  }
}

const rejectRequest = async () => {
  if (!rejectReason.value) {
    return
  }

  try {
    isSubmitting.value = true
    await $api.post(`/api/v1/admin/requests/${route.params.id}/reject`, {
      reason: rejectReason.value
    })
    showRejectModal.value = false
    rejectReason.value = ''
    await fetchRequest()
  } catch (e) {
    error.value = e.message || 'خطا در رد درخواست'
  } finally {
    isSubmitting.value = false
  }
}

const approveRequest = async () => {
  try {
    isSubmitting.value = true
    await $api.post(`/api/v1/admin/requests/${route.params.id}/approve`)
    showApproveModal.value = false
    await fetchRequest()
  } catch (e) {
    error.value = e.message || 'خطا در تایید درخواست'
  } finally {
    isSubmitting.value = false
  }
}

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'approved':
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
    case 'approved':
      return 'تایید شده'
    case 'rejected':
      return 'رد شده'
    default:
      return status
  }
}

onMounted(() => fetchRequest())
</script>

<style>
@import "~/assets/css/main.css";
</style> 