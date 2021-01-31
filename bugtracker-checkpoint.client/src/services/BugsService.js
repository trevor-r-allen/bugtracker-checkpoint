import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BugsService {
  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      AppState.bugs = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getBugById(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId)
      AppState.activeBug = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createBug(bug) {
    try {
      const res = await api.post('api/bugs', bug)
      AppState.bugs.push(res.data)
      AppState.activeBug = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async editBug(bugId, bugEdit) {
    try {
      const res = await api.put('api/bugs/' + bugId, bugEdit)
      const index = AppState.bugs.findIndex(bug => bug.id === bugId)
      AppState.bugs.splice(index, 1, res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async closeBug(bugId) {
    try {
      const res = await api.delete('api/bugs/' + bugId)
      const index = AppState.bugs.findIndex(bug => bug.id === bugId)
      AppState.bugs.splice(index, 1, res.data)
    } catch (error) {
      logger.error(error)
    }
  }
}

const bugsService = new BugsService()
export default bugsService
