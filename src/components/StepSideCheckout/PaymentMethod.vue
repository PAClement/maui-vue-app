<template>
  <div class="flex flex-col items-center justify-around h-full py-20">
    <img src="@/../assets/img/tpe.png" alt="tpe" class="w-40 h-40 mb-8"/>
    <Loader/>
    <h2 class="text-2xl font-bold text-gray-500 text-center">Suivez les instructions <br> sur la borne de paiement...</h2>
  </div>
</template>

<script setup lang="ts">
import Loader from "@/tools/Loader.vue";
</script>
