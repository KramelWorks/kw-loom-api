import type { BaseFilter } from "./base-filter.js";

export interface UserFilter extends BaseFilter{
  name?:string;
  email?:string;
}