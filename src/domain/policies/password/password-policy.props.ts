export interface PasswordPolicyProps {
  enabled: boolean
  requireUpperCase: boolean
  requireLowerCase: boolean
  requireNumber: boolean
  requireSpecialChar: boolean
  minLength: number
}
