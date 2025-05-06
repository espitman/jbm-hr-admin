<template>
  <div class="space-y-6">
    <div class="grid grid-cols-2 gap-6">
      <div v-for="(item, index) in meta" :key="index" class="space-y-2">
        <h3 class="text-sm font-medium text-gray-700">{{ $request.getDocumentTitle(item.key) }}</h3>
        <div class="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
          <img
            :src="item.value"
            :alt="$request.getDocumentTitle(item.key)"
            class="w-full h-full object-cover cursor-pointer"
            @click="openImage(item.value)"
          />
        </div>
      </div>
    </div>

    <BaseModal
      :is-open="isModalOpen"
      title="پیش‌نمایش تصویر"
      size="md"
      @close="isModalOpen = false"
    >
      <div class="relative max-h-[80vh]">
        <h5 class="text-sm font-medium text-gray-700 mb-4">{{ $request.getDocumentTitle(meta.find(item => item.value === selectedImage)?.key) }}</h5>
        <img
          :src="selectedImage"
          class="max-w-full max-h-[80vh] object-contain"
        />
      </div>
    </BaseModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  meta: {
    type: Array,
    default: () => []
  }
})

const selectedImage = ref(null)
const isModalOpen = ref(false)

const openImage = (url) => {
  selectedImage.value = url
  isModalOpen.value = true
}
</script> 