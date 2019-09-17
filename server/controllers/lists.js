const mongoose = require('mongoose')
const List = require('../models/lists')
const Task = require('../models/tasks')

module.exports = {
  add: (req, res) => {
    const { title, user } = req.body
    const list = new List({ title, user })
    List.findOne({}, {}, { sort: { order: -1 } }, function(err, lastList) {
      let listOrder = 0
      if (lastList) {
        listOrder = lastList.order + 1
      }
      list.order = listOrder
      list.save((err, list) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send({ list })
        }
      })
    })
  },
  updateOrder: (req, res) => {
    const lists = req.body.lists
    lists.forEach(list => {
      List.findById(list._id, function(err, result) {
        result.order = list.order
        result.save((err, updated) => {
          if (!err) {
            console.log('List updated')
          }
        })
      })
    })
  },
  update: (req, res) => {
    const { id, ...updates } = req.body
    List.findOneAndUpdate({ _id: id }, { ...updates }, {}, function(err, list) {
      if (!err) {
        res.status(200).send('List updated')
      } else {
        res.status(500).send(err)
      }
    })
  },
  remove: (req, res) => {
    const { id } = req.body
    List.deleteOne({ _id: id }, function(err) {
      if (!err) {
        Task.deleteMany({ list: id }, function(err) {
          res.status(200).send('List deleted')
        })
      } else {
        res.status(500).send(err)
      }
    })
  },
  getAll: (req, res) => {
    const { userId } = req.query
    List.find({ user: userId }, {}, { sort: { order: 'asc' } }, function(
      err,
      lists
    ) {
      if (!err) {
        Task.find({ user: userId }, {}, { sort: { order: 'asc' } }, function(
          err,
          tasks
        ) {
          if (!err) {
            res.status(200).send({ lists, tasks })
          } else {
            res.status(500).send(err)
          }
        })
      } else {
        res.status(500).send(err)
      }
    })
  }
}
