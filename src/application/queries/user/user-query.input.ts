import type { UserFilter } from "../../../domain/contracts/repository/filters/user-filter.js";
import type { Pagination } from "../../contracts/pagination.interface.js";

export interface UserQueryInput extends UserFilter,Pagination{
  sortBy?: 'name' | 'email' | 'createdAt'
  order?: 'asc' | 'desc'
} 