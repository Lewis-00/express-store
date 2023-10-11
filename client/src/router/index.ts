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
      path: "/products",
      name: "Products",
      component: () => import("../views/products/ProductsView.vue"),
    },
    {
      path: "/:notFound",
      name: "Not-Found",
      component: () => import("../views/404ErrorView.vue"),
    },
  ],
});

export default router;
