<template>
  <div
    v-if="loading && !result"
    class="rounded-md h-[350px] py-3 bg-[#e7e7e7] animate-pulse"
  />
  <Carousel arrows v-else-if="!loading && !!result">
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
        <PhArrowCircleLeft :size="32" />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px">
        <PhArrowCircleRight :size="32" />
      </div>
    </template>
    <div
      v-for="asset in result.assets.slice(0, 5)"
      :key="asset.id"
      class="rounded-md w-full"
    >
      <div
        class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% border-none flex justify-between items-center px-10 rounded-md py-3"
      >
        <div class="pl-4 flex flex-col gap-2 items-center">
          <h2 class="text-5xl text-white">Here is your thing</h2>
          <h2 class="text-2xl text-white">Here is your thing</h2>
          <button
            class="bg-[#17202A] text-xl text-white hover:bg-[#2C3E50] px-7 py-3 rounded-md"
          >
            Explore Now
          </button>
        </div>
        <img class="h-[350px] w-[350px]" :src="asset.url" alt="" />
      </div>
    </div>
  </Carousel>
</template>

<script setup>
import { defineProps } from "vue";
import { Carousel } from "ant-design-vue";
import { PhArrowCircleLeft, PhArrowCircleRight } from "@phosphor-icons/vue";

defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
  result: {
    type: Object,
    required: true,
  },
});
</script>
