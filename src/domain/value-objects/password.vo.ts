import type { Result } from "../types/result.js";

export class Password{
  private constructor(private readonly value:string) {

  }

  public static create(value:string):Result<Password>{
    if(!value || value.length<=3)return{
      ok:false,
      error:"inválid password"
    }
    const result=new Password(value);
    return {
      ok:true,
      value:result
    }
  }

  public getValue():string{
    return this.value;
  }
}