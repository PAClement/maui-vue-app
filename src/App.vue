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
import blazorInit, { type BlazorInitResult } from '@/plugins/blazorInit';

const isLoading = ref(true);
const loadingMessage = ref('Initialisation de l\'application...');

const blazorError = ref<string | null>(null);

const initializeBlazor = async (): Promise<void> => {
  try {
    isLoading.value = true;
    blazorError.value = null;
    loadingMessage.value = 'Vérification de Blazor...';

    const result: BlazorInitResult = await blazorInit.checkBlazorAvailability();

    if (result.isAvailable) {
      console.log(`Blazor ${result.version} est disponible et prêt`);
      loadingMessage.value = 'Blazor initialisé avec succès';

      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    } else {
      console.error('Blazor non disponible:', result.error);
      blazorError.value = result.error || 'Erreur inconnue lors de l\'initialisation de Blazor';
      isLoading.value = false;
    }
  } catch (error) {
    console.error('Erreur lors de l\'initialisation:', error);
    blazorError.value = error instanceof Error ? error.message : 'Erreur inconnue';
    isLoading.value = false;
  }
};

onMounted(() => {
  initializeBlazor();
});

</script>