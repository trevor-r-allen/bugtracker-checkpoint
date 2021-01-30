import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class NotesService {
  async getAllNotes() {
    try {
      const res = await api.get('api/notes')
      AppState.notes = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getNoteById(noteId) {
    try {
      const res = await api.get('api/notes/' + noteId)
      AppState.activeNote = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getNotesByBugId(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createNote(note) {
    try {
      const res = await api.post('api/notes', note)
      AppState.notes.push(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async editNote(noteId, noteEdit) {
    try {
      const res = await api.put('api/notes/' + noteId, noteEdit)
      const index = AppState.notes.findIndex(note => note.id === noteId)
      AppState.notes.splice(index, 1, res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteNote(noteId) {
    try {
      await api.delete('api/notes/' + noteId)
      AppState.notes = AppState.notes.filter(note => (note.id !== noteId))
    } catch (error) {
      logger.error(error)
    }
  }
}

const notesService = new NotesService()
export default notesService
