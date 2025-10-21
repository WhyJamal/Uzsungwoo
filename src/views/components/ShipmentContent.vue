<script setup lang="ts">
import { ref, onMounted, Ref, computed } from "vue";
import api from "@/utils/axios";
import { formatDate } from "@/utils/formatDate";
import EmptyState from "@/components/ui/EmptyState.vue";
import Spinner from "@/components/ui/Spinner.vue";
import DoughnutChart from "@/views/components/dashboard/DoughnutChart.vue";
import NotificationToast from "@/components/ui/NotificationToast.vue";

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
const toasts = ref<{ type: string; message: string; id: number }[]>([]);

const handleEnter = async (): Promise<void> => {
  if (!inputValue.value.trim()) return;

  try {
    const response = await api.patch("/ver1/update_by_barcode", {
      barcode: inputValue.value,
    });

    toasts.value.push({
      type: "success",
      message: response.data.message,
      id: Date.now(),
    });
    if (selectedInvoice.value) {
      await reloadSelectedInvoice();
    }
  } catch (error) {
    toasts.value.push({
      type: "danger",
      message: error.response?.data?.message || "Error",
      id: Date.now(),
    });
  } finally {
    inputValue.value = "";
  }
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

const DoughnutData = computed(() => {
  const counterpartyMap: Record<string, number> = {};

  deliveries.value.forEach((delivery) => {
    const itemsCount = delivery.items;

    counterpartyMap[delivery.counterparty] =
      (counterpartyMap[delivery.counterparty] ?? 0) + itemsCount;
  });

  return Object.entries(counterpartyMap).map(([name, value]) => ({
    name,
    value,
  }));
});

const infoData = ref<InfoItem[]>([]);
const stats = ref<StatItem[]>([]);
const selectedInvoice = ref<Delivery | null>(null);

async function loadInvoiceData(invoice: Delivery) {
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
  } catch {
    infoData.value = [];
    stats.value = [];
  } finally {
    isLoadInfoData.value = false;
    isLoadStats.value = false;
  }
}

async function toggleInvoice(invoice: Delivery) {
  if (
    !selectedInvoice.value ||
    selectedInvoice.value.number !== invoice.number
  ) {
    selectedInvoice.value = invoice;
    await loadInvoiceData(invoice);
  }
}

async function reloadSelectedInvoice() {
  if (!selectedInvoice.value) return;
  await loadInvoiceData(selectedInvoice.value);
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
    class="flex-1 flex flex-col p-3 bg-sky-100 text-gray-800 overflow-auto h-screen"
  >
    <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-2">
      <div class="flex flex-col gap-2">
        <div
          class="bg-gray-100 rounded-lg shadow p-2 flex flex-col overflow-y-auto h-[290px] scroller"
        >
          <h2 class="text-sm font-semibold text-blue-700 mb-1">
            Продажи <span class="text-gray-500 ml-1 text-[11px]">(Orders)</span>
          </h2>

          <div
            class="grid grid-cols-[0.6fr_2.3fr_0.7fr_0.7fr] gap-0.5 bg-white font-semibold text-[11px] text-gray-600 border-b pb-0.5 p-1 rounded-md"
          >
            <div>Артикул</div>
            <div>Номенклатура</div>
            <div>Ед. изм.</div>
            <div>Миқдори</div>
          </div>

          <div class="divide-y mt-1 h-[160px] overflow-y-auto scroller">
            <EmptyState
              v-if="!infoData || (infoData.length === 0 && !isLoadInfoData)"
            />
            <Spinner v-if="isLoadInfoData" />

            <div
              v-for="(info, i) in infoData"
              :key="i"
              class="grid grid-cols-[0.6fr_2.3fr_0.7fr_0.7fr] gap-0.5 py-1 px-1.5 text-[11px] items-center border border-gray-200 rounded bg-white hover:bg-gray-50 shadow-sm transition-all"
            >
              <div class="border-r border-gray-200 pr-1">
                {{ info.article }}
              </div>
              <div class="border-r border-gray-200 pr-1 truncate">
                {{ info.name }}
              </div>
              <div class="border-r border-gray-200 pr-1">
                {{ info.measurement }}
              </div>
              <div class="text-right">{{ info.amount }}</div>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 rounded-lg shadow p-2 h-[285px]">
          <h2 class="text-sm font-semibold text-blue-700 mb-1">
            Отгружено
            <span class="text-gray-500 ml-1 text-[11px]">(Delivery)</span>
          </h2>

          <div
            class="grid grid-cols-[0.6fr_2.3fr_0.7fr_0.7fr_1.5fr] bg-white gap-0.5 font-semibold text-[11px] text-gray-600 border-b pb-0.5 py-1 px-1.5 rounded-md"
          >
            <div>Артикул</div>
            <div>Номенклатура</div>
            <div>Ед. изм.</div>
            <div>Миқдори</div>
            <div>Статус (%)</div>
          </div>

          <div class="mt-1 space-y-1 h-[160px] overflow-y-auto scroller">
            <EmptyState v-if="!stats.length && !isLoadStats" />
            <Spinner v-if="isLoadStats" />

            <div
              v-for="(stat, s) in stats"
              :key="s"
              class="grid grid-cols-[0.6fr_2.3fr_0.7fr_0.7fr_1.5fr] gap-0.5 py-1 px-1.5 text-[11px] items-center border border-gray-200 rounded bg-white hover:bg-gray-50"
            >
              <div class="border-r border-gray-200 pr-1">
                {{ stat.article }}
              </div>
              <div class="border-r border-gray-200 pr-1 truncate">
                {{ stat.name }}
              </div>
              <div class="border-r border-gray-200 pr-1">
                {{ stat.measurement }}
              </div>
              <div class="border-r border-gray-200 pr-1 text-right">
                {{ stat.amount }}
              </div>
              <div class="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                <div
                  class="h-1 rounded-full transition-all"
                  :style="{
                    width: stat.percent + '%',
                    backgroundColor:
                      stat.percent <= 40
                        ? '#EF4444'
                        : stat.percent <= 70
                        ? '#FBBF24'
                        : '#10B981',
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="bg-white rounded-lg shadow p-2 flex flex-col h-[375px]">
          <h2 class="text-sm font-semibold text-blue-700 mb-0.5">
            Счёта фактуры
            <span class="text-gray-500 ml-1 text-[10px]">(Invoice)</span>
          </h2>

          <div class="overflow-y-auto flex-1 scroller">
            <EmptyState v-if="!deliveries.length && !isLoaddeliveries" />
            <Spinner v-if="isLoaddeliveries" />

            <div
              v-for="(delivery, index) in deliveries"
              :key="index"
              class="border-t border-gray-100 bg-gray-100 pt-0.5 pb-0.5 px-1.5 mt-1 text-[10.5px] text-gray-800 rounded shadow-sm"
            >
              <div
                @click="toggleInvoice(delivery)"
                class="flex flex-col items-center text-center bg-white shadow-sm rounded-md p-1 space-y-0.5 transition hover:scale-[1.01]"
              >
                <div
                  class="flex items-center justify-between w-full border-b border-gray-100 pb-0.5"
                >
                  <span class="font-semibold text-gray-800 text-[11px]"
                    >№ {{ delivery.number }}</span
                  >
                  <span class="text-gray-500 text-[10px]">{{
                    formatDate(delivery.date, false)
                  }}</span>
                </div>

                <div class="flex items-center justify-between w-full pt-0.5">
                  <span
                    class="font-semibold text-blue-700 text-[11px] truncate"
                    >{{ delivery.car }}</span
                  >
                  <span class="text-gray-600 text-[10.5px] truncate">{{
                    delivery.driver
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-lg shadow p-2 flex items-center justify-center h-[200px]"
        >
          <DoughnutChart :data="DoughnutData" />
        </div>
        <div class="fixed bottom-5 right-5 z-50 flex flex-col-reverse gap-2">
          <NotificationToast
            v-for="toast in toasts"
            :key="toast.id"
            v-bind="toast"
          />
        </div>
      </div>
    </div>
    <input
      ref="hiddenInput"
      v-model="inputValue"
      @keydown.enter="handleEnter"
      type="text"
      class="absolute opacity-0 w-0 h-0"
      autocomplete="off"
    />
  </div>
</template>

<style scoped>
.scroller {
  scrollbar-width: thin;
}
</style>
