<script setup lang="ts">
import { ref, onMounted, Ref } from "vue";
import api from "@/utils/axios";
import { formatDate } from "@/utils/formatDate";
import EmptyState from "@/components/ui/EmptyState.vue";
import Spinner from "@/components/ui/Spinner.vue";

interface InfoItem {
  article: string;
  name: string;
  measurement: string;
  amount: number;
}

interface Delivery {
  number: string;
  date: string;
  car: string;
  driver: string;
}

interface StatItem {
  article: string;
  nomenclature: string;
  measurement: string;
  amount: number;
  percent: number;
}

const inputValue = ref<string>("");
const hiddenInput = ref<HTMLInputElement | null>(null);
const deliveries = ref<Delivery[]>([]);
const isLoaddeliveries = ref<boolean>(false);
const isLoadInfoData = ref<boolean>(false);
const isLoadStats = ref<boolean>(false);

const handleEnter = (): void => {
  alert(inputValue.value);
  inputValue.value = "";
};

async function loadInvoice(): Promise<void> {
  isLoaddeliveries.value = true;
  try {
    const response = await api.get<Delivery[]>("/ver1/invoice");
    deliveries.value = response.data ?? [];
  } catch (err) {
  } finally {
    isLoaddeliveries.value = false;
  }
}

const infoData = ref<InfoItem[]>([]);
const stats = ref<StatItem[]>([]);

async function toggleInvoice(invoice: Delivery): Promise<void> {
  isLoadInfoData.value = true;
  isLoadStats.value = true;
  infoData.value = [];
  stats.value = [];
  try {
    const response = await api.get<InfoItem[]>("/ver1/infoData", {
      params: {
        invoice_number: invoice.number,
        invoice_date: invoice.date,
      },
    });

    infoData.value = response.data[0] ?? [];
    stats.value = response.data[1] ?? [];
  } catch (err) {
    infoData.value = [];
  } finally {
    isLoadInfoData.value = false;
    isLoadStats.value = false;
  }
}

onMounted(() => {
  hiddenInput.value?.focus();
  document.addEventListener("click", () => {
    hiddenInput.value?.focus();
  });
  loadInvoice();
});
</script>

<template>
  <div
    class="flex-1 flex flex-col p-4 bg-white text-gray-800 overflow-auto h-screen"
  >
    <div class="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-4 min-w-[900px]">
      <div class="bg-white rounded-xl shadow-md p-3 flex flex-col h-[220px]">
        <h2 class="text-md font-bold text-blue-700 mb-1">
          Счёта фактуры
          <span class="text-gray-500 ml-1 text-xs">(Invoice)</span>
        </h2>

        <div class="overflow-y-scroll flex-1 scroller">
          <EmptyState v-if="!deliveries.length && !isLoaddeliveries" />

          <Spinner v-if="isLoaddeliveries" />

          <div
            v-for="(delivery, index) in deliveries"
            :key="index"
            class="border-t border-gray-200 bg-gray-100 pt-2 pb-2 px-3 mt-1 text-xs text-gray-800 rounded-lg shadow-sm"
          >
            <div
              @click="toggleInvoice(delivery)"
              class="flex flex-col items-center justify-center text-center bg-white shadow-sm rounded-xl p-2 space-y-1.5 w-full max-w-[300px] transition-transform hover:scale-[1.01] duration-200"
            >
              <div
                class="flex items-center justify-between w-full border-b border-gray-200 pb-0.5"
              >
                <span
                  class="font-semibold text-gray-800 text-[13px] tracking-wide"
                >
                  № {{ delivery.number }}
                </span>
                <span class="text-gray-500 text-[11px]">
                  {{ formatDate(delivery.date, false) }}
                </span>
              </div>

              <div class="flex items-center justify-between w-full pt-1">
                <span class="font-semibold text-blue-700 text-[13px] truncate">
                  {{ delivery.car }}
                </span>
                <span class="text-gray-600 text-[12px] truncate">
                  {{ delivery.driver }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-gray-100 rounded-xl shadow-md p-3 flex flex-col overflow-y-auto h-[220px] max-h-[500px] scroller"
      >
        <h2 class="text-md font-bold text-blue-700 mb-2">
          Продажи
          <span class="text-gray-500 ml-1 text-xs">(Orders)</span>
        </h2>

        <div
          class="grid grid-cols-4 gap-1 bg-white font-semibold text-xs text-gray-600 border-b pb-1 p-2 rounded-lg"
        >
          <div>Артикул</div>
          <div>Номенклатура</div>
          <div>Ед. изм.</div>
          <div>Миқдори</div>
        </div>

        <div
          class="divide-y mt-1 h-[190px] space-y-2 overflow-y-scroll scroller"
        >
          <EmptyState
            v-if="!infoData || (infoData.length === 0 && !isLoadInfoData)"
          />

          <Spinner v-if="isLoadInfoData" />

          <div
            v-for="(info, i) in infoData"
            :key="i"
            class="grid grid-cols-4 gap-1 py-2 px-2 text-xs items-center border border-gray-200 rounded-lg bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div class="border-r border-gray-200 pr-2">{{ info.article }}</div>
            <div class="border-r border-gray-200 pr-2">{{ info.name }}</div>
            <div class="border-r border-gray-200 pr-2">
              {{ info.measurement }}
            </div>
            <div class="border-r-0 pr-2 text-right">{{ info.amount }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4 mt-4 min-w-[900px]"
    >
      <div class="bg-gray-100 rounded-xl shadow-md p-3 max-h-[280px]">
        <h2 class="text-md font-bold text-blue-700 mb-2">
          Отгружено
          <span class="text-gray-500 ml-1 text-xs">(Delivery)</span>
        </h2>

        <div
          class="grid grid-cols-5 bg-white gap-1 font-semibold text-xs text-gray-600 border-b pb-1 py-2 px-2 rounded-lg"
        >
          <div>Артикул</div>
          <div>Номенклатура</div>
          <div>Ед. изм.</div>
          <div>Миқдори</div>
          <div>Бар (%)</div>
        </div>

        <div class="mt-2 space-y-2 h-[190px] overflow-y-auto scroller">
          <EmptyState v-if="!stats.length && !isLoadStats" />

          <Spinner v-if="isLoadInfoData" />

          <div
            v-for="(stat, s) in stats"
            :key="s"
            class="grid grid-cols-5 gap-1 py-2 px-2 text-xs items-center border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition"
          >
            <div class="border-r border-gray-200 pr-2">{{ stat.article }}</div>
            <div class="border-r border-gray-200 pr-2">
              {{ stat.name }}
            </div>
            <div class="border-r border-gray-200 pr-2">
              {{ stat.measurement }}
            </div>
            <div class="border-r border-gray-200 pr-2">{{ stat.amount }}</div>

            <div class="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
              <div
                class="h-1 bg-blue-500 rounded-full transition-all duration-500"
                :style="{ width: stat.percent + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="bg-white rounded-xl shadow-md p-3 flex flex-col items-center justify-center"
      >
        <h2 class="text-md font-bold text-blue-700 mb-1">Диаграмма</h2>

        <div
          class="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 flex items-center justify-center text-white text-xl font-bold shadow-md"
        >
          45%
        </div>
      </div>
    </div>
    <!-- <input
      ref="hiddenInput"
      v-model="inputValue"
      @keydown.enter="handleEnter"
      type="text"
      class="absolute opacity-0 w-0 h-0"
      autocomplete="off"
    /> -->
  </div>
</template>

<style scoped>
.scroller {
  scrollbar-width: thin;
}
</style>
