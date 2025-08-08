import type { Contact } from './contact'

/**
 * Single contact response wrapper
 */
export interface ContactResponse {
  contact: Contact
}

/**
 * Standard API response format
 */
export type ApiResponse<T> = 
  | {
      success: true
      data: T
      message?: string
    }
  | {
      success: false
      message: string
      errors?: string[]
    }
