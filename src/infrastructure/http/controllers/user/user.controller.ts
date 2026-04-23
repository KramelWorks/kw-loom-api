import type { Request, Response } from "express";
import type { CreateUserUseCase } from "../../../../application/use-cases/user/create-user.use-case.js";
import type { CreateUserDto } from "../../../../application/use-cases/user/dtos/create-user.dto.js";

export class UserController{

  constructor(private readonly createUserUseCase:CreateUserUseCase) {

  }

  public async create(req:Request,res:Response){
    let statusCode:number
    const data:CreateUserDto={...req.body};
    
    const result=await this.createUserUseCase.execute(data);
   
    result.success?statusCode=201:statusCode=400
    return res.status(statusCode).json(result.toJson());
  }

}