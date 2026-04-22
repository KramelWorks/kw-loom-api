## Variáveis de ambiente

| Nome | Descrição         | Default |
| ---- | ----------------- | ------- |
| PORT | Porta do servidor | 5001    |

### 🔐 Password Policy

Define regras de validação de senha.

| Nome                    | Descrição                | Default |
| ----------------------- | ------------------------ | ------- |
| PASSWORD_POLICY_ENABLED | ativa/desativa validação | false   |
| REQUIRE_UPPERCASE       | exige letra maiúscula    | false   |
| REQUIRE_LOWERCASE       | exige letra minúscula    | false   |
| REQUIRE_NUMBER          | exige numeros            | false   |
| REQUIRE_SPECIAL_CHAR    | exige caractere especial | false   |
| MIN_LENGTH              | tamanho mínimo da senha  | false   |

### 📧 Email Policy

Define regras de domínio de e-mail

| Nome                 | Descrição                                  | Default   |
| -------------------- | ------------------------------------------ | --------- |
| EMAIL_POLICY_ENABLED | ativa/desativa validação                   | false     |
| EMAIL_POLICY_MODE    | whitelist ou blacklist                     | whitelist |
| EMAIL_POLICY_DOMAINS | lista de domínios permitidos ou bloqueados | []        |

```env
### Exemplo `.env`
```
