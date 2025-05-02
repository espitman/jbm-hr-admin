<template>
  <div class="bg-white rounded-lg shadow p-6 flex flex-col items-center">
    <div class="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 border-4 border-white shadow">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    </div>
    <div class="text-sm font-medium mb-4">تغییر رمز عبور</div>
    <form class="w-full space-y-3" :class="{ 'opacity-50 pointer-events-none': role !== 'admin' }">
      <input type="password" placeholder="رمز عبور جدید" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" :disabled="role !== 'admin'" />
      <input type="password" placeholder="تکرار رمز عبور جدید" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" :disabled="role !== 'admin'" />
      <div class="flex gap-2 mt-2">
        <button type="button" class="flex-1 bg-green-500 text-white py-2 rounded" :disabled="role !== 'admin'">بروزرسانی</button>
        <button type="button" class="flex-1 bg-red-400 text-white py-2 rounded" :disabled="role !== 'admin'">انصراف</button>
      </div>
      <p v-if="role !== 'admin'" class="text-xs text-gray-500 text-center mt-2">امکان ست کردن رمز عبور فقط برای رول ادمین است.</p>
    </form>
  </div>
</template>

<script setup>
defineProps({
  role: {
    type: String,
    default: 'employee'
  }
})
</script> 