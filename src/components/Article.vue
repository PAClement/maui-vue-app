<template>
  <article class="bg-white shadow-lg rounded-lg p-3 flex justify-between">
    <div class="flex items-center gap-3">
      <img src="../../assets/img/package-box.svg" alt="logo" class="w-14 h-14 mr-3">
      <div class="text-gray-500">
        <h2>Product {{ props.product ?? 0 }} </h2>
        <small class="font-bold">Référence : {{ props.refProduct ?? 0 }}</small>
      </div>
    </div>
    <div class="flex items-center gap-5">
      <span class="font-bold text-xl">{{ props.price ?? 0 }} €</span>
      <font-awesome-icon icon="trash-can" class="text-2xl text-red-500 cursor-pointer" @click="modalRemoveItem = true"/>
    </div>
    <TransitionRoot appear :show="modalRemoveItem" as="template">
      <Dialog as="div" class="relative z-50" @close="modalRemoveItem = false">
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
            <div class="flex justify-center items-center gap-3">
              <font-awesome-icon icon="trash-can" class="text-2xl text-red-500 cursor-pointer"/>
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

const props = defineProps({
  product: String,
  price: Number,
  refProduct: String
})

const modalRemoveItem = ref(false);

</script>