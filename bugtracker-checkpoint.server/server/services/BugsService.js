import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator')
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    const newBug = await dbContext.Bugs.create(body)
    return newBug.populate('creator')
  }

  async findOneAndUpdate(id, body) {
    // const bug = await dbContext.Bugs.findById(id)
    // if (bug.closed) {
    //   throw new BadRequest('Cannot edit closed bug')
    // }
    const updated = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: body.creatorId, closed: false }, body, { new: true }).populate('creator')
    if (!updated) {
      throw new BadRequest('You are not the creator, this bug does not exist, or this bug is closed')
    }
    return updated
  }

  async findOneAndClose(id, userId) {
    const date = new Date()
    const bug = await dbContext.Bugs.findById({ _id: id, creatorId: userId })
    bug.closed = true
    bug.closedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    const closed = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: userId }, bug, { new: true }).populate('creator')
    if (!closed) {
      throw new BadRequest('You are not the creator or this bug does not exist')
    }
    return closed
  }
}
export const bugsService = new BugsService()
