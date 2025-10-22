import { useUserStore } from "../stores/userStore";
import type { Router } from "vue-router";

export function setupRouterGuards(router: Router) {
  router.beforeEach((to) => {
    const userStore = useUserStore();
    const isLoggedIn = !!userStore.isLoggedIn;

    if (to.meta.requiresAuth && !isLoggedIn) {
      return { name: "not-authorized" };
    }

    return true;
  });
}
