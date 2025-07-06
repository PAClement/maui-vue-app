<template>
  <section class="h-screen bg-white flex flex-col p-3">
    <div class="flex-1 flex flex-col gap-3">
      <div class="flex-[3] flex justify-center items-center">
        <img src="../../assets/img/logo.svg" alt="logo" class="w-40 h-40">
      </div>
      <div class="flex-[6] flex justify-center items-baseline">
        <div class="bg-white shadow-lg rounded-lg p-3 flex flex-col items-center gap-8 px-10 py-5 max-w-3xl w-full">
          <h2 class="text-center text-gray-500 font-bold text-lg">Scan an item <br> to begin</h2>
          <RouterLink to="/checkout">
            <img src="../../assets/img/barcode.svg" alt="logo" class="w-40 h-40">
          </RouterLink>
        </div>
      </div>
      <div class="flex-[1] flex flex-col justify-center items-center gap-3">
        <button class="cursor-pointer" @click="isOpen = true">
          <img src="../../assets/img/flags/fr.png" alt="logo" class="w-16 h-16">
        </button>
        <button class="bg-white shadow-md rounded-lg px-4 py-2 text-lg font-bold text-gray-500 cursor-pointer">
              <span class="flex items-center gap-8">
                <font-awesome-icon icon="warning" class="text-red-400 text-2xl"/>
                Ask for Help
              </span>
        </button>
      </div>
    </div>
  </section>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="isOpen = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <DialogTitle class="text-lg font-medium text-gray-900">
            Choisissez votre langue
          </DialogTitle>
          <div class="flex items-center justify-center gap-3 flex-wrap my-5">
            <div class="col-3" v-for="flag in flags_list" :key="flag">
              <img style="cursor: pointer"
                   v-if="flag !== currentFlag" :src="getFlagSrc(flag)" height="100" width="100"
                   :alt="flag">
            </div>
          </div>
          <div class="flex items-center justify-center">
            <button @click="isOpen = false" class="bg-white shadow-md rounded-lg px-4 py-2 text-lg font-bold text-gray-500 cursor-pointer">
                <span class="flex items-center gap-8">
                  Annuler
                </span>
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import {Dialog, DialogPanel, DialogTitle, TransitionRoot} from '@headlessui/vue'

const flags = ref(['de', 'en', 'es', 'fr', 'it', 'lu', 'pt']);

const isOpen = ref(false);

const currentFlag = ref('fr');

const flags_list = computed(() => {
  return flags.value.filter((flag: string) => flag !== currentFlag.value);
});

const getFlagSrc = (flag: string) => {
  return new URL(`../../assets/img/flags/${flag}.png`, import.meta.url).href
}
</script>

<style scoped>

</style>