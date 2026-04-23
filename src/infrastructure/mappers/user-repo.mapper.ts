import { User } from '../../domain/entities/user/user.entity.js'
import { Email } from '../../domain/value-objects/email.vo.js'
import { Password } from '../../domain/value-objects/password.vo.js'
import type { IRepoMapper } from '../contracts/repo-mapper.interface.js'
import type { UserModel } from '../database/prisma/generated/prisma/index.js'

export class UserRepoMapper implements IRepoMapper<User, UserModel> {
  toDomain(raw: UserModel): User {
    const email = Email.create(raw.email)
    if (!email.ok) {
      throw new Error(email.error)
    }

    const password = Password.create(raw.email)
    if (!password.ok) {
      throw new Error(password.error)
    }

    return User.rehydrate({
      name: raw.name,
      email: email.value,
      password: password.value,
      isLockable: raw.isLockable,
      lockedAt: raw.lockedAt ?? undefined,
      failedLoginAttempts: raw.failedLoginAttempts,
      isActive: raw.isActive,
      isDeleted: raw.isDeleted,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt ?? undefined,
      deletedAt: raw.deletedAt ?? undefined,
    })
  }

  toPersistence(domain: User): UserModel {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email.getValue(),
      password: domain.password.getValue(),
      isLockable: domain.isLockable,
      lockedAt: domain.lockedAt ?? null,
      failedLoginAttempts: domain.failedLoginAttempts,
      isActive: domain.isActive,
      isDeleted: domain.isDeleted ?? false,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt ?? null,
      deletedAt: domain.deletedAt ?? null,
    }
  }
}
