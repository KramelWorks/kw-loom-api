import { randomUUID } from 'node:crypto'
import type { Result } from '../../types/result.js'
import type { BaseEntityProps } from './base.entity.props.js'

export class BaseEntity {
  private readonly _id: string
  private _isActive: boolean
  private _isDeleted: boolean | undefined
  private readonly _createdAt: Date
  private _updatedAt: Date | undefined
  private _deletedAt: Date | undefined

  public get id() {
    return this._id
  }

  public get isActive() {
    return this._isActive
  }
  public get isDeleted() {
    return this._isDeleted
  }
  public get createdAt() {
    return this._createdAt
  }
  public get updatedAt() {
    return this._updatedAt
  }
  public get deletedAt() {
    return this._deletedAt
  }

  constructor(props: BaseEntityProps) {
    this._id = props.id ?? randomUUID()
    this._isActive = props.isActive ?? true
    this._isDeleted = props.isDeleted ?? false
    this._createdAt = props.createdAt ?? new Date()
    this._updatedAt = props.updatedAt ?? undefined
    this._deletedAt = props.deletedAt ?? undefined
  }

  protected activate(): Result<void> {
    if (this._isActive) {
      return {
        ok: false,
        error: 'Already active',
      }
    }
    this._isActive = true
    this.touch()
    return {
      ok: true,
      value: undefined,
    }
  }

  protected deactivate(): Result<void> {
    if (!this._isActive) {
      return {
        ok: false,
        error: 'Already inactive',
      }
    }
    this._isActive = false
    this.touch()
    return {
      ok: true,
      value: undefined,
    }
  }

  protected markAsDeleted(): Result<void> {
    if (this._isDeleted) {
      return {
        ok: false,
        error: 'Already deleted',
      }
    }
    this._isDeleted = true
    this._deletedAt = new Date()
    this.touch()
    return {
      ok: true,
      value: undefined,
    }
  }

  protected restore(): Result<void> {
    if (!this._isDeleted) {
      return {
        ok: false,
        error: 'Already active',
      }
    }
    this._isDeleted = false
    this._deletedAt = undefined
    this.touch()
    return {
      ok: true,
      value: undefined,
    }
  }

  protected touch() {
    this._updatedAt = new Date()
  }
}
