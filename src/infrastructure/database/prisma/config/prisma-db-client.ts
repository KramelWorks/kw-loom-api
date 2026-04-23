import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client.js";
import { envConfig } from "../../../config/envConfig.js";

const connectionString=envConfig.connectionString.core;

const adapter=new PrismaBetterSqlite3({url:connectionString});

const prismaDB=new PrismaClient({adapter})

export {prismaDB}