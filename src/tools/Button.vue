<template>
  <button
      :disabled="props.disabled"
      :class="[
      'shadow-md rounded-lg px-12 py-4 text-lg font-bold outline-0 inset-shadow-2xs transition-all duration-150 ease-in-out',
      props.backgroundColor,
      props.textColor,
      props.customClass,
      props.disabled ? 'opacity-50 cursor-not-allowed' : [
        'cursor-pointer hover:shadow-lg',
        'active:shadow-sm active:translate-y-0 active:scale-95'
      ]
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

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: String,
    default: ''
  },
  backgroundColor: {
    type: String,
    default: 'bg-white'
  },
  textColor: {
    type: String,
    default: 'text-gray-500'
  },
  iconSide: {
    type: String,
    default: 'left',
    validator: (value: string) => ['left', 'right', 'top', 'bottom'].includes(value)
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

const getFlexClasses = () => {
  const base = ['flex', 'items-center', 'justify-center']
  return props.iconSide === 'top' || props.iconSide === 'bottom'
      ? [...base, 'flex-col', 'gap-2']
      : [...base, 'gap-3']
}

const getContentClasses = () => {
  return props.iconSide === 'top' || props.iconSide === 'bottom'
      ? ['flex', 'items-center', 'justify-center']
      : ['flex', 'items-center', 'gap-3']
}
</script>