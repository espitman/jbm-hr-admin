<template>
  <div class="bg-white rounded-lg shadow p-8">
    <h2 class="text-lg font-bold mb-4">ویرایش پروفایل</h2>
    <form class="space-y-6">
      <!-- Basic Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold mb-1">نام</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" :value="user.first_name" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1">نام خانوادگی</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" :value="user.last_name" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1">ایمیل</label>
          <input type="email" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" :value="user.email" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1">شماره موبایل</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" :value="user.phone" />
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs font-bold mb-1">آدرس</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="خیابان سوم، فاز چهارم، پلاک ۴ کالیفرنیا" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1">شهر</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="کالیفرنیا" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1">کد پستی</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="کد پستی" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1">کشور</label>
          <select class="w-full border border-gray-300 rounded px-3 py-2 text-sm">
            <option>آلمان</option>
            <option>ایران</option>
            <option>آمریکا</option>
          </select>
        </div>
      </div>
      <!-- External Links -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-bold mb-1">فیسبوک</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="فیسبوک" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1">گوگل</label>
          <input type="email" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="گوگل" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1">توییتر</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="توییتر" />
        </div>
        <div>
          <label class="block text-xs font-bold mb-1">پینترست</label>
          <input type="text" class="w-full border border-gray-300 rounded px-3 py-2 text-sm" placeholder="پینترست" />
        </div>
      </div>
      <!-- About -->
      <div>
        <label class="block text-xs font-bold mb-1">درباره من</label>
        <textarea class="w-full border border-gray-300 rounded px-3 py-2 text-sm" rows="3" placeholder="درباره من"></textarea>
      </div>
      <div class="flex gap-2 mt-2">
        <button type="button" class="flex-1 bg-green-500 text-white py-2 rounded">بروزرسانی</button>
        <button type="button" class="flex-1 bg-red-400 text-white py-2 rounded">انصراف</button>
      </div>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  user: Object
})
</script> 