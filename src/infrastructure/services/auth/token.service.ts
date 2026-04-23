import  jwt  from "jsonwebtoken";
import type { ITokenService } from "../../../domain/contracts/services/token-service.interface.js";
import { AppError } from "../../../shared/error/AppError.js";
import type { JwtSettings } from "./jwt-settings.js";

export class TokenService implements ITokenService{

  constructor(private readonly jwtSettings:JwtSettings) {}

  async generate(payload: object): Promise<string> {
    try {

      const accessToken=jwt.sign(payload,this.jwtSettings.secret,{
        issuer:this.jwtSettings.issuer,
        audience:this.jwtSettings.audience,
        expiresIn:this.jwtSettings.expiresIn
      });

      return accessToken;
      
    } catch (error) {
      throw new Error(AppError.COMMOM.SERVER_ERROR.message)
    }
  }
  async validate(token: string): Promise<object> {
    return jwt.verify(token,this.jwtSettings.secret,{
      issuer:this.jwtSettings.issuer,
      audience:this.jwtSettings.audience
    })as object;
  }  
}