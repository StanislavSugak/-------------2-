const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const projectRouter = require('./projectRouter')
const technologyRouter = require('./technologyRouter')

router.use('/user', userRouter)
router.use('/project', projectRouter)
router.use('/technology', technologyRouter)

module.exports = router 