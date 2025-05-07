<template>
  <div class="space-y-6">
    <div v-for="(item, index) in parsedMeta" :key="index" class="overflow-x-auto">
      <h3 class="text-sm font-medium text-gray-700 mb-4">{{ $request.getDocumentTitle(item.key) }}</h3>
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام و نام خانوادگی</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کد ملی</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">شماره شناسنامه</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">جنسیت</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام پدر</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاریخ تولد</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ item.person.firstName }} {{ item.person.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.person.nationalCode }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.person.identityNumber }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.person.gender === 'male' ? 'مرد' : 'زن' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.person.fatherFirstName }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.person.birthDate || '-' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  meta: {
    type: Array,
    default: () => []
  }
})

const parsedMeta = computed(() => {
  return props.meta.map(item => ({
    key: item.key,
    person: JSON.parse(item.value)
  }))
})
</script> 