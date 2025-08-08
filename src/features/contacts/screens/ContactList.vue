<template>
  <div class="bg-secondary-50 min-h-screen transition-all duration-300">
    <div class="sticky top-0 z-40 bg-gradient-to-b from-secondary-50 to-secondary-50/95 backdrop-blur-sm border-b border-secondary-200/80 sm:border-b-0 sm:static transition-all duration-500">
      <div class="flex justify-center items-center p-4 sm:p-6 sm:pb-0 sm:mb-8">
        <h1 class="text-h1 text-secondary-800 animate-fade-in-up">DEX - Contact List</h1>
      </div>
    </div>

    <div class="px-4 pb-6 sm:px-6 sm:pb-6">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center px-6 py-3 text-secondary-600 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
          <div class="w-3 h-3 bg-primary-500 rounded-full mr-3 animate-pulse"></div>
          <span class="text-body font-medium">Loading contacts...</span>
        </div>
      </div>
    
      <no-contacts 
        v-else-if="contacts.length === 0" 
        @add-contact="openCreateModal"
      />
      <div v-if="contacts.length > 0" class="max-w-2xl mx-auto mb-8 mt-6 sm:mt-0 animate-fade-in-up animation-delay-1">
        <search-bar
          v-model="searchQuery"
          placeholder="Search by name or lastname"
          @search="handleSearch"
          class="transform hover:scale-[1.01] transition-all duration-200"
        />
        
        <!-- Sort Control -->
        <div class="flex justify-end mt-4">
          <button
            @click="toggleSort"
            class="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200"
          >
            <span class="underline">
              {{ sortAscending ? 'Oldest First' : 'Most Recent First' }}
            </span>
            <span class="material-symbols-outlined text-lg">
              swap_vert
            </span>
          </button>
        </div>
      </div>
      <div v-if="contacts.length > 0" class="space-y-4 max-w-2xl mx-auto">
        <contacts-not-found 
          v-if="filteredContacts.length === 0 && searchQuery"
          :search-query="searchQuery"
          @clear-search="clearSearch"
          class="animate-fade-in"
        />
        <template v-else>
          <contact-card
            v-for="(contact, index) in paginatedContacts"
            :key="contact.id"
            :contact="contact"
            @edit="openEditModal"
            @delete="deleteContactHandler"
            class="transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 animate-fade-in-up contact-card-stagger"
            :data-index="index"
          />
          <pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            :total-contacts="filteredContacts.length"
            :items-per-page="itemsPerPage"
            @page-change="handlePageChange"
            class="animate-fade-in-up animation-delay-3"
          />
        </template>
      </div>
      <contact-modal
        :show="showModal"
        :mode="modalMode"
        :contact="currentContact"
        :loading="uploading"
        @close="closeModal"
        @submit="saveContact"
        class="transition-all duration-300"
      />
      <confirmation-modal
        :show="showConfirmationModal"
        :title="`Remove ${contactToDelete?.name || 'contact'}?`"
        :message="`${contactToDelete?.name || 'This contact'} will be permanently removed from your contacts. You can't undo this action.`"
        @confirm="confirmDelete"
        @cancel="cancelDelete"
        class="transition-all duration-300"
      />
    </div>
    <floating-button 
      icon="person_add"
      @click="openCreateModal"
      class="animate-float-subtle hover:animate-bounce-subtle transition-all duration-300"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { ContactService, StorageService } from '../service'
import { useSnackAlert } from '@/composables/useSnackAlert'
import ContactModal from '../components/ContactModal.vue'
import ContactCard from '../components/ContactCard.vue'
import SearchBar from '../components/SearchBar.vue'
import Pagination from '../components/Pagination.vue'
import ContactsNotFound from '../components/ContactsNotFound.vue'
import NoContacts from '../components/NoContacts.vue'
import ConfirmationModal from '@/components/ConfirmationModal.vue'
import FloatingButton from '@/components/FloatingButton.vue'
import type { Contact } from '../models/contact'
import type { ContactFormData } from '../components/ContactModal.vue'

const { success, error } = useSnackAlert()

const showModal = ref(false)
const modalMode = ref<'create' | 'edit'>('create')
const currentContact = ref<Contact | null>(null)
const contacts = ref<Contact[]>([])
const uploading = ref(false)
const loading = ref(false)
const showConfirmationModal = ref(false)
const contactToDelete = ref<Contact | null>(null)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(5)
const sortAscending = ref(true)

const filteredContacts = computed(() => {
  let result = contacts.value
  
  // Filter by search query if exists
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(contact => 
      contact.name.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    )
  }
  
  // Sort by lastContactDate (ascending or descending based on sortAscending)
  return result.sort((a, b) => {
    const dateA = new Date(a.lastContactDate).getTime()
    const dateB = new Date(b.lastContactDate).getTime()
    return sortAscending.value ? dateA - dateB : dateB - dateA
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredContacts.value.length / itemsPerPage.value)
})

const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredContacts.value.slice(start, end)
})

const handleSearch = (query: string) => {
  searchQuery.value = query
  currentPage.value = 1
}

const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const toggleSort = () => {
  sortAscending.value = !sortAscending.value
  currentPage.value = 1
}

const loadContacts = async () => {
  try {
    loading.value = true
    const result = await ContactService.getAll()
    if (result.success) {
      contacts.value = result.data.contacts
    } else {
      error('Unable to load contacts', result.message)
    }
  } catch (err) {
    error('Unable to load contacts', 'Please refresh and try again')
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  modalMode.value = 'create'
  currentContact.value = null
  showModal.value = true
}

const openEditModal = (contact: Contact) => {
  modalMode.value = 'edit'
  currentContact.value = contact
  showModal.value = true
}

const saveContact = async (formData: ContactFormData, selectedFile: File | null) => {
  try {
    uploading.value = true
    
    if (modalMode.value === 'create') {
      const contactData = {
        name: formData.name,
        email: formData.email,
        image: '',
        lastContactDate: formData.lastContactDate
      }
      
      const createResult = await ContactService.create(contactData)
      if (!createResult.success) {
        error('Unable to create contact', createResult.message)
        uploading.value = false
        return
      }
      
      const newContact = createResult.data.contact
      
      if (selectedFile) {
        const uploadResult = await StorageService.uploadImage(selectedFile, newContact.id)
        if (uploadResult.success) {
          const imageUrl = uploadResult.data.url
          const updateResult = await ContactService.update({
            id: newContact.id,
            image: imageUrl,
            originalContact: {
              name: newContact.name,
              email: newContact.email,
              image: newContact.image,
              lastContactDate: newContact.lastContactDate,
              createdAt: newContact.createdAt,
              updatedAt: newContact.updatedAt
            }
          })
          if (updateResult.success) {
            newContact.image = imageUrl
          }
        }
      }
      
      contacts.value.push(newContact)
      success('Contact added!', `${newContact.name} was added to your contacts`)
      searchQuery.value = ''
      const newTotalPages = Math.ceil(contacts.value.length / itemsPerPage.value)
      currentPage.value = newTotalPages
      
    } else if (modalMode.value === 'edit' && currentContact.value) {
      let imageUrl = currentContact.value.image
      
      if (selectedFile) {
        const uploadResult = await StorageService.uploadImage(selectedFile, currentContact.value.id)
        if (uploadResult.success) {
          imageUrl = uploadResult.data.url
        }
      }
      
      const updateResult = await ContactService.update({
        id: currentContact.value.id,
        name: formData.name,
        email: formData.email,
        image: imageUrl,
        lastContactDate: formData.lastContactDate,
        originalContact: {
          name: currentContact.value.name,
          email: currentContact.value.email,
          image: currentContact.value.image,
          lastContactDate: currentContact.value.lastContactDate,
          createdAt: currentContact.value.createdAt,
          updatedAt: currentContact.value.updatedAt
        }
      })
      
      if (updateResult.success) {
        const index = contacts.value.findIndex(c => c.id === currentContact.value!.id)
        if (index !== -1) {
          contacts.value[index] = {
            ...updateResult.data.contact,
            image: imageUrl
          }
        }
        success('Contact updated', `${formData.name} has been updated successfully`)
      } else {
        error('Failed to update contact', updateResult.message)
        uploading.value = false
        return
      }
    }
    
    closeModal()
  } catch (err) {
    error('Unexpected error', 'Failed to save contact')
  } finally {
    uploading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  currentContact.value = null
}

const deleteContactHandler = async (contactId: string) => {
  const contact = contacts.value.find(c => c.id === contactId)
  if (!contact) return
  contactToDelete.value = contact
  showConfirmationModal.value = true
}

const confirmDelete = async () => {
  if (!contactToDelete.value) return
  
  const contact = contactToDelete.value
  const hasImage = !!(contact.image && contact.image.trim())
  const result = await ContactService.delete(contact.id, hasImage, contact.image)
  
  if (result.success) {
    contacts.value = contacts.value.filter(c => c.id !== contact.id)
    success('Contact deleted', `${contact.name} has been removed`)
    
    const newTotalPages = Math.ceil(filteredContacts.value.length / itemsPerPage.value)
    if (currentPage.value > newTotalPages && newTotalPages > 0) {
      currentPage.value = newTotalPages
    }
  } else {
    error('Failed to delete contact', result.message)
  }
  
  cancelDelete()
}

const cancelDelete = () => {
  showConfirmationModal.value = false
  contactToDelete.value = null
}

onMounted(() => {
  loadContacts()
})
</script>
