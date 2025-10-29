<template>
  <Header />

  <form @submit.prevent="handleLogin" class="h-screen overflow-x-hidden">
    <div
      class="h-screen relative flex items-center justify-center overflow-hidden"
    >
      <div
        class="absolute inset-0 bg-cover bg-center filter blur-sm scale-105 animate-pulse-slow"
        style="background-image: url('/others/Slit.jpg')"
      ></div>

      <div
        class="absolute inset-0 bg-gradient-to-b from-indigo-400/20 to-indigo-600/30 backdrop-blur-sm"
      ></div>

      <div
        class="relative z-10 bg-white rounded-3xl shadow-2xl border p-8 w-full max-w-sm flex flex-col gap-6 transform transition-transform duration-500 hover:scale-105"
      >
        <div
          v-if="loading"
          class="absolute inset-0 bg-gray-400/70 flex items-center justify-center rounded-3xl z-20"
        >
          <div class="loader"></div>
        </div>

        <h2 class="text-2xl font-bold text-center text-indigo-700">Вход</h2>

        <div class="relative">
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V9a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z"
            />
          </svg>
          <input
            ref="inputRef"
            v-model="code"
            type="text"
            class="w-full pl-10 pr-4 py-3 rounded-xl border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Введите код сотрудника"
            @blur="keepFocus"
            @keydown.tab.prevent
          />
        </div>

        <button
          class="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-bold shadow-xl hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300"
        >
          Вход
        </button>

        <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      </div>
    </div>
  </form>
  <div
    v-if="errorAuthentication"
    id="popup-modal"
    tabindex="-1"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <button
          @click="errorAuthentication = false"
          type="button"
          class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
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
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-4 md:p-5 text-center">
          <svg
            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {{ error }}
          </h3>
          <button
            @click="errorAuthentication = false"
            data-modal-hide="popup-modal"
            type="button"
            class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          >
            Ок
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/headers/Header.vue";
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import api from "@/utils/axios";
import { useUserStore, type User } from "@/stores/userStore";
import { roleRoutes } from "@/config/roleRoutes";

const code = ref<string>("");
const inputRef = ref<HTMLInputElement | null>(null);
const error = ref<string>("");
const loading = ref<boolean>(false);
const errorAuthentication = ref<boolean>(false);

const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
  if (!code.value.trim()) {
    alert("Введите код сотрудника.");
    return;
  }

  loading.value = true;
  try {
    const response = await api.get<User[]>(`/ver1/login?code=${code.value}`);
    console.log("Response:", response.data);

    if (response.status === 200 && response.data.length) {
      const user: User = response.data[0];
      user.code = code.value;
      userStore.setUser(user);

      const role = user.role as keyof typeof roleRoutes;
      const route = roleRoutes[role] || "/not-authorized";
      router.push(route);
    } else {
      errorAuthentication.value = true;
      error.value =
        "У вас нет прав для входа в систему, пожалуйста, проверьте и войдите снова";
    }
  } catch (err: any) {
    errorAuthentication.value = true;
    error.value =
      "У вас нет прав для входа в систему, пожалуйста, проверьте и войдите снова";
  } finally {
    loading.value = false;
  }
};

async function focusInput() {
  await nextTick();
  inputRef.value?.focus();
}

onMounted(focusInput);

function keepFocus() {
  setTimeout(() => {
    inputRef.value?.focus();
  }, 0);
}
</script>

<style>
@keyframes floatUpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes ripple {
  0% {
    transform: scale(0.6);
    opacity: 0.8;
  }
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}

.anim-float {
  animation: floatUpDown 2.8s ease-in-out infinite;
}
.anim-ripple {
  animation: ripple 1.6s ease-out infinite;
  transform-origin: center;
}

.focus-ring:focus {
  outline: 3px solid rgba(99, 102, 241, 0.25);
  outline-offset: 3px;
  border-radius: 0.5rem;
}
/* Custom slow pulse for background */
@keyframes pulse-slow {
  0%,
  100% {
    transform: scale(1.05);
  }
  50% {
    transform: scale(1.1);
  }
}
.animate-pulse-slow {
  animation: pulse-slow 12s ease-in-out infinite;
}
</style>
