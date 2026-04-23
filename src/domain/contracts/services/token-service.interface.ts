
export interface ITokenService{
  
  generate(payload:object):Promise<string>;

  validate(token:string):Promise<object>;

}