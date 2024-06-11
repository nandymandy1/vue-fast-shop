import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutPage.vue"),
  },
  {
    path: "/product/:slug",
    name: "product",
    component: () => import("@/views/Product/ProductPage.vue"),
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("@/views/Auth/AuthLayout.vue"),
    meta: {
      requiresPublic: true,
    },
    children: [
      {
        path: "login",
        name: "AuthLogin",
        component: () => import("@/views/Auth/AppLogin.vue"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    redirect: "/dashboard/products",
    component: () => import("@/views/Dashboard/DashboardLayout.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "products",
        name: "DashboardProducts",
        component: () => import("@/views/Dashboard/Products/ProductList.vue"),
      },
      {
        path: "add-product",
        name: "DashboardAddProduct",
        component: () => import("@/views/Dashboard/AddProduct/AddProduct.vue"),
      },
      {
        path: "product/:id",
        name: "DashboardProduct",
        component: () =>
          import("@/views/Dashboard/EditProduct/EditProduct.vue"),
      },
      {
        path: "logout",
        name: "DashboardLogout",
        // eslint-disable-next-line
        beforeEnter: (_, __, next) => {
          store.commit("Auth/LOGOUT_USER");
          next("/");
        },
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.getters["Auth/isLoggedIn"];
  if (to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn) {
    next("/auth/login");
  } else if (
    to.matched.some((record) => record.meta.requiresPublic) &&
    isLoggedIn
  ) {
    next("/");
  } else {
    next();
  }
});

export default router;
