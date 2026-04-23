import type { IUserRepository } from '../../../../domain/contracts/repository/user-repository.interface.js'
import type { User } from '../../../../domain/entities/user/user.entity.js'
import type { AppOptions } from '../../../../shared/types/app-options.js'
import type { UserRepoMapper } from '../../../mappers/user-repo.mapper.js'
import type {
  PrismaClient,
  UserModel,
} from '../../prisma/generated/prisma/index.js'
import { BaseRepository } from '../base/base.repository.prisma.js'

export class UserRepository
  extends BaseRepository<User, UserModel>
  implements IUserRepository
{
  constructor(
    private readonly userRepository: PrismaClient,
    protected mapper: UserRepoMapper,
  ) {
    super(userRepository.userModel, mapper)
  }

  async find(options?: AppOptions): Promise<User[]> {
    const records = await this.userRepository.userModel.findMany({
      where: {
        ...(options?.include_inactive ? {} : { isActive: false }),
        ...(options?.include_deleted ? {} : { isDeleted: true }),
      },
    })
    const result = records.map((record) => this.mapper.toDomain(record))
    return result
  }

  async findById(id: string, options?: AppOptions): Promise<User | null> {
    const record = await this.userRepository.userModel.findFirst({
      where: {
        id,
        ...(options?.include_inactive ? {} : { isActive: false }),
        ...(options?.include_deleted ? {} : { isDeleted: true }),
      },
    })
    const result = record ? this.mapper.toDomain(record) : null
    return result
  }

  async findByEmail(email: string, options?: AppOptions): Promise<User | null> {
    const record = await this.userRepository.userModel.findFirst({
      where: {
        email,
        ...(options?.include_inactive ? {} : { isActive: false }),
        ...(options?.include_deleted ? {} : { isDeleted: true }),
      },
    })
    const result = record ? this.mapper.toDomain(record) : null
    return result
  }
}
