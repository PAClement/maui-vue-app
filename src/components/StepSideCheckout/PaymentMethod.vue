<template>
  <div class="flex flex-col items-center justify-around h-full py-20">
    <h2 class="text-2xl font-bold text-gray-500 text-center">Choisissez une methode <br> de paiement ?</h2>
    <div class="flex flex-col items-stretch gap-5">
      <Button text="Carte de crédit" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
            gap-16 px-12 py-4 font-bold text-white text-2xl cursor-pointer " iconSide="left"
              icon="qrcode" iconColor="text-white"/>
      <Button text="Compte fidélité" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
            gap-16 px-12 py-4 font-bold text-white text-2xl cursor-pointer " iconSide="left"
              icon="qrcode" iconColor="text-white"/>
      <Button text="Chéque cadeau" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
            gap-16 px-12 py-4 font-bold text-white text-2xl cursor-pointer " iconSide="left"
              icon="qrcode" iconColor="text-white"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import Button from "@/tools/Button.vue";
</script>
