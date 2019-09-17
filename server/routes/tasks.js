const controller = require('../controllers/tasks')
const validateToken = require('../middleware').validateToken

module.exports = router => {
  router.route('/tasks').get(controller.getAll)
  router.route('/tasks').post(controller.add)
  router.route('/tasks/update').put(controller.update)
  router.route('/tasks/order').put(controller.order)
  router.route('/tasks/move').put(controller.move)
  router.route('/tasks/remove').put(controller.remove)
}
