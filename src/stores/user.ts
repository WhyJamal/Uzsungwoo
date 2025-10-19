import { defineStore } from "pinia";

interface User {
  name: string;
  role: string;
}

export const useUserStore = defineStore("user", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user") || "null") as User | null,
  }),
  actions: {
    setUser(userData: User) {
      this.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
  getters: {
    isLoggedIn: (state): boolean => !!state.user,
  },
});
