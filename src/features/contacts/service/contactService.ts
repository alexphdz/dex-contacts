import { createContact, updateContact, getContacts, deleteContact } from '../client/contactClient'
import { StorageService } from './storageService'
import type { Contact } from '../models/contact'
import type { CreateContactRequest, UpdateContactRequest } from '../models/request'
import type { ApiResponse, ContactResponse } from '../models/response'

/**
 * Generates a random UUID v4 string
 */
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * Service for managing contact CRUD operations
 */
export class ContactService {
  
  /**
   * Creates a new contact
   */
  static async create(contactData: CreateContactRequest): Promise<ApiResponse<ContactResponse>> {
    try {
      const contactId = generateUUID()
      
      const newContact: Contact = {
        id: contactId,
        name: contactData.name,
        email: contactData.email,
        image: contactData.image || '',
        lastContactDate: new Date(contactData.lastContactDate),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      await createContact(newContact)
      
      return {
        success: true,
        data: {
          contact: newContact
        }
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error creating contact',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      }
    }
  }
  
  /**
   * Retrieves all contacts from the database
   */
  static async getAll(): Promise<ApiResponse<{ contacts: Contact[] }>> {
    try {
      const result = await getContacts()
      
      if (!result) {
        return {
          success: true,
          data: { contacts: [] }
        }
      }

      const contacts: Contact[] = Object.entries(result).map(([id, contactData]) => {
        const contact = contactData as any
        return {
          ...contact,
          id,
          lastContactDate: new Date(contact.lastContactDate),
          createdAt: new Date(contact.createdAt),
          updatedAt: new Date(contact.updatedAt)
        }
      })

      return {
        success: true,
        data: { contacts }
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error getting contacts',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      }
    }
  }
  
  
  /**
   * Updates an existing contact
   */
  static async update(updateData: UpdateContactRequest): Promise<ApiResponse<ContactResponse>> {
    try {
      const isImageBeingUpdated = updateData.image !== undefined && 
                                  updateData.image !== updateData.originalContact.image
      
      if (isImageBeingUpdated && updateData.originalContact.image && updateData.originalContact.image.trim()) {
        StorageService.deleteImage(updateData.id, updateData.originalContact.image).catch(error => {
          console.warn(`Failed to delete old image for contact ${updateData.id}:`, error)
        })
      }
      
      const updates: Partial<Contact> = {
        ...(updateData.name && { name: updateData.name }),
        ...(updateData.email && { email: updateData.email }),
        ...(updateData.image !== undefined && { image: updateData.image }),
        ...(updateData.lastContactDate && { lastContactDate: new Date(updateData.lastContactDate) }),
        updatedAt: new Date()
      }
      
      await updateContact(updateData.id, updates)
    
      const updatedContact: Contact = {
        id: updateData.id,
        name: updateData.name || updateData.originalContact.name,
        email: updateData.email || updateData.originalContact.email,
        image: updateData.image !== undefined ? updateData.image : (updateData.originalContact.image || ''),
        lastContactDate: updateData.lastContactDate 
          ? new Date(updateData.lastContactDate) 
          : new Date(updateData.originalContact.lastContactDate),
        createdAt: new Date(updateData.originalContact.createdAt),
        updatedAt: new Date()
      }
      
      return {
        success: true,
        data: {
          contact: updatedContact
        }
      }
      
    } catch (error) {
      return {
        success: false,
        message: 'Error updating contact',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      }
    }
  }
  
  /**
   * Deletes a contact and its associated image
   */
  static async delete(id: string, hasImage: boolean = false, imageUrl?: string): Promise<ApiResponse<{ deleted: boolean }>> {
    try {
      if (hasImage) {
        StorageService.deleteImage(id, imageUrl).catch(error => {
          console.warn(`Failed to delete image for contact ${id}:`, error)
        })
      }
      
      await deleteContact(id)

      return {
        success: true,
        data: { deleted: true }
      }
    } catch (error) {
      return {
        success: false,
        message: 'Error deleting contact',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      }
    }
  }
}