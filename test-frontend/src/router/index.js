import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/kategorier/:slug(.*)",
    name: "Plp",
    component: () => import("../views/Plp.vue"),
  },
  {
    path: "/produkt/:slug(.*)",
    name: "Pdp",
    component: () => import("../views/Pdp.vue"),
  },
  {
    path: "/search/",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
