import type { Result } from '../../types/result.js'
import { Email } from '../../value-objects/email.vo.js'
import { Password } from '../../value-objects/password.vo.js'
import { BaseEntity } from '../base/base.entity.js'
import type { CreateUserProps } from './create-user.props.js'
import type { UserProps } from './user-entity.props.js'

export class User extends BaseEntity {

  private readonly _name: string
  private readonly _password: Password
  private readonly _email: Email
  private readonly _isLockable: boolean
  private _lockedAt: Date | undefined
  private _failedLoginAttempts: number

  public get name() {
    return this._name
  }
  public get password() {
    return this._password
  }
  public get email() {
    return this._email
  }
  public get isLockable() {
    return this._isLockable
  }

  public get isLocked() {
    return !!this._lockedAt
  }

  public get lockedAt() {
    return this._lockedAt
  }
  public get failedLoginAttempts() {
    return this._failedLoginAttempts
  }

  private constructor(props: UserProps) {
    super(props)
    this._name = props.name
    this._password = props.password
    this._email = props.email
    this._isLockable = props.isLockable ?? true
    this._lockedAt = props.lockedAt ?? undefined
    this._failedLoginAttempts = props.failedLoginAttempts
  }

  public static create(props: CreateUserProps) {
    const email = Email.create(props.email)
    if (!email.ok) {
      throw new Error(email.error)
    }

    const password = Password.create(props.password)
    if (!password.ok) {
      throw new Error(password.error)
    }

    return new User({
      name: props.name,
      password: password.value,
      email: email.value,
      isLockable: props.isLockable,
      lockedAt: undefined,
      failedLoginAttempts: 0,
    })
  }

  public static rehydrate(props: UserProps) {
    return new User(props)
  }

  public activate(): Result<void> {
    return super.activate()
  }

  public deactivate(): Result<void> {
    return super.deactivate()
  }

  public markAsDeleted(): Result<void> {
    return super.markAsDeleted()
  }

  public restore(): Result<void> {
    return super.restore()
  }

  public lock(): Result<void> {
    if (!this._isLockable) {
      return { ok: false, error: 'User cannot be locked.' }
    }

    if (this.isLocked) {
      return { ok: false, error: 'User already locked.' }
    }
    this._lockedAt = new Date()
    this.touch()
    return { ok: true, value: undefined }
  }

  public unlock(): Result<void> {
    if (!this.isLocked) return { ok: false, error: 'User already unlocked.' }
    this._lockedAt = undefined
    this.touch()
    return { ok: true, value: undefined }
  }

  public registerFailedLoginAttempt(): void {
    this._failedLoginAttempts++
  }

  public resetFailedLoginAttempts(): Result<void> {
    this._failedLoginAttempts = 0
    return { ok: true, value: undefined }
  }
}
