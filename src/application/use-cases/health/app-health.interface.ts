import type { IUseCase } from '../../../contracts/use-case.interface.js'
import type { AppStatusDto } from '../../../dtos/health/app-status.dto.js'

export interface IAppHealthUseCase extends IUseCase<null, AppStatusDto> {}
