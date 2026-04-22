import type { Request, Response } from "express";
import type { IAppHealthUseCase } from "../../../../application/use-cases/health/contracts/app-health.interface.js";

export class HealthController{

  constructor(private readonly appHealthUseCase:IAppHealthUseCase) {}

  public async appHealth(req:Request,res:Response){
    const result=await this.appHealthUseCase.execute(null);
    return res.status(200).json(result.toJson())
  }


}