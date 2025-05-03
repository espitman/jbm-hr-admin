<template>
  <div class="container mx-auto p-1">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-bold text-purple-700">آلبوم تصاویر</h1>
      <button 
        @click="openUploadModal"
        class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
      >
        <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        آپلود تصویر جدید
      </button>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <div v-else-if="error" class="text-center text-red-600 p-4 bg-red-50 rounded-lg">
      {{ error }}
    </div>

    <div v-else-if="albums.length === 0" class="text-center text-gray-500 p-8">
      هیچ تصویری یافت نشد
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div 
        v-for="album in albums" 
        :key="album.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
      >
        <div class="relative aspect-square">
          <div class="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-md text-sm font-medium">
            {{ album.display_order }}
          </div>
          <img 
            :src="album.url" 
            :alt="album.caption"
            class="w-full h-full object-cover"
          />
          <div class="absolute top-2 right-2 flex gap-2">
            <button 
              @click="openEditModal(album)"
              class="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              @click="openDeleteModal(album)"
              class="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div class="p-4">
          <p class="text-sm text-gray-600">{{ album.caption }}</p>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <BaseModal
      :is-open="isUploadModalOpen"
      title="آپلود تصویر جدید"
      size="lg"
      :show-cancel-button="false"
      :show-footer="false"
      @close="closeUploadModal"
    >
      <AlbumUpload @success="handleUploadSuccess" />
    </BaseModal>

    <!-- Delete Modal -->
    <DeleteAlbumModal
      :is-open="isDeleteModalOpen"
      :image="selectedImage"
      @close="closeDeleteModal"
      @success="fetchAlbums"
    />

    <!-- Edit Modal -->
    <EditAlbumModal
      v-model="isEditModalOpen"
      :album="selectedAlbum"
      @updated="fetchAlbums"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DeleteAlbumModal from '@/components/albums/DeleteAlbumModal.vue'
import AlbumUpload from '@/components/albums/AlbumUpload.vue'
import EditAlbumModal from '@/components/albums/EditAlbumModal.vue'
import BaseModal from '@/components/BaseModal.vue'

const { $api } = useNuxtApp()
const albums = ref([])
const loading = ref(true)
const error = ref(null)
const isUploadModalOpen = ref(false)
const isDeleteModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedImage = ref(null)
const selectedAlbum = ref(null)

const fetchAlbums = async () => {
  try {
    loading.value = true
    error.value = null
    const response = await $api.get('/api/v1/albums')
    albums.value = response.data || []
  } catch (err) {
    error.value = err.message || 'خطا در دریافت تصاویر'
  } finally {
    loading.value = false
  }
}

const openDeleteModal = (image) => {
  selectedImage.value = image
  isDeleteModalOpen.value = true
}

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
  selectedImage.value = null
}

const openUploadModal = () => {
  isUploadModalOpen.value = true
}

const closeUploadModal = () => {
  isUploadModalOpen.value = false
}

const handleUploadSuccess = () => {
  closeUploadModal()
  fetchAlbums()
}

const openEditModal = (album) => {
  selectedAlbum.value = album
  isEditModalOpen.value = true
}

onMounted(() => {
  fetchAlbums()
})
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style> 