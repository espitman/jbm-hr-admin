<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div 
      class="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      :class="[size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-lg' : 'max-w-md']"
    >
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-bold">{{ title }}</h2>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-500"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="mb-6">
        <slot></slot>
      </div>

      <!-- Footer -->
      <div v-if="showFooter" class="flex justify-end space-x-4">
        <slot name="footer">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            @click="closeModal"
          >
            انصراف
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  showFooter: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script> 