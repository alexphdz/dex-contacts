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

interface SecondaryButtonProps {
  text: string
  disabled?: boolean
  variant?: 'default' | 'danger'
  fullWidth?: boolean
  size?: 's' | 'm'
}

const props = withDefaults(defineProps<SecondaryButtonProps>(), {
  disabled: false,
  variant: 'default',
  fullWidth: false,
  size: 'm'
})

const emit = defineEmits<{
  click: []
}>()

const buttonClasses = computed(() => [
  'btn-secondary',
  `btn-${props.size}`,
  `btn-secondary--${props.variant}`,
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
.btn-secondary {
  border-radius: 8px;
  font-family: 'Urbanist', 'Inter', sans-serif;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-secondary--default {
  background-color: transparent;
  color: var(--color-cta-primary);
  border: 2px solid var(--color-cta-primary);
}

.btn-secondary--default:hover:not(:disabled) {
  background-color: var(--color-cta-primary);
  color: white !important;
  border-color: var(--color-cta-primary);
}

.btn-secondary--danger {
  background-color: var(--color-error);
  color: white;
  border: none;
}

.btn-secondary--danger:hover:not(:disabled) {
  background-color: rgba(239, 68, 68, 0.5);
  color: white !important;
}

.btn-secondary:focus {
  outline: none;
  box-shadow: none;
}

.btn-secondary--default:focus {
  color: var(--color-cta-primary) !important;
}

.btn-secondary--danger:focus {
  color: white !important;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary--default:disabled {
  color: var(--color-cta-primary) !important;
  border-color: var(--color-cta-primary);
}

.btn-secondary--danger:disabled {
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
