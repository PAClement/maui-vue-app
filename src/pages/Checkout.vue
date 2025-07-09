<template>
  <section class="h-screen bg-white flex flex-col p-3">
    <div class="flex-1 flex flex-col gap-3">
      <div class="flex-[1]">
        <div class="flex items-center justify-between mb-3 h-full w-full ">
          <div class="flex-[3]">
            <Button v-show="showButtonModalCancelCart" @click="modalCancelCart = true" text="Abandonner mon panier"
                    iconSide="left" icon="xmark"
                    iconColor="text-red-500"/>
          </div>
          <div class="flex-[3] flex justify-center">
            <img src="@/assets/img/logo.svg" alt="logo">
          </div>
          <div class="flex-[3]  flex justify-end">
            <Button @click="modalAskHelp = true" text="Demander de l'aide" iconSide="left" icon="warning"
                    iconColor="text-red-500"/>
          </div>
        </div>
      </div>
      <div class="flex-[9] flex justify-between flex-wrap gap-3">
        <div class="flex-[6] flex flex-col bg-white shadow-lg rounded-lg p-3">
          <Basket :currentStep="currentStep"/>
        </div>
        <div class="flex-[4] gap-3 flex flex-col justify-between">
          <div class="flex-[9] bg-white shadow-lg rounded-lg p-3">
            <component :is="currentComponent" @next="nextStep" @showButtonCancelCart="toggleButtonModalCancelCart"/>
          </div>
          <div v-show="(globalButton.show ?? true) && showGlobalButton" class="flex-[1] bg-white shadow-lg rounded-lg">
            <Button @click="handleAction" :disabled="globalButton.disabled" :text="globalButton.text" :buttonClass="globalButton.bgColor +
              ' rounded-lg flex items-center gap-16 px-10 py-2 font-bold text-white text-2xl h-full w-full'"
                    :iconSide="globalButton.iconSide" :icon="globalButton.icon" :iconColor="globalButton.iconColor"/>
          </div>
        </div>
      </div>
    </div>
  </section>
  <TransitionRoot appear :show="modalAskHelp" as="template">
    <Dialog as="div" class="relative z-50" @close="modalAskHelp = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col justify-center items-center gap-5">
            <font-awesome-icon icon="warning" class="text-6xl text-red-500 cursor-pointer"/>
            <h2 class="text-gray-500 text-center">
              <span class="font-bold text-lg">Patientez...</span><br><br> <span class="text-md">Un de nos agents va arriver.</span>
            </h2>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot appear :show="modalCancelCart" as="template">
    <Dialog as="div" class="relative z-50" @close="modalCancelCart = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left shadow-xl transition-all">
          <div class="flex flex-col justify-center items-center gap-5">
            <font-awesome-icon icon="xmark" class="text-6xl text-red-500 cursor-pointer"/>
            <h2 class="text-gray-500 text-center">
              <span class="font-bold text-lg">Voulez-vous supprimer votre panier ?</span>
            </h2>
            <Loader v-if="loaderDeleteCart"/>
            <div class="flex gap-5" v-else>
              <Button @click="modalCancelCart = false" text="Annuler"/>
              <Button @click="cancelCart"
                      buttonClass="bg-red-500 shadow-md rounded-lg px-4 py-2 text-md font-bold text-white cursor-pointer"
                      text="Confirmer"/>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">

import {ref, computed, onMounted, watch} from "vue";
import {Dialog, DialogPanel, TransitionRoot} from "@headlessui/vue";

import Button from "@/tools/Button.vue";
import Bag from "@/components/StepSideCheckout/Bag.vue";
import Cart from "@/components/StepSideCheckout/Cart.vue";
import Loyalty from "@/components/StepSideCheckout/Loyalty.vue";
import PaymentMethod from "@/components/StepSideCheckout/PaymentMethod.vue";
import Ticket from "@/components/StepSideCheckout/Ticket.vue";
import Payment from "@/components/StepSideCheckout/Payment.vue";

import {ButtonConfig} from "@/interfaces";
import {BlazorBridge} from "@/plugins/blazorBridge";
import Loader from "@/tools/Loader.vue";
import {useRouter} from 'vue-router';
import Basket from "@/components/Basket.vue";
import {useBlazorStore} from "@/plugins/blazorEvent";

const router = useRouter();
const modalCancelCart = ref(false);
const modalAskHelp = ref(false);
const loaderDeleteCart = ref(false);
const showButtonModalCancelCart = ref(true);
const showGlobalButton = ref(false);
const store = useBlazorStore();

const steps = ['cart', 'bag', 'loyalty', 'paymentMethod', 'payment', 'ticket'] as const;
type Step = typeof steps[number];

const currentStep = ref<Step>('cart');
const stepComponentMap = {
  cart: Cart,
  bag: Bag,
  loyalty: Loyalty,
  paymentMethod: PaymentMethod,
  payment: Payment,
  ticket: Ticket,
};

const currentComponent = computed(() => stepComponentMap[currentStep.value]);

const nextStep = () => {
  const index = steps.indexOf(currentStep.value);
  if (index < steps.length - 1) currentStep.value = steps[index + 1];
}

const prevStep = () => {
  const index = steps.indexOf(currentStep.value);
  if (index > 0) currentStep.value = steps[index - 1];
}

const handleAction = () => {
  const action = buttonConfigMap[currentStep.value].action;

  switch (action) {
    case 'next':
      nextStep();
      break;
    case 'prev':
      prevStep();
      break;
    case 'custom':

      break;
  }
}

const toggleButtonModalCancelCart = (show: boolean) => {
  showButtonModalCancelCart.value = show
}

const globalButton = computed(() => buttonConfigMap[currentStep.value]);

const buttonConfigMap: Record<Step, ButtonConfig> = {
  cart: {
    text: 'Confirmer panier',
    icon: 'cart-shopping',
    bgColor: 'bg-green-500',
    iconColor: 'text-white',
    iconSide: 'left',
    action: 'next',
  },
  bag: {
    text: 'Retour',
    icon: 'arrow-left',
    bgColor: 'bg-red-500',
    iconColor: 'text-white',
    iconSide: 'left',
    action: 'prev',
  },
  loyalty: {
    text: 'Retour',
    icon: 'arrow-left',
    bgColor: 'bg-red-500',
    iconColor: 'text-white',
    iconSide: 'left',
    action: 'prev',
  },
  paymentMethod: {
    text: 'Retour',
    icon: 'arrow-left',
    bgColor: 'bg-red-500',
    iconColor: 'text-white',
    iconSide: 'left',
    action: 'prev',
  },
  payment: {
    text: 'Annuler la transaction',
    icon: 'arrow-left',
    bgColor: 'bg-red-500',
    iconColor: 'text-white',
    iconSide: 'left',
    action: 'prev',
    show: false,
  },
  ticket: {
    text: 'Terminer',
    icon: 'check',
    bgColor: 'bg-green-500',
    iconColor: 'text-white',
    iconSide: 'left',
    action: 'custom',
    show: false,
  },
}

const cancelCart = async () => {
  loaderDeleteCart.value = true;

  return BlazorBridge.call('CustomerOrder', 'CancelBasket').then((res) => {
    console.log(res)
    setTimeout(() => {
      modalCancelCart.value = false;
      router.push('/');
    }, 1000);
  }).catch((err) => {
    loaderDeleteCart.value = false;
  });
}

onMounted(() => {
  showGlobalButton.value = !(store.products === null || store.products.length === 0);
});

watch(() => store.products, (val) => {
  showGlobalButton.value = (val && val?.length > 0) ?? false;
})

</script>

<style></style>