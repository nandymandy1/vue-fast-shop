<template>
  <main class="h-[100vh] w-[100vw] flex flex-col">
    <header class="w-full">
      <AppNav />
    </header>
    <div class="flex-1 pt-5 overflow-y-scroll flex flex-col h-full">
      <div class="flex-1">
        <RouterView />
      </div>
      <AppFooter />
    </div>
  </main>
</template>

<script setup>
import AppNav from "@/components/_partials/AppNav";
import AppFooter from "@/components/_partials/AppFooter";
</script>
