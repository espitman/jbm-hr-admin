<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 items-end">
    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">نوع درخواست</label>
      <select
        class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition w-full text-sm"
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
        class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition w-full text-sm"
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
      <UserFilter
        :placeholder="'نام، ایمیل یا شماره کاربر را جستجو کنید'"
        @select="user => emit('update:userId', user?.id || '')"
      />
    </div>

    <div class="flex flex-col items-end">
      <button
        v-if="showClear"
        type="button"
        class="h-10 w-auto flex items-center justify-center gap-1 px-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition border-none mt-0"
        @click="$emit('clear')"
        title="پاک کردن فیلترها"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span class="text-xs">پاک کردن</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import UserFilter from '~/components/UserFilter.vue'

const props = defineProps({
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

const emit = defineEmits(['update:kind', 'update:status', 'update:userId', 'clear'])

const showClear = computed(() => !!(props.kind || props.status || props.userId))
</script> 