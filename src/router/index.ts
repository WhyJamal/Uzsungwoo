import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import { setupRouterGuards } from "./guards";
import LoginPage from "@/views/pages/LoginPage.vue";
import ShipmentForm from "@/views/pages/ShipmentForm.vue";
import SecurityForm from "@/views/pages/SecurityForm.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/shipment",
    name: "shipment",
    component: ShipmentForm,
  },
  {
    path: "/security",
    name: "security",
    component: SecurityForm,
  },
  {
    path: "/not-authorized",
    name: "not-authorized",
    component: () => import("@/views/pages/maintenance/error/Error401Page.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/pages/maintenance/error/Error404Page.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

setupRouterGuards(router);

export default router;
