export interface IRepoMapper<Domain,Persistence>{

  toDomain(raw:Persistence):Domain;

  toPersistence(domain:Domain):Persistence;
  
}