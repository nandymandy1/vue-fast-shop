<template>
  <nav
    class="h-[72px] w-full bg-[#f6f6f6] border-solid border-[3px] border-x-0 border-t-0 border-[#2ECC71] shadow-md flex justify-between items-center px-3"
  >
    <div class="flex">
      <RouterLink
        to="/"
        class="font-bold px-3 py-2 rounded-sm hover:bg-[#D5F5E3] transition-all duration-500 hover:text-[#28B463]"
      >
        <div class="flex items-center gap-1">
          <PhStorefront :size="32" weight="bold" />
          <h2 class="font-bold text-2xl">Fast Shop</h2>
        </div>
      </RouterLink>
    </div>
    <div class="flex gap-3 items-center">
      <NavLink title="Home" to="/" />
      <NavLink title="About" to="/about" />
      <NavLink v-if="!isLoggedIn" title="Login" to="/auth/login" />
      <NavLink v-if="isLoggedIn" title="Products" to="/dashboard/products" />
      <NavLink v-if="isLoggedIn" title="Logout" to="/dashboard/logout" />
      <CartDrawer />
    </div>
  </nav>
</template>

<script setup>
import NavLink from "@/components/NavLink";
import CartDrawer from "../CartDrawer.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { PhStorefront } from "@phosphor-icons/vue";

const store = useStore();

const isLoggedIn = computed(() => store.getters["Auth/isLoggedIn"]);
</script>
