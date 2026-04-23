import type { AppOptions } from '../../../shared/types/app-options.js'
import type { User } from '../../entities/user/user.entity.js'
import type { IBaseRepository } from './base-repository.interface.js'

export interface IUserRepository extends IBaseRepository<User> {

  find(options?: AppOptions): Promise<User[]>

  findById(id:string,options?: AppOptions): Promise<User | null>

  findByEmail(email:string,options?: AppOptions): Promise<User | null>
  
}
