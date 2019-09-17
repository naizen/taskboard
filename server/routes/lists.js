const controller = require('../controllers/lists')
const validateToken = require('../middleware').validateToken

module.exports = router => {
  router.route('/lists').get(controller.getAll)
  router.route('/lists').post(controller.add)
  router.route('/lists/update').put(controller.update)
  router.route('/lists/order').put(controller.updateOrder)
  router.route('/lists/remove').put(controller.remove)
}
