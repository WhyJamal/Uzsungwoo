<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import Header from "@/components/headers/Header.vue";
import Modal from "@/components/ui/Modal.vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import api from "@/utils/axios";
import NumericKeypad from "@/components/ui/NumericKeypad.vue";

const selected = ref(null);
const isModalOpen = ref(false);
const showQuantityModal = ref(false);
const quantity = ref("");

function openModal() {
  showQuantityModal.value = true;
}

function closeModal() {
  showQuantityModal.value = false;
}

function onSave(val) {
  closeModal();
}

function onDelete(newVal) {
  console.log("Delete:", newVal);
}

const form = reactive({
  detail: "Деталь A",
  code: "C-001",
  roll: "R-10",
  article: "ART-2025",
  qty: 12,
  unit: "шт",
  extra: "",
  warehouseExpenseAmount: "Slitting",
  user: "Jamal",
});

const items = ref([]);

const users = [
  { id: 1, name: "Jamal" },
  { id: 2, name: "Akmal" },
  { id: 3, name: "Dilshod" },
];

let nextId = 3;
const rows = ref([]);

function handleClose(selectedItems) {
  isModalOpen.value = false;

  if (selectedItems && selectedItems.length > 0) {
    rows.value = selectedItems;
  }
}


const saved = ref(false);

function addRow() {
  nextId += 1;
  rows.value.push({
    id: nextId,
    code: "",
    article: "",
    detail: "",
    model: "",
    name: "",
    unit: "",
    qty: 0,
  });
}

function removeRow(index) {
  rows.value.splice(index, 1);
}

function save() {
  const payload = { ...form, rows: rows.value };
  console.log("Saving payload:", payload);
  saved.value = true;
  setTimeout(() => (saved.value = false), 2500);
}

onMounted(async () => {
  try {
    const response = await api.get("ver1/items");
    items.value = response.data;
  } catch (err) {
    //error.value = err.message
  } finally {
    //loading.value = false
  }
});
watch(
  () => form.detail,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      isModalOpen.value = true;
    }
  }
);
</script>

<template>
  <div class="fixed inset-0 flex flex-col overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center"
      style="background-image: url('/others/Slitting.jfif'); filter: blur(10px)"
    ></div>
    <div class="absolute inset-0 bg-blue-50/50"></div>

    <div class="relative flex-1 flex flex-col">
      <!-- Header -->
      <Header />

      <!-- Main -->
      <form
        @submit.prevent="save"
        class="flex-1 overflow-auto p-6 flex flex-col gap-4"
      >
        <div class="grid grid-cols-12 gap-4 items-center">
          <label class="text-lg font-semibold col-span-1 text-indigo-900"
            >Деталь</label
          >
          <div class="col-span-4 relative z-20">
            <Listbox v-model="form.detail" @change="isModalOpen = true">
              <div class="relative">
                <!-- Dropdown button -->
                <ListboxButton
                  class="w-full p-2 rounded font-semibold border bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-left truncate flex justify-between items-center"
                  title="form.detail?.name"
                >
                  <span class="truncate">{{
                    form.detail ? form.detail.name : "Танланг..."
                  }}</span>

                  <svg
                    class="w-5 h-5 text-gray-500 ml-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </ListboxButton>

                <ListboxOptions
                  class="absolute mt-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto z-50"
                >
                  <ListboxOption
                    v-for="i in items"
                    :key="i.id"
                    :value="i"
                    class="cursor-pointer p-2 hover:bg-blue-100 flex flex-col"
                  >
                    <span class="font-semibold truncate">{{ i.name }}</span>
                    <span class="text-sm text-gray-500 truncate">{{
                      i.article
                    }}</span>
                  </ListboxOption>
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <label class="text-lg font-semibold col-span-1 text-indigo-900"
            >Код</label
          >
          <input
            v-model="form.code"
            class="col-span-4 p-2 font-semibold rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div class="grid grid-cols-12 gap-4 items-center">
          <label class="text-lg font-semibold col-span-1 text-indigo-900"
            >Рулон</label
          >
          <input
            v-model="form.roll"
            class="col-span-4 p-2 font-semibold rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <label class="text-lg font-semibold col-span-1 text-indigo-900"
            >Артикул</label
          >
          <input
            v-model="form.article"
            class="col-span-4 p-2 font-semibold rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <div class="grid grid-cols-12 gap-4 items-center">
          <label class="text-lg font-semibold col-span-1 text-indigo-900"
            >Миқдори</label
          >
          <input
            @click="showQuantityModal = true"
            v-model.number="quantity"
            type="number"
            min="0"
            class="col-span-4 p-2 rounded font-semibold border focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <input
            v-model="form.extra"
            placeholder=""
            class="col-span-4 p-2 w-[70px] font-semibold rounded border focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <!-- Table -->
        <div class="flex-1 flex flex-col mt-4">
          <div class="text-lg font-bold mb-3 text-indigo-700">Таблица</div>

          <!-- Table header -->
          <div
            class="hidden md:grid grid-cols-9 gap-3 bg-indigo-100 text-indigo-900 px-3 py-2 rounded-t sticky top-0 z-10 font-medium text-sm"
          >
            <div>№</div>
            <div>Код</div>
            <div>Артикул</div>
            <div>Детал</div>
            <div>Модели</div>
            <div>Номи</div>
            <div>Ўл. бирлиги</div>
            <div>Миқдори</div>
            <div></div>
          </div>

          <!-- Table rows container -->
          <div
            class="flex-1 flex flex-col gap-2 overflow-y-auto p-2 border rounded bg-white/30 backdrop-blur-sm"
            style="max-height: 200px"
          >
            <div
              v-for="(r, i) in rows"
              :key="r.id"
              class="h-[70px] grid grid-cols-9 gap-3 items-center bg-indigo-50 p-3 rounded-lg hover:bg-indigo-50 transition-all duration-200"
            >
              <div class="font-semibold text-base">{{ i + 1 }}</div>
              <div class="p-2 text-base">{{ r.code }}</div>
              <div class="p-2 text-base">{{ r.article }}</div>
              <div class="p-2 text-base">{{ r.detail }}</div>
              <div class="p-2 text-base">{{ r.model }}</div>
              <div class="p-2 text-base">{{ r.name }}</div>
              <div class="p-2 text-base">{{ r.unit }}</div>
              <div class="p-2 text-base">{{ r.qty }}</div>

              <button
                type="button"
                @click="removeRow(i)"
                class="px-3 py-1 bg-red-300 text-red-800 rounded-lg hover:bg-red-400 font-medium transition-all duration-200 text-sm"
              >
                Удалить
              </button>
            </div>
          </div>

          <!-- Add row button -->
          <button
            type="button"
            @click="addRow"
            class="mt-4 px-4 py-2 bg-indigo-200 hover:bg-indigo-300 text-indigo-900 rounded-lg font-semibold transition-colors duration-200"
          >
            + Добавить строку
          </button>
        </div>
        <div class="flex justify-between mt-4 items-center">
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <label class="text-sm font-semibold col-span-1 text-indigo-900"
                >Расход склада</label
              >
              <input
                type="text"
                v-model.number="form.warehouseExpenseAmount"
                class="w-32 p-2 font-semibold border rounded"
              />
            </div>
            <div class="flex items-center gap-2">
              <label class="text-sm font-semibold col-span-1 text-indigo-900"
                >Фойдаланувчи</label
              >
              <div class="col-span-4 relative z-20 w-64">
                <Listbox v-model="form.user">
                  <div class="relative">
                    <ListboxButton
                      class="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white text-left flex justify-between items-center"
                    >
                      <span>{{
                        form.user ? form.user.name : "Foydalanuvchi tanlang..."
                      }}</span>
                      <svg
                        class="w-5 h-5 ml-2 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </ListboxButton>
                    <ListboxOptions
                      class="absolute bottom-full mb-1 w-full bg-white border rounded shadow max-h-60 overflow-y-auto z-50"
                    >
                      <ListboxOption
                        v-for="u in users"
                        :key="u.id"
                        :value="u"
                        class="cursor-pointer p-2 hover:bg-blue-50"
                      >
                        {{ u.name }}
                      </ListboxOption>
                    </ListboxOptions>
                  </div>
                </Listbox>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div v-if="saved" class="text-sm text-green-700">Сақланди!</div>
            <button
              type="submit"
              class="px-8 py-4 text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:from-indigo-600 hover:to-indigo-800 active:scale-95"
            >
              Саклаш
            </button>
          </div>
        </div>
      </form>
    </div>
    <Modal
      v-if="isModalOpen"
      :data="{
        article: form.detail.article,
      }"
      @close="handleClose"
    />
    <div v-if="showQuantityModal" class="modal-overlay">
      <NumericKeypad v-model="quantity" @save="onSave" @delete="onDelete" />
      <button @click="closeModal" class="close-btn">✕ Yopish</button>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  z-index: 999;
}
.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

input,
select {
  font-size: 13px;
}
</style>
