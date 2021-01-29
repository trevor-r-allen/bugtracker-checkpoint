import mongoose from 'mongoose'
import ObjectId from 'mongoose'
const Schema = mongoose.Schema

const Note = new Schema(
  {
    content: { type: String, required: true },
    bug: { type: ObjectId, ref: 'Bug', required: true },
    flagged: { type: String, enum: ['pending', 'completed', 'rejected'] },
    creatorId: { type: String, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Note
