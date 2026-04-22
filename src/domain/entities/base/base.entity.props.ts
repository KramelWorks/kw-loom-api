
export interface BaseEntityProps{
  isActive:boolean;
  isDeleted:boolean;
  createdAt:Date;
  updatedAt:Date | undefined;
  deletedAt:Date | undefined;
}