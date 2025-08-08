<template>
  <div class="bg-white p-4 sm:p-6 shadow-lg hover:shadow-xl w-full max-w-4xl mx-auto rounded-2xl">
    <div class="flex items-center justify-between flex-col sm:flex-row gap-4 sm:gap-0">
      <div class="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-secondary-100 flex-shrink-0">
          <img 
            v-if="contact.image" 
            :src="contact.image" 
            :alt="contact.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <span class="material-symbols-outlined icon-lg text-primary">
              person
            </span>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="text-h2 mb-1">{{ contact.name }}</h3>
          <div class="flex items-center space-x-2 mb-1">
            <a 
              :href="`mailto:${contact.email}`"
              class="text-secondary-600 underline hover:text-primary-600 transition-colors duration-200 cursor-pointer text-small"
            >
              {{ contact.email }}
            </a>
            <div class="relative">
              <button 
                @click="copyToClipboard(contact.email)"
                class="text-secondary-600 hover:text-primary-600 transition-colors duration-200 p-1"
                title="Copy email to clipboard"
              >
                <span class="material-symbols-outlined icon-xs">content_copy</span>
              </button>
              <div 
                v-if="showCopiedTooltip"
                class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded shadow-lg z-10 text-small px-2 py-1"
              >
                Copied!
              </div>
            </div>
          </div>
          <p class="text-secondary-500 text-small">
            Last contact date: {{ formatDate(contact.lastContactDate) }}
          </p>
        </div>
      </div>
      <div class="flex space-x-2 flex-shrink-0 w-full sm:w-auto justify-end items-center">
        <primary-button 
          text="Edit"
          size="s"
          @click="handleEdit"
        />
        <button
          @click="handleDelete"
          class="delete-btn"
          title="Delete contact"
        >
          <span class="material-symbols-outlined icon-sm">delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Contact } from '../models/contact'
import PrimaryButton from '@/components/PrimaryButton.vue'

interface ContactCardProps {
  contact: Contact
}

const props = defineProps<ContactCardProps>()

const emit = defineEmits<{
  edit: [contact: Contact]
  delete: [contactId: string]
}>()

const showCopiedTooltip = ref(false)

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleEdit = () => {
  emit('edit', props.contact)
}

const handleDelete = () => {
  emit('delete', props.contact.id)
}

const copyToClipboard = async (email: string) => {
  try {
    await navigator.clipboard.writeText(email)
    showCopiedTooltip.value = true
    setTimeout(() => {
      showCopiedTooltip.value = false
    }, 1500)
  } catch (err) {
    console.error('Failed to copy email:', err)
  }
}
</script>
<style scoped>
.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background-color: var(--color-error);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Urbanist', 'Inter', sans-serif;
}

.delete-btn:hover {
  background-color: rgba(239, 68, 68, 0.5);
  transform: scale(1.05);
}

.delete-btn:hover .material-symbols-outlined {
  color: white !important;
}

.delete-btn:active {
  transform: scale(0.95);
}

.delete-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

/* Desktop size */
@media (min-width: 640px) {
  .delete-btn {
    width: 40px;
    height: 40px;
  }
}

a:hover,
button:hover {
  color: var(--color-cta-primary) !important;
}
</style>
