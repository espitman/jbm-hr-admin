<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">کلید</th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">مقدار</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(item, index) in meta" :key="index">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ $request.getDocumentTitle(item.key) }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ getTranslatedValue(item) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  meta: {
    type: Array,
    default: () => []
  }
})

const getTranslatedValue = (item) => {
  if (item.key === 'provider') {
    const providers = {
      'jabama': 'جاباما',
      'alibaba': 'علی‌بابا'
    }
    return providers[item.value] || item.value
  }
  if (item.key === 'credit_amount') {
    return new Intl.NumberFormat('fa-IR').format(item.value) + ' تومان'
  }
  return item.value
}
</script> 