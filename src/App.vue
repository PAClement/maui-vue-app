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
const blazor = useBlazorStore()

const initializeBlazor = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: BlazorInitResult = await blazorInit.checkBlazorAvailability();

      if (result.is_available) {
        console.log(`Blazor ${result.version} est disponible et prêt`);
        setTimeout(() => {
          resolve();
        }, 500);
      } else {
        console.error('Blazor non disponible:', result.error);
        reject(new Error(result.error || 'Blazor non disponible'));
      }
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      reject(error);
    }
  });
};

onMounted(() => {
  initializeBlazor()
      .then(() => {
        isLoading.value = false;
      })
      .catch((err) => {
        isLoading.value = false;

        console.error('Échec de l’initialisation de Blazor:', err);
      });
});

watch(() => blazor.alert, (msg) => {
  if (msg) {
    console.log(msg)
  }
})

</script>