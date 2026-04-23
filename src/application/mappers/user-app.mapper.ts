import { User } from '../../domain/entities/user/user.entity.js'
import type { IAppMapper } from '../contracts/app-mappers.interface.js'
import type { CreateUserDto } from '../use-cases/user/dtos/create-user.dto.js'
import type { UserDto } from '../use-cases/user/dtos/user.dto.js'

export class UserAppMapper implements IAppMapper<User, CreateUserDto, UserDto> {
  toDomain(input: CreateUserDto): User {
    return User.create(input)
  }

  toDto(input: User): UserDto {
    return {
      id: input.id,
      name: input.name,
      email: input.email.getValue(),
      isLockable: input.isLockable,
      createdAt: input.createdAt,
    }
  }
}
