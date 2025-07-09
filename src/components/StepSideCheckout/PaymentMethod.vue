<template>
  <div class="flex flex-col items-center justify-around h-full py-20">
    <h2 class="text-2xl font-bold text-gray-500 text-center">Choisissez une methode <br> de paiement</h2>
    <div class="flex items-stretch flex-wrap justify-around gap-5">
      <Button @click="$emit('next')" text="Carte de crédit" background-color="bg-primary-500" text-color="text-white"
              iconSide="left"
              icon="credit-card" iconColor="text-white"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from "@/tools/Button.vue";
</script>