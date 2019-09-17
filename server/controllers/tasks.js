const mongoose = require('mongoose')
const Task = require('../models/tasks')

module.exports = {
  getAll: (req, res) => {
    const { user } = req.body
    Task.find({ user: userId }, function(err, tasks) {
      if (!err) {
        res.status(200).send({ tasks })
      } else {
        res.status(500).send(err)
      }
    })
  },
  add: (req, res) => {
    const { user, content, listId } = req.body
    const task = new Task({ content, user, list: listId })
    Task.findOne({ list: listId }, {}, { sort: { order: -1 } }, function(
      err,
      lastTask
    ) {
      let taskOrder = 0
      if (lastTask) {
        taskOrder = lastTask.order + 1
      }
      task.order = taskOrder
      task.save((err, task) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.status(200).send({ task })
        }
      })
    })
  },
  order: (req, res) => {
    const { taskIds } = req.body
    taskIds.forEach((id, i) => {
      Task.findById(id, function(err, task) {
        task.order = i
        task.save((err, updated) => {
          if (err) {
            console.log('Error saving task', err)
          }
        })
      })
    })
  },
  move: (req, res) => {
    const { sourceList, destList } = req.body
    sourceList.taskIds.forEach((id, i) => {
      Task.findById(id, function(err, task) {
        task.order = i
        task.list = sourceList._id
        task.save((err, updated) => {
          if (err) {
            console.log('Error saving task', err)
          }
        })
      })
    })
    destList.taskIds.forEach((id, i) => {
      Task.findById(id, function(err, task) {
        task.order = i
        task.list = destList._id
        task.save((err, updated) => {
          if (err) {
            console.log('Error saving task', err)
          }
        })
      })
    })
  },
  remove: (req, res) => {
    const { task } = req.body
    Task.deleteOne({ _id: task._id }, function(err) {
      if (!err) {
        res.status(200).send('Task deleted')
      } else {
        res.status(500).send(err)
      }
    })
  },
  update: (req, res) => {
    const { _id, ...updates } = req.body
    Task.findOneAndUpdate({ _id }, { ...updates }, {}, function(err, list) {
      if (!err) {
        res.status(200).send('Task updated')
      } else {
        res.status(500).send(err)
      }
    })
  }
}
