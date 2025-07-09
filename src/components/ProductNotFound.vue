<template>
  <TransitionRoot appear :show="displayModal" as="template">
    <Dialog as="div" class="relative z-50" @close="closeModal">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col items-center justify-center gap-5">
            <font-awesome-icon icon="warning" class="text-6xl text-yellow-500"/>
            <h2 class="text-gray-500 text-center">
              <span class="font-bold text-lg">Produit non trouvé</span>
            </h2>
            <div>
              <Button @click="closeModal" text="Réessayer"/>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import Button from "@/tools/Button.vue";
import {Dialog, DialogPanel, TransitionRoot} from "@headlessui/vue";
import {useBlazorStore} from "@/plugins/blazorEvent";

defineProps({
  displayModal: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close-modal']);
const store = useBlazorStore()

const closeModal = () => {
  store.productNotFound = false;
  emit("close-modal");
}
</script>