<template>
  <div class="flex flex-col items-center justify-between h-full py-20 gap-20">
    <h2 class="text-2xl font-bold text-gray-500">Voulez-vous un ticket ?</h2>
    <div class="flex flex-col items-stretch gap-5 ">
      <Button @click="modalMail = true" text="Par mail" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
              gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="envelope" iconColor="text-white"/>
      <Button @click="modalSMS = true" text="Par SMS" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
              gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="mobile" iconColor="text-white"/>
      <Button @click="modalQRCode = true" text="QR Code" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
              gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="qrcode" iconColor="text-white"/>
    </div>
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
          <div class="flex flex-col justify-center items-center gap-5">
            <h2>Mail</h2>
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
  <TransitionRoot appear :show="modalQRCode" as="template">
    <Dialog as="div" class="relative z-50" @close="modalQRCode = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col justify-center items-center gap-5">
            <h2>QR code</h2>
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
const modalQRCode = ref(false);
</script>