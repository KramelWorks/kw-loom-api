## Uso de Repositórios

### Exemplo básico

```ts
const userRepo = new BaseRepository<User, UserModel>(prisma.user, userMapper)

await userRepo.create(user)
await userRepo.update({ id: '123' }, user)
```

# 🧪 Uso de Policies

## Password Policy

```ts
const result = passwordPolicy.validate(password)

if (!result.ok) {
  return result
}
```

## Email Policy

```ts
const result = emailPolicy.validate(email)

if (!result.ok) {
  return result
}
```
