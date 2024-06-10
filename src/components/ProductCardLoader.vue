<template>
  <Card
    class="w-[360px] border-solid border-[1px] border-[#f6f6f6] shadow-md rounded-sm"
  >
    <template #cover>
      <div
        class="h-[360px] w-full border-solid border-[1px] border-x-[1px] border-t-[1px] border-[#e7e7e7] bg-[#e7e7e7] animate-pulse"
      />
    </template>
    <CardMeta>
      <template #description>
        <div class="flex flex-col gap-3">
          <div
            class="h-[24px] w-[full] bg-[#e7e7e7] animate-pulse rounded-md"
          />
          <div
            class="h-[17px] w-[full] bg-[#e7e7e7] animate-pulse rounded-md"
          />
          <div
            class="h-[55px] w-[full] bg-[#e7e7e7] animate-pulse rounded-md"
          />
        </div>
      </template>
    </CardMeta>
  </Card>
</template>

<script setup>
import { Card, CardMeta } from "ant-design-vue";
</script>
