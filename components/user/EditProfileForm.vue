<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h2 class="text-lg font-bold mb-4">ویرایش پروفایل</h2>
    <form class="space-y-6">
      <!-- First Name -->
      <div>
        <label for="first_name" class="block text-sm font-medium text-gray-700 mb-1">نام</label>
        <input
          id="first_name"
          type="text"
          :value="user.first_name"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <!-- Last Name -->
      <div>
        <label for="last_name" class="block text-sm font-medium text-gray-700 mb-1">نام خانوادگی</label>
        <input
          id="last_name"
          type="text"
          :value="user.last_name"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
        <input
          id="email"
          type="email"
          dir="ltr"
          :value="user.email"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">شماره موبایل</label>
        <input
          id="phone"
          type="tel"
          :value="user.phone"
          class="block w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
        />
      </div>

      <div class="pt-2">
        <button type="button" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">بروزرسانی</button>
      </div>
    </form>
  </div>
</template>

<script setup>
defineProps({
  user: Object
})
</script> 