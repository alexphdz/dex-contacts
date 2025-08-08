<template>
  <div
    v-if="visible"
    class="fixed top-4 right-4 z-50 max-w-sm rounded-lg shadow-lg p-4 flex items-start gap-3"
    :class="alertClasses"
  >
      <div class="flex-1 min-w-0">
        <h4 class="text-subtitle text-white">
          {{ title }}
        </h4>
        <p v-if="description" class="text-body text-white/90 mt-1">
          {{ description }}
        </p>
      </div>
      <button
        @click="close"
        class="flex-shrink-0 text-white hover:text-white text-lg"
      >
        ×
      </button>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

export interface SnackAlertProps {
  type: 'success' | 'error' | 'info'
  title: string
  description?: string
  duration?: number
}

const props = withDefaults(defineProps<SnackAlertProps>(), {
  duration: 4000
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)

const alertClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-success-500'
    case 'error':
      return 'bg-danger-500'
    case 'info':
      return 'bg-warning-500'
    default:
      return 'bg-secondary-500'
  }
})

const close = () => {
  visible.value = false
  emit('close')
}

onMounted(() => {
  visible.value = true
  
  if (props.duration > 0) {
    setTimeout(close, props.duration)
  }
})
</script>
