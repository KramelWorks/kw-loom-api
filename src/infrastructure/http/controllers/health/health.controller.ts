import type { Request, Response } from "express";
import type { AppHealthUseCase } from "../../../../application/use-cases/health/app-health.use-case.js";
export class HealthController{

  constructor(private readonly appHealthUseCase:AppHealthUseCase) {}

  public async appHealth(req:Request,res:Response){
    const result=await this.appHealthUseCase.execute(null);
    return res.status(200).json(result.toJson())
  }


}