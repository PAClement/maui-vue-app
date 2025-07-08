<template>
  <article class="bg-white shadow-lg rounded-lg p-3 flex justify-between">
    <div class="flex items-center gap-3">
      <img src="@/assets/img/package-box.svg" alt="logo" class="w-14 h-14 mr-3">
      <div class="text-gray-500">
        <h2>{{ props.product ?? 0 }} </h2>
        <small class="font-bold">Référence : {{ props.refProduct ?? 0 }}</small>
      </div>
    </div>
    <div class="flex items-center gap-5">
      <span class="font-bold text-xl text-gray-700">{{ props.price?.toFixed(2) ?? 0 }} €</span>
      <font-awesome-icon icon="trash-can" class="text-2xl text-red-500 cursor-pointer" @click="modalRemoveItem = true"
                         v-if="displayButton"/>
    </div>
    <TransitionRoot appear :show="modalRemoveItem" as="template">
      <Dialog as="div" class="relative z-50" @close="modalRemoveItem = false">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
            <div class="flex flex-col justify-center items-center gap-5">
              <font-awesome-icon icon="trash-can" class="text-3xl text-red-500 cursor-pointer"/>
              <h2 class="text-lg text-gray-500">Voulez-vous supprimez cette article ?</h2>
              <small class="mb-5 text-gray-500 font-bold">{{ product }}</small>
              <div class="flex gap-5">
                <Button @click="modalRemoveItem = false" text="Annuler"/>
                <Button
                    buttonClass="bg-red-500 shadow-md rounded-lg px-4 py-2 text-md font-bold text-white cursor-pointer"
                    text="Confirmer"/>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </TransitionRoot>
  </article>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {Dialog, DialogPanel, DialogTitle, TransitionRoot} from "@headlessui/vue";
import Button from "@/tools/Button.vue";

const props = defineProps({
  product: String,
  price: Number,
  refProduct: String,
  displayButton: Boolean,
})

const modalRemoveItem = ref(false);

</script>