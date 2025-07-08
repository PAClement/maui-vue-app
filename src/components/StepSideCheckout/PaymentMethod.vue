<template>
  <div class="flex flex-col items-center justify-around h-full py-20">
    <img src="@/assets/img/tpe.png" alt="tpe" class="w-40 h-40 mb-8"/>
    <Loader/>
    <h2 class="text-2xl font-bold text-gray-500 text-center">Suivez les instructions <br> sur la borne de paiement...
    </h2>
  </div>

  <TransitionRoot appear :show="isVisible" as="template">
    <Dialog as="div" class="relative z-50" @close="isVisible = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="transform overflow-hidden rounded-2xl bg-white p-6 text-center shadow-xl transition-all w-full max-w-md"
        >
          <div v-if="step === 'success'" class="flex flex-col items-center space-y-4">
            <font-awesome-icon icon="warning" class="text-6xl text-red-500 cursor-pointer"/>
            <h2 class="text-xl font-bold text-gray-800">Paiement effectué avec succès</h2>
          </div>

          <div v-else-if="step === 'validating'" class="flex flex-col items-center space-y-4">
            <Loader/>
            <p class="text-gray-700 text-lg">Validation de votre commande...</p>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import Loader from "@/tools/Loader.vue";
import {Dialog, DialogPanel, TransitionRoot} from "@headlessui/vue";
import {ref, onMounted} from "vue";

const isVisible = ref(false);
const step = ref<'success' | 'validating'>('success');


const requestPayment = () => {
  isVisible.value = true;
};

onMounted(() => {
  setTimeout(() => {
    requestPayment();
  }, 2000)
});

</script>
