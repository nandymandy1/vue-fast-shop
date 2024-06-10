<template>
  <div :class="['bg-[#f6f6f6] p-5 rounded-md shadow-sm']">
    <div :class="[!isExpanded ? 'line-clamp-2' : '']">
      {{ description }}
    </div>
    <Typography.Text
      @click="isExpanded = !isExpanded"
      class="font-bold text-[14px] text-[#19181a] cursor-pointer"
    >
      {{ !isExpanded ? "Read More" : "Show Less" }}
    </Typography.Text>
  </div>
</template>

<script setup>
import { defineProps, ref } from "vue";
import { Typography } from "ant-design-vue";

const isExpanded = ref(false);

defineProps({
  description: {
    type: String,
    default: "",
  },
});
</script>
