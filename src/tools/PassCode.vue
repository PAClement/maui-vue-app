<template>
  <div class="grid grid-cols-3 gap-4 mt-4">
    <button
        v-for="n in 9"
        :key="n"
        @click="addDigit(n)"
        class="bg-primary-500 text-white text-xl font-bold py-3 rounded-lg shadow-md cursor-pointer  transition-all duration-150 ease-in-out active:shadow-sm active:translate-y-0 active:scale-95"
    >
      {{ n }}
    </button>
    <button @click="clearCode"
            class="bg-red-500 text-white text-xl font-bold py-3 rounded-lg shadow-md cursor-pointer  transition-all duration-150 ease-in-out active:shadow-sm active:translate-y-0 active:scale-95">
      C
    </button>
    <button @click="addDigit(0)"
            class="bg-primary-500 text-white text-xl font-bold py-3 rounded-lg shadow-md  transition-all duration-150 ease-in-out cursor-pointer active:shadow-sm active:translate-y-0 active:scale-95">
      0
    </button>
    <button @click="removeLast"
            class="bg-red-500 text-white text-xl font-bold py-3 rounded-lg shadow-md  transition-all duration-150 ease-in-out cursor-pointer active:shadow-sm active:translate-y-0 active:scale-95">
      <font-awesome-icon icon="arrow-left" size="lg"/>
    </button>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const emit = defineEmits({
  'code-update': (code: string) => true
})

const code = ref('');

const addDigit = (digit: number) => {
  code.value += digit.toString();
  emit('code-update', code.value);
};

const clearCode = () => {
  code.value = '';
  emit('code-update', code.value);
};

const removeLast = () => {
  code.value = code.value.slice(0, -1);
  emit('code-update', code.value);
};
</script>
