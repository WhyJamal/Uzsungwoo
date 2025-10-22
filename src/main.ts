import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "./assets/style.css";
import { setupRouterGuards } from "./router/guards";

const app = createApp(App);

const pinia = createPinia();
app.use(pinia);
app.use(router);

setupRouterGuards(router);

app.mount("#app");
