import { Router } from 'express'
import authRouter from '../routers/authRouter.js'
import getRouter from '../routers/getRouter.js'
import postRouter from '../routers/postRouter.js'

const router = new Router()
router.use('/auth', authRouter)
router.use('/get', getRouter)
router.use('/post', postRouter)

export default router
