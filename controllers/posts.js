import { Post } from '../models/post.js'
import { v2 as cloudinary } from 'cloudinary'
// creating posts
function create(req, res) {
  req.body.owner = req.user.profile
  Post.create(req.body)
    .then(post => {
      Post.findById(post._id)
        .populate('owner')
        .then(populatedPost => {
          res.json(populatedPost)
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

// reading Data
function index(req, res) {
  Post.find({})
    .populate('owner')
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Post.findById(req.params.id)
    .then(post => {
      cloudinary.uploader.upload(imageFile, { tags: `${post.title}` })
        .then(image => {
          post.photo = image.secure_url
          post.save()
            .then(post => {
              res.status(201).json(post.photo)
            })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
    })
}

export {
  create,
  index,
  addPhoto
}