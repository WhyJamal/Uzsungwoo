<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "@/components/headers/Header.vue";
import StatCards from "@/views/components/dashboard/StatCards.vue";
import ShipmentContent from "@/views/components/ShipmentContent.vue";
</script>

<template>
  <div class="fixed inset-0 flex flex-col bg-gray-100">
    <Header />
    <StatCards />
    <div class="flex-1 flex items-center justify-center text-gray-700 bg-gray-100">
      <ShipmentContent />
    </div>
  </div>
</template>
