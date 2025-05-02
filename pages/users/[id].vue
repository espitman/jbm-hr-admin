<template>
  <div class="container mx-auto p-1">
    <h1 class="text-xl font-bold text-purple-700 mb-6">ویرایش پروفایل</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="col-span-1 space-y-6">
        <ProfileCard
          :avatar="user.avatar"
          :name="user.first_name + ' ' + user.last_name"
          :role="user.role === 'admin' ? 'طراح وب' : 'کارمند'"
        />
        <EditPasswordCard :role="user.role" />
      </div>
      <!-- Right Column -->
      <div class="col-span-2">
        <EditProfileForm :user="user" />
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

onMounted(() => {
  fetchUser()
})
</script>

<style>
@import "~/assets/css/main.css";
</style> 