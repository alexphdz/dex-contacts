import { uploadImage, deleteImage } from '../client/storageClient'
import type { ApiResponse } from '../models/response'

/**
 * Service for managing Firebase image storage operations
 */
export class StorageService {
  
  /**
   * Uploads an image file for a contact
   */
  static async uploadImage(file: File, contactId: string): Promise<ApiResponse<{ url: string }>> {
    try {
      const url = await uploadImage(file, contactId)
      
      return {
        success: true,
        data: { url }
      }
      
    } catch (error) {
      return {
        success: false,
        message: 'Error uploading image',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      }
    }
  }

  /**
   * Deletes an image file for a contact
   */
  static async deleteImage(contactId: string, imageUrl?: string): Promise<ApiResponse<{ deleted: boolean }>> {
    try {
      await deleteImage(contactId, imageUrl)
      
      return {
        success: true,
        data: { deleted: true }
      }
      
    } catch (error) {
      return {
        success: false,
        message: 'Error deleting image',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      }
    }
  }
}
