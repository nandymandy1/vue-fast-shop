<template>
  <Card
    class="w-[360px] border-solid border-[1px] border-[#f6f6f6] shadow-md rounded-sm"
  >
    <template #cover>
      <Image
        :height="360"
        class="w-[auto] border-solid border-[1px] border-x-[1px] border-t-[1px] border-[#f6f6f6]"
        :src="product?.images?.[0].url"
      />
    </template>
    <CardMeta :title="product.name">
      <template #description>
        <div class="flex flex-col gap-2">
          <h5 class="text-xl font-bold">{{ product.price.toFixed(2) }}/-</h5>
          <RouterLink :to="`/product/${product.slug}`">
            <Button block size="large">View Product</Button>
          </RouterLink>
        </div>
      </template>
    </CardMeta>
  </Card>
</template>

<script setup>
import { defineProps } from "vue";
import { Card, CardMeta, Button, Image } from "ant-design-vue";

defineProps({
  product: {
    type: Object,
    require: true,
  },
});
</script>
