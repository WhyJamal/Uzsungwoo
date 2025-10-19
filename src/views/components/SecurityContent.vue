<script setup lang="ts">
import { ref } from "vue";

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

function formatDate(d: string | Date) {
  const dt = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(dt.getTime())) return String(d);
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yy = dt.getFullYear();
  return `${dd}.${mm}.${yy}`;
}
</script>

<template>
  <div class="flex flex-col h-screen w-full bg-gray-50 p-4">
    <div class="flex flex-col gap-4 flex-1 min-h-0">
      <section class="bg-gray-200 rounded-lg shadow flex flex-col min-h-0">
        <div
          class="flex items-center justify-between bg-gray-200 rounded-t-lg px-4 py-4"
        >
          <h2 class="text-2xl font-extrabold text-blue-800">Счёт-фактура</h2>
          <span class="text-sm text-gray-500">(Invoices)</span>
        </div>

        <div
          class="grid grid-cols-7 gap-2 px-3 py-3 bg-white border-b font-semibold text-sm text-gray-700 rounded-lg"
        >
          <div class="text-center">Дата</div>
          <div class="text-center">Номер</div>
          <div class="text-center">Документ</div>
          <div class="text-center">Автомобиль</div>
          <div class="text-center">Водитель</div>
          <div class="text-center">Номер Машины</div>
          <div class="text-center">Покупател</div>
        </div>

        <div
          class="flex-1 p-3 scroller max-h-[150px] bg-gray-200 always-scroll"
        >
          <div
            v-if="!invoices.length"
            class="py-8 text-center text-lg text-gray-500"
          >
            Нет данных
          </div>

          <div
            v-for="(row, idx) in invoices"
            :key="idx"
            class="grid grid-cols-7 gap-2 items-center rounded-md border border-gray-100 px-3 py-3 mt-1 bg-white"
          >
            <div class="text-center text-base font-semibold truncate">
              {{ formatDate(row.date) }}
            </div>
            <div class="text-center text-base font-semibold truncate">
              {{ row.number }}
            </div>
            <div
              class="text-center text-base font-semibold truncate"
              :title="row.document"
            >
              {{ row.document }}
            </div>
            <div class="text-center text-base font-semibold truncate">
              {{ row.car }}
            </div>
            <div class="text-center text-base font-semibold truncate">
              {{ row.driver }}
            </div>
            <div class="text-center text-base font-semibold truncate">
              {{ row.plate }}
            </div>
            <div
              class="text-center text-base font-semibold truncate"
              :title="row.buyer"
            >
              {{ row.buyer }}
            </div>
          </div>
        </div>
      </section>

      <section class="bg-gray-200 rounded-lg shadow flex flex-col min-h-0">
        <div
          class="flex items-center justify-between bg-gray-200 rounded-t-lg px-4 py-4"
        >
          <h2 class="text-2xl font-extrabold text-blue-800">
            Подтверждённые документы
          </h2>
          <span class="text-sm text-gray-500">(Confirmed)</span>
        </div>

        <div
          class="grid grid-cols-7 gap-2 px-3 py-3 bg-white border-b font-semibold text-sm text-gray-700 rounded-lg"
        >
          <div class="text-center">Дата</div>
          <div class="text-center">Номер</div>
          <div class="text-center">Документ</div>
          <div class="text-center">Автомобиль</div>
          <div class="text-center">Водитель</div>
          <div class="text-center">Номер Машины</div>
          <div class="text-center">Покупател</div>
        </div>

        <div
          class="flex-1 bg-gray-200 max-h-[150px] p-3 scroller always-scroll"
        >
          <div
            v-if="!confirmed.length"
            class="py-8 text-center text-lg text-gray-500"
          >
            Нет данных
          </div>

          <div
            v-for="(row, idx) in confirmed"
            :key="idx"
            class="grid grid-cols-7 gap-2 items-center rounded-md bg-white border border-gray-100 px-3 py-3 mt-1"
          >
            <div class="text-center text-base font-semibold truncate">
              {{ formatDate(row.date) }}
            </div>
            <div class="text-center text-base font-semibold truncate">
              {{ row.number }}
            </div>
            <div
              class="text-center text-base font-semibold truncate"
              :title="row.document"
            >
              {{ row.document }}
            </div>
            <div class="text-center text-base font-semibold truncate">
              {{ row.car }}
            </div>
            <div class="text-center text-base font-semibold truncate">
              {{ row.driver }}
            </div>
            <div class="text-center text-base font-semibold truncate">
              {{ row.plate }}
            </div>
            <div
              class="text-center text-base font-semibold truncate"
              :title="row.buyer"
            >
              {{ row.buyer }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.always-scroll {
  overflow-y: scroll;
  scrollbar-gutter: stable;
}
.scroller::-webkit-scrollbar {
  width: 8px;
}
.scroller::-webkit-scrollbar-thumb {
  background: rgba(11, 111, 184, 0.3);
  border-radius: 999px;
}
.scroller::-webkit-scrollbar-track {
  background: transparent;
}
</style>
