import { ref, type Component } from 'vue'
import SnackAlert, { type SnackAlertProps } from '@/components/SnackAlert.vue'

interface SnackItem extends SnackAlertProps {
  id: string
  component: Component
}

const snacks = ref<SnackItem[]>([])

let idCounter = 0

/**
 * Composable for managing snackbar alert notifications
 */
export function useSnackAlert() {
  
  /**
   * Shows a snackbar with custom properties
   */
  const showSnack = (props: Omit<SnackAlertProps, 'onClose'>) => {
    const id = `snack-${++idCounter}`
    const snackItem: SnackItem = {
      ...props,
      id,
      component: SnackAlert
    }
    snacks.value.push(snackItem)
    return id
  }
  
  /**
   * Hides a specific snackbar by its ID
   */
  const hideSnack = (id: string) => {
    const index = snacks.value.findIndex(snack => snack.id === id)
    if (index > -1) {
      snacks.value.splice(index, 1)
    }
  }
  
  /**
   * Shows a success notification
   */
  const success = (title: string, description?: string) => {
    return showSnack({ type: 'success', title, description })
  }
  
  /**
   * Shows an error notification
   */
  const error = (title: string, description?: string) => {
    return showSnack({ type: 'error', title, description })
  }
  
  /**
   * Shows an info notification
   */
  const info = (title: string, description?: string) => {
    return showSnack({ type: 'info', title, description })
  }
  
  /**
   * Clears all active notifications
   */
  const clear = () => {
    snacks.value = []
  }
  
  return {
    snacks,
    showSnack,
    hideSnack,
    success,
    error,
    info,
    clear
  }
}
