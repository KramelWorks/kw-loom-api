import dotenv from 'dotenv'
dotenv.config()

export const envConfig = {
  connectionString: {
    core: process.env.DATABASE_URL,
  },
  http: {
    port: Number(process.env.PORT ?? '5001'),
  },
  security: {
    password: {
      enabled: process.env.PASSWORD_POLICY_ENABLED === 'true',
      requireUppercase: process.env.REQUIRE_UPPERCASE === 'true',
      requireLowercase: process.env.REQUIRE_LOWERCASE === 'true',
      requireNumber: process.env.REQUIRE_NUMBER === 'true',
      requireSpecialChar: process.env.REQUIRE_SPECIAL_CHAR === 'true',
      minLength: Number(process.env.MIN_LENGTH ?? 8),
    },
    email: {
      enabled: process.env.EMAIL_POLICY_ENABLED === 'true',
      mode: process.env.EMAIL_POLICY_MODE as 'whitelist' | 'blacklist',
      domains: JSON.parse(process.env.EMAIL_POLICY_DOMAINS ?? '[]'),
    },
    jwt: {
      secret: process.env.SECRET === 'true',
      issuer: process.env.ISSUER === 'true',
      audience: process.env.AUDIENCE === 'true',
      expiresIn: Number(process.env.EXPIRES_IN ?? 3600),
    },
    crypto: {
      saltOrRounds: Number(process.env.SALT_OR_ROUNDS ?? 10),
    },
  },
}
