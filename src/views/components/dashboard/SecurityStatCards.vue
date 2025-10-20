<script setup lang="ts">
import { ref, computed } from "vue";
import { FileText, CheckCircle, Truck } from "lucide-vue-next";

type StatCard = {
  subtitle: string;
  value: number | string;
  type: string;
  bgColor: string;
  showProgress?: boolean;
  progress?: number;
  progressColor?: string;
  icon?: any;
};

type Row = {
  id?: string | number;
  date: string | Date;
  number: string;
  document: string;
  car: string;
  driver: string;
  plate: string;
  buyer: string;
};

const invoices = ref<Row[]>([
  {
    id: 1,
    date: "2025-10-19",
    number: "001",
    document: "Счет #001 — поставка",
    car: "MAN TGS",
    driver: "Иванов И.",
    plate: "90A-123BB",
    buyer: "ООО «ТехИмпорт»",
  },
  {
    id: 2,
    date: "2025-10-18",
    number: "002",
    document: "Счет #002 — оплата",
    car: "Volvo FH",
    driver: "Петров С.",
    plate: "45B-456CC",
    buyer: "ИП «Садыков»",
  },
  {
    id: 3,
    date: "2025-10-17",
    number: "003",
    document: "Счет #003 — возврат",
    car: "Scania R",
    driver: "Смирнов А.",
    plate: "11C-789DD",
    buyer: "ЗАО «Логистик Плюс»",
  },
]);

const confirmed = ref<Row[]>([
  {
    id: 11,
    date: "2025-10-19",
    number: "INV-100",
    document: "Подтверждение №100",
    car: "MAN TGS",
    driver: "Иванов И.",
    plate: "90A-123BB",
    buyer: "ООО «ТехИмпорт»",
  },
  {
    id: 12,
    date: "2025-10-18",
    number: "INV-099",
    document: "Подтверждение №99",
    car: "Volvo FH",
    driver: "Петров С.",
    plate: "45B-456CC",
    buyer: "ИП «Садыков»",
  },
  {
    id: 13,
    date: "2025-10-16",
    number: "INV-090",
    document: "Подтверждение №90",
    car: "Scania R",
    driver: "Смирнов А.",
    plate: "11C-789DD",
    buyer: "ЗАО «Логистик Плюс»",
  },
]);

const cardsData = computed<StatCard[]>(() => [
  {
    subtitle: "Счета-фактуры (Invoices)",
    value: invoices.value.length,
    type: "sales",
    bgColor: "bg-sky-100",
    iconBgColor: "bg-sky-200",
    icon: FileText,
  },
  {
    subtitle: "Подтверждённые",
    value: confirmed.value.length,
    type: "confirmed",
    bgColor: "bg-blue-100",
    iconBgColor: "bg-blue-200",
    icon: CheckCircle,
  },
  {
    subtitle: "Выполнено %",
    value:
      confirmed.value.length && invoices.value.length
        ? `${Math.round(
            (confirmed.value.length / invoices.value.length) * 100
          )}%`
        : "0%",
    type: "completed",
    bgColor: "bg-yellow-100",
    iconBgColor: "bg-yellow-200",
    showProgress: true,
    progress: invoices.value.length
      ? Math.round((confirmed.value.length / invoices.value.length) * 100)
      : 0,
    progressColor: "bg-yellow-400",
    icon: Truck,
  },
]);
</script>

<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-3 p-1 hover:shadow-md"
  >
    <div
      v-for="card in cardsData"
      :key="card.type"
      :class="[
        'p-3 rounded-lg shadow flex items-center justify-between',
        card.bgColor,
      ]"
    >
      <div class="flex flex-col justify-center w-full text-center text-sm">
        <span class="text-gray-700 font-medium">{{ card.subtitle }}</span>
        <span class="text-xl font-bold mt-1">{{ card.value }}</span>

        <div v-if="card.showProgress" class="mt-2">
          <div class="flex items-center justify-center space-x-2 mt-1">
            <div class="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                :class="card.progressColor"
                :style="{ width: card.progress + '%' }"
                class="h-1.5 rounded-full"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex items-center justify-center w-14 h-14 rounded-xl"
        :class="card.iconBgColor"
      >
        <component :is="card.icon" class="w-7 h-7 text-gray-700" />
      </div>
    </div>
  </div>
</template>
