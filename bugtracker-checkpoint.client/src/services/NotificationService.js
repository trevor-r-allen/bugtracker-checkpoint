import Swal from 'sweetalert2'
import { logger } from '../utils/Logger'

export default class NotificationService {
  static async confirmAction(title = 'Are you sure?', text = 'This action is irreversible.') {
    try {
      const res = await Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        iconColor: '#e73535',
        showCancelButton: true,
        confirmButtonColor: '#e73535',
        cancelButtonColor: '#00C9BD',
        confirmButtonText: 'Close Bug',
        reverseButtons: true
      })
      if (res.isConfirmed) {
        return true
      }
      return false
    } catch (error) {
      logger.error(error)
    }
  }
}
