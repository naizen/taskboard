const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)

const userSchema = new mongoose.Schema({
  username: {
    type: 'String',
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: 'String',
    required: true,
    trim: true
  }
})

// Encrypt password before save
userSchema.pre('save', function(next) {
  const user = this
  if (!user.isModified || !user.isNew) {
    // Don't rehash old user
    next()
  } else {
    bcrypt.hash(user.password, SALT_ROUNDS, function(err, hashed) {
      if (err) {
        console.log('Error hashing password', err)
        next(err)
      } else {
        user.password = hashed
        next()
      }
    })
  }
})

module.exports = mongoose.model('User', userSchema)
