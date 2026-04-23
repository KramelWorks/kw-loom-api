export interface IHasherService {

  hash(plainText: string): Promise<string>

  compare(plainText: string, token: string): Promise<boolean>
}
