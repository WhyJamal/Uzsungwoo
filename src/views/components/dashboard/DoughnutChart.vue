<script setup lang="ts">
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface PieItem {
  name: string;
  value: number;
}

const props = defineProps<{
  data: PieItem[];
}>();

const chartData = computed(() => {
  const labels = props.data.map((item) => item.name);
  const values = props.data.map((item) => item.value);

  return {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          "#A855F7",
          "#22C55E",
          "#3B82F6",
          "#F59E0B",
          "#EF4444",
          "#0EA5E9",
          "#F97316",
          "#6B7280",
          "#DC2626",
          "#9333EA",
          "#CA8A04",
          "#FACC15",
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 10,
        spacing: 2,
      },
    ],
  };
});

const chartOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: "65%",
  plugins: {
    legend: {
      display: true,
      position: "right",
      align: "center",
      labels: {
        color: "#111827",
        font: { size: 9, weight: "500" },
        usePointStyle: true,
        boxWidth: 8,
        padding: 8,
      },
    },
    tooltip: {
      backgroundColor: "#111827",
      titleColor: "#F9FAFB",
      bodyColor: "#F9FAFB",
      padding: 8,
      cornerRadius: 4,
      displayColors: false,
      callbacks: {
        label: (tooltipItem: any) => `${tooltipItem.label}: ${tooltipItem.raw}`,
      },
    },
  },
};
</script>

<template>
  <div
    class="rounded-xl p-4 flex items-center justify-center w-full"
    style="height: 200px"
  >
    <div class="w-[90%] h-full">
      <Doughnut :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
