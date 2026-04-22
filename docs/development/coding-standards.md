# 📏 Padrões de Código

---

## ✅ AppResult

Todas as respostas de use cases devem utilizar `AppResult`.

### Uso

```ts
AppResult.ok(data)
AppResult.fail(message)
```

### Formato

```json
{
  "success": true,
  "data": {},
  "message": "Success"
}
```

### Regras

- Nunca retornar objetos soltos
- Sempre padronizar resposta com `AppResult`
- `fail` deve retornar `success: false`

---

## ❌ AppError

Todos os erros da aplicação devem utilizar `AppError`.

```ts
export const AppError = {
  COMMON: {
    UNKNOWN: { message: 'Unknown error' },
    SERVER_ERROR: { message: 'Server error' },
    ACTION_FORBIDDEN: { message: 'Action forbidden' },
    ACTION_DENIED: { message: 'Action denied' },
  },
} as const
```

### Regras

- Não usar `throw new Error`
- Sempre usar erros padronizados
- Mensagens devem ser consistentes
- Evitar textos ambíguos

---

## 🧠 Use Cases

Todos os casos de uso devem implementar `IUseCase`.

### Interface base

```ts
export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<AppResult<Output>>
}
```

### Regras

- Deve possuir método `execute`
- Deve retornar `Promise<AppResult<T>>`
- Não deve acessar HTTP (`req`, `res`)
- Não deve acessar banco diretamente
- Não deve conter lógica de framework
- Deve conter apenas regras de negócio e orquestração

### Exemplo

```ts
class ExampleUseCase implements IUseCase<Input, Output> {
  async execute(input: Input) {
    return AppResult.ok(result)
  }
}
```

---

## 🚫 Controllers

Controllers são responsáveis apenas por entrada e saída.

### Regras

- Não conter regra de negócio
- Não acessar banco diretamente
- Apenas chamar use cases
- Traduzir request → input
- Traduzir output → response

---

## 🧱 Base Entity

Entidades que possuírem controle de estado devem estender `BaseEntity`.

### Props base

```ts
export interface BaseEntityProps {
  isActive: boolean
  isDeleted: boolean
  createdAt: Date
  updatedAt?: Date
  deletedAt?: Date
}
```

### Métodos disponíveis

```ts
protected activate()
protected deactivate()
protected markAsDeleted()
protected restore()
protected touch()
```

### Regras

- Métodos são `protected`
- Estado não deve ser alterado externamente
- Toda mudança deve passar pela entidade
- `touch()` atualiza `updatedAt`

### Retorno dos métodos

#### Erro

```json
{
  "ok": false,
  "error": "string"
}
```

#### Sucesso

```json
{
  "ok": true,
  "value": undefined
}
```

---

## 📌 Diretrizes Gerais

- Preferir clareza ao invés de abstração excessiva
- Evitar interfaces desnecessárias
- Nomear arquivos em kebab-case
- Nomear classes em PascalCase
- Nomear variáveis em camelCase
- Não misturar responsabilidades

---

## 🧠 Arquitetura

- `domain` → regras de negócio  
- `application` → orquestração  
- `infrastructure` → detalhes externos  

### Dependências

- Controllers → Use Cases  
- Use Cases → Domain  
- Infrastructure → Application/Domain  
- Domain → não depende de ninguém  
