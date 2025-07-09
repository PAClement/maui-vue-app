<template>
  <div v-if="step === 'waiting'" class="flex flex-col items-center justify-around h-full py-20">
    <img src="@/assets/img/tpe.png" alt="tpe" class="w-40 h-40 mb-8"/>
    <Loader/>
    <h2 class="text-2xl font-bold text-gray-500 text-center">Suivez les instructions <br> sur la borne de paiement...
    </h2>
  </div>
  <div v-else class="flex flex-col items-center justify-center h-full py-20">
    <Loader/>
    <p class="text-gray-700 text-lg" v-if="step === 'validating'">Validation de votre commande...</p>
    <p class="text-gray-700 text-lg" v-else-if="step === 'success'">Paiement effectué avec succès...</p>
  </div>
</template>

<script setup lang="ts">
import Loader from "@/tools/Loader.vue";
import {ref, onMounted} from "vue";

const emit = defineEmits(['next']);
const step = ref<'waiting' | 'success' | 'validating'>('waiting');


const paymentSuccess = () => {
  step.value = 'success';
  setTimeout(() => {
    orderValidation()
  }, 2000)
};

const orderValidation = () => {
  step.value = 'validating';
  setTimeout(() => {
    emit('next')
  }, 2000)
};

onMounted(() => {
  setTimeout(() => {
    paymentSuccess();
  }, 2000)
});

</script>
