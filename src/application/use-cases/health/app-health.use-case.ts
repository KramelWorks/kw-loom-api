import { AppResult } from '../../../domain/types/AppResult.js'
import { AppError } from '../../../shared/error/AppError.js'
import type { AppStatusDto } from './app-status.dto.js'
import type { IAppHealthUseCase } from './contracts/app-health.interface.js'

export class AppHealthUseCase implements IAppHealthUseCase {
  async execute(input: null): Promise<AppResult<AppStatusDto>> {
    try {
      const appStatus: AppStatusDto = {
        success: true,
      }

      return AppResult.ok(appStatus)
    } catch (error) {
      console.log(error)
      return AppResult.fail(AppError.COMMOM.SERVER_ERROR.message)
    }
  }
}
