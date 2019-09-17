const controller = require('../controllers/users')
const validateToken = require('../middleware').validateToken

module.exports = router => {
  router.route('/register').post(controller.register)
  router.route('/profile').get(validateToken, controller.getProfileById)
  router.route('/login').post(controller.login)
}
