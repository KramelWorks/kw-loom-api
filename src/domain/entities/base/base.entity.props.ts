export interface BaseEntityProps {
  id?: string
  isActive?: boolean
  isDeleted?: boolean
  createdAt?: Date
  updatedAt?: Date | undefined
  deletedAt?: Date | undefined
}
