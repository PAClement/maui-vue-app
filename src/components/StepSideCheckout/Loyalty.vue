<template>
  <div class="flex flex-col items-center justify-between h-full py-20">
    <h2 class="text-2xl font-bold text-gray-500">Vous avez un compte de fidélité ?</h2>
    <div class="flex flex-col gap-5">
      <Button @click="modalLoyaltyAccount = true" text="Scanner ma carte" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
            gap-16 px-12 py-4 font-bold text-white text-2xl cursor-pointer " iconSide="left"
               icon="qrcode" iconColor="text-white"/>
      <Button text="Créer ma carte" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
            gap-16 px-12 py-4 font-bold text-white text-2xl cursor-pointer " iconSide="left"
               icon="plus" iconColor="text-white"/>
    </div>
    <Button  @click="$emit('next')" text="Non, merci" buttonClass="bg-gray-500 shadow-md rounded-lg flex items-center
            gap-16 px-12 py-4 font-bold text-white text-2xl cursor-pointer " iconSide="left"
             icon="ban" iconColor="text-white"/>
  </div>
  <TransitionRoot appear :show="modalLoyaltyAccount" as="template">
    <Dialog as="div" class="relative z-50" @close="modalLoyaltyAccount = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" />
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all w-auto max-w-full h-auto"
        >
          <div class="flex items-center justify-around gap-30">
            <img src="@/../assets/img/barcode.svg" alt="logo" class="w-40 h-40" />
            <div class="flex flex-col gap-3">
              <p class="text-center">
                Scanner votre carte ou <br />
                Entrer votre numéro de téléphone
              </p>
              <input
                  type="text"
                  required
                  class="bg-gray-50 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 border-2 outline-0 block w-full p-2.5"
              />
            </div>
            <PassCode />
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
import PassCode from "@/tools/PassCode.vue";

const modalLoyaltyAccount = ref(false);
</script>