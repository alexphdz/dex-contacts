<template>
  <button 
    @click="handleClick"
    class="floating-btn"
    :class="{ 'floating-btn--with-label': label }"
  >
    <span class="material-symbols-outlined text-2xl">{{ icon }}</span>
    <span v-if="label" class="ml-2 text-sm font-medium">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
interface FloatingButtonProps {
  icon: string
  label?: string
}

defineProps<FloatingButtonProps>()

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.floating-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  background-color: var(--color-cta-primary);
  color: white;
  border: none;
  border-radius: 9999px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
}

.floating-btn:hover {
  background-color: var(--color-cta-primary-hover);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  transform: scale(1.05);
}

.floating-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 65, 178, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.floating-btn:active {
  transform: scale(0.95);
}

.floating-btn--with-label {
  width: auto;
  padding: 0.75rem 1.25rem;
  border-radius: 9999px;
}
</style>
