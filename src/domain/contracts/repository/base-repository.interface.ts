export interface IBaseRepository<T, TWhere={id:string}> {
  create(data: T): Promise<T>

  update(where: TWhere, data: T): Promise<T>

  delete(where: TWhere): Promise<T>
}