<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/headers/Header.vue";
import SecurityStatCards from "@/views/components/dashboard/SecurityStatCards.vue";
import SecurityContent from "@/views/components/SecurityContent.vue";
</script>

<template>
  <div class="fixed inset-0 flex flex-col bg-gray-100">
    <Header />
    <SecurityStatCards />
    <div
      class="flex-1 flex items-center justify-center text-gray-700 bg-gray-100"
    >
      <SecurityContent />
    </div>
  </div>
</template>
