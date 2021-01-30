import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.close)
  }

  async getAll(req, res, next) {
    try {
      return res.send()
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      return res.send(req.params.id)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
    // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(req.body)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
    // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(req.params.id, req.body)
    } catch (error) {
      next(error)
    }
  }

  async close(req, res, next) {
    try {
      res.send(req.params.id)
    } catch (error) {
      next(error)
    }
  }
}
