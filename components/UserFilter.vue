<template>
  <div class="relative">
    <input
      v-model="query"
      @focus="showDropdown = true"
      @input="onInput"
      type="text"
      :placeholder="placeholder"
      class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-300 transition w-full text-sm"
    />
    <ul
      v-if="showDropdown && (results.length > 0 || loading)"
      class="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto"
    >
      <li v-if="loading" class="flex items-center gap-2 px-3 py-2 text-gray-500">
        <svg class="animate-spin h-4 w-4 mr-2 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        در حال جستجو...
      </li>
      <li
        v-for="user in results"
        :key="user.id"
        @mousedown.prevent="selectUser(user)"
        class="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-purple-50"
      >
        <img
          v-if="user.avatar"
          :src="user.avatar"
          class="w-8 h-8 rounded-full object-cover border border-gray-200"
          alt="avatar"
        />
        <div v-else class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
          <span>{{ user.full_name?.slice(0, 1) }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-medium text-sm text-gray-800">{{ user.full_name }}</span>
          <span class="text-xs text-gray-500">{{ user.department }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const { placeholder, selectedUser, defaultUserId } = defineProps({
  placeholder: {
    type: String,
    default: 'جستجوی کاربر...'
  },
  selectedUser: {
    type: Object,
    default: null
  },
  defaultUserId: {
    type: [String, Number],
    default: ''
  }
})
const emit = defineEmits(['select'])
const { $api } = useNuxtApp()
const query = ref('')
const results = ref([])
const showDropdown = ref(false)
let debounceTimeout
const loading = ref(false)

watch(() => selectedUser, (val) => {
  if (val && val.full_name) {
    query.value = val.full_name
  } else {
    query.value = ''
  }
}, { immediate: true })

watch(() => defaultUserId, async (id) => {
  if (!id) {
    query.value = ''
    emit('select', null)
    return
  }
  try {
    const res = await $api.get(`/api/v1/admin/users/${id}`)
    if (res.data) {
      query.value = res.data.first_name + ' ' + res.data.last_name
      emit('select', res.data)
    }
  } catch {
    query.value = ''
    emit('select', null)
  }
}, { immediate: true })

const onInput = () => {
  showDropdown.value = true
  if (debounceTimeout) clearTimeout(debounceTimeout)
  if (!query.value) {
    results.value = []
    loading.value = false
    return
  }
  loading.value = true
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await $api.get(`/api/v1/admin/users/search/${encodeURIComponent(query.value)}`)
      results.value = res.data.items || []
      loading.value = false
    } catch {
      results.value = []
      loading.value = false
    }
  }, 400)
}

const selectUser = (user) => {
  emit('select', user)
  query.value = user.full_name
  showDropdown.value = false
}

// Hide dropdown on outside click
if (import.meta.client) {
  document.addEventListener('click', () => {
    showDropdown.value = false
  })
}
</script> 