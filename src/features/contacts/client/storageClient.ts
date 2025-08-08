import axios from 'axios'

const FIREBASE_STORAGE_BASE_URL = import.meta.env.VITE_FIREBASE_STORAGE_BASE_URL

/**
 * Uploads an image file to Firebase Storage
 */
export async function uploadImage(file: File, contactId: string): Promise<string> {
  try {
    const fileExtension = file.name.split('.').pop()
    const fileName = `contacts/${contactId}.${fileExtension}`
    const uploadURL = `${FIREBASE_STORAGE_BASE_URL}/${encodeURIComponent(fileName)}`
    
    await axios.post(uploadURL, file, {
      headers: {
        'Content-Type': file.type
      },
      params: {
        uploadType: 'media'
      }
    })
    
    return `${FIREBASE_STORAGE_BASE_URL}/${encodeURIComponent(fileName)}?alt=media`
    
  } catch (error) {
    console.error('Error uploading image:', error)
    throw new Error('Failed to upload image')
  }
}

/**
 * Deletes an image from Firebase Storage
 */
export async function deleteImage(contactId: string, imageUrl?: string): Promise<void> {
  try {
    let deleted = false

    if (imageUrl && imageUrl.includes(FIREBASE_STORAGE_BASE_URL)) {
      try {
        const urlParts = imageUrl.split('/o/')
        if (urlParts.length > 1) {
          const encodedFileName = urlParts[1].split('?')[0]
          const deleteURL = `${FIREBASE_STORAGE_BASE_URL}/${encodedFileName}`
          
          await axios.delete(deleteURL)
          deleted = true
        }
      } catch (error: any) {
        if (error.response?.status === 404) {
          return
        }
      }
    }

    if (!deleted && (!imageUrl || !imageUrl.includes(FIREBASE_STORAGE_BASE_URL))) {
      const possibleExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg']
      
      for (const ext of possibleExtensions) {
        try {
          const fileName = `contacts/${contactId}.${ext}`
          const deleteURL = `${FIREBASE_STORAGE_BASE_URL}/${encodeURIComponent(fileName)}`
          
          await axios.delete(deleteURL)
          deleted = true
          break
        } catch (error: any) {
          if (error.response?.status === 404) {
            continue
          }
          continue
        }
      }
    }
    
  } catch (error) {
    console.error('Error in deleteImage:', error)
  }
}
