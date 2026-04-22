## Uso de Repositórios

### Exemplo básico

```ts
const userRepo = new BaseRepository<User, UserModel>(
  prisma.user,
  userMapper
)

await userRepo.create(user)
await userRepo.update({ id: "123" }, user)