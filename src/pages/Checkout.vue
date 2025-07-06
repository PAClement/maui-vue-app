<template>
  <section class="h-screen bg-white flex flex-col p-3">
    <div class="flex-1 flex flex-col gap-3">
      <div class="flex-[1]">
        <div class="flex items-center justify-between mb-3 h-full w-full ">
          <div class="flex-[3]">
            <button class="bg-white shadow-md rounded-lg px-4 py-2 text-lg font-bold text-gray-500 cursor-pointer">
              <RouterLink to="/">
                <span class="flex items-center gap-8">
                  <font-awesome-icon icon="xmark" class="text-red-400 text-2xl"/>
                  Annuler le panier
                </span>
              </RouterLink>
            </button>
          </div>
          <div class="flex-[3] flex justify-center">
            <img src="../../assets/img/logo.png" alt="logo">
          </div>
          <div class="flex-[3]  flex justify-end">
            <button @click="modalAskHelp = true"
                    class="bg-white shadow-md rounded-lg px-4 py-2 text-lg font-bold text-gray-500 cursor-pointer">
              <span class="flex items-center gap-8">
                <font-awesome-icon icon="warning" class="text-red-400 text-2xl"/>
                Demander de l'aide
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex-[9] flex justify-between flex-wrap gap-3">
        <div class="flex-[7] flex flex-col bg-white shadow-lg rounded-lg p-3">
          <div class="flex-[9]">
            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-gray-500">Panier</span>
              <span class="text-lg font-bold text-gray-500">3 ARTICLES</span>
            </div>
            <hr class="h-0.5 mt-3 mb-5 bg-gray-400 border-0 rounded">
            <div class="flex flex-col gap-3">
              <Article product="A" refProduct="d4q5q1d5q4d" price="10.30"/>
              <Article product="B" refProduct="78854844d1d1d1d" price="9.00"/>
              <Article product="C" refProduct="mplfibsndjduz4425" price="25.75"/>
            </div>
          </div>
          <div class="flex-[1]">
            <hr class="h-0.5 mt-3 mb-5 bg-gray-400 border-0 rounded">
            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-gray-500">Total</span>
              <span class="text-lg font-bold text-gray-500">13.99 €</span>
            </div>
          </div>
        </div>
        <div class="flex-[3] gap-3 flex flex-col justify-between">
          <div class="flex-[9] bg-white shadow-lg rounded-lg"></div>
          <div class="flex-[1] bg-white shadow-lg rounded-lg">
            <button @click="modalConfirmCart = true"
                class="bg-green-500 rounded-lg flex items-center gap-16 px-10 py-2 font-bold text-white text-3xl cursor-pointer h-full w-full">
              <font-awesome-icon icon="cart-shopping"/>
              Confirmer panier
            </button>
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
            <font-awesome-icon icon="warning" class="text-6xl text-red-400 cursor-pointer"/>
            <h2 class="text-gray-500 text-center">
              <span class="font-bold text-lg">Patientez...</span><br><br> <span class="text-md">Un de nos agents va arriver.</span>
            </h2>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
  <TransitionRoot appear :show="modalConfirmCart" as="template">
    <Dialog as="div" class="relative z-50" @close="modalConfirmCart = false">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm"/>
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 px-5 text-left shadow-xl transition-all">
          <div class="flex flex-col items-center justify-center gap-5">
            <img src="../../assets/img/tpe.png" alt="logo" class="w-40 h-40">
            <h2 class="text-center text-lg text-gray-500">Veuillez suivre les informations sur le terminal de paiement</h2>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>


<script setup>

import Article from "../components/Article.vue";
import {ref} from "vue";
import {Dialog, DialogPanel, TransitionRoot} from "@headlessui/vue";

const modalAskHelp = ref(false);
const modalConfirmCart = ref(false);

</script>

<style></style>