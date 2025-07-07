<template>
  <div class="grid grid-cols-3 gap-4 mt-4">
    <button
        v-for="n in 9"
        :key="n"
        @click="addDigit(n)"
        class="bg-primary-500 text-white text-xl font-bold py-3 rounded-lg shadow"
    >
      {{ n }}
    </button>
    <button @click="clearCode" class="bg-red-500 text-white text-xl font-bold py-3 rounded-lg shadow">
      ✕
    </button>
    <button @click="addDigit(0)" class="bg-primary-500 text-white text-xl font-bold py-3 rounded-lg shadow">
      0
    </button>
    <button @click="removeLast" class="bg-red-500 text-white text-xl font-bold py-3 rounded-lg shadow">
      ←
    </button>
  </div>
</template>

<script setup lang="ts">

const addDigit = (digit: number) => {
};

const clearCode = () => {
};

const removeLast = () => {
};
</script>
