<template>
  <BaseModal
    :is-open="modelValue"
    :show-cancel-button="false"
    :show-footer="false"
    title="ویرایش آلبوم"
    @close="$emit('update:modelValue', false)"
  >
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">عنوان</label>
        <input
          v-model="form.caption"
          type="text"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="عنوان آلبوم"
        />
      </div>

      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">ترتیب نمایش</label>
        <input
          v-model.number="form.display_order"
          type="number"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="ترتیب نمایش"
        />
      </div>

      <input type="hidden" v-model="form.url" />

      <div class="flex justify-end gap-3 mt-6">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md"
          @click="$emit('update:modelValue', false)"
        >
          انصراف
        </button>
        <button
          type="submit"
          class="px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md"
          :disabled="isSubmitting"
        >
          <span v-if="isSubmitting">در حال ذخیره...</span>
          <span v-else>ذخیره تغییرات</span>
        </button>
      </div>
    </form>
  </BaseModal>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useNuxtApp } from '#app'
import { useToast } from 'vue-toastification'
import BaseModal from '@/components/BaseModal.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  album: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'updated'])

const { $api } = useNuxtApp()
const toast = useToast()

const form = ref({
  caption: '',
  display_order: 0,
  url: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    await $api.put(`/api/v1/admin/albums/${props.album.id}`, form.value)
    toast.success('آلبوم با موفقیت ویرایش شد')
    emit('updated')
    emit('update:modelValue', false)
  } catch {
    toast.error('خطایی در ویرایش آلبوم رخ داد')
  } finally {
    isSubmitting.value = false
  }
}

watch(() => props.album, (newAlbum) => {
  if (newAlbum) {
    form.value = {
      caption: newAlbum.caption || '',
      display_order: newAlbum.display_order || 0,
      url: newAlbum.url || ''
    }
  }
}, { immediate: true })
</script> 