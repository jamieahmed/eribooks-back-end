import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
  photo: {type: String},
  title: {type: String, required: true},
  description: {type: String, required: true},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema)

export {
  Post
}