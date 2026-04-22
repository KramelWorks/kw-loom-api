import type { Result } from "../../types/result.js";

export interface IEmailPolicy{
    validate(value:string):Result<void>;
}