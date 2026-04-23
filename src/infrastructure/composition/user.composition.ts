import { UserAppMapper } from '../../application/mappers/user-app.mapper.js'
import { CreateUserUseCase } from '../../application/use-cases/user/create-user.use-case.js'
import { EmailPolicy } from '../../domain/policies/email/email.policy.js'
import { PasswordPolicy } from '../../domain/policies/password/password.policy.js'
import { envConfig } from '../config/envConfig.js'
import { prismaDB } from '../database/prisma/config/prisma-db-client.js'
import { UserRepository } from '../database/repository/user/user.repository.prisma.js'
import { UserController } from '../http/controllers/user/user.controller.js'
import { UserRepoMapper } from '../mappers/user-repo.mapper.js'
import { HasherService } from '../services/crypto/hasher.service.js'

const repoMapper = new UserRepoMapper()

const repository = new UserRepository(prismaDB, repoMapper)

const mapper = new UserAppMapper()

const emailPolicy = new EmailPolicy({
  enabled: envConfig.security.email.enabled,
  mode: envConfig.security.email.mode,
  domains: envConfig.security.email.domains,
})

const passwordPolicy = new PasswordPolicy({
  enabled: envConfig.security.password.enabled,
  requireUpperCase: envConfig.security.password.requireUppercase,
  requireLowerCase: envConfig.security.password.requireLowercase,
  requireNumber: envConfig.security.password.requireNumber,
  requireSpecialChar: envConfig.security.password.requireSpecialChar,
  minLength: envConfig.security.password.minLength,
})

const hasherService = new HasherService({
  saltOrRounds: envConfig.security.crypto.saltOrRounds,
})

const createUserUseCase = new CreateUserUseCase(
  repository,
  mapper,
  emailPolicy,
  passwordPolicy,
  hasherService,
)

const userController = new UserController(createUserUseCase)

export { userController }
