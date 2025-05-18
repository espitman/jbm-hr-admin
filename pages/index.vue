<template>
  <div class="p-0">
    <h1 class="text-xl font-bold text-purple-700 mb-6">داشبورد</h1>
    <StatsCards />

    <!-- User Events Section -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <BirthdayUsers />
      <PastMonthHires />
    </div>

    <!-- Recent Activity Section -->
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-lg font-regular mb-4">فعالیت‌های اخیر</h2>
      <div class="space-y-4">
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-purple-50 rounded-full">
              <svg class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-regular">کاربر جدید ثبت شد</p>
              <p class="text-xs text-gray-500">2 ساعت پیش</p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-blue-50 rounded-full">
              <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-regular">درخواست جدید ثبت شد</p>
              <p class="text-xs text-gray-500">3 ساعت پیش</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BirthdayUsers from '~/components/dashboard/BirthdayUsers.vue'
import PastMonthHires from '~/components/dashboard/PastMonthHires.vue'
import StatsCards from '~/components/dashboard/StatsCards.vue'
// Page logic will be added later
</script>

<style>
/* Import main CSS file */
@import "~/assets/css/main.css";
</style> 