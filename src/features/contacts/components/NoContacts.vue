<template>
  <div class="text-center py-16">
    <div class="bg-white rounded-xl p-8 shadow-sm border border-secondary-200 max-w-md mx-auto">
      <div class="flex justify-center mb-4">
        <span class="material-symbols-outlined icon-2xl text-primary">
          contacts
        </span>
      </div>
      <h3 class="text-h3 text-secondary-800 mb-2">No contacts yet</h3>
      <p class="text-secondary-600 mb-6 text-body">Get started by adding your first contact</p>
      <div class="flex justify-center">
        <primary-button 
          text="Add Your First Contact"
          size="m"
          @click="$emit('add-contact')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'

defineEmits<{
  'add-contact': []
}>()
</script>
