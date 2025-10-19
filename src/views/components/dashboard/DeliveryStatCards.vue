<script setup lang="ts">
import { ref } from "vue";
import { Truck, QrCode, TrendingUp } from "lucide-vue-next";

const isVisible = ref(true);
</script>

<template>
  <div class="p-2 bg-white/50">
    <button
      @click="isVisible = !isVisible"
      class="mb-3 flex items-center justify-center w-10 h-1.5 bg-gray-400 rounded-full hover:bg-gray-600 transition"
      title="Скрить"
    ></button>

    <transition name="fade">
      <div v-if="isVisible" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          class="flex items-center justify-between bg-sky-100 rounded-lg shadow-sm p-4 hover:shadow-md transition"
        >
          <div class="flex flex-col justify-center text-center w-full">
            <span class="text-gray-700 font-medium">Продажи</span>
            <span class="text-xs text-gray-400">Orders</span>
            <span class="text-xl font-bold text-gray-800 mt-1">2403</span>
          </div>
          <div class="bg-sky-200 text-sky-600 p-2 rounded-md ml-3">
            <QrCode class="w-10 h-10 p-1 rounded-md text-gray-600" />
          </div>
        </div>

        <div
          class="flex items-center justify-between bg-blue-100 rounded-lg shadow-sm p-4 hover:shadow-md transition"
        >
          <div class="flex flex-col justify-center text-center w-full">
            <span class="text-gray-700 font-medium">Отгрузки</span>
            <span class="text-xs text-gray-400">Delivery</span>
            <span class="text-xl font-bold text-gray-800 mt-1">1000</span>
          </div>
          <div class="bg-sky-200 text-sky-600 p-2 rounded-md">
            <Truck class="w-10 h-10 p-1 rounded-md text-gray-600" />
          </div>
        </div>

        <div
          class="flex items-center justify-between rounded-lg shadow-sm p-4 hover:shadow-md transition bg-yellow-100"
        >
          <div class="flex flex-col justify-center text-center w-full">
            <span class="text-gray-700 font-medium">Выполнено</span>
            <span class="text-xs text-gray-400">Completed</span>
            <div class="flex items-center justify-center space-x-2 mt-1">
              <span class="text-xl font-bold text-gray-800">12%</span>
              <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  class="h-2 bg-yellow-400 rounded-full"
                  style="width: 12%"
                ></div>
              </div>
            </div>
          </div>
          <div class="bg-yellow-200 text-yellow-600 p-2 rounded-md ml-3">
            <TrendingUp class="w-10 h-10 p-1 rounded-md text-gray-600" />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
