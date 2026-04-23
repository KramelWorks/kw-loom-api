export interface UserDto {
  id: string
  name: string
  email: string
  isLockable: boolean
  createdAt: Date | undefined
}
