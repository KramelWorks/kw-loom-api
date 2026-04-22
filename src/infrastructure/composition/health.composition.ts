import { AppHealthUseCase } from '../../application/use-cases/health/app-health.use-case.js'
import { HealthController } from '../http/controllers/health/health.controller.js'

const appHealthUseCase = new AppHealthUseCase()

const healthController = new HealthController(appHealthUseCase)

export { healthController }
