/**
 * Contact entity model
 */
export interface Contact {
  id: string
  name: string
  email: string
  image?: string
  lastContactDate: Date
  createdAt: Date
  updatedAt: Date
}

/**
 * Contact form data structure
 */
export interface ContactFormData {
  name: string
  email: string
  image?: string
  lastContactDate: string
}
