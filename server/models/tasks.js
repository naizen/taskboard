const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Task', taskSchema)
