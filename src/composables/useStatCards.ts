import { ref } from "vue";
import api from "../utils/axios";

interface StatCard {
  invoice: number;
  delivery: number;
  done: number;
}

const statCards = ref<StatCard[]>([]);

const loadStatCards = async () => {
  try {
    const response = await api.get<StatCard[]>("/ver1/info_stat_cards");
    if (Array.isArray(response.data)) {
      statCards.value = response.data;
    } else {
      statCards.value = [{ invoice: 0, delivery: 0, done: 0 }];
    }
  } catch (err: any) {
    statCards.value = [{ invoice: 0, delivery: 0, done: 0 }];
  }
};

export function useStatCards() {
  return { statCards, loadStatCards };
}
