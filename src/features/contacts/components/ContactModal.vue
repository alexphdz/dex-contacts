<template>
  <div v-if="show" class="fixed inset-0 bg-secondary-900 bg-opacity-60 flex items-center justify-center p-4 z-50">
    <div class="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-secondary-200 max-h-[90vh] overflow-y-auto p-4 sm:p-8">
      <h2 class="text-h3 mb-6 sm:mb-12 text-center text-black">
        {{ mode === 'create' ? 'Add New Contact' : 'Edit Contact' }}
      </h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
        <div class="flex justify-center mb-4 sm:mb-6">
          <div class="text-center">
            <label class="block text-label mb-3 text-black">
              Profile photo <span class="text-error">*</span>
            </label>
            <div 
              @click="handlePhotoClick"
              class="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 flex items-center justify-center cursor-pointer overflow-hidden photo-upload-circle group"
              :class="previewUrl ? 'photo-with-image' : 'photo-empty'"
            >
              <img 
                v-if="previewUrl" 
                :src="previewUrl" 
                alt="Preview" 
                class="w-full h-full object-cover rounded-full"
              />
              <div v-else class="flex items-center justify-center">
                <span class="material-symbols-outlined photo-camera-icon transition-colors duration-300">
                  photo_camera
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label class="block text-label mb-2 text-black">
            Full Name <span class="text-error">*</span>
          </label>
          <input 
            v-model="formData.name" 
            type="text" 
            required
            class="input-field"
            placeholder="Enter their full name"
          />
        </div>

        <div>
          <label class="block text-label mb-2 text-black">
            Email Address <span class="text-error">*</span>
          </label>
          <input 
            v-model="formData.email" 
            type="email" 
            required
            class="input-field"
            :class="{ 'input-error': emailError }"
            placeholder="their@email.com"
          />
          <div v-if="emailError" class="mt-1 text-error text-small font-medium">
            {{ emailError }}
          </div>
        </div>

        <div>
          <label class="block text-label mb-2 text-black">
            Last Contact Date <span class="text-error">*</span>
          </label>
          <input 
            v-model="formData.lastContactDate" 
            type="date" 
            required
            class="input-field"
          />
        </div>
        <div class="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8">
          <primary-button 
            :text="loading ? 'Saving...' : (mode === 'create' ? 'Add Contact' : 'Save Changes')"
            :disabled="loading || !isFormValid"
            full-width
            size="m"
            @click="handleSubmit"
          />
          <secondary-button 
            text="Cancel"
            :disabled="loading"
            full-width
            size="m"
            @click="handleCancel"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Contact } from '../models/contact'
import PrimaryButton from '@/components/PrimaryButton.vue'
import SecondaryButton from '@/components/SecondaryButton.vue'

export interface ContactModalProps {
  show: boolean
  mode: 'create' | 'edit'
  contact?: Contact | null
  loading?: boolean
}

export interface ContactFormData {
  name: string
  email: string
  lastContactDate: string
}

const props = withDefaults(defineProps<ContactModalProps>(), {
  contact: null,
  loading: false
})

const emit = defineEmits<{
  close: []
  submit: [data: ContactFormData, selectedFile: File | null]
}>()

const selectedFile = ref<File | null>(null)
const previewUrl = ref('')

const formData = ref<ContactFormData>({
  name: '',
  email: '',
  lastContactDate: new Date().toISOString().split('T')[0]
})

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emailError = computed(() => {
  if (!formData.value.email.trim()) {
    return ''
  }
  
  if (!emailRegex.test(formData.value.email)) {
    return 'Please enter a valid email address'
  }
  
  return ''
})

const isFormValid = computed(() => {
  const hasName = formData.value.name.trim() !== ''
  const hasEmail = formData.value.email.trim() !== ''
  const hasValidEmail = !emailError.value && hasEmail
  const hasDate = formData.value.lastContactDate !== ''
  const hasPhoto = previewUrl.value !== '' || selectedFile.value !== null
  
  return hasName && hasValidEmail && hasDate && hasPhoto
})

watch(() => props.contact, (newContact) => {
  if (newContact && props.mode === 'edit') {
    formData.value = {
      name: newContact.name,
      email: newContact.email,
      lastContactDate: newContact.lastContactDate.toISOString().split('T')[0]
    }
    
    if (newContact.image) {
      previewUrl.value = newContact.image
    }
  }
}, { immediate: true })

watch(() => props.show, (isShowing) => {
  if (isShowing && props.mode === 'create') {
    resetForm()
  }
})

const handlePhotoClick = () => {
  const fileInput = document.createElement('input')
  fileInput.type = 'file'
  fileInput.accept = 'image/*'
  fileInput.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      selectedFile.value = file
      const reader = new FileReader()
      reader.onload = (e) => {
        previewUrl.value = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }
  fileInput.click()
}

const handleSubmit = () => {
  emit('submit', formData.value, selectedFile.value)
}

const handleCancel = () => {
  emit('close')
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    lastContactDate: new Date().toISOString().split('T')[0]
  }
  selectedFile.value = null
  previewUrl.value = ''
}

defineExpose({
  resetForm
})
</script>

<style scoped>
.photo-upload-circle {
  border-color: var(--color-cta-primary);
  border-style: solid;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  background: transparent;
}

.photo-empty {
  border-width: 2px;
}

.photo-empty:hover {
  background-color: rgba(37, 65, 178, 0.08);
  border-color: var(--color-cta-primary);
  transform: scale(1.02);
}

.photo-empty:active {
  transform: scale(0.98);
  transition-duration: 0.1s;
}

.photo-camera-icon {
  font-size: 2.5rem; /* 40px */
  color: var(--color-cta-primary);
  transition: all 0.3s ease;
}

.photo-empty:hover .photo-camera-icon {
  transform: scale(1.1);
}

.photo-with-image {
  border-style: solid;
  border-width: 3px;
  box-shadow: 0 4px 20px rgba(37, 65, 178, 0.2);
}

.photo-with-image:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 30px rgba(37, 65, 178, 0.25);
  border-color: var(--color-cta-primary);
}

/* Subtle glow effect on focus */
.photo-upload-circle:focus-visible {
  outline: none;
  box-shadow: 0 0 0 4px rgba(37, 65, 178, 0.2);
}

.input-field {
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.input-field:focus {
  outline: none;
  border-color: var(--color-cta-primary);
}

.input-field.input-error {
  border-color: var(--color-error);
}

.input-field.input-error:focus {
  border-color: var(--color-error);
}

.input-field::placeholder {
  color: #9ca3af;
  font-weight: 400;
}

/* Desktop styles */
@media (min-width: 640px) {
  .photo-camera-icon {
    font-size: 3rem; /* 48px in desktop */
  }
}
</style>
