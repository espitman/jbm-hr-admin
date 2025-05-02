<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <img
      class="w-16 h-16 rounded-full object-cover mb-4 border-4 border-white shadow"
      :src="avatar || 'https://randomuser.me/api/portraits/men/1.jpg'"
      alt="User Avatar"
    />
    <div class="text-sm font-medium mb-4">تغییر رمز عبور</div>
    <form class="w-full space-y-3">
      <input type="password" placeholder="رمز عبور فعلی" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
      <input type="password" placeholder="رمز عبور جدید" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
      <input type="password" placeholder="تکرار رمز عبور جدید" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
      <div class="flex gap-2 mt-2">
        <button type="button" class="flex-1 bg-green-500 text-white py-2 rounded">بروزرسانی</button>
        <button type="button" class="flex-1 bg-red-400 text-white py-2 rounded">انصراف</button>
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  avatar: String
})
</script> 