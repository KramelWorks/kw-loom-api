import type { Result } from '../../types/result.js'
import type { IPasswordPolicy } from './password-policy.interface.js'
import type { PasswordPolicyProps } from './password-policy.props.js'

export class PasswordPolicy implements IPasswordPolicy {
  private readonly regex: RegExp

  constructor(private readonly policies: PasswordPolicyProps) {
    this.regex = this.createRegex()
  }

  validate(value: string): Result<void> {
    if (!this.policies.enabled) return { ok: true, value: undefined }

    if (!this.regex.test(value)) {
      return { ok: false, error: 'Password does not meet policy requirements' }
    }
    return { ok: true, value: undefined }
  }

  private createRegex(): RegExp {
    let pattern = '^'
    if (this.policies.requireSpecialChar) {
      pattern += '(?=.*[!@#$%^&*])'
    }
    if (this.policies.requireLowerCase) {
      pattern += '(?=.*[a-z])'
    }
    if (this.policies.requireNumber) {
      pattern += '(?=.*\\d)'
    }
    if (this.policies.requireUpperCase) {
      pattern += '(?=.*[A-Z])'
    }
    pattern += `.{${this.policies.minLength},}$`
    return new RegExp(pattern)
  }
}
