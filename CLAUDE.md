# Padrões do monorepo AuthLab

## Como usar estas orientações

Estas regras descrevem responsabilidades, fronteiras e padrões de implementação. As orientações
locais complementam este guia no escopo de cada pacote ou camada. Ao evoluir a arquitetura, atualize
o guia correspondente; documente decisões e contratos, sem criar um catálogo de arquivos.

## Responsabilidade de cada pacote

| Pacote               | Responsabilidade                                                             | Quando usar                                                     |
| -------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `@authlab/web`       | Interface React, navegação, formulários e consumo HTTP                       | Para tudo que executa no navegador e apresenta dados ao usuário |
| `@authlab/api`       | Contratos HTTP, validação de entrada e coordenação das operações de negócio  | Para operações que precisam de autoridade do servidor           |
| `@authlab/database`  | Modelo persistido, migrações e acesso compartilhado ao PostgreSQL com Prisma | Quando código de servidor precisa consultar ou alterar dados    |
| `@authlab/email`     | Integração de envio de e-mails com Resend                                    | Quando uma operação de servidor precisa enviar uma mensagem     |
| `@authlab/env`       | Leitura e validação tipada da configuração de servidor                       | Para obter variáveis de ambiente nos pacotes de servidor        |
| `@authlab/ts-config` | Configuração TypeScript compartilhada para Node.js                           | Como dependência de desenvolvimento dos pacotes de servidor     |

## Comunicação e direção das dependências

- O navegador conversa com a API por HTTP. Não importe implementação da API, Prisma, configuração
  secreta ou envio de e-mail no frontend, nem mesmo para compartilhar tipos de transporte.
- Os schemas Zod das rotas da API originam o OpenAPI. O Kubb consome esse contrato e gera tipos,
  clientes HTTP, hooks React Query e schemas Zod para o web.
- A API declara dependências de `database`, `email` e `env`. O cadastro usa persistência e envio de
  boas-vindas; `database` e `email` dependem de `env`.
- As bibliotecas de infraestrutura não dependem da API ou do web. `env` não depende de outros pacotes
  de negócio. Evite ciclos entre pacotes.
- Use os exports públicos pelo nome `@authlab/...` e declare dependências internas com `workspace:*`.
  Não atravesse diretórios de outro pacote por imports relativos. Os aliases locais não são uma API
  pública do monorepo.

## Como desenvolver uma funcionalidade entre pacotes

1. Defina a operação e seu contrato HTTP na API: entrada, saída, erros e `operationId` estável.
2. Se houver persistência, evolua o modelo e a migração no pacote de banco e regenere o Prisma Client.
   Coordene regras de negócio no servidor usando a instância compartilhada de acesso ao banco.
3. Se precisar de configuração ou envio de e-mail, use os pacotes responsáveis por essas capacidades.
4. Com a API servindo o contrato atualizado, regenere o cliente do web pelo Kubb.
5. Integre a operação em uma página ou hook de aplicação. O formulário recebe uma ação por callback;
   os componentes visuais recebem dados e estado por props.
6. Verifique os contratos afetados e os estados de sucesso, carregamento e erro. Atualize estes guias
   quando uma fronteira ou convenção mudar.

## Fonte de verdade e código gerado

- O modelo Prisma define a estrutura persistida; as migrações registram sua evolução.
- O contrato da API define o transporte; tipos de formulário e de apresentação podem ter outros
  formatos, desde que a conversão seja explícita.
- O Prisma Client, os artefatos Kubb e a árvore de rotas do TanStack são gerados. Altere a origem e
  execute o gerador correspondente em vez de corrigir o resultado à mão.
- Não coloque lógica manual nem documentação dentro de diretórios que o gerador limpa. A saída do
  Kubb é recriada integralmente e suas instruções ficam no escopo do pacote web.

## Desenvolvimento e verificação

Use Node.js 24 ou superior e a versão de pnpm fixada pelo workspace. Execute comandos a partir da
raiz e selecione pacotes com `--filter`; o Turborepo coordena as tarefas compartilhadas.

| Objetivo                                  | Comando                                         |
| ----------------------------------------- | ----------------------------------------------- |
| Instalar dependências                     | `pnpm install`                                  |
| Subir o PostgreSQL local                  | `docker compose up -d postgres`                 |
| Iniciar API e web                         | `pnpm dev`                                      |
| Iniciar somente a API                     | `pnpm --filter @authlab/api dev`                |
| Iniciar somente o web                     | `pnpm --filter @authlab/web dev`                |
| Gerar o Prisma Client                     | `pnpm --filter @authlab/database db:generate`   |
| Criar/aplicar migração de desenvolvimento | `pnpm --filter @authlab/database db:migrate`    |
| Regenerar o consumo da API                | `pnpm --filter @authlab/web exec kubb generate` |
| Executar builds disponíveis               | `pnpm build`                                    |
| Executar verificações de tipos declaradas | `pnpm check-types`                              |

A API usa porta 8080 por padrão e o web usa 3000. Os comandos de execução da API e de banco carregam
a configuração de ambiente da raiz. A geração Kubb exige que a API esteja acessível.

O web ainda não declara uma tarefa `check-types`; para verificá-lo explicitamente, use
`pnpm --filter @authlab/web exec tsc --noEmit`. O build Vite não substitui essa verificação.
Não há suíte de testes nem tarefas de lint nos pacotes atuais; a existência de um comando agregador
na raiz não significa que todos os pacotes executam aquela verificação.
