const Router = require('express')
const router = new Router()

const technologyController = require('../controllers/technologyController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', technologyController.getAll)
router.post('/', technologyController.create)
router.patch('/end_wish', technologyController.deleteWish)
module.exports = router 