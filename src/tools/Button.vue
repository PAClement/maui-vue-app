<template>
  <button
      :disabled="props.disabled"
      :class="[ props.buttonClass ? props.buttonClass : 'bg-white shadow-md rounded-lg px-4 py-2 text-lg font-bold text-gray-500' ,props.disabled ? '': 'cursor-pointer']">
    <span :class="['flex items-center gap-8', props.iconSide === 'right' ? 'flex-row-reverse' : '']">
      <font-awesome-icon :icon="props.icon" :class="[props.iconColor, 'text-2xl']" v-if="props.icon"/>
      {{ props.text }}
    </span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  text: String,
  buttonClass: String,
  iconSide: String,
  icon: String,
  iconColor: String,
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>