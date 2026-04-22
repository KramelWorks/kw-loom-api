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