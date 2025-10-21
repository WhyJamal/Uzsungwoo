import { defineStore } from "pinia";
import { ref } from "vue";

interface InvoiceItem {
  amount: number;
  article: string;
  measurement: string;
  name: string;
}

interface Delivery {
  number: string;
  items?: InvoiceItem[];
  [key: string]: any;
}

export const useInvoiceStore = defineStore("invoiceStore", () => {
  const selectedInvoice = ref<Delivery | null>(null);
  return { selectedInvoice };
});
