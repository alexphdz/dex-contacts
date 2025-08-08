<template>
  <div class="relative mb-6">
    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <svg class="h-5 w-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      v-model="searchQuery"
      @input="handleSearch"
      type="text"
      :placeholder="placeholder"
      class="w-full pl-12 pr-4 py-3 border-0 rounded-2xl shadow-sm focus:outline-none focus:ring-0 focus:shadow-md bg-white text-secondary-900 placeholder-secondary-500 transition-shadow duration-200"
    />
    <button
      v-if="searchQuery"
      @click="clearSearch"
      class="absolute inset-y-0 right-0 pr-4 flex items-center text-secondary-400 hover:text-secondary-600"
    >
      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface SearchBarProps {
  placeholder?: string
  modelValue?: string
}

const props = withDefaults(defineProps<SearchBarProps>(), {
  placeholder: 'Search by name or lastname',
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [query: string]
}>()

const searchQuery = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  searchQuery.value = newValue
})

const handleSearch = () => {
  emit('update:modelValue', searchQuery.value)
  emit('search', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('update:modelValue', '')
  emit('search', '')
}
</script>
