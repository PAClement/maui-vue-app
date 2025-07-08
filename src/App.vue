<template>
  <div class="h-screen flex flex-col items-center justify-center space-y-4" v-if="isLoading">
    <Loader />
    <p class="text-gray-500 text-lg">{{ loadingMessage }}</p>
  </div>
  <RouterView v-else/>
</template>

<script setup lang="ts">
import Loader from "@/tools/Loader.vue";
import {ref, onMounted, watch} from "vue";
import blazorInit from '@/plugins/blazorInit';

import {useBlazorStore} from "@/plugins/blazorEvent";
import {BlazorInitResult} from "@/interfaces";

const isLoading = ref(true);
const loadingMessage = ref('Initialisation de la borne...');
const store = useBlazorStore()

const initializeBlazor = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: BlazorInitResult = await blazorInit.checkBlazorAvailability();

      if (result.IsAvailable) {
        console.log(`Blazor ${result.Version} est disponible et prêt`);
        setTimeout(() => {
          resolve();
        }, 500);
      } else {
        console.error('Blazor non disponible:', result.Error);
        reject(new Error(result.Error || 'Blazor non disponible'));
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      reject(error);
    }
  });
};

onMounted(() => {
  initializeBlazor()
      .then(async () => {
        store.initializeEventBridge();
        await store.subscribeToService('System');
        await store.subscribeToService('CustomerOrder');

        isLoading.value = false;
      })
      .catch((err) => {
        isLoading.value = false;

        console.error('Échec de l’initialisation de Blazor:', err);
      });
});

watch(() => store.alert, (msg) => {
  if (msg) {
    //toast message
    console.log(msg)
  }
})

</script>