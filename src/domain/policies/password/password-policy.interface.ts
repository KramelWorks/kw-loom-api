import type { Result } from "../../types/result.js";

export interface IPasswordPolicy{
    validate(value:string):Result<void>;
}