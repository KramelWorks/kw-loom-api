import type { Result } from '../../types/result.js'
import type { BaseEntityProps } from './base.entity.props.js'

export class BaseEntity {
  private _isActive: boolean
  private _isDeleted: boolean | undefined
  private readonly _createdAt: Date
  private _updatedAt: Date | undefined
  private _deletedAt: Date | undefined

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
    this._isActive = props.isActive
    this._isDeleted = props.isDeleted
    this._createdAt = props.createdAt
    this._updatedAt = props.updatedAt
    this._deletedAt = props.deletedAt
  }

  protected activate(): Result<void> {
    if (this._isActive) {
      return {
        ok: false,
        error: 'Already active',
      }
    }
    this._isActive = true;
    this.touch();
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
    this._isActive = false;
    this.touch();
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
    this._isDeleted = true;
    this._deletedAt=new Date();
    this.touch();
          return {
        ok: true,
        value: undefined,
      }
  }
  
  protected retore(): Result<void> {
    if (!this._isDeleted) {
      return {
        ok: false,
        error: 'Already active',
      }
    }
    this._isDeleted = false;
    this._deletedAt=undefined;
    this.touch();
          return {
        ok: true,
        value: undefined,
      }
  }

  protected touch(){
    this._updatedAt=new Date();
  }
}
