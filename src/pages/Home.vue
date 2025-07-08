<template>
  <div>
    <button @click="getSystemInfo">System Info</button>
    <br>
    <button @click="increment">Increment</button>
    <br>
    <button @click="setValue">Set Value to 100</button>

    <pre>{{ result }}</pre>
    <pre>{{blazor.counterValue}}</pre>
  </div>
  <section class="h-screen bg-white flex flex-col p-3">
    <div class="flex-1 flex flex-col gap-3">
      <div class="flex-[3] flex justify-center items-center">
        <img src="@/assets/img/logo.svg" alt="logo" class="w-40 h-40">
      </div>
      <div class="flex-[6] flex justify-center items-baseline">
        <div class="bg-white shadow-lg rounded-lg p-3 flex flex-col items-center gap-8 px-10 py-5 max-w-3xl w-full">
          <h2 class="text-center text-gray-500 font-bold text-lg">Scannez un item<br> pour commencer</h2>
          <RouterLink to="/checkout">
            <img src="@/assets/img/barcode.svg" alt="logo" class="w-40 h-40">
          </RouterLink>
        </div>
      </div>
      <div class="flex-[1] flex flex-col justify-center items-center gap-3">
        <button class="cursor-pointer" @click="isOpen = true">
          <img src="@/assets/img/flags/fr.png" alt="logo" class="w-16 h-16">
        </button>
        <Button @click="modalAskHelp = true" text="Demander de l'aide" iconSide="left" icon="warning"
                iconColor="text-red-500"/>
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
            <Button @click="isOpen = false" text="Annuler"/>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot appear :show="modalAskHelp" as="template">
    <Dialog as="div" class="relative z-50" @close="modalAskHelp = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col justify-center items-center gap-5">
            <font-awesome-icon icon="warning" class="text-6xl text-red-500 cursor-pointer"/>
            <h2 class="text-gray-500 text-center">
              <span class="font-bold text-lg">Patientez...</span><br><br> <span class="text-md">Un de nos agents va arriver.</span>
            </h2>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {Dialog, DialogPanel, DialogTitle, TransitionRoot} from '@headlessui/vue'
import Button from "@/tools/Button.vue";
import {BlazorBridge} from '@/plugins/blazorBridge';
import {useBlazorStore} from "@/plugins/blazorEvent";


const flags = ref(['de', 'en', 'es', 'fr', 'it', 'lu', 'pt']);

const isOpen = ref(false);
const modalAskHelp = ref(false);

const currentFlag = ref('fr');

const flags_list = computed(() => {
  return flags.value.filter((flag: string) => flag !== currentFlag.value);
});

const getFlagSrc = (flag: string) => {
  return new URL(`./assets/img/flags/${flag}.png`, import.meta.url).href
}

const handleProduct = (payload: any) => {
  console.log(payload)
};

const result = ref();
const blazor = useBlazorStore();

type Product = {
  id: number;
  barcode: string;
};
const getSystemInfo = async () => {
  result.value = await BlazorBridge.call<Product>('System', 'GetProduct', 1, '1234567890');
}

const increment = async () => {
  await BlazorBridge.call('System', 'Increment');
}
const setValue = async () => {
  await BlazorBridge.call('System', 'SetValue', 100);
}

onMounted(async () => {
  blazor.initializeEventBridge()
  await blazor.subscribeToService('System')
})

</script>

<style scoped>

</style>