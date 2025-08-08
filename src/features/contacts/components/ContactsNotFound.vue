<template>
  <div class="text-center py-16">
    <div class="bg-white rounded-xl p-8 shadow-sm border border-secondary-200 max-w-md mx-auto">
      <div class="flex justify-center mb-4">
        <span class="material-symbols-outlined icon-2xl text-primary">
          search
        </span>
      </div>
      <h3 class="text-h3 text-secondary-800 mb-2">No contacts found</h3>
      <p class="text-secondary-600 mb-4 text-body">No contacts match your search for "{{ searchQuery }}"</p>
      <div class="flex justify-center">
        <primary-button 
          text="Clear Search"
          size="s"
          @click="$emit('clear-search')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from '@/components/PrimaryButton.vue'

interface ContactsNotFoundProps {
  searchQuery: string
}

defineProps<ContactsNotFoundProps>()

defineEmits<{
  'clear-search': []
}>()
</script>
