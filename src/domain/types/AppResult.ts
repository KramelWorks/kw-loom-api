export class AppResult<T> {
  private readonly _success: boolean
  private readonly _data: T | undefined
  private readonly _message?: string

  public get success() {
    return this._success
  }
  public get data() {
    return this._data
  }
  public get message() {
    return this._message
  }

  private constructor(success: boolean, data: T | undefined, message?: string) {
    this._success = success
    this._data = data ?? undefined
    this._message = message ?? ''
  }

  public static ok<T>(data: T, message = 'Success') {
    return new AppResult<T>(true, data, message)
  }

  public static fail<T>(message = 'Failed') {
    return new AppResult<T>(false, undefined, message)
  }

  public toJson() {
    return {
      success: this._success,
      data: this._data,
      message: this._message,
    }
  }
}
