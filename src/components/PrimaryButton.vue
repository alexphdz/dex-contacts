<template>
  <button 
    :disabled="disabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PrimaryButtonProps {
  text: string
  disabled?: boolean
  fullWidth?: boolean
  size?: 's' | 'm'
}

const props = withDefaults(defineProps<PrimaryButtonProps>(), {
  disabled: false,
  fullWidth: false,
  size: 'm'
})

const emit = defineEmits<{
  click: []
}>()

const buttonClasses = computed(() => [
  'btn-primary',
  `btn-${props.size}`,
  {
    'w-full': props.fullWidth,
    'opacity-50 cursor-not-allowed': props.disabled
  }
])

const handleClick = () => {
  if (!props.disabled) {
    emit('click')
  }
}
</script>

<style scoped>
/* Base button styles */
.btn-primary {
  background-color: var(--color-cta-primary);
  color: white;
  border-radius: 8px;
  border: none;
  font-family: 'Urbanist', 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--color-cta-primary-hover);
  color: white !important;
}

.btn-primary:focus {
  outline: none;
  box-shadow: none;
  color: white !important;
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: white !important;
}

/* Size S - Mobile first */
.btn-s {
  font-size: 0.875rem; /* 14px */
  padding: 6px 12px;
  height: 32px;
}

/* Size M - Mobile first */
.btn-m {
  font-size: 1rem; /* 16px */
  padding: 8px 16px;
  height: 40px;
}

/* Desktop sizes */
@media (min-width: 640px) {
  .btn-s {
    font-size: 1rem; /* 16px */
    padding: 8px 16px;
    height: 40px;
  }
  
  .btn-m {
    font-size: 1.125rem; /* 18px */
    padding: 10px 20px;
    height: 48px;
  }
}
</style>
