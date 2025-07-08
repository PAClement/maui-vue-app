<template>
  <div v-if="isLoading">
    <p>{{ loadingMessage }}</p>
    <Loader/>
  </div>
  <RouterView v-else/>
</template>

<script setup lang="ts">
import Loader from "@/tools/Loader.vue";
import {ref, onMounted} from "vue";
import blazorInit, {type BlazorInitResult} from '@/plugins/blazorInit';

const isLoading = ref(true);
const loadingMessage = ref('Initialisation de l\'application...');

const initializeBlazor = (): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    try {
      const result: BlazorInitResult = await blazorInit.checkBlazorAvailability();

      if (result.isAvailable) {
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
      .then(async () => {
        blazor.initializeEventBridge();
        await blazor.subscribeToService('System');

        isLoading.value = false;
      })
      .catch((err) => {
        console.error('Échec de l’initialisation de Blazor:', err);
      });
});

</script>