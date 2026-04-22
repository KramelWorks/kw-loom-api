import type { Result } from '../../types/result.js'
import type { IEmailPolicy } from './email-policy.interface.js'
import type { EmailPolicyProps } from './email-policy.props.js'

export class EmailPolicy implements IEmailPolicy {
  constructor(private readonly policies: EmailPolicyProps) {}

  validate(value: string): Result<void> {
    if (!this.policies.enabled) return { ok: true, value: undefined }

    const parts = value.split('@')
    if (parts.length !== 2) {
      return { ok: false, error: 'Inválid e-mail format' }
    }

    const domain = parts[1]
    if (!domain) {
      return { ok: false, error: 'Domain not found' }
    }

    const exists = this.policies.domains.includes(domain)

    if (this.policies.mode === 'whitelist' && !exists) {
      return { ok: false, error: 'Email domain is not allowed' }
    }

    if (this.policies.mode === 'blacklist' && exists) {
      return { ok: false, error: 'Email domain denied' }
    }

    return { ok: true, value: undefined }
  }
}
