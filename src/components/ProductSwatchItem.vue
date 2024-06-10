<template>
  <Tooltip :title="color.toUpperCase()">
    <div
      :style="{ backgroundColor: color }"
      :class="[
        'h-[20px] w-[20px] rounded-[50%] border-solid border-[1px] border-[#e7e7e7] shadow-sm cursor-pointer',
      ]"
    />
  </Tooltip>
</template>

<script setup>
import { defineProps } from "vue";
import { Tooltip } from "ant-design-vue";

defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>
