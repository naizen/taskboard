const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

function createToken(user) {
  const payload = {
    _id: user._id,
    username: user.username
  }
  const options = { expiresIn: '2d' }
  const secret = process.env.JWT_SECRET
  const token = jwt.sign(payload, secret, options)
  return token
}

module.exports = {
  register: (req, res) => {
    const { username, password } = req.body
    const user = new User({ username, password })
    user.save((err, user) => {
      if (err) {
        res.status(500).send(err)
      } else {
        const token = createToken(user)
        res.send({ user, token })
      }
    })
  },
  login: (req, res) => {
    const { username, password } = req.body
    let result = {}
    User.findOne({ username }, (err, user) => {
      if (!err && user) {
        bcrypt
          .compare(password, user.password)
          .then(match => {
            if (match) {
              result.status = 200
              result.user = user
              result.token = createToken(user)
            } else {
              result.status = 401
              result.error = 'Authentication error'
            }
            res.status(result.status).send(result)
          })
          .catch(err => {
            result.status = 500
            result.error = err
            res.status(result.status).send(result)
          })
      } else {
        result.status = 404
        result.error = err
        res.status(result.status).send(result)
      }
    })
  },
  getProfileById: (req, res) => {
    const { id } = req.body
    let result = {}
    const tokenPayload = req.decoded
    if (tokenPayload) {
      User.findById(id, (err, user) => {
        if (user) {
          result.status = 200
          result.user = user
        } else {
          result.status = 404
          result.error = err
        }
        res.status(result.status).send(result)
      }).catch(err => {
        result.status = 500
        result.error = err
        res.status(result.status).send(result)
      })
    } else {
      result.status = 401
      result.error = 'Authentication error'
      res.status(result.status).send(result)
    }
  }
}
