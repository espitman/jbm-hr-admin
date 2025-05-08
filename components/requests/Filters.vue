<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">نوع درخواست</label>
      <select
        class="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition w-full"
        :value="kind"
        @change="$emit('update:kind', $event.target.value)"
      >
        <option value="" class="text-gray-400">همه انواع</option>
        <option v-for="k in kinds" :key="k.value" :value="k.value">
          {{ k.label }}
        </option>
      </select>
    </div>

    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">وضعیت</label>
      <select
        class="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition w-full"
        :value="status"
        @change="$emit('update:status', $event.target.value)"
      >
        <option value="" class="text-gray-400">همه وضعیت‌ها</option>
        <option value="pending">در انتظار بررسی</option>
        <option value="approved">تایید شده</option>
        <option value="rejected">رد شده</option>
      </select>
    </div>

    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">شناسه کاربر</label>
      <input
        :value="userId"
        class="rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition w-full"
        type="text"
        placeholder="شناسه کاربر را وارد کنید"
        @input="$emit('update:userId', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  kind: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    default: ''
  },
  kinds: {
    type: Array,
    required: true
  }
})
</script> 