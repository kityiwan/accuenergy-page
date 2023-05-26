import { createRouter, createWebHistory } from "vue-router";
import LocationSearch from "@/pages/LocationSearch";

const routes = [
  {
    path: "/",
    name: "LocationSearch",
    component: LocationSearch,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
