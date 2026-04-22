import { Router } from 'express'
import { healthController } from '../../../composition/health.composition.js'

const healthRoute = Router()

healthRoute.get('/health', healthController.appHealth.bind(healthController))

export { healthRoute }
