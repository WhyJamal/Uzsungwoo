<script setup lang="ts">
import { ref, watch, defineProps, computed } from "vue";

const props = defineProps<{
  type: "success" | "danger" | "warning";
  message: string;
  duration?: number;
}>();

const visible = ref(false);

watch(
  () => props.message,
  (newVal) => {
    if (!newVal) return;
    visible.value = true;
    setTimeout(() => (visible.value = false), props.duration || 3000);
  },
  { immediate: true }
);

const toastClasses = {
  success: "text-gray-700 bg-green-50",
  danger: "text-gray-700 bg-red-50",
  warning: "text-gray-700 bg-orange-50",
};

const iconClasses = {
  success: "text-green-500 bg-green-100",
  danger: "text-red-500 bg-red-100",
  warning: "text-orange-500 bg-orange-100",
};

const iconSVG = computed(() => {
  switch (props.type) {
    case "success":
      return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>`;
    case "danger":
      return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
              </svg>`;
    case "warning":
      return `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z"/>
              </svg>`;
    default:
      return "";
  }
});

function close() {
  visible.value = false;
}
</script>

<template>
  <div
    v-if="visible"
    :class="[
      'flex items-center justify-between max-w-sm p-3 mb-3 rounded-lg shadow-sm transition-all duration-300',
      toastClasses[type],
    ]"
    role="alert"
  >
    <div
      :class="[
        'inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg',
        iconClasses[type],
      ]"
    >
      <span v-html="iconSVG" />
      <span class="sr-only">{{ type }} icon</span>
    </div>

    <div class="flex-1 mx-3 text-sm font-normal truncate">{{ message }}</div>

    <button
      type="button"
      class="text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1 inline-flex items-center justify-center h-6 w-6"
      @click="close"
    >
      <span class="sr-only">Close</span>
      <svg
        class="w-3 h-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped>
div[role="alert"] {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
