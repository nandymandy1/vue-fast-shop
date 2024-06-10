<template>
  <div class="h-full w-full xs:px-5 md:px-10 lg:px-20 py-8">
    <div class="flex gap-10">
      <div :class="['h-[350px] w-[350px] rounded-sm', constantClasses]" />
      <div class="flex-1 flex flex-col gap-4">
        <div :class="['h-[80px] w-[70%] rounded-sm', constantClasses]" />
        <div class="flex gap-3">
          <div
            v-for="i in [1, 2, 3, 4]"
            :key="i"
            :class="['h-[40px] w-[40px] rounded-[50%]', constantClasses]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const constantClasses =
  "shadow-md border-solid border-[#e8e8e8] border-[1px] bg-[#e7e7e7] animate-pulse";
</script>
