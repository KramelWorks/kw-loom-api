# 📌 Decisões Arquiteturais

Este documento descreve as principais decisões do projeto e seus motivos.

---

## ✅ AppResult

Padroniza as respostas da camada de aplicação.

### Motivação

- Evitar retornos inconsistentes
- Evitar uso de exceptions como fluxo de controle
- Facilitar integração com controllers

### Impacto

- Todos os use cases devem retornar `AppResult`
- Controllers devem apenas traduzir `AppResult` para HTTP

---

## ✅ Result (Domain)

Padroniza o retorno de operações no domínio.

### Motivação

- Garantir consistência nas regras de negócio
- Evitar exceptions dentro do domínio
- Tornar erros explícitos e controláveis

### Impacto

- Métodos de entidades retornam `Result`
- Regras de negócio não lançam erros diretamente

---

## 🏗️ Separação `app` vs `server`

Separação entre configuração da aplicação e inicialização do servidor.

### Motivação

- Melhor testabilidade
- Permitir reutilização do `app` sem subir servidor
- Isolar infraestrutura de execução

### Impacto

- `app.ts` contém configuração do Express
- `server.ts` é responsável por iniciar o servidor

---

## ⚙️ EnvConfig

Centraliza o acesso às variáveis de ambiente.

### Motivação

- Evitar acesso direto a `process.env`
- Garantir tipagem e valores padrão
- Facilitar manutenção e testes

### Impacto

- Toda configuração deve vir de `envConfig`
- Nunca acessar `process.env` diretamente fora desse módulo

---

## 🧠 Use Case Pattern

Uso de `IUseCase` como contrato base da aplicação.

### Motivação

- Padronizar execução de regras de negócio
- Garantir consistência entre casos de uso
- Facilitar leitura e manutenção

### Impacto

- Todos os use cases implementam `IUseCase`
- Método padrão: `execute`

---

## 🚫 Controllers sem lógica de negócio

Controllers são responsáveis apenas por entrada e saída.

### Motivação

- Separação clara de responsabilidades
- Facilitar testes
- Evitar acoplamento com HTTP

### Impacto

- Controllers não contêm regras de negócio
- Apenas orquestram chamadas para use cases

---

## 🧱 BaseEntity

Uso de uma entidade base para controle de estado.

### Motivação

- Evitar duplicação de lógica comum
- Padronizar comportamento de entidades
- Centralizar regras de estado

### Impacto

- Entidades com estado devem estender `BaseEntity`
- Alterações de estado são controladas internamente

---

## 🔎 Uso de `where` ao invés de `id`

### Motivação

- Evitar acoplamento com identificadores fixos
- Permitir queries mais flexíveis (email, slug, etc.)
- Alinhar com o padrão do Prisma

### Impacto

- Repositórios recebem objetos `where`
- Métodos não dependem de `id` diretamente

---

## 📌 Policies

### Motivação

Separar regras de validação do domínio para:

- reduzir acoplamento
- permitir configuração via ambiente
- facilitar testes

### Decisão

Criar policies independentes para:

- senha
- e-mail

### Consequências

- maior flexibilidade
- regras reutilizáveis
- leve aumento de complexidade estrutural

---

## 🔍 Query Model

Padroniza a forma como dados são consultados no sistema.

### Motivação

- Separar regras de domínio de preocupações de leitura
- Evitar acoplamento com banco de dados
- Manter queries simples e consistentes

---

### Estrutura

As consultas são divididas em três partes:

#### 1. Domain Filters

Representam critérios de busca do domínio.

```ts
export interface DateRange {
  from?: Date
  to?: Date
}

export interface BaseFilter {
  createdAt?: DateRange
  updatedAt?: DateRange
}

export interface UserFilter extends BaseFilter {
  name?: string
  email?: string
}
```

Regras:

- Não incluem paginação
- Não incluem ordenação
- Representam apenas intenção de busca

---

#### 2. Pagination (Application)

Contrato reutilizável para paginação na camada de aplicação.

```ts
export interface Pagination {
  page?: number
  limit?: number
}
```

---

#### 3. Application Query

Combina filtros do domínio com paginação e ordenação.

```ts
import type { UserFilter } from '../../../domain/contracts/repository/filters/user-filter'
import type { Pagination } from '../../contracts/pagination.interface'

export interface UserQueryInput extends UserFilter, Pagination {
  sortBy?: 'name' | 'email' | 'createdAt'
  order?: 'asc' | 'desc'
}
```

---

### Regras gerais

- Domain define filtros
- Application compõe queries (filtro + paginação + ordenação)
- Infrastructure executa consultas

---

### Impacto

- Repositórios recebem filtros do domínio
- Queries reutilizam `Pagination` como contrato comum
- Controllers utilizam `UserQueryInput` diretamente
