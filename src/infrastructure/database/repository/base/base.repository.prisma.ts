import type { IBaseRepository } from "../../../../domain/contracts/repository/base-repository.interface.js";
import type { IRepoMapper } from "../../../contracts/repo-mapper.interface.js";
import type { PrismaDelegate } from "./prisma.delegate.js";


export class BaseRepository<Domain, Persistence, TWhere={id:string}>implements IBaseRepository<Domain,TWhere>{

  constructor(private readonly repository:PrismaDelegate<TWhere,Persistence>,
              private readonly mapper:IRepoMapper<Domain,Persistence>,
  ) {
        
  }

  async create(data: Domain): Promise<Domain> {
    const record=this.mapper.toPersistence(data);
    const saved=await this.repository.create({data:record});
    const result=this.mapper.toDomain(saved);
    return result;
  }

  async update(where: TWhere, data: Domain): Promise<Domain> {
    const record=this.mapper.toPersistence(data);
    const saved=await this.repository.update({where,data:record});
    const result=this.mapper.toDomain(saved);
    return result;
  }

  async delete(where: TWhere): Promise<Domain> {
    const saved=await this.repository.delete({where});
    const result=this.mapper.toDomain(saved);
    return result;
  }


}