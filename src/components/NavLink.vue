<template>
  <RouterLink
    :to="props.to"
    class="font-bold px-3 py-2 rounded-sm hover:bg-[#D5F5E3] hover:text-[#28B463] transition-all duration-500"
  >
    {{ props.title }}
  </RouterLink>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
});
</script>
