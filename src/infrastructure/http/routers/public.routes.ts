import { Router } from 'express'
import { healthRoute } from './health/health.route.js'

const publicRoute = Router()

publicRoute.use(healthRoute)

export { publicRoute }
