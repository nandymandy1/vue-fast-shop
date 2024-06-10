import { createRouter, createWebHistory } from "vue-router";

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
    path: "/products",
    name: "products",
    component: () => import("@/views/Dashboard/Products/ProductList.vue"),
  },
  {
    path: "/product/:slug",
    name: "product",
    component: () => import("@/views/Product/ProductPage.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    redirect: "/dashboard/products",
    component: () => import("@/views/Dashboard/DashboardLayout.vue"),
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
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
