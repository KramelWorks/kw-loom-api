import  dotenv  from 'dotenv';
dotenv.config();

export const envConfig={
  http:{
    port:Number(process.env.PORT ?? "5001")
  }
}