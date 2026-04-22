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