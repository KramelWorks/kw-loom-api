import type { Email } from '../../value-objects/email.vo.js'
import type { Password } from '../../value-objects/password.vo.js'
import type { BaseEntityProps } from '../base/base.entity.props.js'

export interface UserProps extends BaseEntityProps {
  name: string;
  password: Password;
  email: Email;
  isLockable: boolean;
  lockedAt: Date | undefined;
  failedLoginAttempts: number;
}
