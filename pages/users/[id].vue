<template>
  <div class="container mx-auto p-0">
    <h1 class="text-xl font-bold text-purple-700 mb-6">ویرایش پروفایل</h1>
    
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
    </div>

    <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span class="block sm:inline">{{ error }}</span>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="col-span-1 space-y-6">
        <ProfileCard
          :avatar="user.avatar"
          :confirmed="user.confirmed"
          :name="user.first_name + ' ' + user.last_name"
          :role="user.role === 'admin' ? 'مدیر' : 'کارمند'"
          :userId="user.id"
          :birthdate="user.birthdate"
          :cooperation_start_date="user.cooperation_start_date"
          :active="user.active"
          @update:avatar="handleAvatarUpdate"
          @update:birthdate="handleBirthdateUpdate"
          @update:cooperation_start_date="handleCooperationStartDateUpdate"
          @success="fetchUser"
        />
        <EditPasswordCard :role="user.role" :user-id="user.id" @updated="fetchUser" />
      </div>
      <!-- Right Column -->
      <div class="col-span-2">
        <EditProfileForm :user="user" @updated="fetchUser" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProfileCard from '~/components/user/ProfileCard.vue'
import EditPasswordCard from '~/components/user/EditPasswordCard.vue'
import EditProfileForm from '~/components/user/EditProfileForm.vue'

const route = useRoute()
const { $api } = useNuxtApp()

const user = ref({})
const loading = ref(true)
const error = ref(null)

const fetchUser = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get(`/api/v1/admin/users/${route.params.id}`)
    user.value = response.data || {}
  } catch (err) {
    error.value = err.message || 'خطا در دریافت اطلاعات کاربر'
  } finally {
    loading.value = false
  }
}

const handleBirthdateUpdate = (newDate) => {
  user.value.birthdate = newDate
}

const handleCooperationStartDateUpdate = (newDate) => {
  user.value.cooperation_start_date = newDate
}

onMounted(() => {
  fetchUser()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 