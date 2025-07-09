<template>
  <button
      :disabled="props.disabled"
      :class="[
      props.buttonClass || 'bg-white shadow-md rounded-lg px-4 py-2 text-lg font-bold text-gray-500 outline-0 inset-shadow-2xs',
      props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg transition-shadow'
    ]"
  >
    <span :class="getFlexClasses()">
      <font-awesome-icon
          v-if="props.icon && props.iconSide === 'top'"
          :icon="props.icon"
          :class="[props.iconColor, 'text-2xl']"
      />
      <span :class="getContentClasses()">
        <font-awesome-icon
            v-if="props.icon && props.iconSide === 'left'"
            :icon="props.icon"
            :class="[props.iconColor, 'text-2xl']"
        />

        <span v-if="props.text">{{ props.text }}</span>
        <font-awesome-icon
            v-if="props.icon && props.iconSide === 'right'"
            :icon="props.icon"
            :class="[props.iconColor, 'text-2xl']"
        />
      </span>
      <font-awesome-icon
          v-if="props.icon && props.iconSide === 'bottom'"
          :icon="props.icon"
          :class="[props.iconColor, 'text-2xl']"
      />
    </span>
  </button>
</template>

<script setup>
// Props
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  buttonClass: {
    type: String,
    default: ''
  },
  iconSide: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right', 'top', 'bottom'].includes(value)
  },
  icon: {
    type: [String, Array],
    default: null
  },
  iconColor: {
    type: String,
    default: 'text-current'
  },
  text: {
    type: String,
    default: ''
  }
})

// Computed classes pour le conteneur principal
const getFlexClasses = () => {
  const baseClasses = ['flex', 'items-center', 'justify-center']

  if (props.iconSide === 'top' || props.iconSide === 'bottom') {
    return [...baseClasses, 'flex-col', 'gap-2']
  }

  return [...baseClasses, 'gap-3']
}

// Computed classes pour le conteneur de contenu (left/right)
const getContentClasses = () => {
  if (props.iconSide === 'top' || props.iconSide === 'bottom') {
    return ['flex', 'items-center', 'justify-center']
  }

  return ['flex', 'items-center', 'gap-3']
}
</script>