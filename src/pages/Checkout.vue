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
                  Cancel the payment
                </span>
              </RouterLink>
            </button>
          </div>
          <div class="flex-[3] flex justify-center">
            <img src="../../assets/img/logo.png" alt="logo">
          </div>
          <div class="flex-[3]  flex justify-end">
            <button class="bg-white shadow-md rounded-lg px-4 py-2 text-lg font-bold text-gray-500 cursor-pointer">
              <span class="flex items-center gap-8">
                <font-awesome-icon icon="warning" class="text-red-400 text-2xl"/>
                Ask for Help
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="flex-[9] flex justify-between flex-wrap gap-3">
        <div class="flex-[7] flex flex-col bg-white shadow-lg rounded-lg p-3">
          <div class="flex-[9]">
            <div class="flex items-center justify-between">
              <span class="text-3xl font-bold text-gray-500">Cart</span>
              <span class="text-lg font-bold text-gray-500">3 ITEM(S)</span>
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
            <button
                class="bg-green-500 rounded-lg flex items-center gap-16 px-10 py-2 font-bold text-white text-3xl cursor-pointer h-full w-full">
              <font-awesome-icon icon="cart-shopping"/>
              Confirm my cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>

import Article from "../components/Article.vue";
import {ref} from "vue";

const modalAskHelp = ref(false);
const modalConfirmCart = ref(false);

</script>

<style></style>