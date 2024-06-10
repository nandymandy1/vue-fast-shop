<template>
  <div class="home px-10 flex flex-col gap-5">
    <ProductCarousel :loading="loading" :result="result" />
    <h2 class="text-4xl text-center font-bold py-5">Trending Products</h2>
    <div
      v-if="!productsLoading && !!productResults"
      class="flex item-center justify-center gap-5 flex-wrap py-5"
    >
      <ProductCard
        v-for="product in productResults.products"
        :key="product.id"
        :product="product"
      />
    </div>
    <div
      v-if="productsLoading && !productResults"
      class="flex item-center justify-center gap-5 flex-wrap py-5"
    >
      <ProductCardLoader v-for="product in [1, 2, 3, 4, 5, 6]" :key="product" />
    </div>
  </div>
</template>

<script setup>
// import { Carousel } from "ant-design-vue";
// import { PhArrowCircleLeft, PhArrowCircleRight } from "@phosphor-icons/vue";
import { useQuery } from "@vue/apollo-composable";

import { HomeBanner } from "@/gql/Home";
import { ProductsQuery } from "@/gql/Products";
import ProductCard from "@/components/ProductCard";
import ProductCardLoader from "@/components/ProductCardLoader";
import ProductCarousel from "@/components/ProductCarousel";

const { result, loading } = useQuery(HomeBanner);
const { result: productResults, loading: productsLoading } =
  useQuery(ProductsQuery);
</script>

<style scoped>
:deep(.slick-arrow.custom-slick-arrow) {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(8, 106, 5, 0.11);
  transition: ease all 0.3s;
  opacity: 0.3;
  z-index: 1;
}

:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
  color: #fff;
  opacity: 0.5;
}

:deep(.slick-slide h3) {
  color: #fff;
}
</style>
