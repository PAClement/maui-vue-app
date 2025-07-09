<template>
  <div class="flex flex-col items-center justify-between h-full py-20 gap-20">
    <h2 class="text-2xl font-bold text-gray-500">Voulez-vous un ticket ?</h2>
    <div class="flex flex-col items-stretch gap-5 ">
      <Button text="Par mail" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
              gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="envelope" iconColor="text-white"/>
      <Button text="Par SMS" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
              gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="mobile" iconColor="text-white"/>
      <Button text="QR Code" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
              gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="qrcode" iconColor="text-white"/>
    </div>
    <Button @click="$emit('next')" text="Je ne veux pas de ticket" buttonClass="bg-gray-500 shadow-md rounded-lg flex items-center
              gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
            icon="ban" iconColor="text-white"/>
  </div>
</template>

<script setup lang="ts">
import Button from "@/tools/Button.vue";
</script>