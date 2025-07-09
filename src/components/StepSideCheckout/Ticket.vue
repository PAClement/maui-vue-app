<template>
  <div class="flex flex-col items-center justify-center h-full gap-20">
    <h2 class="text-2xl font-bold text-gray-500">Voulez-vous un ticket ?</h2>
    <div class="flex flex-col items-stretch gap-5 ">
      <Button @click="modalMail = true" text="Par mail" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
                gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="envelope" iconColor="text-white"/>
      <Button @click="modalSMS = true" text="Par SMS" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
                gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="mobile" iconColor="text-white"/>
      <Button @click="modalPrint = true" text="Imprimer le ticket" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
                gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="print" iconColor="text-white"/>
    </div>
    <img src="@/assets/img/qrcode.svg" alt="logo" class="w-30 h-30">
    <Button @click="$emit('next')" text="Je ne veux pas de ticket" buttonClass="bg-gray-500 shadow-md rounded-lg flex items-center
              gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
            icon="ban" iconColor="text-white"/>
  </div>
  <TransitionRoot appear :show="modalMail" as="template">
    <Dialog as="div" class="relative z-50" @close="modalMail = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col gap-10">
            <h2 class="text-2xl font-bold text-center text-gray-500">Ticker par mail</h2>
            <div>
              <p class="text-lg text-gray-500 mb-3 text-center">Renseigner votre mail</p>
              <input
                  type="text"
                  required
                  class="bg-gray-50 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 border-2 outline-0 w-full p-2.5"
              />
            </div>
            <div class="flex items-center justify-center mt-3">
              <Button
                  text="Envoyer le ticket"
                  buttonClass="bg-green-500 shadow-md rounded-lg flex items-center gap-16 px-8 py-3 font-bold text-white text-xl cursor-pointer"
                  iconSide="left"
                  icon="circle-check"
                  iconColor="text-white"
                  @click="$emit('next')"
              />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot appear :show="modalSMS" as="template">
    <Dialog as="div" class="relative z-50" @close="modalSMS = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col justify-center items-center gap-5">
            <h2>SMS</h2>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot appear :show="modalPrint" as="template">
    <Dialog as="div" class="relative z-50" @close="modalPrint = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col justify-center items-center gap-5">
            <h2>Print</h2>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import Button from "@/tools/Button.vue";
import {Dialog, DialogPanel, TransitionRoot} from "@headlessui/vue";
import {ref} from "vue";

const modalMail = ref(false);
const modalSMS = ref(false);
const modalPrint = ref(false);
</script>