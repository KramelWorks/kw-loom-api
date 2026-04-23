export type JwtSettings = {
  secret: string;
  issuer: string;
  audience: string;
  expiresIn: number;
};