<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Truck, QrCode, TrendingUp, Package } from "lucide-vue-next";
import { useStatCards } from "@/composables/useStatCards.ts";

const isVisible = ref(true);
const { statCards, loadStatCards } = useStatCards();

onMounted(loadStatCards);
</script>

<template>
  <div class="p-1 bg-sky-100">
    <transition name="fade">
      <div v-if="isVisible" class="grid grid-cols-1 sm:grid-cols-4 gap-1.5">
        <div
          class="flex items-center justify-between bg-gradient-to-r from-sky-400 to-sky-500 rounded-lg shadow p-2.5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:brightness-110 cursor-pointer"
        >
          <div class="flex flex-col justify-center text-center w-full">
            <h3 class="text-white/90 font-semibold text-[12px] mb-0.5">
              Продажи
            </h3>
            <span class="text-white/70 text-[10px]">Orders</span>
            <span class="text-white text-lg font-bold mt-0.5 drop-shadow-sm">{{
              statCards[0]?.invoice ?? 0
            }}</span>
          </div>

          <div
            class="bg-white/20 backdrop-blur-md p-1.5 rounded-md ml-1.5 flex items-center justify-center shadow-inner"
          >
            <QrCode class="w-4 h-4 text-white" />
          </div>
        </div>

        <div
          class="flex items-center justify-between bg-gradient-to-r from-sky-400 to-sky-500 rounded-lg shadow p-2.5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:brightness-110 cursor-pointer"
        >
          <div class="flex flex-col justify-center text-center w-full">
            <h3 class="text-white/90 font-semibold text-[12px] mb-0.5">
              Отгрузки
            </h3>
            <span class="text-white/70 text-[10px]">Delivery</span>
            <span class="text-white text-lg font-bold mt-0.5 drop-shadow-sm">{{
              statCards[0]?.delivery ?? 0
            }}</span>
          </div>

          <div
            class="bg-white/20 backdrop-blur-md p-1.5 rounded-md ml-1.5 flex items-center justify-center shadow-inner"
          >
            <Package class="w-4 h-4 text-white" />
          </div>
        </div>

        <div
          class="flex items-center justify-between bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-lg shadow p-2.5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:brightness-110 cursor-pointer"
        >
          <div class="flex flex-col justify-center text-center w-full">
            <h3 class="text-white/90 font-semibold text-[12px] mb-0.5">
              Выполнено
            </h3>
            <span class="text-white/70 text-[10px]">Completed</span>

            <div class="flex items-center justify-center gap-1.5 mt-1">
              <span
                class="text-white text-[14px] font-extrabold drop-shadow-sm"
              >
                {{ statCards[0]?.done ?? 0 }}%
              </span>
              <div class="w-14 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  class="h-1 bg-white rounded-full transition-all duration-500"
                  :style="{ width: `${statCards[0]?.done ?? 0}%` }"
                ></div>
              </div>
            </div>
          </div>

          <div
            class="bg-white/20 backdrop-blur-md p-1.5 rounded-md ml-1.5 flex items-center justify-center shadow-inner"
          >
            <TrendingUp class="w-4 h-4 text-white" />
          </div>
        </div>

        <div
          class="flex items-center justify-between bg-gradient-to-r from-sky-400 to-sky-500 rounded-lg shadow p-2.5 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:brightness-110 cursor-pointer"
        >
          <div class="flex flex-col justify-center text-center w-full">
            <h3
              class="text-white/90 font-semibold text-[12px] mb-0.5 leading-tight"
            >
              Количество транспортов
            </h3>
            <div class="flex justify-center gap-3 mt-0.5">
              <div class="flex flex-col items-center">
                <span class="text-white/80 text-[10px]">На территории</span>
                <span
                  class="text-white text-[15px] font-bold mt-0.5 drop-shadow-sm"
                  >12</span
                >
              </div>
              <div class="flex flex-col items-center">
                <span class="text-white/80 text-[10px]">Погружено</span>
                <span
                  class="text-white text-[15px] font-bold mt-0.5 drop-shadow-sm"
                  >17</span
                >
              </div>
            </div>
          </div>

          <div
            class="bg-white/20 backdrop-blur-md p-1.5 rounded-md ml-1.5 flex items-center justify-center shadow-inner"
          >
            <Truck class="w-4 h-4 text-white" />
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
