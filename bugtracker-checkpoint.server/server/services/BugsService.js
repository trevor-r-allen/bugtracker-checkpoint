import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query)
    return bugs
  }

  async findById(id) {
    const bug = await dbContext.Bugs.findById(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(body) {
    return await dbContext.Bugs.create(body)
  }

  async findOneAndUpdate(id, body) {
    // const bug = await dbContext.Bugs.findById(id)
    // if (bug.closed) {
    //   throw new BadRequest('Cannot edit closed bug')
    // }
    const updated = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: body.creatorId, closed: false }, body, { new: true }).populate('creator')
    if (!updated) {
      throw new BadRequest('You are not the creator or this bug does not exist')
    }
    return updated
  }

  async findOneAndClose(id, body) {
    body.closed = true
    const closed = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorId: body.creatorId }, body, { new: true }).populate('creator')
    if (!closed) {
      throw new BadRequest('You are not the creator or this bug does not exist')
    }
  }
}
export const bugsService = new BugsService()
