<template>
  <div 
    v-if="show" 
    class="fixed inset-0 z-50 overflow-y-auto"
  >
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="$emit('cancel')"
    ></div>
    <div class="flex min-h-full items-center justify-center p-4">
      <div 
        class="relative bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto p-6"
      >
        <div class="text-center">
          <h2 class="text-h3 text-secondary-800 mb-4 font-bold">
            {{ title }}
          </h2>
          <p class="text-black mb-6 text-body">
            {{ message }}
          </p>
          <div class="flex space-x-3 justify-center">
            <secondary-button 
              text="Keep contact"
              size="s"
              @click="$emit('cancel')"
            />
            <secondary-button 
              text="Remove"
              variant="danger"
              size="s"
              @click="$emit('confirm')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SecondaryButton from '@/components/SecondaryButton.vue'

interface ConfirmationModalProps {
  show: boolean
  title: string
  message: string
}

defineProps<ConfirmationModalProps>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
