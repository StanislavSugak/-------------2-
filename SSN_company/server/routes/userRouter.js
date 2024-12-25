const Router = require('express')
const router = new Router()

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/', checkRole('teamlead'), userController.getAll)
router.get('/one', userController.getOne)
router.get('/report', userController.getReport)
router.put('/', userController.update)
router.post('/add_stack', userController.addStackUser)

module.exports = router 