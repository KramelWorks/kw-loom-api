# 🏗️ Arquitetura

## 📌 Visão Geral

A aplicação segue uma arquitetura em camadas com separação clara de responsabilidades:

- **Domain** → regras de negócio
- **Application** → orquestração (use cases)
- **Infrastructure** → detalhes externos (HTTP, banco, etc.)

---

## 🔄 Fluxo da aplicação

```text
HTTP Request
   ↓
Controller
   ↓
Use Case
   ↓
Domain
   ↓
Response (AppResult)

## Repositórios

A aplicação utiliza um padrão de repositório genérico para abstrair o acesso a dados.

Os repositórios trabalham com:

- Entidades de domínio
- Tipos de persistência
- Critérios de busca (`where`)

Isso permite desacoplamento da camada de infraestrutura.

## Mappers

Responsáveis por converter:

- Domain → Persistence
- Persistence → Domain

Evita acoplamento entre camadas.

## 🧠 Policies

A aplicação utiliza o padrão de **Policies** para encapsular regras de validação e segurança.

### Objetivo

- Evitar lógica de validação em entidades
- Centralizar regras configuráveis
- Permitir evolução sem impacto no domínio

### Policies atuais

- PasswordPolicy → valida regras de senha
- EmailPolicy → valida domínio de e-mail

### Fluxo

Use Case → Policy → Entity

A Policy decide se uma operação é válida antes de afetar o domínio.
```
