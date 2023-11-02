import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/product/:id",
      name: "Product",
      component: () => import("../views/products/ProductView.vue"),
    },
    {
      path: "/:notFound",
      name: "Not-Found",
      component: () => import("../views/404ErrorView.vue"),
    },
  ],
});

export default router;
