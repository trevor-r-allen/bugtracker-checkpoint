import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    const notes = await dbContext.Notes.find(query)
    return notes
  }

  async findById(id) {
    const value = await dbContext.Notes.findById(id)
    if (!value) {
      throw new BadRequest('Invalid Id')
    }
    return value
  }

  async create(body) {
    return await dbContext.Notes.create(body)
  }

  findOneAndUpdate(id, body) {
    const updated = dbContext.Notes.findOneAndUpdate({ _id: id, creatorId: body.creatorId }, body, { new: true }).populate('creator')
    if (!updated) {
      throw new BadRequest('You are not the creator or this note does not exist')
    }
    return updated
  }

  delete(id, userId) {
    const note = dbContext.Notes.findOneAndRemove({ _id: id, creatorId: userId })
    if (!note) {
      throw new BadRequest('You are not the creator, or this is not a valid note')
    }
  }
}

export const notesService = new NotesService()
