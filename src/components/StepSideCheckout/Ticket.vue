<template>
  <div class="flex flex-col items-center justify-center h-full gap-20">
    <h2 class="text-2xl font-bold text-gray-500">Voulez-vous un ticket ?</h2>
    <div class="flex flex-col items-stretch gap-5 ">
      <Button @click="modalMail = true" text="Par mail" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
                gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="envelope" iconColor="text-white"/>
      <Button @click="modalSMS = true" text="Par SMS" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
                gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="mobile-screen" iconColor="text-white"/>
      <Button @click="printTicket" text="Imprimer le ticket" buttonClass="bg-primary-500 shadow-md rounded-lg flex items-center
                gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
              icon="print" iconColor="text-white"/>
    </div>
    <div class="flex flex-col items-center gap-5">
      <p class="text-gray-500">Scannez le QR Code pour récupérer votre ticket</p>
      <img src="@/assets/img/qrcode.svg" alt="logo" class="w-30 h-30">
    </div>
    <Button @click="$emit('next')" text="Je ne veux pas de ticket" buttonClass="bg-gray-500 shadow-md rounded-lg flex items-center
              gap-16 px-12 py-4 font-bold text-white text-xl cursor-pointer " iconSide="left"
            icon="ban" iconColor="text-white"/>
  </div>
  <TransitionRoot appear :show="modalMail" as="template">
    <Dialog :initial-focus="buttonMailRef" as="div" class="relative z-50" @close="modalMail = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col gap-10">
            <h2 class="text-2xl font-bold text-center text-gray-500">Recevoir votre ticket par mail</h2>
            <div>
              <p class="text-lg text-gray-500 mb-3 text-center">Renseigner votre mail</p>
              <input
                  type="text"
                  required
                  @focusin="toggleKeyboard"
                  @focusout="toggleKeyboard"
                  class="bg-gray-50 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 border-2 outline-0 w-full p-2.5 text-center"
              />
              <Keyboard v-if="showKeyboard" @key-press="addKey" />
            </div>
            <div class="flex items-center justify-center mt-3">
              <Button
                  ref="buttonMailRef"
                  text="Envoyer le ticket"
                  buttonClass="bg-green-500 shadow-md rounded-lg flex items-center gap-16 px-8 py-3 font-bold text-white text-xl cursor-pointer"
                  iconSide="left"
                  icon="circle-check"
                  iconColor="text-white"
                  @click="sendTicketByMail"
              />
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot appear :show="modalSMS" as="template">
    <Dialog :initial-focus="buttonSmsRef" as="div" class="relative z-50" @close="modalSMS = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col justify-center items-center gap-5">
            <h2 class="text-2xl font-bold text-center text-gray-500">Recevoir votre ticket par SMS</h2>
            <p class="text-lg text-gray-500 mb-3 text-center">Renseigner votre numéro de téléphone</p>
            <input
                type="text"
                required
                readonly
                v-model="passCode"
                class="bg-gray-50 border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-primary-500 border-2 outline-0 w-full p-2.5 text-center"
            />
            <div class="w-1/2">
              <PassCode @code-update="code => passCode = code"/>
            </div>
            <Button
                ref="buttonSmsRef"
                text="Confirmer"
                buttonClass="bg-green-500 shadow-md rounded-lg flex items-center gap-16 px-8 py-3 font-bold text-white text-2xl cursor-pointer mt-5"
                iconSide="left"
                icon="circle-check"
                iconColor="text-white"
                @click="sendTicketBySMS"
            />
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
import Keyboard from "@/tools/Keyboard.vue";

const showKeyboard = ref(false);
const modalMail = ref(false);
const modalSMS = ref(false);

const buttonMailRef = ref();
const buttonSmsRef = ref();

const passCode = ref<string>('');

const toggleKeyboard = () => {
  showKeyboard.value = !showKeyboard.value;
}

const sendTicketByMail = () => {
  console.log("Envoyer le ticket par mail");
}

const sendTicketBySMS = () => {
  console.log("Envoyer le ticket par SMS");
}

const printTicket = () => {
  console.log("Imprimer le ticket");
}

const addKey = (key: string) => {
  passCode.value += key;
}

</script>