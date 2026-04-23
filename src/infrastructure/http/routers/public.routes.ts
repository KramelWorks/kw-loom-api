import { Router } from 'express'
import { healthRoute } from './health/health.route.js'
import { userRouter } from './user/user.route.js'

const publicRoute = Router()

publicRoute.use(healthRoute)

publicRoute.use('/users', userRouter)

export { publicRoute }
