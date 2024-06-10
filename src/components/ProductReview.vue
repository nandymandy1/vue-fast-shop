<template>
  <div class="bg-[#f6f6f6] shadow-sm rounded-sm p-3 w-full">
    <Typography.Title :level="4">{{ review.headline }}</Typography.Title>
    <Typography.Paragraph>{{ review.content }}</Typography.Paragraph>
    <div class="flex">
      <div
        class="bg-[#19181a] text-white flex items-center gap-2 px-2 rounded-md text-[15px]"
      >
        <PhEnvelopeSimple :size="16" />
        {{ review.email }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { Typography } from "ant-design-vue";
import { PhEnvelopeSimple } from "@phosphor-icons/vue";

defineProps({
  review: {
    type: Object,
    required: true,
  },
});
</script>
