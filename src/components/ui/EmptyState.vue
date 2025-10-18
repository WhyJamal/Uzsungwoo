<script setup lang="ts">
interface EmptyStateProps {
  text?: string
  icon?: string
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  text: 'No data found',
  icon: '/src/assets/icons/empty-product.svg',
})
</script>

<template>
  <div
    class="flex flex-col items-center justify-center h-full border border-gray-200 bg-gray-50 rounded-lg shadow-sm py-6"
  >
    <img
      :src="icon"
      alt="No data"
      class="w-[100px] h-[80px] mb-2 opacity-80"
    />
    <p class="text-center text-sm font-semibold text-gray-600">
      {{ text }}
    </p>
  </div>
</template>

