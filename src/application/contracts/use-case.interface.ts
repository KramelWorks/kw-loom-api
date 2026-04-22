import type { AppResult } from '../../domain/types/AppResult.js'

export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<AppResult<Output>>
}
