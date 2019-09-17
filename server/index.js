const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const router = express.Router()
const routes = require('./routes/index')

const environment = process.env.NODE_ENV
const port = process.env.PORT || 4000
const connUri = process.env.MONGODB_URI

mongoose.connect(connUri, { useNewUrlParser: true })

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

if (environment !== 'production') {
  const logger = require('morgan')
  app.use(logger('dev'))
}

app.use('/api', routes(router))

app.listen(port, () => {
  console.log(`Server now listening at port: ${port}`)
})
