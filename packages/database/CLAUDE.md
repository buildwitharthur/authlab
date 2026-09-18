# Padrões de persistência

## Responsabilidade e acesso

Este pacote concentra modelo Prisma, migrações, geração de tipos e acesso ao
PostgreSQL. Consuma sua interface pública por `@authlab/database` somente no
servidor. Modelos e cliente Prisma não são contratos do navegador.

Use a instância compartilhada `prisma`; não crie um cliente por requisição.
Preserve o reaproveitamento em desenvolvimento para evitar conexões duplicadas
durante recargas. A configuração de conexão vem de `@authlab/env`.

Decisões HTTP, autenticação e envio de e-mails pertencem à API. Mantenha este
pacote independente de Fastify, React e provedores de mensagem.

## Modelo e integridade

Expresse identidade, unicidade, valores padrão e relações no modelo persistido.
Gere identificadores, numeração de negócio e datas de criação na persistência,
sem delegar sua autoridade ao navegador. Uma sequência não garante numeração
sem lacunas e não deve ser usada como contagem de registros.

Persista hashes de senha, nunca senhas em texto puro. Mantenha explícita a
conversão entre entrada pública e modelo persistido, incluindo preferências de
visibilidade. A API seleciona os campos públicos de cada consulta e resposta.

Consultas prévias não substituem restrições de integridade: considere concorrência
ao criar ou alterar dados únicos. Use transações quando várias escritas precisarem
ser atômicas. Chamadas externas não participam da transação PostgreSQL.

## Evolução e migrações

1. Altere o modelo declarativo de acordo com a regra de negócio.
2. Execute `pnpm --filter @authlab/database db:migrate` em desenvolvimento.
3. Revise a migração, considerando dados existentes, defaults, unicidade e
   preenchimento de novos campos obrigatórios.
4. Execute `pnpm --filter @authlab/database db:generate`.
5. Ajuste consumidores e verifique tipos e comportamento persistido.

Versione modelo e migrações. Não reescreva migrações já aplicadas em ambientes
compartilhados nem edite o Prisma Client gerado. Use
`pnpm --filter @authlab/database db:deploy` para aplicar migrações existentes
na implantação.

Geração de cliente e aplicação de migrações são etapas distintas. Configure a
conexão do ambiente pretendido antes de executar comandos: uma URL opcional na
validação geral não torna o banco opcional para operações persistidas.
