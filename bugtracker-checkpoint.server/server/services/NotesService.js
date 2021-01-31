import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator')
    return notes
  }

  async findById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async findByBugId(id) {
    const notes = await dbContext.Notes.find({ bug: id }).populate('creator')
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return notes
  }

  async create(body) {
    const newNote = await dbContext.Notes.create(body)
    return newNote.populate('creator')
  }

  async findOneAndUpdate(id, body) {
    const updated = await dbContext.Notes.findOneAndUpdate({ _id: id, creatorId: body.creatorId }, body, { new: true }).populate('creator')
    if (!updated) {
      throw new BadRequest('You are not the creator or this note does not exist')
    }
    return updated
  }

  async delete(id, userId) {
    const note = await dbContext.Notes.findOneAndRemove({ _id: id, creatorId: userId })
    if (!note) {
      throw new BadRequest('You are not the creator, or this is not a valid note')
    }
    return 'successfully deleted'
  }
}

export const notesService = new NotesService()
