/**
 * Request to create a new contact
 */
export interface CreateContactRequest {
  name: string
  email: string
  image?: string
  lastContactDate: string
}

/**
 * Request to update an existing contact
 */
export interface UpdateContactRequest {
  id: string
  name?: string
  email?: string
  image?: string
  lastContactDate?: string
  originalContact: {
    name: string
    email: string
    image?: string
    lastContactDate: string | Date
    createdAt: string | Date
    updatedAt?: string | Date
  }
}

/**
 * Request to delete a contact
 */
export interface DeleteContactRequest {
  id: string
  hasImage?: boolean
}
