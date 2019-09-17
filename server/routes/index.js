const users = require('./users')
const lists = require('./lists')
const tasks = require('./tasks')

module.exports = router => {
  users(router)
  lists(router)
  tasks(router)
  return router
}
