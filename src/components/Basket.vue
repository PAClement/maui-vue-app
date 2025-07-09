<template>
  <div class="flex-[1]">
    <div class="flex items-center justify-between">
      <span class="text-3xl font-bold text-gray-500">Votre Panier</span>
      <span class="text-lg font-bold text-gray-500">{{
          store.customerBasketInformation.totalBasketQuantity
        }} ARTICLES</span>
    </div>
    <hr class="h-0.5 mt-3 mb-5 bg-gray-400 border-0 rounded">
  </div>
  <div class="flex-[9]">
    <div class="flex flex-col gap-3">
      <div v-for="product in store.products">
        <Article :product="product.Name" :refProduct="product.InternalRef ?? ''" :price="product.Price"
                 :displayButton="currentStep === 'cart'"/>
      </div>
    </div>
  </div>
  <div class="flex-[1]">
    <hr class="h-0.5 mt-3 mb-5 bg-gray-400 border-0 rounded">
    <div class="flex items-center justify-between">
      <span class="text-3xl font-bold text-gray-500">Total</span>
      <span
          class="text-lg font-bold text-gray-500">{{
          store.customerBasketInformation.totalBasketAmount?.toFixed(2)
        }} €</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentStep: string;
}>();
import Article from "@/components/Article.vue";
import {useBlazorStore} from "@/plugins/blazorEvent";

const store = useBlazorStore();
</script>