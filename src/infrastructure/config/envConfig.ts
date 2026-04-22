import dotenv from 'dotenv'
dotenv.config()

export const envConfig = {
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
  },
}
