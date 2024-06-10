<template>
  <th
    scope="col"
    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
  >
    {{ props.title }}
  </th>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>
