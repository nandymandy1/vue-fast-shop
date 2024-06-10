<template>
  <div class="flex flex-col gap-2 bg-[#f6f6f6] rounded-sm shadow-md p-3 m-3">
    <div class="flex gap-3 items-center">
      <img :src="product.images[0].url" class="h-[80px] w-80px rounded-sm" />
      <div class="flex flex-col gap-2">
        <Typography.Title :level="5">{{ product.name }}</Typography.Title>
        <div class="flex gap-4">
          <Typography.Paragraph>
            <Typography.Text class="font-bold text-[16px]">
              Qty:
            </Typography.Text>
            <Typography.Text class="text-[16px]">
              {{ product.qty }}
            </Typography.Text>
          </Typography.Paragraph>
          <Typography.Paragraph>
            <Typography.Text class="font-bold text-[16px]">
              Price:
            </Typography.Text>
            <Typography.Text class="text-[16px]">
              {{ product.price.toFixed(2) }}
            </Typography.Text>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
    <div class="flex gap-2 items-center justify-end">
      <button
        @click="increaseItem"
        class="text-white bg-[#0B5345] hover:bg-[#117A65] px-3 py-1 rounded-sm"
      >
        +
      </button>
      <button
        @click="decreaseItem"
        class="text-white bg-[#0B5345] hover:bg-[#117A65] px-3 py-1 rounded-sm"
      >
        -
      </button>
      <button
        @click="removeItem"
        class="text-white bg-[#0B5345] hover:bg-[#117A65] px-3 py-1 rounded-sm"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script setup>
import { Typography, message } from "ant-design-vue";
import { defineProps } from "vue";
import { useStore } from "vuex";
import { CART_TYPES } from "@/store/Types.js";

const store = useStore();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const removeItem = () => {
  store.commit(["Cart", CART_TYPES.REMOVE_PRODUCT].join("/"), props.product.id);
  message.success(`${props.product.name} is removed from the cart.`, 5);
};

const increaseItem = () => {
  store.commit(["Cart", CART_TYPES.ADD_PRODUCT].join("/"), props.product);
  message.success(`${props.product.name}'s quantity is increased by 1.`, 5);
};

const decreaseItem = () => {
  store.commit(["Cart", CART_TYPES.DECREASE_QTY].join("/"), props.product.id);
  message.success(`${props.product.name}'s quantity is reduced by 1.`, 5);
};
</script>
