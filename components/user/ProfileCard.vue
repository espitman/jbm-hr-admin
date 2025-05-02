<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <img
      class="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow"
      :src="avatar || 'https://randomuser.me/api/portraits/men/1.jpg'"
      alt="User Avatar"
    />
    <div class="text-lg font-semibold">{{ name }}</div>
    <div class="text-sm text-gray-500 mb-2">{{ role }}</div>
    <div class="flex items-center mb-2">
      <span class="text-yellow-400 text-lg">★ ★ ★ ☆ ☆</span>
    </div>
    <button class="bg-purple-600 text-white px-4 py-2 rounded font-medium mb-4">مشاهده پروفایل</button>
    <div class="flex justify-between w-full mt-2">
      <div class="text-center">
        <div class="text-xl font-bold">۶۸۹هزار</div>
        <div class="text-xs text-gray-500">دنبال‌کننده</div>
      </div>
      <div class="text-center">
        <div class="text-xl font-bold">۳٬۷۶۵</div>
        <div class="text-xs text-gray-500">دنبال‌شوندگان</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  avatar: String,
  name: String,
  role: String
})
</script> 