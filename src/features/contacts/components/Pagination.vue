<template>
  <div v-if="totalPages > 1" class="flex justify-between items-center mt-8 px-4">
    <!-- Botón Previous -->
    <button 
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="pagination-button"
      :class="{ 'pagination-button--disabled': currentPage === 1 }"
    >
      <span class="material-symbols-outlined icon-xs mr-1">chevron_left</span>
      Previous
    </button>
    <div class="flex items-center space-x-4">
      <span class="text-subtitle text-black">
        {{ Math.min((currentPage - 1) * itemsPerPage + 1, totalContacts) }}-{{ Math.min(currentPage * itemsPerPage, totalContacts) }} of {{ totalContacts }} contacts
      </span>
    </div>
    <button 
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="pagination-button"
      :class="{ 'pagination-button--disabled': currentPage === totalPages }"
    >
      Next
      <span class="material-symbols-outlined icon-xs ml-1">chevron_right</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface PaginationProps {
  currentPage: number
  totalPages: number
  totalContacts: number
  itemsPerPage: number
}

const props = defineProps<PaginationProps>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page)
  }
}
</script>

<style scoped>
.pagination-button {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  color: #000000;
  font-family: 'Urbanist', 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-button:hover:not(.pagination-button--disabled) {
  border-color: var(--color-cta-primary);
  color: var(--color-cta-primary);
}

.pagination-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #9ca3af;
}
</style>
