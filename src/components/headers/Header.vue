<template>
  <header class="bg-[#14213d] shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
      
      <div class="flex items-center space-x-3">
        <img
          src="/logos/logo2.webp"
          alt="Logo"
          class="h-10 w-auto rounded-md p-1 shadow-sm object-contain"
        />
        <h2
          v-if="!isLoginPage"
          class="text-lg md:text-xl font-semibold text-white tracking-wide"
        >    
        </h2>
      </div>

      <div class="flex items-center space-x-2 md:space-x-4">
        <div class="relative">
          <button
            @click="isOpen = !isOpen"
            class="flex items-center text-white text-sm font-medium px-3 py-1.5 rounded-md shadow hover:bg-gray-100 transition hover:text-black"
          >
            {{ currentLanguageLabel }}
            <svg
              class="w-4 h-4 ml-1"
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
            class="absolute right-0 mt-1 w-32 bg-white rounded-md shadow-lg py-1 z-50"
          >
            <button
              v-for="lang in languages"
              :key="lang.code"
              @click="selectLanguage(lang.code)"
              class="block w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 transition"
            >
              {{ lang.label }}
            </button>
          </div>
        </div>

        <button
          class="w-9 h-9 flex items-center justify-center bg-white text-sky-600 rounded-full shadow hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

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
