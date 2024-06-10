<template>
  <div class="flex flex-col items-center gap-1">
    <PhStarFour
      :size="32"
      weight="regular"
      color="#0B5345"
      class="ml-[-120px]"
    />
    <PhShoppingBagOpen
      :size="100"
      weight="thin"
      color="#0B5345"
      class="rotate-[-5deg]"
    />
    <PhStarFour
      :size="32"
      weight="regular"
      color="#0B5345"
      class="mr-[-100px]"
    />
    <Typography.Title :level="5">Your cart is empty</Typography.Title>
    <Typography.Paragraph>
      Please add some products in your cart.
    </Typography.Paragraph>
    <RouterLink to="/">
      <button
        class="bg-[#0B5345] text-white px-6 py-3 hover:bg-[#17A589] flex gap-4 items-center transition-all duration-700 rounded-sm"
      >
        <PhShoppingBag :size="18" />
        Shop Now
      </button>
    </RouterLink>
  </div>
</template>

<script setup>
import {
  PhShoppingBagOpen,
  PhStarFour,
  PhShoppingBag,
} from "@phosphor-icons/vue";
import { Typography } from "ant-design-vue";
</script>
