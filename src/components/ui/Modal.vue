<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import api from "@/utils/axios";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const rolls = ref([]);
const loading = ref(false);
const error = ref(null);

let controller = null;

const emit = defineEmits(['close'])

function selectItem() {
  const selected = rolls.value.filter((r) => r.checked);
  emit("close", selected);
}

async function loadRolls() {
  if (controller) {
    try {
      controller.abort();
    } catch (e) {
      /* noop */
    }
  }
  controller = new AbortController();

  loading.value = true;
  error.value = null;

  try {
    const paramsObj =
      props.data && props.data.article !== undefined
        ? { article: props.data.article }
        : {};

    const response = await api.get("/ver1/slit_rolls", {
      params: paramsObj,
      signal: controller.signal,
    });

    rolls.value = response.data ?? [];
  } catch (err) {
    if (err.name === "CanceledError" || err.name === "AbortError") {
      return;
    }
    console.error("loadRolls error:", err);
    error.value = err;
    rolls.value = [];
  } finally {
    loading.value = false;
  }
}

function padZero(n) {
  return String(n).padStart(2, "0");
}

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return '';
  const day = padZero(d.getDate());
  const month = padZero(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = padZero(d.getHours());
  const minutes = padZero(d.getMinutes());
  return `${day}.${month}.${year}/${hours}:${minutes}`;
}

onMounted(() => {
  loadRolls();
});

onBeforeUnmount(() => {
  if (controller) {
    try {
      controller.abort();
    } catch (e) {
      /* noop */
    }
  }
});

watch(
  () => props.data?.article,
  (newVal, oldVal) => {
    if (newVal !== oldVal) loadRolls();
  }
);
</script>

<template>
  <div class="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
    <!-- @click.self="close" -->
    <div
      class="bg-white w-[100%] max-w-7xl max-h-[85vh] p-6 rounded-lg relative flex flex-col shadow-2xl"
    >
      <!-- Close button -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Title -->
      <h1 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
        Производимая продукция для слиттинг
      </h1>

      <!-- Table Container (scrollable) -->
      <div class="flex-1 overflow-auto rounded">
        <div class="bg-gray-200 p-4 rounded-lg h-[300px]">
          <div class="max-w-7xl mx-auto space-y-2">
            <div class="grid grid-cols-8 bg-white rounded-md shadow">
              <div class="p-3 font-semibold text-center">Дата</div>
              <div class="p-3 font-semibold text-center">Номер</div>
              <div class="p-3 font-semibold text-center">Стальной рулон</div>
              <div class="p-3 font-semibold text-center">Артикул</div>
              <div class="p-3 font-semibold text-center">Номер товара</div>
              <div class="p-3 font-semibold text-center">Склад</div>
              <div class="p-3 font-semibold text-center">Количество</div>
              <div class="p-3 font-semibold text-center">Выбрать</div>
            </div>
            <div class="space-y-2">
              <div
                v-for="item in rolls"
                :key="item.id"
                class="grid grid-cols-8 bg-white rounded-md shadow"
              >
                <div class="p-3 text-center">{{ formatDate(item.date) }}</div>
                <div class="p-3 text-center">{{ item.number }}</div>
                <div
                  class="p-3 text-center truncate"
                >
                  {{ item.roll.name }}
                </div>
                <div class="p-3 text-center">{{ item.roll.article }}</div>
                <div class="p-3 text-center">{{ item.item_number }}</div>
                <div class="p-3 text-center">{{ item.warehouse.name }}</div>
                <div class="p-3 text-center">{{ item.roll_qty }}</div>
                <div class="p-3 text-center">
                  <input
                    type="checkbox"
                    v-model="item.checked"
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end mt-4">
        <button
          @click="selectItem"
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow transition"
        >
          Выбрать
        </button>
      </div>
    </div>
  </div>
</template>
