<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { User } from "lucide-vue-next";

const route = useRoute();
const isLoginPage = computed(() => route.path === "/");

const isOpen = ref(false);
const selectedLanguage = ref(localStorage.getItem("lang") || "ru");

const languages = [
  { code: "uz", label: "Oʻzbekcha" },
  { code: "ru", label: "Русский" },
  { code: "en", label: "English" },
];

const currentLanguageLabel = computed(() => {
  const lang = languages.find((l) => l.code === selectedLanguage.value);
  return lang ? lang.label : "Русский";
});

function selectLanguage(code: string) {
  selectedLanguage.value = code;
  localStorage.setItem("lang", code);
  isOpen.value = false;
}
</script>

<template>
  <header class="bg-[#14213d] shadow-md">
    <div class="max-w-7xl mx-auto px-3 py-1 flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <img
          src="/logos/logo2.webp"
          alt="Logo"
          class="h-8 w-auto rounded-md p-0.5 shadow-sm object-contain"
        />
        <h2
          v-if="!isLoginPage"
          class="text-base md:text-lg font-semibold text-white tracking-wide"
        ></h2>
      </div>

      <div class="flex items-center space-x-1.5 md:space-x-3">
        <div class="relative">
          <button
            @click="isOpen = !isOpen"
            class="flex items-center text-white text-xs md:text-sm font-medium px-2 py-1 rounded-md shadow hover:bg-gray-100 transition hover:text-black"
          >
            {{ currentLanguageLabel }}
            <svg
              class="w-3.5 h-3.5 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            v-if="isOpen"
            class="absolute right-0 mt-1 w-28 bg-white rounded-md shadow-lg py-1 z-50"
          >
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="selectLanguage(lang.code)"
              class="block w-full text-left px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 transition"
            >
              {{ lang.label }}
            </button>
          </div>
        </div>

        <button
          class="w-8 h-8 flex items-center justify-center bg-white text-sky-600 rounded-full shadow hover:bg-gray-100 transition"
        >
          <User />
        </button>
      </div>
    </div>
  </header>
</template>
