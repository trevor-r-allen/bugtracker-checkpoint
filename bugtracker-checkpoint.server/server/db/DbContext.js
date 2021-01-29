import mongoose from 'mongoose'
import BugSchema from '../models/Bug'
import NoteSchema from '../models/Note'
import AccountSchema from '../models/Account'

class DbContext {
  Bugs = mongoose.model('Bug', BugSchema);
  Notes = mongoose.model('Note', NoteSchema)
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
