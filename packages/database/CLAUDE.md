# Persistência com Prisma e PostgreSQL

## Responsabilidade e uso

Este pacote é responsável pelo modelo persistido, histórico de migrações, geração de tipos e
instância compartilhada do Prisma. Use-o somente no servidor e importe sua interface pública por
`@authlab/database`. Não leve o cliente Prisma nem seus modelos internos para o navegador.

Use a instância exportada `prisma` nas operações normais. O pacote também exporta `Prisma`,
`PrismaClient` e tipos de modelos, mas isso não é motivo para abrir uma nova conexão por requisição.
O adapter PostgreSQL recebe a conexão de `@authlab/env`, e a instância é reaproveitada em `globalThis`
fora de produção para evitar multiplicação de clientes durante recargas de desenvolvimento.

Regras HTTP, autenticação e decisão de enviar e-mails pertencem à API. Este pacote não deve depender
de Fastify, React ou do provedor de e-mail. Use transações quando várias escritas precisarem constituir
uma única operação atômica; a coordenação do caso de uso permanece no servidor.

## Modelo e fronteiras de dados

O modelo atual de usuário contém identificador UUID, nome, e-mail único, hash da senha, número de
membro, data de entrada e a escolha de aparecer no mural. O identificador, o número sequencial, a
data e a visibilidade têm defaults definidos no modelo. A API recebe `password` e `showOnWall`, mas
persiste `passwordHash` e `showWall`; mantenha essa conversão explícita e nunca exponha o hash.

Ainda não existe modelo de sessão. Não suponha equivalência entre modelo Prisma, resposta HTTP e
tipo visual: defina a conversão e os campos públicos no contrato da API.

## Como evoluir a persistência

1. Altere o modelo declarativo de acordo com a operação de negócio.
2. Execute `pnpm --filter @authlab/database db:migrate` contra o banco de desenvolvimento e revise
   a migração produzida, incluindo efeitos sobre dados existentes.
3. Execute `pnpm --filter @authlab/database db:generate` para atualizar o cliente e os tipos usados
   pelos consumidores. Não dependa de geração implícita durante a migração.
4. Ajuste as operações consumidoras e confira tipos e comportamento persistido.

Versione a evolução do modelo e suas migrações. Não reescreva uma migração já aplicada a ambientes
compartilhados; crie a próxima alteração. Não edite o Prisma Client gerado, que não é versionado.

## Execução

Os comandos de banco carregam o ambiente da raiz. Configure `DATABASE_URL` para o banco pretendido;
a variável ser opcional na validação geral não torna a conexão opcional para operações persistidas.

Use `db:migrate` em desenvolvimento e `db:deploy` para aplicar migrações existentes em implantação,
sempre com `pnpm --filter @authlab/database`. `db:studio` abre a inspeção local dos dados. A geração
do cliente não aplica migrações, e a aplicação de migrações não substitui a geração do cliente.
