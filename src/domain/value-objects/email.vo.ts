import type { Result } from "../types/result.js";

export class Email{
  private constructor(private readonly value:string) {

  }

  public static create(value:string):Result<Email>{
    if(!value.includes("@"))return{
      ok:false,
      error:"inválid e-mail"
    }
    const result=new Email(value);
    return {
      ok:true,
      value:result
    }
  }

  public getValue():string{
    return this.value;
  }
}