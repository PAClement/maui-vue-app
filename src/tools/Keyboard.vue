<template>
  <div
      class="fixed bottom-0 left-0 w-full bg-white shadow-2xl p-4 flex justify-center gap-4 z-50 border-t border-gray-300"
  >
    <button
        class="bg-gray-200 text-2xl font-bold px-6 py-4 rounded hover:bg-gray-300 transition"
        @click="$emit('key-press', 'A')"
    >
      A
    </button>
    <button
        class="bg-gray-200 text-2xl font-bold px-6 py-4 rounded hover:bg-gray-300 transition"
        @click="$emit('key-press', 'B')"
    >
      B
    </button>
  </div>
</template>

<script setup lang="ts">
// Le composant émet un événement "key-press" avec la valeur de la touche cliquée
</script>
