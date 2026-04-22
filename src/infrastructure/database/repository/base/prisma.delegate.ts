export type PrismaDelegate<TWhere,Persistence>={

  create(args:{data:Persistence}):Promise<Persistence>;

  update(args:{where:TWhere,data:Persistence}):Promise<Persistence>;

  delete(args:{where:TWhere}):Promise<Persistence>;

}

