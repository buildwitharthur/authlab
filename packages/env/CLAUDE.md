# Configuração validada de servidor

## Responsabilidade

Este pacote é o ponto de leitura e validação das variáveis de ambiente do servidor, usando
`@t3-oss/env-core` e Zod. Os consumidores importam `env` por `@authlab/env`, em vez de ler
`process.env` e repetir defaults ou conversões em cada integração.

A validação acontece na importação. O ambiente precisa estar carregado antes disso. O pacote lê
o ambiente do processo; quem carrega a configuração local são os comandos de execução dos
consumidores. Não importe este pacote no web: o contrato atual é exclusivamente de servidor.

## Contrato atual

| Variável         | Regra                                                       | Uso                                   |
| ---------------- | ----------------------------------------------------------- | ------------------------------------- |
| `NODE_ENV`       | `development`, `production` ou `test`; padrão `development` | Comportamentos por ambiente           |
| `HOST`           | Texto não vazio; padrão `0.0.0.0`                           | Endereço de escuta da API             |
| `PORT`           | Conversão para inteiro de 1 a 65535; padrão 8080            | Porta da API                          |
| `DATABASE_URL`   | URL opcional                                                | Conexão PostgreSQL                    |
| `JWT_SECRET`     | Texto não vazio, com default de desenvolvimento             | Assinatura JWT                        |
| `COOKIE_SECRET`  | Texto não vazio, opcional                                   | Configuração de assinatura de cookies |
| `RESEND_API_KEY` | Texto não vazio, opcional                                   | Acesso ao provedor de e-mail          |
| `EMAIL_FROM`     | Texto não vazio; remetente padrão de desenvolvimento        | Identidade de envio da aplicação      |

Strings vazias são tratadas como ausência. Uma variável opcional permite a validação do ambiente sem
aquele serviço configurado, mas não garante que a integração funcione sem ela. Configure os valores
necessários antes de importar ou usar a integração correspondente. O default de JWT é destinado ao
desenvolvimento; ambientes implantados precisam de segredo próprio.

## Como adicionar configuração

1. Declare a variável no schema de servidor com tipo, validação, obrigatoriedade e default coerentes.
2. Atualize o exemplo de configuração local, sem incluir credenciais reais.
3. Consuma a propriedade tipada no pacote responsável pela funcionalidade.
4. Considere que uma nova variável obrigatória afeta todos os consumidores que importam `env`,
   incluindo ferramentas de banco, mesmo quando não usam diretamente aquela integração.

Não adicione dependências de negócio a este pacote. Se o web precisar de configuração pública,
defina um contrato próprio para o navegador e exponha somente valores públicos, sem reaproveitar
o objeto de configuração secreta do servidor.
