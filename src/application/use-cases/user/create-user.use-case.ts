import type { IUserRepository } from '../../../domain/contracts/repository/user-repository.interface.js'
import { User } from '../../../domain/entities/user/user.entity.js'
import type { IEmailPolicy } from '../../../domain/policies/email/email-policy.interface.js'
import type { IPasswordPolicy } from '../../../domain/policies/password/password-policy.interface.js'
import { AppResult } from '../../../domain/types/AppResult.js'
import type { HasherService } from '../../../infrastructure/services/crypto/hasher.service.js'
import { AppError } from '../../../shared/error/AppError.js'
import type { IUseCase } from '../../contracts/use-case.interface.js'
import type { UserAppMapper } from '../../mappers/user-app.mapper.js'
import type { CreateUserDto } from './dtos/create-user.dto.js'
import type { UserDto } from './dtos/user.dto.js'

export class CreateUserUseCase implements IUseCase<CreateUserDto, UserDto> {
  constructor(
    private readonly repository: IUserRepository,
    private readonly mapper: UserAppMapper,
    private readonly emailPolicy: IEmailPolicy,
    private readonly passwordPolicy: IPasswordPolicy,
    private readonly hasherService: HasherService,
  ) {}

  async execute(input: CreateUserDto): Promise<AppResult<UserDto>> {
    try {
      const user = await this.repository.findByEmail(input.email)
      if (user) {
        return AppResult.fail<UserDto>(AppError.USER.EXITS.message)
      }

      const validEmail = this.emailPolicy.validate(input.email)
      if (!validEmail.ok) {
        return AppResult.fail<UserDto>(validEmail.error)
      }

      const validPassword = this.passwordPolicy.validate(input.password)
      if (!validPassword.ok) {
        return AppResult.fail<UserDto>(validPassword.error)
      }

      const hashedPassword = await this.hasherService.hash(input.password)

      const userProps = User.create({
        name: input.name,
        password: hashedPassword,
        email: input.email,
        isLockable: input.isLockable,
      })

      const saved = await this.repository.create(userProps)

      if (!saved) {
        return AppResult.fail<UserDto>(AppError.COMMOM.UNKNOW.message)
      }
      const result = await this.mapper.toDto(saved)

      return AppResult.ok<UserDto>(result)
    } catch (error) {
      console.log(error)
      return AppResult.fail<UserDto>(AppError.COMMOM.SERVER_ERROR.message)
    }
  }
}
