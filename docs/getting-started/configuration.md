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

```json
### Exemplo `.env`


PORT="5000"

PASSWORD_POLICY_ENABLED="false"
REQUIRE_UPPERCASE="true"
REQUIRE_LOWERCASE="true"
REQUIRE_NUMBER="true"
REQUIRE_SPECIAL_CHAR="true"
MIN_LENGTH="8"

EMAIL_POLICY_ENABLED="false"
EMAIL_POLICY_MODE="whitelist"
EMAIL_POLICY_DOMAINS=["domainA.com","domainB.com"]
```
