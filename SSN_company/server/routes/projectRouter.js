const Router = require('express')
const router = new Router()

const projectController = require('../controllers/projectController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', projectController.create)
router.get('/', projectController.getAll)
router.delete('/remove_stack', projectController.removeStack)
router.delete('/remove_user', projectController.removeUser)
router.post('/add_stack', projectController.createStack)

module.exports = router 