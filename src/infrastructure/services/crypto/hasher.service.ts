
import type { IHasherService } from "../../../domain/contracts/services/hasher-service.interface.js";
import type { CryptoSettings } from "./crypto-settings.js";
import bcrypt from 'bcrypt'

export class HasherService implements IHasherService{

  constructor(private readonly cryptoSettings:CryptoSettings) {
       
  }
  
  async hash(plainText: string): Promise<string> {
    const crypto=bcrypt.hash(plainText,this.cryptoSettings.saltOrRounds)
    return crypto;
  }

  async compare(plainText: string, token: string): Promise<boolean> {
    return bcrypt.compare(plainText,token);
  }
}