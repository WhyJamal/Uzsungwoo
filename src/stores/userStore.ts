import { defineStore } from "pinia";

interface User {
  name: string;
  role: string;
}

export const useUserStore = defineStore("user", {
  state: () => {
    let storedUser: User | null = null;
    try {
      storedUser = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      storedUser = null;
    }

    return {
      user: storedUser as User | null,
    };
  },

  getters: {
    isLoggedIn: (state): boolean => {
      const result = !!state.user;
      return result;
    },
  },

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
});
