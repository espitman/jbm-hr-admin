<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <img
      class="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow"
      :src="avatar || 'https://randomuser.me/api/portraits/men/1.jpg'"
      alt="User Avatar"
    />
    <div class="text-lg font-semibold">{{ name }}</div>
    <div class="text-sm text-gray-500">{{ role }}</div>
  </div>
</template>

<script setup>
defineProps({
  avatar: {
    type: String,
    default: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  name: {
    type: String,
    default: 'کاربر'
  },
  role: {
    type: String,
    default: 'کارمند'
  }
})
</script> 