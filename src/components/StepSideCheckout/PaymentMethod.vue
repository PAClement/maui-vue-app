<template>
  <div class="flex flex-col items-center justify-around h-full py-20">
    <h2 class="text-2xl font-bold text-gray-500 text-center">Choisissez une methode <br> de paiement</h2>
    <div class="flex items-stretch flex-wrap justify-around gap-5">
      <Button @click="$emit('next')" text="Carte de crédit" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
            gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="top"
              icon="credit-card" iconColor="text-white"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from "@/tools/Button.vue";
</script>