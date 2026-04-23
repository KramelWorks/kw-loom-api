import { AppResult } from '../../../domain/types/AppResult.js'
import { AppError } from '../../../shared/error/AppError.js'
import type { IUseCase } from '../../contracts/use-case.interface.js'
import type { AppStatusDto } from './dtos/app-status.dto.js'

export class AppHealthUseCase implements IUseCase<null, AppStatusDto> {
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
