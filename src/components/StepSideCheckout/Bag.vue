<template>
  <div class="flex flex-col items-center justify-between h-full py-20">
    <h2 class="text-2xl font-bold text-gray-500">Voulez-vous un sac ?</h2>
    <div class="text-center">
      <small class="text-gray-500 text-lg">Scannez le</small>
      <img src="@/assets/img/barcode.svg" alt="logo" class="w-40 h-40">
    </div>
    <Button @click="$emit('next')" text="Non, merci" background-color="bg-gray-500" text-color="text-white"
            iconSide="left"
            icon="ban" iconColor="text-white"/>
  </div>
</template>

<script setup lang="ts">

import Button from "@/tools/Button.vue";
</script>
