<template>
  <Modal
    centered
    :width="720"
    @ok="handleOk"
    v-model:open="open"
    @cancel="handleClose"
  >
    <div class="mt-5 h-[30vh] h-min-[30vh] h-max-[60vh] overflow-y-scroll px-5">
      <CartItem
        :key="product.id"
        :product="products"
        v-for="product in products"
      />
    </div>
    <template #footer>
      <Divider />
      <div class="w-full flex items-center gap-3 my-5">
        <button
          @click="handleClose"
          class="w-full py-3 text-[18px] font-bold rounded-sm bg-[#1C2833] hover:bg-[#304356] text-white transition-all duration-500"
        >
          Cancel
        </button>
        <button
          @click="handleOk"
          class="w-full py-3 text-[18px] font-bold rounded-sm bg-[#1D8348] hover:bg-[#229954] text-white transition-all duration-500"
        >
          Buy
        </button>
      </div>
    </template>
    <template #header></template>
  </Modal>
</template>
<script setup>
import { Modal, Divider } from "ant-design-vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { CART_TYPES } from "@/store/Types";
import CartItem from "@/components/CartItem";

const store = useStore();

const open = computed(() => store.getters["Cart/shouldShowBuyingModal"]);
const products = computed(() => store.getters["Cart/productsInBuying"]);

const handleClose = () => {
  store.commit(["Cart", CART_TYPES.CLOSE_BUYING_MODE].join("/"));
};
const handleOk = () => {
  store.commit(["Cart", CART_TYPES.CLOSE_BUYING_MODE].join("/"));
};
</script>
