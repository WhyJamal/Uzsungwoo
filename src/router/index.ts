import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import LoginPage from '@/views/pages/LoginPage.vue'
import ShipmentForm from '@/views/pages/ShipmentForm.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/shipment',
    name: 'shipment',
    component: ShipmentForm,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
