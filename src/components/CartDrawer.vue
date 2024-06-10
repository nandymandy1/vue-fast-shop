<template>
  <Badge :count="totalItems">
    <button
      @click="showDrawer"
      class="font-bold px-3 py-2 rounded-sm hover:bg-[#D5F5E3] hover:text-[#28B463] transition-all duration-500 flex items-center gap-1"
    >
      <PhShoppingCartSimple :size="24" weight="bold" />
      Cart
    </button>
  </Badge>
  <Drawer placement="right" title="Your Cart" v-model:open="open">
    <div class="flex flex-col h-full" v-if="cart.length > 0">
      <div class="flex-1 flex-col gap-3 overflow-y-scroll pr-2">
        <CartItem v-for="item in cart" :key="item.id" :product="item" />
      </div>
      <Divider />
      <div class="flex items-center justify-between gap-2">
        <Typography.Text class="font-bold text-xl">Total</Typography.Text>
        <Typography.Text class="font-bold text-xl">
          {{ cartTotal }}
        </Typography.Text>
      </div>
      <Divider />
      <CartCheckout />
    </div>
    <div class="flex flex-col items-center justify-center gap-2 h-full" v-else>
      <EmptyCart />
    </div>
  </Drawer>
</template>

<script setup>
import { ref, computed } from "vue";
import { Drawer, Divider, Typography, Badge } from "ant-design-vue";
import { PhShoppingCartSimple } from "@phosphor-icons/vue";
import { useStore } from "vuex";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import CartCheckout from "./CartCheckout";

const open = ref(false);
const store = useStore();

const cart = computed(() => store.getters["Cart/cart"]);
const totalItems = computed(() => store.getters["Cart/count"]);
const cartTotal = computed(() => store.getters["Cart/cartTotal"]);

const showDrawer = () => {
  open.value = true;
};
</script>
