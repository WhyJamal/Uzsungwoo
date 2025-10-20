import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useUserStore } from "../stores/user";

export function setupRouterGuards(router: any) {
  router.beforeEach(
    (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => {
      const userStore = useUserStore();
      const isLoggedIn = userStore.isLoggedIn;

      if (to.meta.requiresAuth && !isLoggedIn) {
        next("/not-authorized");
      } else {
        next();
      }
    }
  );
}
