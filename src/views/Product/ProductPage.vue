<template>
  <ProductLoader v-if="loading && !result" />
  <div
    v-if="!loading && !!result"
    class="h-full w-full xs:px-5 md:px-10 lg:px-20 py-8 flex flex-col gap-5"
  >
    <div class="flex gap-10">
      <Image
        :width="365"
        :height="365"
        :src="result.products[0].images[0].url"
        class="border-solid border-[1px] border-[#e7e7e7] rounded-sm shadow-md"
      />
      <div class="flex-1 flex flex-col gap-4">
        <Typography.Title :level="1">
          {{ result.products[0].name }}
        </Typography.Title>
        <div class="flex gap-3">
          <ProductSwatchItem
            v-for="variant in result?.products?.[0]?.variants"
            :key="variant.id"
            :color="variant.color.toLowerCase()"
          />
        </div>
        <ProductDescription :description="result.products[0].description" />
        <div>
          <Typography.Title :level="3">
            {{ result.products[0].price.toFixed(2) }}
          </Typography.Title>
        </div>
        <div class="flex gap-3">
          <button
            @click="() => buyNow(result.products[0])"
            class="bg-[#17202A] text-white px-6 py-3 hover:bg-[#2C3E50] flex gap-4 items-center transition-all duration-700 rounded-sm"
          >
            <PhShoppingBag :size="32" />
            Buy Now
          </button>
          <button
            @click="() => addProduct(result.products[0])"
            class="bg-[#0B5345] text-white px-6 py-3 hover:bg-[#17A589] flex gap-4 items-center transition-all duration-700 rounded-sm"
          >
            <PhShoppingCartSimple :size="32" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
    <Typography.Title :level="3">Reviews</Typography.Title>
    <div
      class="flex w-full flex-col gap-3"
      v-if="(result?.products?.[0]?.reviews || []).length"
    >
      <ProductReview
        v-for="review in result?.products?.[0]?.reviews"
        :key="review.email"
        :review="review"
      />
    </div>
    <div v-else>
      <div
        class="flex flex-col items-center justify-center h-[30vh] bg-[#f6f6f6] rounded-sm"
      >
        <Result
          title="No reviews yet"
          sub-title="Currently there are no product reviews available."
        >
          <template #icon>
            <div />
          </template>
        </Result>
      </div>
    </div>
    <ProductCheckout
      v-if="showCheckout"
      :product="result?.products?.[0]"
      @close="showCheckout = false"
    />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { ProductQuery } from "@/gql/Products";
import ProductLoader from "./ProductLoader";
import ProductSwatchItem from "@/components/ProductSwatchItem";
import ProductReview from "@/components/ProductReview";
import ProductCheckout from "@/components/ProductCheckout";
import ProductDescription from "@/components/ProductDescription";
import { PhShoppingCartSimple, PhShoppingBag } from "@phosphor-icons/vue";
import { Image, Typography, message, Result } from "ant-design-vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { CART_TYPES } from "@/store/Types";

const route = useRoute();
const store = useStore();

const showCheckout = ref(false);

const { loading, result } = useQuery(ProductQuery, { ...route.params });

const addProduct = (product) => {
  store.commit(["Cart", CART_TYPES.ADD_PRODUCT].join("/"), product);
  message.success(`${product.name} is added in your cart.`, 5);
};

const buyNow = () => {
  showCheckout.value = true;
};
</script>
